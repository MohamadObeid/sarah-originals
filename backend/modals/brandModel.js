import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    active: { type: Boolean, required: false, default: false },
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false, default: '' },
    modified: {
        type: [{
            modified_date: { type: Date, required: false, default: '' },
            modified_by: { type: String, required: false, default: '' },
            modified_note: { type: Array, required: false, default: [] },
        }], required: false, default: []
    },
    name: { type: String, required: true },
    origin: { type: String, required: false, default: '' },
    supplier: { type: String, required: false, default: '' },
    phone: { type: Number, required: false },
    image: { type: String, required: false },
    description: { type: String, required: true, default: '' },
})

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;