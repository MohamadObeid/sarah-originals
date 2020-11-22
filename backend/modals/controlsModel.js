import mongoose from "mongoose";

const controlsSchema = new mongoose.Schema({
    addToCart: { type: String, required: false },
    homePageCollections: { type: Array, required: false },
    topRibbonVisible: { type: Boolean, required: false },
    topRibbon: {
        icon: { type: String, required: false },
        backgroundColor: { type: String, required: false },
        text: { type: String, required: false },
        fontSize: { type: String, required: false },
        mobile: {
            fontSize: { type: String, required: false },
        }
    }
})

const Controls = mongoose.model("Controls", controlsSchema);

export default Controls;