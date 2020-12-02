import mongoose from "mongoose";

const controlsSchema = new mongoose.Schema({
    active: { type: Boolean, required: false },
    addToCartBtnsStyle: { type: String, required: false },
    homePageCollections: { type: Array, required: false },
    homePageViews: {
        type: [{
            type: { type: String, required: false },
            name: { type: String, required: false },
        }], required: false
    },
    // Top Ribbon
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
    // Navigation Bar
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
    // slide Ribbons
    slideRibbon: {
        type: [{
            name: { type: String, required: false },
            title: {
                title: { type: String, required: false },
                design: { type: String, required: false },
                backgroundColor: { type: String, required: false },
            },
            ribbon: {
                width: { type: String, required: false },
            },
            slide: {
                width: { type: String, required: false },
                border: { type: String, required: false },
                backgroundColor: { type: String, required: false },
                flexDirection: { type: String, required: false },
                title: {
                    display: { type: String, required: false },
                    justifyContent: { type: String, required: false },
                }
            },
            image: {
                maxHeight: { type: String, required: false },
                maxWidth: { type: String, required: false },
                containerHeight: { type: String, required: false },
                containerWidth: { type: String, required: false },
            },
            mobile: {
                ribbon: {
                    width: { type: String, required: false },
                },
                slide: {
                    width: { type: String, required: false },
                },
                image: {
                    maxHeight: { type: String, required: false },
                    maxWidth: { type: String, required: false },
                    containerHeight: { type: String, required: false },
                    containerWidth: { type: String, required: false },
                },
            },
            slides: {
                type: [{
                    _id: { type: String, required: false },
                    title: { type: String, required: false },
                    image: { type: String, required: false }
                }], required: false
            }
        }], required: false
    }
})

const Controls = mongoose.model("Controls", controlsSchema);

export default Controls;