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
    order.length > 0 ? res.send(order.reverse()) : res.send(undefined)
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

/*router.post("/getOrder", async (req, res) => {
    const employeeId = req.body.employeeId
    const order = await Order.find({ employeeId: employeeId })
    order.length > 0 ? res.send(order) : res.send(undefined)
});*/

router.post("", isAuth, async (req, res) => {
    req.body.active = setActive(req.body)
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
        date: Date.now() + 7200000,
        status: 'Unassigned',
        //employeeName: requestHandler[0].firstName + ' ' + requestHandler[0].lastName,
        //employeeId: requestHandler[0]._id,
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
            var assignmentFound = false
            order.assignment.map(ass => {
                if (ass._id == req.body.ass_id) {
                    assignmentFound = true
                    if (ass.status === 'Unassigned') {
                        ass.receiptNum = undefined
                        ass.req_id = req.body.req_id
                        ass.employeeName = req.body.employeeName
                        ass.employeeId = req.body.employeeId
                        ass.status = req.body.status
                    } else return res.send({ message: 'The order has been assigned. Thank you!' })
                }
            })

            if (!assignmentFound) return res.send({ message: 'The assignment has been deleted!' })

            if (req.body.status === 'Rejected') {
                order.assignment[order.assignment.length] = {
                    req_id: req.body.req_id,
                    type: 'Request',
                    date: Date.now() + 7200000,
                    status: 'Unassigned',
                }
            }

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
            const time = Date.now() + 7200000

            if (approved) {
                order.request.map(request => {
                    if (request._id == req.body.req_id) {
                        const modifiedRequestIndex = request.modifiedRequestNum - 1

                        if (req.body.type === 'Request') {
                            request.status = req.body.status
                            if (req.body.status === 'Confirmed') { // modify assignment
                                var length = order.assignment.length
                                // set request assignment status = confirmed
                                order.assignment.map(ass => { if (ass.req_id == request._id && ass.type === 'Request' && ass.status === 'Accepted') { ass.status = req.body.status; return } })

                                order.assignment[length] = {
                                    req_id: request._id,
                                    type: 'Cart',
                                    date: time,
                                    status: 'Unassigned',
                                }
                                order.assignment[length + 1] = {
                                    req_id: request._id,
                                    type: 'Payment',
                                    date: time,
                                    status: 'Unassigned',
                                }
                                order.assignment[length + 2] =
                                    request.delivery.status && {
                                        req_id: request._id,
                                        type: 'Delivery',
                                        date: time,
                                        status: 'Unassigned',
                                    }
                            } else if (req.body.status === 'Rejected' || req.body.status === 'Canceled') { // set assignments closed
                                order.assignment.map(ass => { if (ass.req_id == request._id) ass.status = 'Closed' })

                            } else if (req.body.status === 'on Hold') { // set all approved assignments on Hold
                                order.assignment.map(ass => {
                                    if (ass.req_id == request._id && (ass.status === 'Pending' || ass.status === 'Accepted' || ass.status === 'Confirmed')) {
                                        ass.status = 'on Hold'
                                    }
                                })
                            }
                        } else if (req.body.type === 'Cart')
                            request.cart.status = req.body.status
                        else if (req.body.type === 'Delivery')
                            request.delivery.status = req.body.status
                        else if (req.body.type === 'Payment')
                            request.payment.status = req.body.status

                        const updatedStatus = statusModifier(request)
                        request.status = requestStatusModifier(request)
                        request.cart.status = updatedStatus.cartStatus
                        request.payment.status = updatedStatus.payStatus
                        request.delivery.status = request.delivery.status && updatedStatus.delStatus

                        if (request.type === 'Cancel') {
                            if (request.status === 'Confirmed') { // set cancel request and canceled request confirmed
                                order.request[modifiedRequestIndex].status = 'Confirmed'
                                if (order.request[modifiedRequestIndex].cart.status !== 'Packed') {
                                    order.request[modifiedRequestIndex].cart.status = 'on Hold'
                                    order.request[modifiedRequestIndex].payment.status = 'on Hold'
                                    order.request[modifiedRequestIndex].delivery.status =
                                        order.request[modifiedRequestIndex].delivery.status && 'on Hold'
                                }

                                if (request.cart.status === 'Unpacked') {
                                    order.request[modifiedRequestIndex].cart.status = 'Pending'
                                    order.request[modifiedRequestIndex].payment.status = 'Pending'
                                    order.request[modifiedRequestIndex].delivery.status =
                                        order.request[modifiedRequestIndex].delivery.status && 'Pending'
                                }

                            }
                        }

                        request.cart.qty = requestQtyCalc(request)
                        order.amount = amountCalc(order, request)

                        // autoAssigner(order.assignment, request, handlers)

                        return
                    }
                })
                // assign order

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

                    /*order.request = newRequest.request || order.request
                    order.assignment = newRequest.assignment || order.assignment*/

                } else if (req.body.request.length < order.request.length) { // a request is deleted
                    var deletedRequest, deletedRequestIndex

                    order.request.map(deletedReq => { // get deleted request (it gets only 1 deleted request)
                        req.body.request.map(req => {
                            if (deletedReq._id === req._id)
                                return
                            else {
                                deletedRequestIndex = order.request.indexOf(deletedReq)
                                deletedRequest = deletedReq
                            }
                        })
                    })

                    const assignments = order.assignment || undefined
                    assignments && assignments.map(ass => {
                        if (ass.req_id === deletedRequest._id || ass.receiptNum === deletedRequest.receiptNum) {
                            const index = assignments.indexOf(ass)
                            order.assignment.splice(index, 1)
                        }
                    })

                    order.request.splice(deletedRequestIndex, 1)

                    if (deletedRequest.type === 'Cancel') { // cancel Request is deleted
                        const modifiedRequestIndex = deletedRequest.modifiedRequestNum - 1
                        const canceledRequest = order.request[modifiedRequestIndex]
                        order.request = req.body.request

                        // if on hold status => set status pending
                        if (canceledRequest.status === 'on Hold' || canceledRequest.status === 'Canceled') {
                            /*if (order.request[modifiedRequestIndex].assigned) {
                                order.request[modifiedRequestIndex].status = 'Confirmed'
                                order.request[modifiedRequestIndex].cart.status = 'Pending'
                                order.request[modifiedRequestIndex].payment.status = 'Pending'
                                order.request[modifiedRequestIndex].delivery.status =
                                    canceledRequest.delivery.status && 'Pending'
                            } else*/ order.request[modifiedRequestIndex].status = 'Pending'
                        }

                    } else if (deletedRequest.type === 'Return') { // return Request is deleted
                        //const modifiedRequestIndex = deletedRequest.modifiedRequestNum - 1
                        //const returnedRequest = order.request[modifiedRequestIndex]
                        order.request = req.body.request
                    }

                } else if (req.body.request.length > 0) {

                    if (req.body.request.length === 1 && // check if a prepare of place request exists
                        (req.body.request[0].type !== 'Place' && req.body.request[0].type !== 'Prepare')) {
                        return res.status(200).send({
                            message: "Order must have at least 1 place or prepare request"
                        })
                    }

                    req.body.request.map(request => {

                        if (request.type === 'Cancel') {
                            var setOrderActive
                            const modifiedRequestIndex = request.modifiedRequestNum - 1
                            const canceledRequest = order.request[modifiedRequestIndex]
                            /*const canceledItems = request.cart.items.map(item => {
                                return { _id: item._id, qty: item.qty }
                            })*/

                            var requsetIndex
                            order.request.map(req => {
                                if (req._id == request._id) {
                                    requsetIndex = order.request.indexOf(req)
                                    return
                                }
                            })

                            order.request[requsetIndex] = request

                            /*var allItemsAreCanceled = true
                            var newCanceledItems = []

                            if (canceledItems.length > canceledRequest.cart.items.length) {
                                canceledItems.map(canceledItem => {
                                    var newCanceledItem
                                    newCanceledItem = canceledRequest.cart.items.find(item =>
                                        item._id === canceledItem._id)
                                    if (!newCanceledItem) {
                                        newCanceledItems = [...newCanceledItems,
                                        { _id: canceledItem._id, qty: canceledItem.qty }]
                                    }
                                })
                            }

                            order.request[modifiedRequestIndex].cart.items.map(item => {
                                var canceledItemExist = true

                                newCanceledItems.length > 0 &&
                                    newCanceledItems.map(newCanceledItem => {
                                        if (newCanceledItem._id === item._id) {
                                            canceledItemExist = false
                                            if (item.qty === item.canceledQty)
                                                allItemsAreCanceled = [...allItemsAreCanceled, true]
                                            else allItemsAreCanceled = [...allItemsAreCanceled, false]
                                            return
                                        }
                                    })

                                if (canceledItemExist) {
                                    canceledItems.map(canceledItem => {
                                        if (item._id === canceledItem._id) {
                                            if (canceledItem.qty < item.qty) {
                                                setOrderActive = true
                                                allItemsAreCanceled = false
                                            }
                                            return
                                        }
                                    })
                                }
                            })*/

                            var allItemsAreCanceled = true

                            canceledRequest.cart.map(item => {
                                request.cart.map(item0 => {
                                    if (item0._id == item._id && item0.qty != item.qty) {
                                        allItemsAreCanceled = false
                                        return
                                    }
                                })
                            })

                            if (allItemsAreCanceled) {
                                if (canceledRequest.delivery.status)
                                    order.request[modifiedRequestIndex].delivery.status = 'Canceled'

                                if (canceledRequest.payment.type === 'Cash')
                                    order.request[modifiedRequestIndex].payment.status = 'Canceled'

                                order.request[modifiedRequestIndex].cart.status = 'Canceled'
                                order.request[modifiedRequestIndex].status = 'Canceled'
                                order.assignment.map(ass => {
                                    if (ass.req_id == canceledRequest._id) ass.status = 'Canceled'
                                })
                            } else {
                                if (canceledRequest.status === 'Canceled') {
                                    /*var requestAssigned = order.assignment.find(ass => ass.req_id == canceledRequest._id && ass.type === 'Request' && ass.status !== 'Rejected' && ass.status !== 'Canceled')
                                    var cartAssigned = order.assignment.find(ass => ass.req_id == canceledRequest._id && ass.type === 'Cart' && ass.status !== 'Rejected' && ass.status !== 'Canceled')
                                    var paymentAssigned = order.assignment.find(ass => ass.req_id == canceledRequest._id && ass.type === 'Payment' && ass.status !== 'Rejected' && ass.status !== 'Canceled')
                                    var deliveryAssigned = order.assignment.find(ass => ass.req_id == canceledRequest._id && ass.type === 'Delivery' && ass.status !== 'Rejected' && ass.status !== 'Canceled')*/

                                    /*if (requestAssigned) {
                                        order.request[modifiedRequestIndex].status = 'Confirmed'
                                        order.request[modifiedRequestIndex].cart.status = 'Pending'
                                        order.request[modifiedRequestIndex].payment.status = 'Pending'
                                        order.request[modifiedRequestIndex].delivery.status =
                                            canceledRequest.delivery.status && 'Pending'
                                    } else */order.request[modifiedRequestIndex].status = 'Pending'
                                    order.assignment[order.assignment.length] = {
                                        req_id: canceledRequest._id,
                                        type: 'Request',
                                        date: Date.now() + 7200000,
                                        status: 'Unassigned',
                                    }
                                }
                            }
                        } else if (request.type === 'Return') {
                            /*const modifiedRequestIndex = request.modifiedRequestNum - 1
                            const returnedItems = request.cart.items.map(item => {
                                return { _id: item._id, qty: item.qty }
                            })*/

                            // get return request index
                            var requsetIndex
                            order.request.map(req => {
                                if (req._id == request._id) {
                                    requsetIndex = order.request.indexOf(req)
                                    order.request[requsetIndex] = request
                                    return
                                }
                            })

                            /*order.request[modifiedRequestIndex].cart.items.map(item => {
                                var returnItemExist = true

                                // edit previous returned items
                                if (item.returned === true && returnItemExist) {
                                    var itemFound = false
                                    returnedItems.map(returnedItem => {
                                        if (item._id === returnedItem._id) {
                                            itemFound = true
                                            if (returnedItem.qty < item.qty) {
                                                setOrderActive = true
                                            }
                                            return
                                        }
                                    })
                                }
                            })*/
                        } else {
                            var requsetIndex
                            order.request.map(req => {
                                if (req._id == request._id) {
                                    requsetIndex = order.request.indexOf(req)
                                    order.request[requsetIndex] = request
                                    return
                                }
                            })
                        }
                        request.cart.qty = requestQtyCalc(request)
                    })

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

            order.request.map(request => {
                const updatedStatus = statusModifier(request)
                request.status = requestStatusModifier(request)
                request.cart.status = updatedStatus.cartStatus
                request.payment.status = updatedStatus.payStatus
                if (request.delivery)
                    request.delivery.status = request.delivery.status && updatedStatus.delStatus

                if (req.type === 'Confirmed') {

                } else if (req.type === 'Canceled' || req.type === 'Rejected') {
                    order.assignment.map(ass => {
                        if (ass.req_id == req._id && ass.status !== 'Rejected' && ass.status !== 'Canceled') {
                            ass.status = 'Canceled'
                            currentHandlers.map(handler => {
                                if (handler._id == ass.employeeId)
                                    handler.currentAssignments = handler.currentAssignments - 1
                            })
                        }
                    })
                }
                // autoAssigner(order.assignment, request, handlers)
                order.amount = amountCalc(order, request)
            })
        }
        order.active = setActive(order)
    }

    const orderUpdated = await order.save()
    if (orderUpdated) {
        return res.status(200).send({ message: "Order has been updated!", data: orderUpdated })
    }
    return res.status(500).send({
        message: "Error in updating order!"
    })
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

const newRequestHandler = (order, reqBodyRequest, currentHandlers) => {
    const time = Date.now() + 7200000
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
        const status = reqBodyRequest[canceledRequestIndex].status
        const cartStatus = reqBodyRequest[canceledRequestIndex].cart.status

        if (cartStatus === 'Pending' || cartStatus === 'on Hold' || cartStatus === 'Packing') {

            if (status === 'Confirmed') {
                isCancelRequest.cart.status = 'Unpacked'
                isCancelRequest.status = 'Confirmed'
                if (canceledRequest.payment.type === 'Cash')
                    isCancelRequest.payment.status = 'Uncollected'
                if (canceledRequest.delivery.status)
                    isCancelRequest.delivery.status = 'Undelivered'

                isCancelRequest = isCancelRequest.save()

                var requestAssigned = order.assignment.find(ass => ass.req_id == canceledRequest._id && (ass.status === 'Pending' || ass.status === 'Accepted' || ass.status === 'Unassigned') && ass.type === 'Request')
                var cartAssigned = order.assignment.find(ass => ass.req_id == canceledRequest._id && (ass.status === 'Pending' || ass.status === 'Accepted') && ass.type === 'Cart')
                var paymentAssigned = order.assignment.find(ass => ass.req_id == canceledRequest._id && (ass.status === 'Pending' || ass.status === 'Accepted') && ass.type === 'Payment')

                if (requestAssigned && requestAssigned.status !== 'Unassigned') {
                    var handler = currentHandlers.find(handler => handler._id == requestAssigned.employeeId)
                    if (handler) {
                        handler.currentAssignments = handler.currentAssignments + 1
                        handler.save()

                        order.assignment[order.assignment.length] = {
                            receiptNum: isCancelRequest.receiptNum,
                            type: 'Request',
                            date: time,
                            status: 'Pending',
                            employeeId: requestAssigned.employeeId,
                            employeeName: requestAssigned.employeeName
                        }
                    }
                } else if (requestAssigned && requestAssigned.status === 'Unassigned') {
                    order.assignment[order.assignment.length] = {
                        receiptNum: isCancelRequest.receiptNum,
                        type: 'Request',
                        date: time,
                        status: 'Unassigned',
                    }

                } else if (!requestAssigned) {
                    order.assignment[order.assignment.length] = {
                        req_id: canceledRequest._id,
                        type: 'Request',
                        date: time,
                        status: 'Unassigned',
                    }
                    order.assignment[order.assignment.length] = {
                        receiptNum: isCancelRequest.receiptNum,
                        type: 'Request',
                        date: time,
                        status: 'Unassigned',
                    }
                }

                if (cartAssigned) {
                    var handler = currentHandlers.find(handler => handler._id == cartAssigned.employeeId)
                    if (handler) {
                        handler.currentAssignments = handler.currentAssignments + 1
                        handler.save()

                        order.assignment[order.assignment.length] = {
                            receiptNum: isCancelRequest.receiptNum,
                            type: 'Cart',
                            date: time,
                            status: 'Pending',
                            employeeId: cartAssigned.employeeId,
                            employeeName: cartAssigned.employeeName
                        }
                    }
                } /*else if (cartAssigned && cartAssigned.status === 'Unassigned') {
                    order.assignment[order.assignment.length] = {
                        req_id: req._id,
                        type: 'Cart',
                        date: time,
                        status: 'Unassigned',
                    }
                }*/

                if (paymentAssigned) { // note that in case payment is done online, there is no payment assigned. therefore for refund there should be a payment handler
                    var handler = currentHandlers.find(handler => handler._id == paymentAssigned.employeeId)
                    if (handler) {
                        handler.currentAssignments = handler.currentAssignments + 1
                        handler.save()

                        order.assignment[order.assignment.length] = {
                            receiptNum: isCancelRequest.receiptNum,
                            type: 'Payment',
                            date: time,
                            status: 'Pending',
                            employeeId: paymentAssigned.employeeId,
                            employeeName: paymentAssigned.employeeName
                        }
                    }
                } /*else {
                    order.assignment[order.assignment.length] = {
                        req_id: req._id,
                        type: 'Payment',
                        date: time,
                        status: 'Unassigned',
                    }
                }*/
            }

            // total request is canceled
            if (isCancelRequest.amount * (-1) === canceledRequest.amount) {
                if (canceledRequest.delivery.status)
                    canceledRequest.delivery.status = 'Canceled'

                if (canceledRequest.payment.type === 'Cash')
                    canceledRequest.payment.status = 'Canceled'

                canceledRequest.cart.status = 'Canceled'
                canceledRequest.status = 'Canceled'

                order.assignment.map(ass => {
                    if (ass.req_id == canceledRequest._id) {
                        ass.status = 'Canceled'
                        var handler = currentHandlers.find(handler => handler._id == ass.employeeId)
                        if (handler) {
                            handler.currentAssignments = handler.currentAssignments - 1
                            handler.save()
                        }
                    }
                })
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

        if (status !== 'Completed' && (status === 'Confirmed' && cartStatus !== 'Packed'))
            return { approval: false, message: "You can't return an unpacked request. Instead request a cancel order" }
        else if (status === 'Canceled')
            return { approval: false, message: "You can't return a canceled request" }
        else order.request = reqBodyRequest

        order.assignment[order.assignment.length] = { // add new request assignment
            receiptNum: isReturnRequest.receiptNum,
            type: 'Request',
            date: time,
            status: 'Unassigned',
        }

    } else if (isPlaceOrPrepareReq) {
        if (isPlaceOrPrepareReq.cart.qty === 0)
            return { approval: false, message: "Any request must contain at least 1 item" }
        else if (isPlaceOrPrepareReq.type !== order.request[0].type)
            return { approval: false, message: "You can't make a place and a prepare request in the same order at the same time. Instead place a new order" }

        const cartStatus = reqBodyRequest[0].cart.status
        if (cartStatus === 'Packed' || cartStatus === 'Canceled' || cartStatus === 'Rejected')
            return { approval: false, message: "You can't add items to cart after it is packed, canceled, or rejected. Place a new order" }
        else {
            if (isPlaceOrPrepareReq.delivery) isPlaceOrPrepareReq.delivery.charge = 0
            reqBodyRequest[0].deliverOn = isPlaceOrPrepareReq.deliverOn
            reqBodyRequest[0].duration = isPlaceOrPrepareReq.duration
            reqBodyRequest[0].title = isPlaceOrPrepareReq.title
        }

        var requestAssigned = order.assignment.find(ass => ass.req_id == reqBodyRequest[0]._id && (ass.status === 'Pending' || ass.status === 'Accepted') && ass.type === 'Request')
        var cartAssigned = order.assignment.find(ass => ass.req_id == reqBodyRequest[0]._id && (ass.status === 'Pending' || ass.status === 'Accepted') && ass.type === 'Cart')
        var paymentAssigned = order.assignment.find(ass => ass.req_id == reqBodyRequest[0]._id && (ass.status === 'Pending' || ass.status === 'Accepted') && ass.type === 'Payment')
        var deliveryAssigned = order.assignment.find(ass => ass.req_id == reqBodyRequest[0]._id && (ass.status === 'Pending' || ass.status === 'Accepted') && ass.type === 'Delivery')

        if (requestAssigned) {
            var handler = currentHandlers.find(handler => handler._id == requestAssigned.employeeId)
            if (handler) {
                handler.currentAssignments = handler.currentAssignments + 1
                handler.save()

                order.assignment[order.assignment.length] = {
                    receiptNum: isPlaceOrPrepareReq.receiptNum,
                    type: 'Request',
                    date: time,
                    status: 'Pending',
                    employeeId: requestAssigned.employeeId,
                    employeeName: requestAssigned.employeeName
                }
            }
        } else {
            order.assignment[order.assignment.length] = {
                receiptNum: isPlaceOrPrepareReq.receiptNum,
                type: 'Request',
                date: time,
                status: 'Unassigned',
            }
        }

        if (cartAssigned) {
            var handler = currentHandlers.find(handler => handler._id == cartAssigned.employeeId)
            if (handler) {
                handler.currentAssignments = handler.currentAssignments + 1
                handler.save()

                order.assignment[order.assignment.length] = {
                    receiptNum: isPlaceOrPrepareReq.receiptNum,
                    type: 'Cart',
                    date: time,
                    status: 'Pending',
                    employeeId: cartAssigned.employeeId,
                    employeeName: cartAssigned.employeeName
                }
            }
        } /*else {
            order.assignment[order.assignment.length] = {
                req_id: req._id,
                type: 'Cart',
                date: time,
                status: 'Unassigned',
            }
        }*/

        if (paymentAssigned) { // note that in case payment is done online, there is no payment assigned. therefore for refund there should be a payment handler
            var handler = currentHandlers.find(handler => handler._id == paymentAssigned.employeeId)
            if (handler) {
                handler.currentAssignments = handler.currentAssignments + 1
                handler.save()

                order.assignment[order.assignment.length] = {
                    receiptNum: isPlaceOrPrepareReq.receiptNum,
                    type: 'Payment',
                    date: time,
                    status: 'Pending',
                    employeeId: paymentAssigned.employeeId,
                    employeeName: paymentAssigned.employeeName
                }
            }
        } /*else {
            order.assignment[order.assignment.length] = {
                req_id: req._id,
                type: 'Payment',
                date: time,
                status: 'Unassigned',
            }
        }*/

        if (deliveryAssigned) { // note that in case payment is done online, there is no payment assigned. therefore for refund there should be a payment handler
            var handler = currentHandlers.find(handler => handler._id == deliveryAssigned.employeeId)
            if (handler) {
                handler.currentAssignments = handler.currentAssignments + 1
                handler.save()

                order.assignment[order.assignment.length] = {
                    receiptNum: isPlaceOrPrepareReq.receiptNum,
                    type: 'Delivery',
                    date: time,
                    status: 'Pending',
                    employeeId: deliveryAssigned.employeeId,
                    employeeName: deliveryAssigned.employeeName
                }
            }
        }

        order.request = reqBodyRequest

    } else return false
    return { request: order.request, assignment: order.assignment }
}

const requestQtyCalc = (request) => {
    var qty = 0
    request.cart.items.map(item => {
        //var canceledQty = item.canceledQty || 0
        //var returnedQty = item.returnedQty || 0
        var rejectedQty = item.rejectedQty || 0
        qty = qty + item.qty - rejectedQty
    })
    return qty
}

const amountCalc = (order, request) => {
    var amount = 0
    order.request.map(req => {
        if (req.status === 'Confirmed' || req.status === 'Completed')
            amount = amount + parseFloat(req.amount)
        else if (req.status === 'Rejected' || req.status === 'Canceled')
            if (req._id !== request._id) amount = amount + parseFloat(req.amount)

    })
    return amount
}

const setActive = (order) => {
    var active = false
    order.request.map(req => {
        if (req.type === 'Cancel' && req.status === 'Confirmed') {
            if (req.delivery.status) {
                if (req.cart.status !== 'Unpacked' || (req.payment.status !== 'Uncollected' && req.payment.status !== 'Refunded') || req.delivery.status !== 'Undelivered') {
                    active = true
                    return active
                }
            } else if (req.cart.status !== 'Unpacked' || (req.payment.status !== 'Uncollected' && req.payment.status !== 'Refunded')) {
                active = true
                return active
            }
        } else if (req.status !== 'Completed' && req.status !== 'Rejected' && req.status !== 'Canceled') {
            active = true
            return active
        }
    })
    return active
}

const requestStatusModifier = (req) => {
    var status = req.status
    if (req.cart.status === 'Packed' && (req.delivery.status ? req.delivery.status === 'Delivered' : true) && req.payment.status === 'Collected')
        status = 'Completed'
    else if (req.cart.status === 'Canceled' && (req.delivery.status ? req.delivery.status === 'Canceled' : true) && req.payment.status === 'Canceled')
        status = 'Canceled'
    else if (req.cart.status === 'Unpacked' && (req.delivery.status ? req.delivery.status === 'Undelivered' : true) && req.payment.status === 'Uncollected')
        if (req.type === 'Cancel')
            status = 'Confirmed'
        else status = 'Rejected'
    //console.log(status)
    return status
}

const statusModifier = (req) => {
    var cartStatus = req.cart.status
    var payStatus = req.payment.status
    var delStatus = req.delivery.status ? req.delivery.status : undefined

    if (req.status === 'on Hold') {
        if (req.cart.status === 'Pending' || req.cart.status === 'Packing') cartStatus = 'on Hold'
        if (req.payment.status === 'Pending') payStatus = 'on Hold'
        if (req.type !== 'Prepare' && req.delivery.status === 'Pending') delStatus = 'on Hold'

    } else if (req.status === 'Pending') {
        cartStatus = 'Pending'
        if (req.payment.status !== 'Collected') payStatus = 'Pending'
        if (req.type !== 'Prepare') delStatus = 'Pending'

    } else if (req.status === 'Canceled') {// assign or reassign
        cartStatus = 'Canceled'
        if (req.payment.status !== 'Collected') payStatus = 'Canceled'
        if (req.type !== 'Prepare') delStatus = 'Canceled'

    } else if (req.status === 'Completed') {// assign or reassign
        cartStatus = 'Packed'
        payStatus = 'Collected'
        if (delStatus) delStatus = 'Delivered'

    } else if (req.status === 'Rejected') {
        cartStatus = 'Unpacked'
        if (req.payment.status !== 'Collected') payStatus = 'Uncollected'
        if (delStatus) delStatus = 'Undelivered'

    } else if (req.status === 'Confirmed' && req.cart.status === 'on Hold' && req.payment.status === 'on Hold') {
        cartStatus = 'Pending'
        if (req.payment.status !== 'Collected') payStatus = 'Pending'
        if (delStatus) delStatus = 'Pending'
    }

    return ({ cartStatus, payStatus, delStatus })
}

const statusApproval = (order, req_id, type, status) => {
    var obj
    order.request.map(req => {
        if (req._id == req_id) {
            if (req.type === 'Cancel') {
                if (type === 'Request') {
                    if (status === 'Pending')
                        obj = { approval: false, status: "You can't reset status to Pending" }
                    else if (status === 'Completed')
                        obj = { approval: false, status: "You can't set a cancel request Completed" }
                    else if (status === 'on Hold')
                        obj = { approval: false, status: "You can't set a cancel request on Hold" }
                    else obj = { approval: true }

                } else if (type === 'Cart') {
                    if (status === 'Pending' || status === 'on Hold' || status === 'Canceled' || status === 'Unpacked') {
                        if (req.status === 'Confirmed')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't change status before confirming request" }
                    } else obj = { approval: false, status: "You can't set status " + status + " if request type is Cancel" }
                } return
            }
            //////////////////////// Request
            if (type === 'Request') {
                if (status === 'Pending') {
                    obj = { approval: false, status: "You can't reset status to Pending" }
                }

                if (status === 'on Hold') {
                    if (req.status === 'Confirmed' && req.delivery.status === 'Pending')
                        obj = { approval: true }
                    else obj = { approval: false, status: "You can't set unconfirmed or delivered order on hold!" }
                }

                else if (status === 'Confirmed' && req.status !== 'Completed')
                    obj = { approval: true }

                else if (status === 'Confirmed' && req.status === 'Completed')
                    obj = { approval: false, status: "You can't set request confirmed after being completed." }

                else if (status === 'Completed') {
                    if (req.cart.status === 'Packed' && req.payment.status === 'Collected' &&
                        (req.delivery.status ? req.delivery.status === 'Delivered' : true)) {
                        obj = { approval: true }
                    } else obj = { approval: false, status: "You can't set status completed before completing cart, payment, and delivery." }

                } else if (status === 'Rejected') {
                    if (req.delivery && req.delivery.status === 'Delivered' && req.payment.status === 'Collected')
                        obj = { approval: false, status: "You can't reject a request after delivering items or collecting payment." }
                    else obj = { approval: true }

                } else if (status === 'Canceled') { // customer canceled a request
                    if (req.cart.status !== 'Packed' && req.payment.status !== 'Collected' &&
                        (req.delivery.status !== 'Delivered' || req.delivery.status !== 'On Road')) obj = { approval: true }
                    else obj = { approval: false, status: "You can't cancel a request after being packed, delivered, or paid." }
                }

            } else if (req.status === 'Confirmed') {

                //////////////////////// Cart
                if (type === 'Cart') {
                    if (status === 'Pending')
                        if (req.cart.status === 'on Hold')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't reset status to Pending" }

                    else if (status === 'Confirmed') obj = { approval: true }

                    else if (status === 'on Hold') {
                        if (req.cart.status === 'Pending' || req.cart.status === 'Packing')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't hold on packing after being packed, returned, or canceled." }
                    }

                    else if (status === 'Packing') {
                        if (req.cart.status === 'on Hold' || req.cart.status === 'Pending')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't set items packing after being packed, canceled, or returned." }
                    }

                    else if (status === 'Packed') {
                        if (req.cart.status !== 'Canceled' && req.cart.status !== 'Returned')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't set items packed after being canceled or returned." }
                    }

                    else if (status === 'Canceled') {
                        if (req.cart.status === 'Pending' || req.cart.status === 'on Hold' || req.cart.status === 'Packing')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't cancel items after being packed, delivered, or paid." }
                    }

                    else if (status === 'Unpacked') {
                        if (req.cart.status === 'Pending' || req.cart.status === 'on Hold') obj = { approval: true }
                        else obj = { approval: false, status: "You can set items unpacked only when status is pending or on Hold." }
                    }

                    //////////////////////// Payment
                } else if (type === 'Payment') {
                    if (status === 'Pending')
                        if (req.payment.status === 'on Hold')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't reset status to Pending" }

                    else if (status === 'Confirmed') obj = { approval: true }

                    else if (status === 'on Hold' || status === 'Uncollected') {
                        if (req.payment.status === 'Pending' || req.payment.status === 'on Hold' || req.payment.status === 'Uncollected')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't hold on payment after being collected, canceled, or refunded." }
                    }

                    else if (status === 'Collected') {
                        if (req.payment.status === 'Canceled' || req.payment.status === 'Refunded')
                            obj = { approval: false, status: "You can't set payment uncollected after being canceled or refunded." }
                        else obj = { approval: true }
                    }

                    else if (status === 'Canceled') {
                        if (req.payment.status === 'Collected' || req.payment.status === 'Refunded')
                            obj = { approval: false, status: "You can't set payment uncollected after being collected or refunded." }
                        else obj = { approval: true }
                    }

                    else if (status === 'Refunded') {
                        if (req.cart.status === 'Unpacked' && (req.payment.status === 'Pending' || req.payment.status === 'on Hold'))
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't set payment refunded before setting items unpacked" }
                    }

                    //////////////////////// Delivery
                } else if (type === 'Delivery' && req.delivery) {
                    if (status === 'Pending')
                        if (req.delivery.status === 'on Hold')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't reset status to Pending" }

                    else if (status === 'Confirmed') obj = { approval: true }

                    else if (status === 'on Hold') {
                        if (req.delivery.status === 'Pending') // if delivery is on road it cant be set on Hold
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't hold on delivery after being delivered, canceled, or returned." }
                    }

                    else if (status === 'On Road') {
                        if ((req.delivery.status === 'Pending' || req.delivery.status === 'on Hold') && req.cart.status === 'Packed') // if delivery is on road it cant be set on Hold
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't set delivery on road before being packed or after being delivered, canceled, or returned." }
                    }

                    else if (status === 'Delivered') {
                        if (req.delivery.status === 'Canceled' || req.delivery.status === 'Returned')
                            obj = { approval: false, status: "You can't deliver items after being canceled or returned." }
                        else obj = { approval: true }
                    }

                    else if (status === 'Undelivered') {
                        if (req.delivery.status === 'Delivered' || req.delivery.status === 'Returned')
                            obj = { approval: false, status: "You can't set an order undelivered after being delivered or returned." }
                        else obj = { approval: true }
                    }

                    else if (status === 'Canceled') {
                        if (req.delivery.status === 'Delivered' || req.delivery.status === 'Returned')
                            obj = { approval: false, status: "You can't cancel a delivery after being delivered or returned." }
                        else obj = { approval: true }
                    }

                    else if (status === 'Returned') {
                        if (req.delivery.status === 'Pending' || req.delivery.status === 'on Hold' || req.delivery.status === 'On Road')
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't set a delivery returned after being canceled or delivered" }
                    }

                }
            } else if (req.status === 'Canceled' || req.status === 'Rejected' || req.status === 'Completed')
                obj = { approval: false, status: "You can't change status after completing, rejecting, or canceling request." }

            else obj = { approval: false, status: "You can't change status before confirming request." }
        }
        if (obj) return
    })
    return obj
}

// order assigner
const autoAssigner = (assignment, req, handlers) => {
    const time = Date.now() + 7200000

    var requestAssigned = assignment.find(ass =>
        ass.req_id == req._id && ass.status !== 'Rejected' && ass.status !== 'Canceled' && ass.type === 'Request')

    var cartAssigned = assignment.find(ass =>
        ass.req_id == req._id && ass.status !== 'Rejected' && ass.status !== 'Canceled' && ass.type === 'Cart')

    var deliveryAssigned = assignment.find(ass =>
        ass.req_id == req._id && ass.status !== 'Rejected' && ass.status !== 'Canceled' && ass.type === 'Delivery')

    var paymentAssigned = assignment.find(ass =>
        ass.req_id == req._id && ass.status !== 'Rejected' && ass.status !== 'Canceled' && ass.type === 'Payment')

    if (req.status === 'Confirmed') {
        if (!requestAssigned) { // add new
            var requestHandler = handlers.find(handler => handler.requestHandler)

            if (requestHandler) {
                requestHandler.currentAssignments = requestHandler.currentAssignments + 1
                requestHandler.save()
                assignment[assignment.length] = {
                    req_id: req._id,
                    type: 'Request',
                    date: time,
                    status: 'Pending',
                    employeeName: requestHandler.firstName + ' ' + requestHandler.lastName,
                    employeeId: requestHandler._id,
                }
                //req.assigned = true
            } else assignment[assignment.length] = { // no handler available
                req_id: req._id,
                type: 'Request',
                date: time,
                status: 'Unassigned',
            }
        } //else if (requestAssigned.status === 'Unassigned')

        if (!cartAssigned) { // add new
            var cartHandler = handlers.find(handler => handler.cartHandler)

            if (cartHandler) {
                cartHandler.currentAssignments = cartHandler.currentAssignments + 1
                cartHandler.save()
                assignment[assignment.length] = {
                    req_id: req._id,
                    type: 'Cart',
                    date: time,
                    status: 'Pending',
                    employeeName: cartHandler.firstName + ' ' + cartHandler.lastName,
                    employeeId: cartHandler._id,
                }
                //req.cart.assigned = true
            } else assignment[assignment.length] = { // no handler Available
                req_id: req._id,
                type: 'Cart',
                date: time,
                status: 'Unassigned',
            }
        }

        if (!paymentAssigned && req.delivery && req.delivery.status && !deliveryAssigned) {
            if ((req.type === 'Place' || req.type === 'Return') && req.payment.title === 'Pay On Delivery') {
                var delPayHandler = handlers.find(handler => handler.deliveryHandler && handler.paymentHandler)
                //console.log(delPayHandler)
                if (delPayHandler) {
                    delPayHandler.currentAssignments = delPayHandler.currentAssignments + 1
                    delPayHandler.save()
                    assignment[assignment.length] = {
                        req_id: req._id,
                        type: 'Delivery',
                        date: time,
                        status: 'Pending',
                        employeeName: delPayHandler.firstName + ' ' + delPayHandler.lastName,
                        employeeId: delPayHandler._id,
                    }

                    assignment[assignment.length] = {
                        req_id: req._id,
                        type: 'Payment',
                        date: time,
                        status: 'Pending',
                        employeeName: delPayHandler.firstName + ' ' + delPayHandler.lastName,
                        employeeId: delPayHandler._id,
                    }
                    //req.delivery.assigned = true
                    //req.payment.assigned = true
                } else { // no handler available
                    assignment[assignment.length] = {
                        req_id: req._id,
                        type: 'Delivery',
                        date: time,
                        status: 'Unassigned',
                    }

                    assignment[assignment.length] = {
                        req_id: req._id,
                        type: 'Payment',
                        date: time,
                        status: 'Unassigned',
                    }
                }
            } else {// add new delivery handler
                var deliveryHandler = handlers.find(handler => handler.deliveryHandler)

                if (deliveryHandler) {
                    deliveryHandler.currentAssignments = deliveryHandler.currentAssignments + 1
                    deliveryHandler.save()
                    assignment[assignment.length] = {
                        req_id: req._id,
                        type: 'Delivery',
                        date: time,
                        status: 'Pending',
                        employeeName: deliveryHandler.firstName + ' ' + deliveryHandler.lastName,
                        employeeId: deliveryHandler._id,
                    }
                    //req.delivery.assigned = true
                } else assignment[assignment.length] = {
                    req_id: req._id,
                    type: 'Delivery',
                    date: time,
                    status: 'Unassigned',
                }

                if (req.payment.title === 'Pay On Delivery' && !paymentAssigned && req.payment.status !== 'Collected' && req.payment.status !== 'Canceled') { // add new
                    var paymentHandler = deliveryHandler
                    if (paymentHandler) {
                        assignment[assignment.length] = {
                            req_id: req._id,
                            type: 'Payment',
                            date: time,
                            status: 'Pending',
                            employeeName: paymentHandler.firstName + ' ' + paymentHandler.lastName,
                            employeeId: paymentHandler._id,
                        }
                        //req.payment.assigned = true
                    } else assignment[assignment.length] = {
                        req_id: req._id,
                        type: 'Payment',
                        date: time,
                        status: 'Unassigned',
                    }

                }
            }
        } else if (!paymentAssigned) {
            var paymentHandler = handlers.find(handler => handler.paymentHandler && handler.jobPosition === 'Accountant')

            if (paymentHandler) {
                paymentHandler.currentAssignments = deliveryHandler.currentAssignments + 1
                paymentHandler.save()
                assignment[assignment.length] = {
                    req_id: req._id,
                    type: 'Payment',
                    date: time,
                    status: 'Pending',
                    employeeName: paymentHandler.firstName + ' ' + paymentHandler.lastName,
                    employeeId: paymentHandler._id
                }
                //req.payment.assigned = true
            } else assignment[assignment.length] = {
                req_id: req._id,
                type: 'Payment',
                date: time,
                status: 'Unassigned',
            }
        }

    } else if (req.status === 'Canceled' || req.status === 'Rejected') {
        assignment.map(ass => {
            if (ass.req_id == req._id) ass.status = 'Canceled'
        })
    }

    //req.assigned = true
    return assignment
}

export default router