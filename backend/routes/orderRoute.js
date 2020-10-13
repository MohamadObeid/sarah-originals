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

export default router