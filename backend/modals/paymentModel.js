import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    active: { type: Boolean, required: true, default: false },
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false },
    last_edited: { type: Date, required: false },
    edited_by: { type: String, required: false },
    zone: { type: Array, required: false, default: [] },
    title: { type: String, required: false },
    type: { type: Array, required: false, default: [] },
    rateType: { type: String, required: false },
    flatRate: { type: Number, required: false },
    rates: {
        type: [{
            basedOn: { type: String, required: false },
            min: { type: Number, required: false },
            max: { type: Number, required: false },
            rate: { type: Number, required: false },
        }], required: false
    }
})

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;