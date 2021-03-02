import mongoose from "mongoose"

const websiteSchema = new mongoose.Schema({
    active: Boolean,
    name: { type: String, unique: true },
    subDomain: String,
    customDomain: String,
    defaults: [{
        name: String,
        type: { type: String },
    }]
})

export default mongoose.model("Website", websiteSchema)