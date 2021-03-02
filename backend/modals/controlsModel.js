import mongoose from "mongoose"

const controlsSchema = new mongoose.Schema({
    active: Boolean,
    name: { type: String, unique: true },
})

export default mongoose.model("Controls", controlsSchema)