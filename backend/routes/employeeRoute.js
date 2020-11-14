import express from "express";
import Employee from "../modals/employeeModel";
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("", async (req, res) => {
    const active = req.query.active ? { active: { $eq: true } } : {}
    const employee = await Employee.find({ ...active });
    res.send(employee);
});

router.get("/:id", async (req, res) => {
    const employeeId = req.params.id
    const employee = await Employee.findOne({ _id: employeeId });
    res.send(employee);
});

router.post("", isAuth, isAdmin, async (req, res) => {
    const employee = new Employee(req.body)
    const newEmployee = await employee.save()
    if (newEmployee) {
        return res.status(201).send({ message: "New Employee created!", data: newEmployee })
    }
    return res.status(500).send({
        message: "Error in creating Employee!"
    })
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const employee = await Employee.findOne({ _id: req.params.id });
    if (employee) {
        employee.active = req.body.active && req.body.active;
        employee.creation_date = req.body.creation_date && req.body.creation_date;
        employee.created_by = req.body.created_by && req.body.created_by;
        employee.modified = req.body.modified && req.body.modified;
        employee.title = req.body.title && req.body.title;
        employee.firstname = req.body.firstname && req.body.firstname;
        employee.lastname = req.body.lastname && req.body.lastname;
        employee.image = req.body.image && req.body.image;
        employee.phone = req.body.phone && req.body.phone;
        employee.dob = req.body.dob && req.body.dob;
        employee.maritalStatus = req.body.maritalStatus && req.body.maritalStatus;
        employee.drivingLicense = req.body.drivingLicense && req.body.drivingLicense;
        employee.address = req.body.address && req.body.address;
        employee.jobPosition = req.body.jobPosition && req.body.jobPosition;
        employee.jobDescription = req.body.jobDescription && req.body.jobDescription;
        employee.facebook = req.body.facebook && req.body.facebook;
        employee.instagram = req.body.instagram && req.body.instagram;
        employee.youtube = req.body.youtube && req.body.youtube;
        employee.interests = req.body.interests && req.body.interests;
        employee.contract = req.body.contract && req.body.contract;
        employee.salary = req.body.salary && req.body.salary;
        employee.workTime = req.body.workTime && req.body.workTime;
        employee.note = req.body.note && req.body.note;
        employee.cartHandler = req.body.cartHandler && req.body.cartHandler;
        employee.paymentHandler = req.body.paymentHandler && req.body.paymentHandler;
        employee.deliveryHandler = req.body.deliveryHandler && req.body.deliveryHandler;
        employee.requestHandler = req.body.requestHandler && req.body.requestHandler;
        employee.maxAssignments = req.body.maxAssignments && req.body.maxAssignments;
    }
    const employeeUpdated = await employee.save();

    if (employeeUpdated) {
        return res.status(200).send({ message: "Employee has been updated!", data: employeeUpdated })
    }
    return res.status(500).send({
        message: "Error in updating Employee!"
    })
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const employeeDeleted = await Employee.findByIdAndRemove(req.params.id)
    if (employeeDeleted) {
        return res.status(200).send({ message: "Employee has been deleted!", data: employeeDeleted });
    }
    return res.status(500).send({
        message: "Error in deleting Employee!"
    })
});

export default router;