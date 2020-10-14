import express from "express";
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
    const order = await Order.find({})
    order.length > 0 ? res.send(order) : res.send(undefined)
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
        if (req.body.type) {
            //console.log(statusApproval(order, req.body.receiptNum, req.body.type, req.body.status))
            const approved = statusApproval(order, req.body.receiptNum, req.body.type, req.body.status).approval
            const message = !approved && statusApproval(order, req.body.receiptNum, req.body.type, req.body.status).status
            if (approved) {
                order.request.map(request => {
                    if (request.receiptNum === req.body.receiptNum) {
                        if (req.body.type === 'Request')
                            request.status = req.body.status
                        else if (req.body.type === 'Cart')
                            request.cart.status = req.body.status
                        else if (req.body.type === 'Delivery')
                            request.delivery.status = req.body.status
                        else if (req.body.type === 'Payment')
                            request.payment.status = req.body.status

                        request.status = updateRequestStatus(request) ? updateRequestStatus(request) : request.status
                        return
                    }
                })
            } else {
                return res.status(200).send({
                    message: message, data: undefined
                })
            }
        } else {
            order.creation_date = req.body.creation_date ? req.body.creation_date : order.creation_date;
            order.created_by = req.body.created_by ? req.body.created_by : order.created_by;
            order.closed = req.body.closed ? req.body.closed : order.closed;
            order.phone = req.body.phone ? req.body.phone : order.phone;
            order.name = req.body.name ? req.body.name : order.name;
            order.userId = req.body.userId ? req.body.userId : order.userId;
            order.email = req.body.email ? req.body.email : order.email;
            order.deliveryAddress = req.body.deliveryAddress ? req.body.deliveryAddress : order.deliveryAddress;
            order.paymentAddress = req.body.paymentAddress ? req.body.paymentAddress : order.paymentAddress;
            order.request = req.body.request ? req.body.request : order.request;
            order.invoiceNum = req.body.invoiceNum ? req.body.invoiceNum : order.invoiceNum;
            order.amount = req.body.amount ? req.body.amount : order.amount;
            order.note = req.body.note ? req.body.note : order.note;
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

const setActive = (order) => {
    var active = true
    order.request.map(req => {
        if (req.status === 'Completed' || req.status === 'Rejected' || req.status === 'Canceled') {
            active = false
            return
        } else active = true
    })
    return active
}

const updateRequestStatus = (req) => {
    var status
    if (req.cart.status === 'Packed' && (req.delivery ? req.delivery.status === 'Delivered' : true) && req.payment.status === 'Collected') {
        status = 'Completed'
    }
    return status
}

const statusApproval = (order, num, type, status) => {
    var obj
    order.request.map(req => {
        if (req.receiptNum === num) {
            //console.log(order, num, type, status)
            //////////////////////// Request
            if (type === 'Request') {
                if (status === 'Pending')
                    obj = { approval: false, status: "You can't reset status to Pending" }
                else if (status === 'Confirmed' && req.status !== 'Completed')
                    obj = { approval: true }

                else if (status === 'Confirmed' && req.status === 'Completed')
                    obj = { approval: false, status: "You can't set request confirmed after being completed." }

                else if (status === 'Completed') {
                    if (req.cart.status === 'Packed' && req.payment.status === 'Collected' &&
                        (req.delivery && req.delivery.status === 'Delivered')) {
                        obj = { approval: true }
                    } else obj = { approval: false, status: "You can't set status completed." }

                } else if (status === 'Rejected') {
                    if (req.delivery && req.delivery.status === 'Delivered' && req.payment.status === 'Collected')
                        obj = { approval: false, status: "You can't reject a request after delivering items or collecting payment." }
                    else obj = { approval: true }

                } else if (status === 'Canceled') { // customer canceled a request
                    if (req.cart.status !== 'Packed' && req.payment.status === 'Pending' &&
                        (req.delivery && req.delivery.status === 'Pending')) obj = { approval: true }
                    else obj = { approval: false, status: "You can't cancel a request after being packed, delivered, or paid." }
                }

                //////////////////////// Cart
            } else if (type === 'Cart') {
                if (status === 'Pending')
                    obj = { approval: false, status: "You can't reset status to Pending" }

                else if (status === 'Confirmed') obj = { approval: true }

                else if (status === 'On Hold') {
                    if (req.cart.status === 'Pending' || req.cart.status === 'Packing')
                        obj = { approval: true }
                    else obj = { approval: false, status: "You can't hold on packing after being packed, returned, or canceled." }
                }

                else if (status === 'Packing') {
                    if (req.cart.status === 'On Hold' || req.cart.status === 'Pending')
                        obj = { approval: true }
                    else obj = { approval: false, status: "You can't set items packing after being packed, canceled, or returned." }
                }

                else if (status === 'Packed') {
                    if (req.cart.status !== 'Canceled' && req.cart.status !== 'Returned')
                        obj = { approval: true }
                    else obj = { approval: false, status: "You can't set items packed after being canceled or returned." }
                }

                else if (status === 'Canceled') {
                    if (req.cart.status === 'Pending' || req.cart.status === 'On Hold' || req.cart.status === 'Packing')
                        obj = { approval: true }
                    else obj = { approval: false, status: "You can't cancel items after being packed, delivered, or paid." }
                }

                else if (status === 'Returned') {
                    if (req.cart.status === 'Pending' || req.cart.status === 'On Hold') obj = { approval: true }
                    else obj = { approval: false, status: "You can't set items returned only when pending or on hold." }
                }

                //////////////////////// Payment
            } else if (type === 'Payment') {
                if (status === 'Pending')
                    obj = { approval: false, status: "You can't reset status to Pending" }

                else if (status === 'Confirmed') obj = { approval: true }

                else if (status === 'On Hold' || status === 'Uncollected') {
                    if (req.payment.status === 'Pending' || req.payment.status === 'On Hold')
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
                    if (req.cart.status === 'Returned' && (req.payment.status === 'Pending' || req.payment.status === 'On Hold'))
                        obj = { approval: true }
                    else obj = { approval: false, status: "You can't set payment refunded before setting items returned or after canceling or collecting payment" }
                }

                //////////////////////// Delivery
            } else if (type === 'Delivery' && req.delivery) {
                if (status === 'Pending')
                    obj = { approval: false, status: "You can't reset status Pending" }

                else if (status === 'Confirmed') obj = { approval: true }

                else if (status === 'On Hold') {
                    if (req.delivery.status === 'Pending') // if delivery is on road it cant be set on hold
                        obj = { approval: true }
                    else obj = { approval: false, status: "You can't hold on delivery after being delivered, canceled, or returned." }
                }

                else if (status === 'On Road') {
                    if (req.delivery.status === 'Pending' || req.delivery.status === 'On Hold') // if delivery is on road it cant be set on hold
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
                    if (req.delivery.status === 'Pending' || req.delivery.status === 'On Hold' || req.delivery.status === 'On Road')
                        obj = { approval: true }
                    else obj = { approval: false, status: "You can't set a delivery returned after being canceled or delivered" }
                }

            }
        }
        if (obj) return
    })
    return obj
}

export default router