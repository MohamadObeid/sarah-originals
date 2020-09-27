import mongoose from "mongoose"

const attendanceSchema = new mongoose.Schema({
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false },
    modified: {
        type: [{
            modified_date: { type: Date, required: false },
            modified_by: { type: String, required: false },
            modified_note: { type: Array, required: false },
        }], required: false
    },
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    employeeImage: { type: String, required: false },
    date: { type: String, required: true },
    checkin: {
        workTime: { type: String, required: false },
        record: { type: String, required: false },
        location: { type: String, required: false },
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
            confirmation: { type: Boolean, required: false }
        }
    },
    checkout: {
        workTime: { type: Date, required: false },
        record: { type: String, required: false },
        location: { type: String, required: false },
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
            confirmation: { type: Boolean, required: false }
        }
    },
    absence: {
        reason: { type: String, required: false },
        request: {
            reason: { type: String, required: false },
            status: { type: String, required: false },
            confirmation: { type: Boolean, required: false }
        }
    },
    note: { type: String, required: false },
})

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance