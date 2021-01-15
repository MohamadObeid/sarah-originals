import mongoose from "mongoose";

const controllerSchema = new mongoose.Schema({
    active: Boolean,
    HomeScreenBoxes: {
        type: [{
            active: Boolean,
            screenBox_id: String,
            type: { type: String },
            name: String,
            limit: { type: Number, default: 10 },
            sort: { type: String, default: 'Recent' },
            collections: Array,
        }]
    }
})

const Controller = mongoose.model("Controller", controllerSchema);

export default Controller;