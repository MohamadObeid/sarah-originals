import express from "express";
import Zone from '../modals/zoneModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("", async (req, res) => {
    const zone = await Zone.find({});
    res.send(zone);
});

router.post("", isAuth, isAdmin, async (req, res) => {
    const zone = new Zone(req.body);
    const newZone = await zone.save();
    if (newZone) {
        return res.status(201).send({ message: "New zone created!", data: newZone })
    }
    return res.status(500).send({
        message: "Error in creating zone!"
    })
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const zone = await Zone.findOne({ _id: req.params.id });
    if (zone) {
        zone.active = req.body.active;
        zone.created_by = req.body.created_by;
        zone.zone = req.body.zone;
        zone.region = req.body.region;
        zone.longitude = req.body.longitude;
        zone.latitude = req.body.latitude;
    }

    const zoneUpdated = await zone.save();

    if (zoneUpdated) {
        return res.status(200).send({ message: "Zone has been updated!", data: zoneUpdated })
    }
    return res.status(500).send({
        message: "Error in updating zone!"
    })
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const zoneDeleted = await Zone.findByIdAndRemove(req.params.id);
    if (zoneDeleted) {
        return res.status(200).send({ message: "Zone has been deleted!", data: zoneDeleted });
    }
    return res.status(500).send({
        message: "Error in deleting zone!"
    })
});

export default router;