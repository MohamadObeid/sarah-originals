import mongoose from "mongoose"

const attendanceSchema = new mongoose.Schema({
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false, default: '' },
    modified: {
        type: [{
            modified_date: { type: Date, required: false, default: '' },
            modified_by: { type: String, required: false, default: '' },
            modified_note: { type: Array, required: false, default: [] },
        }], required: false, default: []
    },
    employeeId: { type: String, required: true, default: '' },
    employeeName: { type: String, required: true, default: '' },
    date: { type: String, required: true, default: '' },
    weekDay: { type: String, required: true, default: '' },
    checkin: {
        time: { type: String, required: false, default: '' },
        location: { type: Date, required: false, default: '' },
        lateness: {
            hours: { type: String, required: false, default: '' },
            reason: { type: String, required: false, default: '' },
        },
        overTime: {
            hours: { type: String, required: false, default: '' },
            reason: { type: String, required: false, default: '' },
        },
        request: {
            time: { type: String, required: false, default: '' },
            reason: { type: String, required: false, default: '' },
            confirmed: { type: Boolean, required: false, default: false }
        }
    },
    checkout: {
        time: { type: Date, required: false, default: '' },
        location: { type: Date, required: false, default: '' },
        earliness: {
            hours: { type: String, required: true, default: '' },
            reason: { type: String, required: true, default: '' },
        },
        overTime: {
            hours: { type: String, required: true, default: '' },
            reason: { type: String, required: true, default: '' },
        },
        request: {
            time: { type: String, required: false, default: '' },
            reason: { type: String, required: false, default: '' },
            confirmed: { type: Boolean, required: false, default: false }
        }
    },
    absence: {
        date: { type: Date, required: false, default: '' },
        reason: { type: String, required: true, default: '' },
        request: {
            reason: { type: String, required: false, default: '' },
            confirmed: { type: Boolean, required: false, default: false }
        }
    },
    note: { type: String, required: true, default: '' },
})

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance