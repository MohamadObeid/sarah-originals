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
        order.status = req.body.status ? req.body.status : order.status;
        order.operatedBy = req.body.operatedBy ? req.body.operatedBy : order.operatedBy;
        order.customer = req.body.customer ? req.body.customer : order.customer;
        order.payment = req.body.payment ? req.body.payment : order.payment;
        order.delivery = req.body.delivery ? req.body.delivery : order.delivery;
        order.cartItems = req.body.cartItems ? req.body.cartItems : order.cartItems;
        order.totalAmount = req.body.totalAmount ? req.body.totalAmount : order.totalAmount;
        order.customerNote = req.body.customerNote ? req.body.customerNote : order.customerNote;
        order.adminNote = req.body.adminNote ? req.body.adminNote : order.adminNote;
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