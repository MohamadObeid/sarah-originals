import mongoose from "mongoose"

const assignmentSchema = new mongoose.Schema({
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
    assignedTo: { type: String, required: true, default: '' },
    assignedBy: { type: String, required: true, default: '' },
    deadline: {
        dueDate: { type: Date, required: true, default: '' },
        status: { type: String, required: true, default: '' },
    },
    title: { type: String, required: true, default: '' },
    orderId: { type: String, required: true, default: '' },
    orderDate: { type: Date, required: false, default: '' },
    description: { type: String, required: true, default: '' },
    note: { type: Array, required: true, default: [] },
    closedDate: { type: Date, required: true, default: '' },
    status: { type: String, required: true, default: '' },
})

const Assignment = mongoose.model("Assignment", assignmentSchema)

export default Assignment

//assignment title: order, delivery, payment
//assignment status: ongoing, completed, canceled
//deadline status: available, overdue, duetoday
//merge assignment to another employee