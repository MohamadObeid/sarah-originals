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
    employeeName: { type: String, required: false },
    employeeImage: { type: String, required: false },
    date: { type: String, required: false },
    workTimeHours: { type: String, required: false },
    workHoursRecorded: { type: String, required: false },
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
    },
    checkout: {
        workTime: { type: String, required: false },
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
    },
    absence: {
        isAbsent: { type: Boolean, required: false },
        reason: { type: String, required: false },
    },
    request: {
        type: [{
            date: { type: String, required: false },
            manager: { type: String, required: false },
            text: { type: String, required: false },
            answer: { type: String, required: false },
            status: { type: String, required: false },
        }], required: false
    },

    note: { type: String, required: false },
})

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance

// request status: unread, read, approved, rejected, canceled