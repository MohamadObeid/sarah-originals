import mongoose from "mongoose"

const assignmentSchema = new mongoose.Schema({
    active: { type: Boolean, required: false, default: true },
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false },
    /*modified: {
        type: [{
            modified_date: { type: Date, required: false, default: '' },
            modified_by: { type: String, required: false, default: '' },
            modified_note: { type: Array, required: false, default: [] },
        }], required: false, default: []
    },*/
    orderId: { type: String, required: false },
    type: { type: String, required: false }, // payment, delivery, cart
    dueDate: { type: Date, required: false },
    employeeName: { type: String, required: false },
    employeeId: { type: String, required: false },
    employeeImage: { type: String, required: false },
    assignedby: { type: String, required: false },
    status: { type: String, required: false }, // accepted, rejected, canceled
    note: {
        type: [{
            name: { type: String, required: false },
            text: { type: String, required: false },
            date: { type: String, required: false },
        }], required: false, default: []
    },
    closedDate: { type: Date, required: false },
})

const Assignment = mongoose.model("Assignment", assignmentSchema)

export default Assignment

//assignment status: ongoing, completed, canceled, rejected
//deadline status: available, overdue, duetoday
//merge assignment to another employee