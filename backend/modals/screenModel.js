import mongoose from "mongoose"

const screenSchema = new mongoose.Schema({
    active: Boolean,
    viewPort: String,
    name: String,
    path: { type: String, unique: true, required: true },
    exact: { type: Boolean, default: false },
    viewList: [{
        name: String,
        styles: String
    }]
})

export default mongoose.model("Screen", screenSchema)