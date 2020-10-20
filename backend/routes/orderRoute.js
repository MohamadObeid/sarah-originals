import express, { request } from "express";
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
    const order = await Order.find({ _id: orderId })
    res.send(order)
})

/*router.post("/getOrder", async (req, res) => {
    const employeeId = req.body.employeeId
    const order = await Order.find({ employeeId: employeeId })
    order.length > 0 ? res.send(order) : res.send(undefined)
});*/

router.post("", isAuth, async (req, res) => {
    const order = new Order(req.body)
    const neworder = await order.save()

    if (neworder) {
        return res.status(201).send({ message: "New order created!", data: neworder })
    }
    return res.status(500).send({
        message: "Error in creating order!"
    })
})

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id })
    if (order) {
        if (req.body.type) { // status change request
            const approved = statusApproval(order, req.body.req_id, req.body.type, req.body.status).approval
            const message = !approved && statusApproval(order, req.body.req_id, req.body.type, req.body.status).status
            //console.log(approved)
            if (approved) {
                order.request.map(request => {
                    //console.log('1', request._id)
                    if (request._id == req.body.req_id) {
                        const modifiedRequestIndex = request.modifiedRequestNum - 1

                        if (req.body.type === 'Request') {
                            request.status = req.body.status
                            if (req.body.operatedBy) request.operatedBy = req.body.operatedBy
                        } else if (req.body.type === 'Cart')
                            request.cart.status = req.body.status
                        else if (req.body.type === 'Delivery')
                            request.delivery.status = req.body.status
                        else if (req.body.type === 'Payment')
                            request.payment.status = req.body.status

                        request.status = requestStatusModifier(request)
                        request.cart.status = statusModifier(request).cartStatus
                        request.payment.status = statusModifier(request).payStatus
                        request.delivery.status = request.delivery.status && statusModifier(request).delStatus

                        if (request.type === 'Cancel') {
                            if (request.status === 'Confirmed') { // set cancel request and canceled request confirmed
                                order.request[modifiedRequestIndex].status = 'Confirmed'
                                /*order.request[modifiedRequestIndex].cart.items.map(item => {
                                    request.cart.items.map(canceledItem => {
                                        if (item._id === canceledItem._id) {
                                            item.canceled = true
                                            item.canceledQty = item.canceledQty
                                                ? canceledItem.qty + item.canceledQty : canceledItem.qty
                                            return
                                        }
                                    })
                                })*/
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
                        } else if (request.type === 'Return') {

                            // set returned items true and returnedQty
                            /*if (request.status === 'Confirmed') {
                                order.request[modifiedRequestIndex].cart.items.map(item => {
                                    request.cart.items.map(returnedItem => {
                                        if (item._id === returnedItem._id) {
                                            item.returned = true
                                            item.returnedQty = returnedItem.qty
                                            return
                                        }
                                    })
                                })
                            }*/
                        }

                        request.cart.qty = requestQtyCalc(request)
                        order.amount = amountCalc(order, request)
                        return
                    }
                })

            } else {
                return res.status(200).send({
                    message: message, data: undefined
                })
            }
        } else {
            if (req.body.request) {
                if (req.body.request.length > order.request.length) { // new request
                    var newRequest = newRequestHandler(order, req.body.request) // it is cancel request

                    if (newRequest.message) { // cancel request rejected
                        return res.status(200).send({
                            message: newRequest.message, data: undefined
                        })
                    }

                    order.request = newRequest || order.request

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

                    order.request.splice(deletedRequestIndex, 1)

                    if (deletedRequest.type === 'Cancel') { // cancel Request is deleted
                        const modifiedRequestIndex = deletedRequest.modifiedRequestNum - 1
                        const canceledRequest = order.request[modifiedRequestIndex]
                        order.request = req.body.request

                        // if on hold status => set status pending
                        if (canceledRequest.status === 'on Hold' || canceledRequest.status === 'Canceled') {
                            if (order.request[modifiedRequestIndex].operatedBy.employeeName) {
                                order.request[modifiedRequestIndex].status = 'Confirmed'
                                order.request[modifiedRequestIndex].cart.status = 'Pending'
                                order.request[modifiedRequestIndex].payment.status = 'Pending'
                                order.request[modifiedRequestIndex].delivery.status =
                                    canceledRequest.delivery.status && 'Pending'
                            } else order.request[modifiedRequestIndex].status = 'Pending'
                        }

                    } else if (deletedRequest.type === 'Return') { // return Request is deleted
                        const modifiedRequestIndex = deletedRequest.modifiedRequestNum - 1
                        const returnedRequest = order.request[modifiedRequestIndex]
                        order.request = req.body.request
                    }

                } else if (req.body.request.length > 0) {

                    if (req.body.request.length === 1 &&
                        (req.body.request[0].type !== 'Place' && req.body.request[0].type !== 'Prepare')) {
                        return res.status(200).send({
                            message: "Order must have at least 1 place or preapare request", data: undefined
                        })
                    }

                    req.body.request.map(request => {

                        if (request.type === 'Cancel') {
                            var setOrderActive
                            const modifiedRequestIndex = request.modifiedRequestNum - 1
                            const canceledRequest = order.request[modifiedRequestIndex]
                            const canceledItems = request.cart.items.map(item => {
                                return { _id: item._id, qty: item.qty }
                            })

                            var requsetIndex
                            order.request.map(req => {
                                if (req._id == request._id) {
                                    requsetIndex = order.request.indexOf(req)
                                    return
                                }
                            })

                            order.request[requsetIndex] = request

                            var allItemsAreCanceled = true
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
                                            /*item.canceled = true
                                            item.canceledQty = newCanceledItem.qty*/
                                            if (item.qty === item.canceledQty)
                                                allItemsAreCanceled = [...allItemsAreCanceled, true]
                                            else allItemsAreCanceled = [...allItemsAreCanceled, false]
                                            return
                                        }
                                    })

                                if (item.canceled === true && canceledItemExist) {
                                    //var itemFound = false
                                    canceledItems.map(canceledItem => {
                                        if (item._id === canceledItem._id) {
                                            //itemFound = true
                                            if (canceledItem.qty < item.qty) {
                                                setOrderActive = true
                                                allItemsAreCanceled = false
                                            }

                                            //item.canceledQty = canceledItem.qty
                                            return
                                        }
                                    })

                                    /*if (!itemFound) {
                                        item.canceled = false
                                        item.canceledQty = 0
                                    }*/
                                }
                            })

                            if (allItemsAreCanceled) {
                                if (canceledRequest.delivery.status)
                                    order.request[modifiedRequestIndex].delivery.status = 'Canceled'

                                if (canceledRequest.payment.type === 'Cash')
                                    order.request[modifiedRequestIndex].payment.status = 'Canceled'

                                order.request[modifiedRequestIndex].cart.status = 'Canceled'
                                order.request[modifiedRequestIndex].status = 'Canceled'
                            }

                            if (setOrderActive) {
                                if (canceledRequest.status === 'on Hold' || canceledRequest.status === 'Canceled') {
                                    if (order.request[modifiedRequestIndex].operatedBy.employeeName) {
                                        order.request[modifiedRequestIndex].status = 'Confirmed'
                                        order.request[modifiedRequestIndex].cart.status = 'Pending'
                                        order.request[modifiedRequestIndex].payment.status = 'Pending'
                                        order.request[modifiedRequestIndex].delivery.status =
                                            canceledRequest.delivery.status && 'Pending'
                                    } else order.request[modifiedRequestIndex].status = 'Pending'
                                }
                            }
                        } else if (request.type === 'Return') {
                            var setOrderActive
                            const modifiedRequestIndex = request.modifiedRequestNum - 1
                            //const returnedRequest = order.request[modifiedRequestIndex]
                            const returnedItems = request.cart.items.map(item => {
                                return { _id: item._id, qty: item.qty }
                            })

                            // get return request index
                            var requsetIndex
                            order.request.map(req => {
                                if (req._id == request._id) {
                                    requsetIndex = order.request.indexOf(req)
                                    return
                                }
                            })

                            // check (in frontend) if items added are returnable

                            // set request values to new request values
                            order.request[requsetIndex] = request

                            // var allItemsAreReturned = true
                            /*var newReturnedItems = []

                            // get new requested return items?
                            if (returnedItems.length > returnedRequest.cart.items.length) {
                                returnedItems.map(returnedItem => {
                                    var newReturnedItem
                                    newReturnedItem = returnedRequest.cart.items.find(item =>
                                        item._id === returnedItem._id)
                                    if (!newReturnedItem) {
                                        newReturnedItems = [...newReturnedItems,
                                        { _id: returnedItem._id, qty: returnedItem.qty }]
                                    }
                                })
                            }*/

                            order.request[modifiedRequestIndex].cart.items.map(item => {
                                var returnItemExist = true

                                // add new requested return items to order
                                /*newReturnedItems.length > 0 &&
                                    newReturnedItems.map(newReturnedItem => {
                                        if (newReturnedItem._id === item._id) {
                                            returnItemExist = false
                                            item.returned = true
                                            item.returnedQty = newReturnedItem.qty
                                            /*if (item.qty === item.returnedQty)
                                                allItemsAreReturned = [...allItemsAreReturned, true]
                                            else allItemsAreReturned = [...allItemsAreReturned, false]*/
                                /*return
                            }
                        })*/

                                // edit previous returned items
                                if (item.returned === true && returnItemExist) {
                                    var itemFound = false
                                    returnedItems.map(returnedItem => {
                                        if (item._id === returnedItem._id) {
                                            itemFound = true
                                            if (returnedItem.qty < item.qty) {
                                                setOrderActive = true
                                                // allItemsAreReturned = false
                                            }
                                            //item.returnedQty = returnedItem.qty
                                            return
                                        }
                                    })

                                    // item returned before is not a return anymore
                                    /*if (!itemFound) {
                                        item.returned = false
                                        item.returnedQty = 0
                                    }*/
                                }
                            })
                        } else order.request = req.body.request
                        request.cart.qty = requestQtyCalc(request)
                    })

                } else if (req.body.request.length === 0) {
                    const orderDeleted = await Order.findByIdAndRemove(req.body._id)
                    if (orderDeleted)
                        return res.status(200).send({ message: "Order has been deleted!", data: orderDeleted })

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
                request.status = requestStatusModifier(request)
                request.cart.status = statusModifier(request).cartStatus
                request.payment.status = statusModifier(request).payStatus
                if (request.delivery)
                    request.delivery.status = request.delivery.status && statusModifier(request).delStatus

                order.amount = amountCalc(order, request)
            })
            //console.log('2', order.request)
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

const newRequestHandler = (order, reqBodyRequest) => {
    const request = reqBodyRequest
    const isCancelRequest = request[request.length - 1].type === 'Cancel' ? request[request.length - 1] : undefined
    const isReturnRequest = request[request.length - 1].type === 'Return' ? request[request.length - 1] : undefined
    const isPlaceRequest = (request[request.length - 1].type === 'Place' || request[request.length - 1].type === 'Prepare')
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
            }

            // total request is canceled
            if (isCancelRequest.amount * (-1) === canceledRequest.amount) {
                if (canceledRequest.delivery.status)
                    canceledRequest.delivery.status = 'Canceled'

                if (canceledRequest.payment.type === 'Cash')
                    canceledRequest.payment.status = 'Canceled'

                canceledRequest.cart.status = 'Canceled'
                canceledRequest.status = 'Canceled'
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
            return { approval: false, message: "Make a cancel request instead of return, since items aren't packed yet" }
        else if (status === 'Canceled')
            return { approval: false, message: "You can't return a canceled request" }
        else order.request = reqBodyRequest

    } else if (isPlaceRequest) {
        if (isPlaceRequest.cart.qty === 0)
            return { approval: false, message: "Any request must contain at least 1 item" }

        const cartStatus = reqBodyRequest[0].cart.status
        if (cartStatus === 'Packed' || cartStatus === 'Canceled' || cartStatus === 'Rejected')
            return { approval: false, message: "You can't add items to cart after it is packed. Place a new order" }
        else {
            isPlaceRequest.delivery.charge = 0
            reqBodyRequest[0].deliverOn = isPlaceRequest.deliverOn
            reqBodyRequest[0].duration = isPlaceRequest.duration
            reqBodyRequest[0].title = isPlaceRequest.title
        }

        order.request = reqBodyRequest

    } else return false
    return order.request
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
        } else if (req.status === 'Pending') {
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
        cartStatus = 'on Hold'
        payStatus = 'on Hold'
        if (req.type !== 'Prepare') delStatus = 'on Hold'

    } else if (req.status === 'Pending') {
        cartStatus = 'Pending'
        payStatus = 'Pending'
        if (req.type !== 'Prepare') delStatus = 'Pending'

    } else if (req.status === 'Canceled') {// assign or reassign
        cartStatus = 'Canceled'
        payStatus = 'Canceled'
        if (req.type !== 'Prepare') delStatus = 'Canceled'

    } else if (req.status === 'Completed') {// assign or reassign
        cartStatus = 'Packed'
        payStatus = 'Collected'
        if (delStatus) delStatus = 'Delivered'

    } else if (req.status === 'Rejected') {
        cartStatus = 'Unpacked'
        payStatus = 'Uncollected'
        if (delStatus) delStatus = 'Undelivered'
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
                    if (req.status !== 'Completed' && req.status !== 'Rejected' && req.status !== 'Canceled')
                        obj = { approval: true }
                    else obj = { approval: false, status: "You can't reset status to Pending" }
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
                        if (req.delivery.status === 'Pending' || req.delivery.status === 'on Hold') // if delivery is on road it cant be set on Hold
                            obj = { approval: true }
                        else obj = { approval: false, status: "You can't set delivery on road after being delivered, canceled, or returned." }
                    }

                    else if (status === 'Delivered') {
                        if (req.delivery.status === 'Canceled' || req.delivery.status === 'Returned')
                            obj = { approval: false, status: "You can't deliver items after being canceled or returned." }
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

export default router