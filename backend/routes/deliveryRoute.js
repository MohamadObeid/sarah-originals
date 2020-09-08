import express from "express";
import Delivery from "../modals/deliveryModel";
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("", async (req, res) => {
    const delivery = await Delivery.find({});
    res.send(delivery);
});

router.post("", isAuth, isAdmin, async (req, res) => {
    const delivery = new Delivery(req.body)
    const newDelivery = await delivery.save();
    if (newDelivery) {
        return res.status(201).send({ message: "New Delivery created!", data: newDelivery })
    }
    return res.status(500).send({
        message: "Error in creating Deliveryy!"
    })
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const delivery = await Delivery.findOne({ _id: req.params.id });
    if (req.body.activation) {
        delivery.active = req.body.active;
    } else if (delivery) {
        delivery.active = req.body.active;
        delivery.created_by = req.body.created_by;
        delivery.zone = req.body.zone;
        delivery.title = req.body.title;
        delivery.type = req.body.type;
        delivery.duration = req.body.duration;
        delivery.timeFormat = req.body.timeFormat;
        delivery.rateType = req.body.rateType;
        delivery.flatRate = req.body.flatRate;
        delivery.rates = req.body.rates;
    }
    const deliveryUpdated = await delivery.save();

    if (deliveryUpdated) {
        return res.status(200).send({ message: "Delivery has been updated!", data: deliveryUpdated })
    }
    return res.status(500).send({
        message: "Error in updating Delivery!"
    })
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deliveryDeleted = await Delivery.findByIdAndRemove(req.params.id);
    if (deliveryDeleted) {
        return res.status(200).send({ message: "Delivery has been deleted!", data: deliveryDeleted });
    }
    return res.status(500).send({
        message: "Error in deleting Delivery!"
    })
});

export default router;