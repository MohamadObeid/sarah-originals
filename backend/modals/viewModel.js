import mongoose from "mongoose"

const titleSchema = {
    title: String,
    description: String,
    icon: {
        name: String,
        code: String
    }
}

const controls = {
    controllable: Boolean,
    controller: Boolean,
    action: String,
    controls: {
        event: String, // click, hover
        getFrom: String, // content, controls, none
        trigger: Array, // [slideWrapper, slideTitle, slideImage, slideButton,       sliderWrapper, sliderTitle, sliderImage, sliderButton,       magicBoxWrapper, magicBoxTitle, magicBoxImage, magicBoxButton          , autoPlay]
        read: Array, // [slides, title, styles]
        title: titleSchema,
        collections: {
            type: { type: String },
            collections: [String],
            limit: { type: Number, default: 10 },
            sort: { type: String, default: 'Recent' },
        }
    }
}

const viewSchema = new mongoose.Schema({
    active: Boolean,

    name: String,
    title: titleSchema,
    ...controls,

    slider: [{
        name: String,
        title: titleSchema,
        ...controls,

        collections: {
            type: { type: String },
            collections: [String],
            limit: { type: Number, default: 10 },
            sort: { type: String, default: 'Recent' },
        },

        slide: [{
            isDefault: Boolean,
            name: String,
            title: titleSchema,
            ...controls,
        }],

        slides: [{
            name: String,
            src: String,
            link: String
        }]

    }]
})

export default mongoose.model("View", viewSchema)