import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({
    active: { type: Boolean, required: true, default: false },
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false, default: '' },
    last_edited: { type: Date, required: false, default: '' },
    edited_by: { type: String, required: false, default: '' },
    zone: { type: String, required: true, default: '' },
    region: { type: String, required: true, default: '' },
    latitude: { type: Number, required: true, default: 0 },
    longitude: { type: Number, required: true, default: 0 },
})

const Zone = mongoose.model("Zone", zoneSchema)

export default Zone;