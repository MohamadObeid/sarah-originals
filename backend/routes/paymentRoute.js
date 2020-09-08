import express from "express";
import Payment from "../modals/paymentModel";
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("", async (req, res) => {
    const payment = await Payment.find({});
    res.send(payment);
});

router.post("", isAuth, isAdmin, async (req, res) => {
    const payment = new Payment(req.body)
    const newPayment = await payment.save();
    if (newPayment) {
        return res.status(201).send({ message: "New Payment created!", data: newPayment })
    }
    return res.status(500).send({
        message: "Error in creating Payment!"
    })
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const payment = await Payment.findOne({ _id: req.params.id });
    if (payment.activation) {
        payment.active = req.body.active;
    } else if (payment) {
        payment.active = req.body.active;
        payment.created_by = req.body.created_by;
        payment.zone = req.body.zone;
        payment.title = req.body.title;
        payment.type = req.body.type;
        payment.rateType = req.body.rateType;
        payment.flatRate = req.body.flatRate;
        payment.rates = req.body.rates;
    }

    const paymentUpdated = await payment.save();

    if (paymentUpdated) {
        return res.status(200).send({ message: "Payment has been updated!", data: paymentUpdated })
    }
    return res.status(500).send({
        message: "Error in updating Payment!"
    })
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const paymentDeleted = await Payment.findByIdAndRemove(req.params.id);
    if (paymentDeleted) {
        return res.status(200).send({ message: "Payment has been deleted!", data: paymentDeleted });
    }
    return res.status(500).send({
        message: "Error in deleting Payment!"
    })
});

export default router;