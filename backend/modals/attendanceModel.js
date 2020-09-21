import mongoose from "mongoose"

const attendanceSchema = new mongoose.Schema({
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false },
    modified: {
        type: [{
            modified_date: { type: Date, required: false },
            modified_by: { type: String, required: false },
            modified_note: { type: Array, required: false },
        }], required: false, default: []
    },
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    employeeImage: { type: String, required: false },
    date: { type: String, required: true },
    checkin: {
        time: { type: String, required: false },
        record: { type: String, required: false },
        location: { type: Date, required: false },
        lateness: {
            hours: { type: String, required: false },
            reason: { type: String, required: false },
        },
        overTime: {
            hours: { type: String, required: false },
            reason: { type: String, required: false },
        },
        request: {
            time: { type: String, required: false },
            reason: { type: String, required: false },
            status: { type: String, required: false },
            confirmation: { type: Boolean, required: false, default: false }
        }
    },
    checkout: {
        time: { type: Date, required: false },
        record: { type: String, required: false },
        location: { type: Date, required: false },
        earliness: {
            hours: { type: String, required: false },
            reason: { type: String, required: false },
        },
        overTime: {
            hours: { type: String, required: false },
            reason: { type: String, required: false },
        },
        request: {
            time: { type: String, required: false },
            reason: { type: String, required: false },
            status: { type: String, required: false },
            confirmation: { type: Boolean, required: false, default: false }
        }
    },
    absence: {
        reason: { type: String, required: true },
        request: {
            reason: { type: String, required: false, default: '' },
            status: { type: String, required: false },
            confirmation: { type: Boolean, required: false, default: false }
        }
    },
    note: { type: String, required: true, default: '' },
})

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance