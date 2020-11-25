import express from "express";
import Controls from "../modals/controlsModel";
import { isAuth, isAdmin } from '../util';
import mongoose from 'mongoose'

const router = express.Router();

router.get("", async (req, res) => {
    const controls = await Controls.find({})
    /*controls.map(async control => {
        const controlsDeleted = await Controls.findByIdAndRemove(control._id);
    })*/
    //console.log(controls)
    res.send(controls)
});

/*router.post("", isAuth, isAdmin, async (req, res) => {
    const controls = new Controls(req.body)
    const newcontrols = await controls.save();
    //console.log(newcontrols)
    if (newcontrols) {
        return res.status(201).send({ message: "New controls created!", data: newcontrols })
    }
    return res.status(500).send({
        message: "Error in creating controls!"
    })
});*/

router.put("/put", isAuth, isAdmin, async (req, res) => {
    const controls = await Controls.findOne({ addToCart: { $eq: req.body.addToCart } })
    if (controls) {
        controls.addToCart = req.body.addToCart
        controls.homePageCollections = req.body.homePageCollections
        controls.topRibbonVisible = req.body.topRibbonVisible
        controls.topRibbon = req.body.topRibbon
        controls.navigationBar = req.body.navigationBar
        controls.productRibbonVisible = req.body.productRibbonVisible
        controls.productRibbon = req.body.productRibbon
    } else {
        const controls = new Controls(req.body)
        const controlsUpdated = await controls.save();
        if (controlsUpdated) {
            return res.status(200).send({ message: "Controls has been updated!", data: controlsUpdated })
        }
    }

    const controlsUpdated = await controls.save();
    if (controlsUpdated) {
        return res.status(200).send({ message: "Controls has been updated!", data: controlsUpdated })
    }
    return res.status(500).send({
        message: "Error in updating controls!"
    })
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const controlsDeleted = await Controls.findByIdAndRemove(req.params.id);
    if (controlsDeleted) {
        return res.status(200).send({ message: "Controls has been deleted!", data: controlsDeleted });
    }
    return res.status(500).send({
        message: "Error in deleting controls!"
    })
});

export default router;