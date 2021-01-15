import express from "express";
import Controls from "../modals/controlsModel";
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("", async (req, res) => {
    const controls = await Controls.findOne({ active: { $eq: true } })
    if (controls) return res.send(controls)
    return res.send({ message: 'No Controls Available!' })
})

router.put("/put", isAuth, isAdmin, async (req, res) => {
    const controls = await Controls.findOne({ _id: { $eq: /*'5fd0806998049b03400861a7'*/'5fc2ff0bdd745917d40ae217' } })

    if (controls) {
        controls.active = req.body.active
        controls.backgroundColor = req.body.backgroundColor
        controls.addToCartBtnsStyle = req.body.addToCartBtnsStyle
        controls.homePageCollections = req.body.homePageCollections
        controls.topRibbonVisible = req.body.topRibbonVisible
        controls.topRibbon = req.body.topRibbon
        controls.navigationBar = req.body.navigationBar
        controls.slideRibbonVisible = req.body.slideRibbonVisible
        controls.slideRibbon = req.body.slideRibbon
        controls.homePageViews = req.body.homePageViews
        controls.imageBox = req.body.imageBox

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