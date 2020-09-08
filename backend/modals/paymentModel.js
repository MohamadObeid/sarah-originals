import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    active: { type: Boolean, required: true, default: false },
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false, default: '' },
    last_edited: { type: Date, required: false, default: '' },
    edited_by: { type: String, required: false, default: '' },
    zone: { type: Array, required: true, default: [] },
    title: { type: String, required: true, default: '' },
    type: { type: String, required: true, default: '' },
    rateType: { type: String, required: true, default: 'Flat' },
    flatRate: { type: Number, required: true, default: 0 },
    rates: {
        type: [{
            basedOn: { type: String, required: true, default: '' },
            min: { type: Number, required: true, default: null },
            max: { type: Number, required: true, default: null },
            rate: { type: Number, required: true, default: null },
        }], required: true, default: []
    }
})

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;