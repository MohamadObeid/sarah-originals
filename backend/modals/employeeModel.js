import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
    active: { type: Boolean, required: true, default: false },
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false, default: '' },
    modified: {
        type: [{
            modified_date: { type: Date, required: false, default: '' },
            modified_by: { type: String, required: false, default: '' },
            modified_note: { type: Array, required: false, default: [] },
        }], required: false, default: []
    },
    title: { type: String, required: true, default: '' },
    firstName: { type: String, required: true, default: '' },
    lastName: { type: String, required: true, default: '' },
    image: { type: String, required: true, default: '' },
    email: { type: String, required: true, default: '' },
    phone: { type: Number, required: true, default: null },
    dob: {
        day: { type: String, required: false, default: '' },
        month: { type: String, required: false, default: '' },
        year: { type: String, required: false, default: '' },
    },
    address: { type: String, required: true, default: '' },
    maritalStatus: { type: String, required: false, default: '' },
    drivingLicense: { type: Array, required: false, default: [] },
    jobPosition: { type: String, required: true, default: '' },
    jobDescription: { type: String, required: true, default: '' },
    facebook: { type: String, required: false, default: '' },
    instagram: { type: String, required: false, default: '' },
    youtube: { type: String, required: false, default: '' },
    interests: { type: Array, required: true, default: [] },
    contract: {
        validity: {
            month: { type: String, required: false },
            year: { type: String, required: false },
        },
        startDate: {
            day: { type: String, required: false },
            month: { type: String, required: false },
            year: { type: String, required: false },
        },
        endDate: {
            day: { type: String, required: false },
            month: { type: String, required: false },
            year: { type: String, required: false },
        },
    },

    salary: {
        type: { type: String, required: false },
        rate: { type: String, required: false },
        overTimeType: { type: String, required: false },
        overTimeRate: { type: String, required: false },
        commissionType: { type: String, required: false },
        commissionRate: { type: String, required: false },
    },

    workTime: {
        mon: {
            from: { type: String, required: false },
            to: { type: String, required: false }
        },
        tue: {
            from: { type: String, required: false },
            to: { type: String, required: false }
        },
        wed: {
            from: { type: String, required: false },
            to: { type: String, required: false }
        },
        thu: {
            from: { type: String, required: false },
            to: { type: String, required: false }
        },
        fri: {
            from: { type: String, required: false },
            to: { type: String, required: false }
        },
        sat: {
            from: { type: String, required: false },
            to: { type: String, required: false }
        },
        sun: {
            from: { type: String, required: false },
            to: { type: String, required: false }
        }
    },
    note: { type: String, required: false },
})

const Employee = mongoose.model("Employee", employeeSchema)

export default Employee

//salary type: hourly, monthly, assignment
//availability type: Full-Time, partial-time, assignment
//assignment title: order, delivery, payment
//assignment status: ongoing, completed, canceled

//active, name, phone, jobTitle, employed(green/grey), assignments(green/grey), available(green/grey), actions(history, assignments, Show More)

//merge assignment to another employee