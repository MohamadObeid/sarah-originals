import express, { request } from "express";
import Employee from "../modals/employeeModel";
import LiveUser from "../modals/liveUserModel";
//import PaymentMethod from '../modals/orderModel';
import Order from '../modals/orderModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

/*router.get("/createmethod", async (req, res) => {
    try {
        const paymentMethod = new PaymentMethod({
            title: "Credit Card",
            description: "Pay by your bank card",
            costUsd: 0,
        })
        const newPaymentMethod = await paymentMethod.save();
        res.send(newPaymentMethod);
    } catch (error) {
        res.send({ msg: 'Error in getting default payment method.' });
    }
});

router.get("/", async (req, res) => {
    const paymentMethods = await PaymentMethod.find({});
    res.send(paymentMethods);
})*/

router.get("", async (req, res) => {
    const order = await Order.find({}).sort({ active: 1 })
    order.length > 0 ? res.send(order.reverse()) : res.send([])
})

router.get("/:id", async (req, res) => {
    const orderId = req.params.id
    if (orderId === 'active') {
        const orders = await Order.find({ active: { $eq: true } }).sort({ creation_date: -1 })
        res.send(orders)
    } else {
        const order = await Order.find({ _id: orderId })
        res.send(order)
    }
})

router.post("", isAuth, async (req, res) => {
    setActive(req.body)
    const order = new Order(req.body)
    /*const requestHandler = await Employee.find(
        {
            active: { $eq: true },
            requestHandler: { $eq: true }
        }).sort({ currentAssignments: -1 }).limit(1)*/
    //console.log(requestHandler)
    order.assignment = [{
        req_id: order.request[0]._id,
        type: 'Request',
        date: date(),
        status: 'Unassigned',
    }]
    const neworder = await order.save()

    if (neworder)
        return res.status(201).send({ message: "New order created!", data: neworder })

    return res.status(500).send({
        message: "Error in creating order!"
    })
})

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id })
    var forceAssignment
    try {
        if (order && req.body.command === 'Update Handlers') {
            order.assignment.map(ass => {
                if (ass.req_id == req.body.req_id && !ass.closedDate) {
                    const assignment = req.body.assignment.find(ass0 => ass0._id == ass._id)

                    if (!assignment.employeeId) {
                        ass.status = 'Unassigned'
                        ass.onHold = undefined
                        ass.assignedOn = undefined
                        ass.assignedBy = undefined
                        ass.employeeName = undefined
                        ass.employeeId = undefined
                        forceAssignment = true

                    } else if (ass.employeeId !== assignment.employeeId) {
                        ass.status = 'Assigned'
                        ass.onHold = undefined
                        ass.assignedOn = date()
                        ass.assignedBy = req.body.assignedBy
                        ass.employeeName = assignment.employeeName
                        ass.employeeId = assignment.employeeId
                        forceAssignment = true
                    }
                }
            })
        }

        var employeeIdList = []
        if (order.assignment.length > 0) {
            order.assignment.map(ass => {
                if (ass.status === 'Pending' || ass.status === 'Accepted')
                    employeeIdList[employeeIdList.length] = ass.employeeId
            })
        }
        const currentHandlers = await Employee.find({ _id: employeeIdList }) // for deleting assignments when a request is deleted

        if (order) {

            if (req.body.type === 'Assignment') {
                acceptRejectAssignment(req, order) // accept or reject assignment manager
                moveAssToSameHandler(order)
                const orderUpdated = await order.save()
                if (orderUpdated) {
                    return res.status(200).send({ message: "Order has been assigned!", data: orderUpdated })
                } else return
            }
            /*const handlers = await Employee.find({
                active: { $eq: true },
                $or: [{ deliveryHandler: { $eq: true } }, { paymentHandler: { $eq: true } }, { cartHandler: { $eq: true } }, { requestHandler: { $eq: true } }],
                //currentAssignments: { $lt: 20 }
            })*/

            if (req.body.status) { // status changer
                const approved = statusApproval(order, req.body.req_id, req.body.type, req.body.status).approval
                const message = !approved && statusApproval(order, req.body.req_id, req.body.type, req.body.status).status

                if (approved) {
                    order.request.map(request => {
                        if (request._id == req.body.req_id) {
                            if (req.body.status === 'Progress' && req.body.status === 'on Hold') {
                                holdOnAssignment(req, request)
                                return
                            }

                            if (req.body.type === 'Request')
                                request.status = req.body.status
                            else if (req.body.type === 'Cart')
                                request.cart.status = req.body.status
                            else if (req.body.type === 'Delivery')
                                request.delivery.status = req.body.status
                            else if (req.body.type === 'Payment')
                                request.payment.status = req.body.status
                            return
                        }
                    })
                } else {
                    return res.send({ message })
                }
            } else {
                if (req.body.request) {
                    if (req.body.request.length > order.request.length) { // new request
                        var newRequest = newRequestHandler(order, req.body.request, currentHandlers)

                        if (newRequest.message) { // cancel request rejected
                            return res.send({
                                message: newRequest.message
                            })
                        }

                    } else if (req.body.request.length < order.request.length) { // a request is deleted
                        deleteRequestHandler(order, req)

                    } else if (req.body.request.length > 0) {

                        if (req.body.request.length === 1 && // order must have atleast 1 request
                            (req.body.request[0].type !== 'Place' && req.body.request[0].type !== 'Prepare')) {
                            return res.status(200).send({
                                message: "Order must have at least 1 place or prepare request"
                            })
                        }
                        order.request = req.body.request // update order request

                    } else if (req.body.request.length === 0) {
                        const orderDeleted = await Order.findByIdAndRemove(req.body._id)
                        if (orderDeleted)
                            return res.send({ message: "Request has been deleted!" })

                    } else order.request = req.body.request || order.request
                }

                order.creation_date = req.body.creation_date ? req.body.creation_date : order.creation_date;
                order.created_by = req.body.created_by ? req.body.created_by : order.created_by;
                order.closed = req.body.closed ? req.body.closed : order.closed;
                order.phone = req.body.phone ? req.body.phone : order.phone;
                order.name = req.body.name ? req.body.name : order.name;
                order.userId = req.body.userId ? req.body.userId : order.userId;
                order.email = req.body.email ? req.body.email : order.email;
                order.deliveryAddress = req.body.deliveryAddress ? req.body.deliveryAddress : order.deliveryAddress;
                order.paymentAddress = req.body.paymentAddress ? req.body.paymentAddress : order.paymentAddress;
                order.invoiceNum = req.body.invoiceNum ? req.body.invoiceNum : order.invoiceNum;
                order.amount = req.body.amount ? req.body.amount : order.amount;
                order.note = req.body.note ? req.body.note : order.note;
            }
            order.request.map(request => {
                requestTotallyCanceled(request, order)
                statusModifier(request, order)
                requestStatusModifier(request)
                assignmentStatusModifier(request, order, currentHandlers)
                request.cart.qty = requestQtyCalc(request)
                order.amount = amountCalc(order, request)
            })
            !forceAssignment && moveAssToSameHandler(order, req.body.type, req.body.req_id)
            setActive(order)
            setOrderClosed(order)
        }
        //const handlersUpdated = await currentHandlers.save()
        const orderUpdated = await order.save()
        if (orderUpdated) {
            return res.status(200).send({ message: "Order has been updated!", data: orderUpdated })
        }
        return res.status(500).send({
            message: "Error in updating order!"
        })
    } catch (error) {
        console.log(error)
        return res.send(error.message)
    }
})

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const orderDeleted = await Order.findByIdAndRemove(req.params.id)
    if (orderDeleted) {
        return res.status(200).send({ message: "Order has been deleted!", data: orderDeleted })
    }
    return res.status(500).send({
        message: "Error in deleting order!"
    })
})


////////////////////////// Functions /////////////////////////////

const requestTotallyCanceled = (request, order) => {
    if (request.type === 'Prepare' || request.type === 'Place') {

        // are all items canceled => cancel request
        var totalCanceledCartAmount = 0
        const requestNum = order.request.indexOf(request)
        const cancelRequests = order.request.filter(req => req.type === 'Cancel' && req.modifiedRequestNum == requestNum + 1)
        if (cancelRequests.length > 0) {
            cancelRequests.map(req => {
                totalCanceledCartAmount = totalCanceledCartAmount + req.cart.amount
            })
            totalCanceledCartAmount = Math.round(totalCanceledCartAmount * 100) / 100
            if (totalCanceledCartAmount * (-1) == request.cart.amount) {
                request.status = 'Canceled'
                cancelRequests.map(req => {
                    req.status = 'Completed'
                })
                if (order.request.indexOf(request) === 0) {
                    const anotherPlaceExists = order.request.find(req => req.type == request.type && req._id != request._id)
                    if (anotherPlaceExists) {
                        anotherPlaceExists.delivery = request.delivery
                        anotherPlaceExists.amount = anotherPlaceExists.amount + anotherPlaceExists.delivery.charge
                    }
                }

            } else if (request.status === 'Canceled') request.status = 'Pending'

        }
    }
}

const newRequestHandler = (order, reqBodyRequest, currentHandlers) => {
    const request = reqBodyRequest
    var isCancelRequest = request[request.length - 1].type === 'Cancel' ? request[request.length - 1] : undefined
    var isReturnRequest = request[request.length - 1].type === 'Return' ? request[request.length - 1] : undefined
    var isPlaceOrPrepareReq = (request[request.length - 1].type === 'Place' || request[request.length - 1].type === 'Prepare')
        ? request[request.length - 1] : undefined

    if (isCancelRequest) {
        if (isCancelRequest.cart.qty === 0)
            return { approval: false, message: "Any request must contain at least 1 item" }

        const canceledRequestIndex = isCancelRequest.modifiedRequestNum - 1
        const canceledRequest = reqBodyRequest[canceledRequestIndex]
        const cartStatus = reqBodyRequest[canceledRequestIndex].cart.status

        if (cartStatus === 'Pending' || cartStatus === 'on Hold' || cartStatus === 'Packing') {

            // automatic confirmation
            isCancelRequest.status = 'Confirmed'

            if (canceledRequest.status !== 'Canceled') {
                var conditions = ((ass, type) => { return ass.req_id == canceledRequest._id && (ass.status === 'Assigned' || ass.status === 'Accepted') && ass.type === type })
                var requestAssigned = order.assignment.find(ass => conditions(ass, 'Request'))
                var cartAssigned = order.assignment.find(ass => conditions(ass, 'Cart'))
                var paymentAssigned = order.assignment.find(ass => conditions(ass, 'Payment'))

                if (requestAssigned) {
                    var handler = currentHandlers.find(handler => handler._id == requestAssigned.employeeId)
                    if (handler) {
                        handler.currentAssignments = handler.currentAssignments + 1

                        order.assignment[order.assignment.length] = {
                            receiptNum: isCancelRequest.receiptNum,
                            type: 'Request',
                            date: isCancelRequest.creation_date,
                            status: 'Accepted',
                            employeeId: requestAssigned.employeeId,
                            employeeName: requestAssigned.employeeName
                        }

                    }
                } else {
                    order.assignment[order.assignment.length] = {
                        receiptNum: isCancelRequest.receiptNum,
                        type: 'Request',
                        date: isCancelRequest.creation_date,
                        status: 'Unassigned',
                    }
                }

                if (cartAssigned) {
                    var handler = currentHandlers.find(handler => handler._id == cartAssigned.employeeId)
                    if (handler) {
                        handler.currentAssignments = handler.currentAssignments + 1

                        order.assignment[order.assignment.length] = {
                            receiptNum: isCancelRequest.receiptNum,
                            type: 'Cart',
                            date: isCancelRequest.cart.prepareOn,
                            status: 'Accepted',
                            employeeId: cartAssigned.employeeId,
                            employeeName: cartAssigned.employeeName,
                        }
                    }
                } else if (canceledRequest.status !== 'Pending') {
                    order.assignment[order.assignment.length] = {
                        receiptNum: isCancelRequest.receiptNum,
                        type: 'Cart',
                        date: isCancelRequest.cart.prepareOn,
                        status: 'Unassigned',
                    }
                }

                if (paymentAssigned) { // note that in case payment is done online, there is no payment assigned. therefore for refund there should be a payment handler
                    var handler = currentHandlers.find(handler => handler._id == paymentAssigned.employeeId)
                    if (handler) {
                        handler.currentAssignments = handler.currentAssignments + 1

                        order.assignment[order.assignment.length] = {
                            receiptNum: isCancelRequest.receiptNum,
                            type: 'Payment',
                            date: isCancelRequest.payment.collectOn,
                            status: 'Accepted',
                            employeeId: paymentAssigned.employeeId,
                            employeeName: paymentAssigned.employeeName
                        }
                    }
                } else if (canceledRequest.status !== 'Pending') {
                    order.assignment[order.assignment.length] = {
                        receiptNum: isCancelRequest.receiptNum,
                        type: 'Payment',
                        date: isCancelRequest.payment.collectOn,
                        status: 'Unassigned',
                    }
                }
            }
            //save
            order.request = reqBodyRequest
        } else return { approval: false, message: "You can't cancel an item after it is packed, paid, or delivered. Instead request a return" }

    } else if (isReturnRequest) {
        if (isReturnRequest.cart.qty === 0)
            return { approval: false, message: "Any request must contain at least 1 item" }

        const returnedRequestIndex = isReturnRequest.modifiedRequestNum - 1
        const status = reqBodyRequest[returnedRequestIndex].status
        const cartStatus = reqBodyRequest[returnedRequestIndex].cart.status

        if (status === 'Confirmed' && cartStatus !== 'Packed')
            return { approval: false, message: "You can't return an unpacked request. Instead request a cancel order" }
        else if (status === 'Canceled')
            return { approval: false, message: "You can't return a canceled request" }
        else order.request = reqBodyRequest

        order.assignment[order.assignment.length] = { //add new request assignment
            receiptNum: isReturnRequest.receiptNum,
            type: 'Request',
            date: isReturnRequest.creation_date,
            status: 'Unassigned',
        }

    } else if (isPlaceOrPrepareReq) {
        if (isPlaceOrPrepareReq.cart.qty === 0)
            return { approval: false, message: "Any request must contain at least 1 item" }
        else if (isPlaceOrPrepareReq.type !== order.request[0].type)
            return { approval: false, message: "You can't make a place and a prepare request in the same order at the same time. Instead place a new order" }

        const cartStatus = reqBodyRequest[0].cart.status
        if (cartStatus === 'Packed' || cartStatus === 'Canceled' || cartStatus === 'Rejected')
            return { approval: false, message: "You can't add items to cart after it is packed, canceled. Instead place a new order!" }

        var requestAssigned = order.assignment.find(ass => ass.req_id == reqBodyRequest[0]._id && (ass.status === 'Assigned' || ass.status === 'Accepted') && ass.type === 'Request')

        if (requestAssigned) {
            var handler = currentHandlers.find(handler => handler._id == requestAssigned.employeeId)
            if (handler) {
                handler.currentAssignments = handler.currentAssignments + 1

                order.assignment[order.assignment.length] = {
                    receiptNum: isPlaceOrPrepareReq.receiptNum,
                    type: 'Request',
                    date: isPlaceOrPrepareReq.creation_date,
                    status: 'Accepted',
                    employeeId: requestAssigned.employeeId,
                    employeeName: requestAssigned.employeeName
                }
            }
        } else {
            order.assignment[order.assignment.length] = {
                receiptNum: isPlaceOrPrepareReq.receiptNum,
                type: 'Request',
                date: isPlaceOrPrepareReq.creation_date,
                status: 'Unassigned',
            }
        }

        //currentHandlers.save()
        order.request = reqBodyRequest

    } else return false

    return { request: order.request, assignment: order.assignment }
}

const requestQtyCalc = (request) => {
    var qty = 0
    request.cart.items.map(item => {
        qty = qty + item.qty
    })
    return parseFloat(qty).toFixed(2)
}

const amountCalc = (order, request) => {
    var amount = 0
    var allPlaceRequestsAreCanceled = true

    order.request.map(req => {
        if (req.status === 'Confirmed' || req.status === 'Completed') {
            if (order.request[0].status !== 'Pending')
                amount = amount + parseFloat(req.amount)

        } else if (req.status === 'Rejected' || req.status === 'Canceled')
            if (req._id !== request._id) amount = amount + parseFloat(req.amount)

        if (req.type === 'Cancel' && order.request[req.modifiedRequestNum - 1].status !== 'Canceled') allPlaceRequestsAreCanceled = false
    })
    if (allPlaceRequestsAreCanceled) return 0
    return amount.toFixed(2)
}

const setActive = (order) => {
    const uncompleted = order.request.find(req => req.status !== 'Completed' && req.status !== 'Rejected' && req.status !== 'Canceled')
    if (uncompleted) order.active = true
    else order.active = false
}

const requestStatusModifier = (req) => {
    if (req.cart.status === 'Packed' && ((req.delivery && req.delivery.status) ? req.delivery.status === 'Delivered' : true) && req.payment.status === 'Collected')
        req.status = 'Completed'
    else if (req.cart.status === 'Canceled' && (req.delivery.status ? req.delivery.status === 'Canceled' : true) && req.payment.status === 'Canceled')
        req.status = 'Canceled'
    else if (req.cart.status === 'Unpacked' && (req.delivery.status ? req.delivery.status === 'Returned' : true) && (req.payment.status === 'Refunded' || req.payment.status === 'Canceled'))
        req.status = 'Completed'
}

const statusModifier = (req, order) => {
    if (req.status === 'Pending') {
        req.cart.status = 'Pending'
        if (req.payment.status !== 'Collected') req.payment.status = 'Pending'
        if (req.delivery.status) req.delivery.status = 'Pending'

    } else if (req.status === 'Canceled') {// assign or reassign
        req.cart.status = 'Canceled'
        if (req.payment.status !== 'Collected') req.payment.status = 'Canceled'
        if (req.delivery.status) req.delivery.status = 'Canceled'

    } else if (req.status === 'Completed') {// assign or reassign
        if (req.type === 'Place' || req.type === 'Prepare') {

            req.cart.status = 'Packed'
            req.payment.status = 'Collected'
            if (req.delivery.status) req.delivery.status = 'Delivered'

        } else if (req.type === 'Return' || req.type === 'Cancel') {

            req.cart.status = 'Unpacked'
            req.payment.status = 'Refunded'
            var modifiedReq = order.request[req.modifiedRequestNum - 1]
            if (req.type === 'Cancel')
                if (modifiedReq.payment.status === 'Collected')
                    req.payment.status = 'Refunded' // if payment status of canceled request is collected ==> refunded, else canceled
                else req.payment.status = 'Uncollected'
            if (req.delivery.status) req.delivery.status = 'Returned'
        }

    } else if (req.status === 'Rejected') {
        req.cart.status = 'Unpacked'
        if (req.payment.status !== 'Collected') req.payment.status = 'Uncollected'
        if (req.delivery.status) req.delivery.status = 'Undelivered'
    }
}

const statusApproval = (order, req_id, type, status) => {
    var obj
    const verifiedConditions = (ass => { return ass.status !== 'Canceled' && ass.status !== 'Rejected' && ass.status !== 'Closed' && ass.status !== 'Completed' })
    const requestAss = order.assignment.find(ass => ass.req_id == req_id && verifiedConditions(ass)) || {}
    const cartAss = order.assignment.find(ass => ass.req_id == req_id && verifiedConditions(ass)) || {}
    const paymentAss = order.assignment.find(ass => ass.req_id == req_id && verifiedConditions(ass)) || {}
    const deliveryAss = order.assignment.find(ass => ass.req_id == req_id && verifiedConditions(ass)) || {}

    order.request.map(req => {
        if (req._id == req_id) {
            if (status === 'Progress') {
                if (req.type !== 'Return') {
                    if (order.request.indexOf(req) === 0) { // if rest requests are completed current request could be set progress
                        var otherUncompletedReq = false
                        order.request.map(req0 => {
                            if (req0._id != req._id && req0.type != 'Return' && req0.status !== 'Completed' && req0.status !== 'Canceled' && req0.status !== 'Rejected') {
                                otherUncompletedReq = true
                                return
                            }
                        })
                        if (otherUncompletedReq) {
                            obj = { approval: false, status: "You should complete other cancel and place requests of this order before!" }
                            return
                        }
                    }
                }
                obj = { approval: true }
            }

            else if (req.type === 'Cancel') {
                // status can't be changed before confirming first request
                if (order.request.indexOf(req) === 0 || order.request[0].status !== 'Pending') {

                    if (type === 'Request') {
                        if (status === 'Pending')
                            obj = { approval: false, status: "You can't reset status to Pending!" }

                        else if (status === 'Completed') {
                            if (req.cart.status === 'Unpacked' && (req.payment.status === 'Refunded' || req.payment.status === 'Uncollected'))
                                obj = { approval: false, status: "You can't set status Completed, before completing cart and payment!" }
                            else obj = { approval: true }

                        } else if (status === 'on Hold')
                            obj = { approval: false, status: "You can't set a cancel request on Hold!" }
                        else obj = { approval: true }

                    } else if (type === 'Cart') {
                        if (status === 'Pending' || status === 'on Hold' || status === 'Canceled' || status === 'Unpacked') {
                            if (req.status === 'Confirmed')
                                obj = { approval: true }
                            else obj = { approval: false, status: "You can't change status before confirming request!" }
                        } else obj = { approval: false, status: "You can't set status " + status + " if request type is Cancel!" }

                    } else if (type === 'Payment') {
                        if (order.request[req.modifiedRequestNum - 1].payment.status === 'Collected') {
                            if (status === 'Canceled') obj = { approval: false, status: "You can't cancel collected payment! Instead it must be refunded." }
                            else if (status === 'Refunded') obj = { approval: true }
                            else if (status === 'Uncollected') obj = { approval: false, status: "You can't set payment uncollected. Instead set payment canceled" }
                        } else {
                            if (status === 'Canceled') obj = { approval: true }
                            else if (status === 'Refunded') obj = { approval: false, status: "You can't refund uncollected payment! Instead set payment canceled." }
                        }
                    }

                } else obj = { approval: false, status: "You can't change status before confirming related requests!" }
                return
            }
            //////////////////////// Request
            else if (type === 'Request') {
                if (status === req.status) {
                    obj = { approval: false, status: `Status is already set ${status}!` }
                    return
                }

                if (status === 'Pending') {
                    obj = { approval: false, status: "You can't reset status to Pending!" }
                }

                if (status === 'on Hold') {
                    if (req.status === 'Confirmed' && (Object.keys(req.delivery).length === 0 ? req.delivery.status === 'Pending' : true))
                        obj = { approval: true }
                    else obj = { approval: false, status: "You can't set unconfirmed or delivered order on hold!" }
                }

                else if (status === 'Confirmed' && req.status !== 'Completed')
                    obj = { approval: true }

                else if (status === 'Confirmed' && req.status === 'Completed')
                    obj = { approval: false, status: "You can't set request confirmed after being completed!" }

                else if (status === 'Completed') {
                    if (req.type !== 'Return') {
                        if (req.cart.status === 'Packed' && req.payment.status === 'Collected' &&
                            (req.delivery ? req.delivery.status === 'Delivered' : true)) {
                            obj = { approval: true }
                        } else obj = { approval: false, status: "You can't set status completed before completing cart, payment, and delivery!" }
                    } else {
                        if (req.cart.status === 'Unpacked' && req.payment.status === 'Refunded' &&
                            (req.delivery.status ? req.delivery.status === 'Returned' : true)) {
                            obj = { approval: true }
                        } else obj = { approval: false, status: "You can't set status completed before returning items and refunding payment!" }
                    }
                } else if (status === 'Rejected') {
                    if (req.delivery && req.delivery.status === 'Delivered' && req.payment.status === 'Collected')
                        obj = { approval: false, status: "You can't reject a request after delivering items or collecting payment!" }
                    else obj = { approval: true }

                } else if (status === 'Canceled') { // customer canceled a request
                    if (req.cart.status !== 'Packed' && req.payment.status !== 'Collected' &&
                        (req.delivery.status !== 'Delivered' || req.delivery.status !== 'On Road')) obj = { approval: true }
                    else obj = { approval: false, status: "You can't cancel a request after being packed, delivered, or paid!" }
                }

            } else if (req.status === 'Confirmed') {
                if (requestAss.onHold) { obj = { approval: false, status: `Request is set On Hold by ${requestAss.employeeName}!` }; return }
                //////////////////////// Cart
                if (type === 'Cart') {
                    if (status === req.cart.status) {
                        obj = { approval: false, status: `Status is already set ${status}!` }
                        return
                    }

                    if (status === 'Pending')
                        if (cartAss.onHold)
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't reset status to Pending!" }

                    else if (status === 'Confirmed') obj = { approval: true }

                    else if (status === 'on Hold') {
                        if (req.cart.status === 'Pending' || req.cart.status === 'Packing')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't hold on packing after being packed, returned, or canceled!" }
                    }

                    else if (status === 'Packing') {
                        if (req.type === 'Return') obj = { approval: false, status: "You can't set status packing in Return request!" }
                        else if (cartAss.onHold || req.cart.status === 'Pending')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't set items packing after being packed, canceled, or returned!" }
                    }

                    else if (status === 'Packed') {/////////////////////////////////
                        if (req.cart.status !== 'Canceled')
                            if (req.type !== 'Return') {
                                if (req.cart.status === 'Packing')
                                    obj = { approval: true }
                                else obj = { approval: false, status: "You can't set items packed before packing!" }
                            } else obj = { approval: false, status: "You can't set status packed in return request!" }
                        else obj = { approval: false, status: "You can't set items packed after being canceled or unpacked!" }
                    }

                    else if (status === 'Canceled') {
                        if (req.cart.status === 'Pending' || cartAss.onHold || req.cart.status === 'Packing')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't cancel items after being packed, delivered, or paid!" }
                    }

                    else if (status === 'Unpacked') {
                        if (req.cart.status === 'Pending' && (req.delivery.status ? req.delivery.status === 'Returned' : true)) obj = { approval: true }
                        else obj = { approval: false, status: "You can't set items unpacked before it is returned!" }
                    }

                    //////////////////////// Payment
                } else if (type === 'Payment') {
                    if (status === req.payment.status) {
                        obj = { approval: false, status: `Status is already set ${status}!` }
                        return
                    }

                    if (status === 'Pending')
                        if (paymentAss.onHold)
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't reset status to Pending!" }

                    else if (status === 'Confirmed') obj = { approval: true }

                    else if (status === 'on Hold') {
                        if (req.payment.status === 'Pending' || paymentAss.onHold)
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't hold on payment after being collected, canceled, or refunded!" }
                    }

                    else if (status === 'Collected') {
                        const aCancelRequestExist = order.request.find(req => req.type === 'Cancel')
                        if (aCancelRequestExist) {
                            if (aCancelRequestExist.payment.status === 'Uncollected') obj = { approval: true }
                            else obj = { approval: false, status: "You can't set payment collected before deducting (set Uncollected) the canceled amount of related request!" }

                        } else if (req.payment.status === 'Canceled' || req.payment.status === 'Refunded')
                            obj = { approval: false, status: "You can't set payment collected after being canceled or refunded!" }
                        else obj = { approval: true }
                    }

                    else if (status === 'Uncollected') {
                        if (req.type === 'Cancel')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't set payment uncollected in a place or a prepare order type!" }
                    }

                    else if (status === 'Canceled') {
                        if (req.payment.status === 'Collected' || req.payment.status === 'Refunded')
                            obj = { approval: false, status: "You can't set payment uncollected after being collected or refunded!" }
                        else obj = { approval: true }
                    }

                    else if (status === 'Refunded') {
                        if ((req.delivery.status ? req.delivery.status === 'Returned' : req.cart.status === 'Unpacked')
                            && req.payment.status === 'Pending')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't set payment refunded before unpacking items!" }
                    }

                    //////////////////////// Delivery
                } else if (type === 'Delivery' && req.delivery) {
                    if (status === req.delivery.status) {
                        obj = { approval: false, status: `Status is already set ${status}!` }
                        return
                    }

                    if (status === 'Pending')
                        if (deliveryAss.onHold)
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't reset status to Pending!" }

                    else if (status === 'Confirmed') obj = { approval: true }

                    else if (status === 'on Hold') {
                        if (req.delivery.status === 'Pending') // if delivery is on road it cant be set on Hold
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't hold on delivery after being delivered, canceled, or returned!" }
                    }

                    else if (status === 'On Road') {
                        const unCompletedCart = order.request.find(req => req.cart.status === 'Pending' || req.cart.status === 'on Hold' || req.cart.status === 'Packing')
                        if (unCompletedCart) obj = { approval: false, status: "You can't set delivery on road. There exist other cart items that are not canceled or packed yet!" }
                        else if (req.delivery.status === 'Pending' && (req.type === 'Return' ? true : req.cart.status === 'Packed')) // if delivery is on road it cant be set on Hold
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't set delivery on road before being packed or after being delivered, canceled, or returned!" }
                    }

                    else if (status === 'Delivered') {
                        const unCompletedCart = order.request.find(req => req.cart.status === 'Pending' || req.cart.status === 'on Hold' || req.cart.status === 'Packing')
                        if (unCompletedCart) obj = { approval: false, status: "You can't set order delivered. There exist other cart items that are not canceled or packed yet!" }
                        if (req.delivery.status === 'Canceled' || req.delivery.status === 'Returned')
                            obj = { approval: false, status: "You can't deliver items after being canceled or returned!" }
                        else if (req.cart.status !== 'Packed')
                            obj = { approval: false, status: "You can't deliver unpacked items!" }
                        else if (req.delivery.status !== 'On Road')
                            obj = { approval: false, status: "You can't set items delivered before seting on Road!" }
                        else obj = { approval: true }
                    }

                    else if (status === 'Undelivered') {
                        if (req.delivery.status === 'Delivered' || req.delivery.status === 'Returned')
                            obj = { approval: false, status: "You can't set an order undelivered after being delivered or returned!" }
                        else obj = { approval: true }
                    }

                    else if (status === 'Canceled') {
                        if (req.delivery.status === 'Delivered' || req.delivery.status === 'Returned')
                            obj = { approval: false, status: "You can't cancel a delivery after being delivered or returned!" }
                        else obj = { approval: true }
                    }

                    else if (status === 'Returned') {
                        if (req.delivery.status === 'Pending' || deliveryAss.onHold || req.delivery.status === 'On Road')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't set a delivery returned after being canceled or delivered!" }
                    }

                }
            } else if (req.status === 'Canceled' || req.status === 'Rejected' || req.status === 'Completed')
                obj = { approval: false, status: "You can't change status after completing, rejecting, or canceling request!" }

            else obj = { approval: false, status: "You can't change status before confirming request!" }
        }
        if (obj) return
    })
    return obj
}

const assignmentStatusModifier = (request, order, currentHandlers) => {
    const conditions = (ass) => {
        return (ass.req_id == request._id || ass.receiptNum == request.receiptNum) && !ass.closedDate &&
            (ass.status === 'Pending' || ass.status === 'Accepted' || ass.status === 'Unassigned' || ass.status === 'Assigned')
    }

    if (request.status === 'Pending' || request.status === 'Confirmed' || request.status === 'on Hold') {
        var requestHandler = order.assignment.find(ass => conditions(ass) && ass.type === 'Request')
        var cartHandler = order.assignment.find(ass => conditions(ass) && ass.type === 'Cart')
        var paymentHandler = order.assignment.find(ass => conditions(ass) && ass.type === 'Payment')
        var deliveryHandler = order.assignment.find(ass => conditions(ass) && ass.type === 'Delivery')

        if (!requestHandler)
            order.assignment[order.assignment.length] = {
                req_id: request._id,
                type: 'Request',
                date: request.cart.prepareOn,
                status: 'Unassigned',
            }

        if (request.status === 'Confirmed' || request.status === 'on Hold') {

            if (!cartHandler && request.cart.status !== 'Packed' && request.cart.status !== 'Unpacked' && request.cart.status !== 'Canceled') {// create new
                const accomplishedCartHandler = order.assignment.find(ass => (ass.req_id == request._id || ass.receiptNum == request.receiptNum) && ass.type === 'Cart' && ass.status === 'Accomplished')

                if (accomplishedCartHandler) {
                    accomplishedCartHandler.closedDate = undefined
                    accomplishedCartHandler.status = 'Accepted'
                    accomplishedCartHandler.onHold = false
                    accomplishedCartHandler.date = date()

                } else if (order.request[0].status !== 'Pending')
                    order.assignment[order.assignment.length] = {
                        req_id: request._id,
                        type: 'Cart',
                        date: request.cart.prepareOn,
                        status: 'Unassigned',
                    }
            }

            if (!paymentHandler && request.payment.status !== 'Collected' && request.payment.status !== 'Refunded') {
                const accomplishedPayHandler = order.assignment.find(ass => (ass.req_id == request._id || ass.receiptNum == request.receiptNum) && ass.type === 'Payment' && ass.status === 'Accomplished')

                if (accomplishedPayHandler) {
                    accomplishedPayHandler.closedDate = undefined
                    accomplishedPayHandler.status = 'Accepted'
                    accomplishedPayHandler.onHold = false

                } else if (order.request[0].status !== 'Pending')
                    order.assignment[order.assignment.length] = {
                        req_id: request._id,
                        type: 'Payment',
                        date: request.payment.collectOn,
                        status: 'Unassigned',
                    }
            }

            if (!deliveryHandler && request.delivery.status && request.delivery.status !== 'Delivered' && request.delivery.status !== 'Returned')
                if (order.request[0].status !== 'Pending')
                    order.assignment[order.assignment.length] = {
                        req_id: request._id,
                        type: 'Delivery',
                        date: request.delivery.deliverOn,
                        status: 'Unassigned',
                    }

            if (deliveryHandler) {
                // set all delivery handlers the same status
                if (request.delivery.status === 'On Road' || request.delivery.status === 'Delivered') {
                    const sameHandler = order.assignment.filter(ass => ass.type === 'Delivery' && (ass.employeeId == deliveryHandler.employeeId || ass.status === 'Unassigned') && !ass.closedDate)
                    order.request.map(req => {
                        if (req.type !== 'Return' && req.type !== 'Cancel' && req._id !== request._id) {
                            req.delivery.status = request.delivery.status
                        }
                    })
                    if (sameHandler.length > 0) {
                        sameHandler.map(ass => {
                            ass.status = deliveryHandler.status
                        })
                    }
                }
            }
        }
    }

    order.assignment.map(ass => {
        if (request._id == ass.req_id || request.receiptNum == ass.receiptNum) {
            if (ass.status !== 'Canceled' && ass.status !== 'Rejected' && ass.status !== 'Accomplished') {
                ass.closedDate = undefined
                if (ass.type === 'Request') {
                    if (request.status === 'Completed') {
                        ass.status = 'Accomplished'
                        if (ass.closedDate) ass.closedDate = date()

                    } else if (request.status === 'Rejected' || request.status === 'Canceled') {
                        order.assignment.map(ass0 => { // cancel all assignments
                            if (ass0.req_id == request._id) {
                                ass0.closedDate = date()
                                ass0.status = 'Canceled'
                            }
                        })
                    }

                } else if (ass.type === 'Cart') {
                    if (request.cart.status === 'Packed' || request.cart.status === 'Unpacked') {
                        ass.status = 'Accomplished'
                        ass.closedDate = date()
                    } else if (request.cart.status === 'Canceled') {
                        ass.status = 'Canceled'
                        ass.closedDate = date()
                        /*var handler = currentHandlers.find(handler => handler._id == ass.employeeId)
                        if (handler) {
                            handler.currentAssignments = handler.currentAssignments - 1
                            handler.save()
                        }*/
                    }
                } else if (ass.type === 'Payment') {
                    if (request.payment.status === 'Collected' || request.payment.status === 'Refunded') {
                        ass.status = 'Accomplished'
                        ass.closedDate = date()
                        /*if (!ass.employeeId) {
                            const requestHandler = order.assignment.find(ass0 => (ass0.req_id == request._id || ass0.receiptNum == request.receiptNum) && ass.type === 'Request' && ass.status !== 'Canceled' && )
                        }*/
                    } else if (request.payment.status === 'Canceled') {
                        ass.status = 'Canceled'
                        ass.closedDate = date()
                    }
                } else if (ass.type === 'Delivery') {
                    if (request.delivery.status === 'Delivered' || request.delivery.status === 'Returned') {
                        ass.status = 'Accomplished'
                        ass.closedDate = date()
                    } else if (request.delivery.status === 'Canceled') {
                        ass.status = 'Canceled'
                        ass.closedDate = date()
                    }
                }
                if (conditions(ass)) {
                    if (request.status === 'on Hold') ass.onHold = true
                    else ass.onHold = undefined
                }
            } else if (request.status === 'Canceled' || request.status === 'Rejected') {
                ass.status = 'Canceled'
                ass.closedDate = date()
            }
        }
    })

}

const moveAssToSameHandler = (order, type, req_id) => {
    // get unassinged and assign them
    order.assignment.map(ass0 => {
        if (!ass0.status) ass0 = undefined
        if (ass0.status === 'Unassigned') {
            const assigned = order.assignment.find(ass => ass && (ass.status === 'Assigned' || ass.status === 'Accepted') && ass.type == ass0.type)
            if (assigned) {
                ass0.employeeName = assigned.employeeName
                ass0.employeeId = assigned.employeeId
                ass0.status = 'Accepted'
            }
        }
    })

    // merge delivery values to the original request
    if (type && type === 'Request') {
        const getRequest = order.request.find(req => req._id == req_id)
        const mainRequest = order.request[0]
        if (mainRequest.delivery) {
            mainRequest.delivery.deliverOn = getRequest.delivery.deliverOn
            mainRequest.delivery.duration = getRequest.delivery.duration
            mainRequest.delivery.title = getRequest.delivery.title
            if (mainRequest.payment.type === 'Cash')
                mainRequest.payment.collectOn = getRequest.payment.collectOn
        }
    }
}

const setOrderClosed = (order) => {
    var orderIsOpen = order.request.find(req => req.status !== 'Completed' && req.status !== 'Canceled' && req.status !== 'Rejected')
    if (!orderIsOpen) order.closedDate = date()
}

const date = () => {
    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonth = d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1 : d.getMonth() + 1
    var currentDay = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    var currentHour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()

    if (typeof currentMinutes === 'number' && currentMinutes < 10) currentMinutes = '0' + currentMinutes
    if (typeof currentHour === 'number' && currentHour < 10) currentHour = '0' + currentHour
    return currentYear + '-' + currentMonth + '-' + currentDay + 'T' + currentHour + ':' + currentMinutes
}

const holdOnAssignment = (req, request) => {
    const conditions = (ass) => {
        return ass.req_id == req.body.req_id && !ass.closedDate &&
            (ass.status === 'Pending' || ass.status === 'Accepted' || ass.status === 'Unassigned' || ass.status === 'Assigned') &&
            (req.body.type === 'Request' ? true : ass._id == req.body.ass_id)
    }

    if (req.body.status === 'Progress') { // clear on hold
        order.assignment.map(ass => {
            if (ass.onHold && conditions(ass)) {
                ass.onHold = undefined
            }
        })

    } else if (req.body.status === 'on Hold') { // set assignment on Hold
        order.assignment.map(ass => {
            if (conditions(ass)) {
                ass.onHold = true
            }
        })
    }
}

const acceptRejectAssignment = (req, order) => {
    const request = order.request.find(request => request._id == req.body.req_id)

    if (req.body.status === 'Accepted') {
        var assignmentFound = false
        var assignmentType

        order.assignment.map(ass => {
            if (ass._id == req.body.ass_id) {
                assignmentFound = true
                assignmentType = ass.type
                if (ass.status === 'Unassigned' || ass.status === 'Assigned') {
                    ass.receiptNum = undefined
                    ass.req_id = req.body.req_id
                    ass.employeeName = req.body.employeeName
                    ass.employeeId = req.body.employeeId
                    ass.status = req.body.status
                    return
                } else return res.send({ message: 'The order has been assigned. Thank you!' })
            }
        })

        // if there is unassigned assignment and have the same type of the current ==> assign it to the same handler
        if (assignmentFound) {
            const unassignedAss = order.assignment.filter(ass => ass.status !== 'Unassigned' && ass.type == req.body.type)
            if (unassignedAss && unassignedAss.length > 0) {
                unassignedAss.map(unassigned => {
                    order.assignment.map(ass => {
                        if (ass._id == unassigned._id) {
                            ass.employeeId = req.body.employeeId
                            ass.employeeName = req.body.employeeName
                            ass.status = 'Accepted'
                        }
                    })
                })
            }
        }

        const paymentTitle = request.payment.title
        if (assignmentType === 'Delivery' || (assignmentType === 'Payment' && paymentTitle === 'Pay On Delivery')) {
            order.assignment.map(ass => {
                if (ass.req_id == req.body.req_id) {
                    if (ass.status === 'Unassigned' && (ass.type === 'Delivery' || ass.type === 'Payment')) {
                        ass.receiptNum = undefined
                        ass.req_id = req.body.req_id
                        ass.employeeName = req.body.employeeName
                        ass.employeeId = req.body.employeeId
                        ass.status = req.body.status
                    }
                }
            })
        }

        if (!assignmentFound) return res.send({ message: 'The assignment has been deleted!' })

    } else if (req.body.status === 'Rejected') {
        var assignment
        order.assignment.map(ass => {
            if (ass._id == req.body.ass_id) {
                assignment = ass
                ass.status = 'Rejected'
                ass.closedDate = date()
                return
            }
        })

        order.assignment[order.assignment.length] = {
            req_id: req.body.req_id,
            type: assignment.type,
            date: assignment.date,
            status: 'Unassigned',
            employeeName: undefined,
            employeeId: undefined,
            assignedBy: undefined,
            onHold: undefined,
            assignedOn: undefined,
        }
    }
}

const deleteRequestHandler = (order, req) => {
    var deletedRequest, deletedRequestIndex

    order.request.map(deletedReq => { // get deleted request (gets only 1 deleted request)
        var requestFound = false
        req.body.request.map(req => {
            if (deletedReq._id === req._id) {
                requestFound = true
                return
            } else requestFound = false
        })
        if (!requestFound) {
            deletedRequestIndex = order.request.indexOf(deletedReq)
            deletedRequest = deletedReq
            return
        }
    })

    const assignments = order.assignment || undefined
    if (assignments)
        order.assignment = order.assignment.filter(ass =>  // delete assignments
            ass.req_id != deletedRequest._id && ass.receiptNum != deletedRequest.receiptNum
        )

    order.request.splice(deletedRequestIndex, 1) // delete request

    if (deletedRequest.type === 'Cancel') { // set original request assignments in progress
        const modifiedRequestIndex = deletedRequest.modifiedRequestNum - 1
        const modifiedRequest = order.request[modifiedRequestIndex]

        // set assignments in progress
        order.assignment.map(ass => {
            if (ass.req_id == modifiedRequest._id) {
                ass.onHold = undefined
            }
        })
    }

    order.request = req.body.request
}

export default router