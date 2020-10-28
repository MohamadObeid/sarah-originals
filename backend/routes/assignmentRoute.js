import express from "express"
import Order from "../modals/orderModel"
import { isAuth, isAdmin } from '../util'

const router = express.Router()

router.get("", async (req, res) => {
    const orders = await Order.find({ active: { $eq: true } }).sort({ creation_date: -1 })
    /*var assignments = []
    orders.map(order => {
        order.assignment.map(ass => {
            if (ass.status !== 'Canceled' && ass.status !== 'Rejected' && ass.status !== 'Completed') {
                ass.order_id = order._id
                console.log(ass)
                assignments[assignments.length] = ass
            }
        })
    })*/
    //console.log(assignments)
    res.send(orders)
})


/*router.post("", isAuth, isAdmin, async (req, res) => {
    const order = new Order(req.body)
    const neworder = await order.save()
    if (neworder) {
        // 201 is code of creating an item
        return res.status(201).send({ message: "New order created!", data: neworder })
    }
    return res.status(500).send({
        message: "Error in creating order!"
    })
});*/

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id })
    if (order) { }
    const orderUpdated = await order.save()
    if (orderUpdated) {
        // 201 is code of creating an item
        return res.status(200).send({ message: "Order has been updated!", data: orderUpdated })
    }
    return res.status(500).send({
        message: "Error in updating order!"
    })
})

/*router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const orderDeleted = await Order.findByIdAndRemove(req.params.id)
    if (orderDeleted) {
        return res.status(200).send({ message: "order has been deleted!", data: orderDeleted })
    }
    return res.status(500).send({
        message: "Error in deleting order!"
    })
});*/


export default router;