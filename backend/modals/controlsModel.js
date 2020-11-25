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
        },
        height: { type: String, required: false },
    },
    navigationBar: {
        mainHeader: {
            title: { type: String, required: false },
        },
        headers: {
            content: {
                type: [{
                    title: { type: String, required: false },
                    icon: { type: String, required: false },
                }], required: false
            },
            borderColor: { type: String, required: false },
            fontSize: { type: String, required: false },
            padding: { type: String, required: false },
        },
        searchBar: {
            mostSearchedWords: { type: Array, required: false },
        }
    },
    productRibbonVisible: { type: Boolean, required: false },
    productRibbon: {
        title: { type: String, required: false },
        backgroundColor: { type: Array, required: false },
        products: {
            type: [{
                nameEn: { type: String, required: false },
                image: { type: String, required: false }
            }], required: false
        }
    }
})

const Controls = mongoose.model("Controls", controlsSchema);

export default Controls;