import express from "express";
import PaymentMethod from '../modals/orderModel';

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

export default router;