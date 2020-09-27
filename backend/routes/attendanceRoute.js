import express from "express";
import { isAuth, isAdmin } from '../util';
import Attendance from "../modals/attendanceModel";

const router = express.Router();

router.get("", async (req, res) => {
    const attendance = await Attendance.find({});
    attendance.length > 0 ? res.send(attendance) : res.send(undefined)
});

router.get("/:id", async (req, res) => {
    const attendanceId = req.params.id
    const attendance = await Attendance.find({ _id: attendanceId });
    res.send(attendance);
});

router.post("/getAttendance", async (req, res) => {
    const employeeId = req.body.employeeId
    const attendance = await Attendance.find({ employeeId: employeeId })
    attendance.length > 0 ? res.send(attendance) : res.send(undefined)
});

router.post("", isAuth, isAdmin, async (req, res) => {
    const attendance = new Attendance(req.body)
    const newAttendance = await attendance.save()
    console.log(newAttendance)
    if (newAttendance) {
        return res.status(201).send({ message: "New Attendance created!", data: newAttendance })
    }
    return res.status(500).send({
        message: "Error in creating Attendance!"
    })
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const attendance = await Attendance.findOne({ _id: req.params.id });
    if (attendance) {
        attendance.creation_date = req.body.creation_date && req.body.creation_date;
        attendance.created_by = req.body.created_by && req.body.created_by;
        attendance.modified = req.body.modified && req.body.modified;
        attendance.employeeId = req.body.employeeId && req.body.employeeId;
        attendance.employeeName = req.body.employeeName && req.body.employeeName;
        attendance.employeeImage = req.body.employeeImage && req.body.employeeImage;
        attendance.date = req.body.date && req.body.date;
        attendance.checkin = req.body.checkin && req.body.checkin;
        attendance.checkout = req.body.checkout && req.body.checkout;
        attendance.absence = req.body.absence && req.body.absence;
        attendance.note = req.body.note && req.body.note;
    }
    const attendanceUpdated = await attendance.save();

    if (attendanceUpdated) {
        return res.status(200).send({ message: "Attendance has been updated!", data: attendanceUpdated })
    }
    return res.status(500).send({
        message: "Error in updating Attendance!"
    })
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const attendanceDeleted = await Attendance.findByIdAndRemove(req.params.id)
    if (attendanceDeleted) {
        return res.status(200).send({ message: "Attendance has been deleted!", data: attendanceDeleted });
    }
    return res.status(500).send({
        message: "Error in deleting Attendance!"
    })
});

export default router;