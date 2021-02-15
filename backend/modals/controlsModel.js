import mongoose from "mongoose"

const titleSchema = {
    title: String,
    description: String,
    icon: {
        name: String,
        code: String
    }
}

const controlsSchema = new mongoose.Schema({
    active: Boolean,
    name: { type: String, unique: true },
    HomeScreen: [{
        active: Boolean,
        name: String,
        title: titleSchema,
        styles: {
            desktop: {
                _id: String,
                type: { type: String },
                name: String,
            }
        },

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
        },

        slider: [{
            name: String,
            title: titleSchema,

            collections: {
                type: { type: String },
                collections: [String],
                limit: { type: Number, default: 10 },
                sort: { type: String, default: 'Recent' },
            },

            controllable: Boolean,
            controller: Boolean,
            action: String,
            controls: {
                event: String,
                getFrom: String,
                trigger: Array,
                read: Array,
                title: titleSchema,
                collections: {
                    type: { type: String },
                    collections: [String],
                    limit: { type: Number, default: 10 },
                    sort: { type: String, default: 'Recent' },
                }
            },

            slide: [{
                name: String,
                title: titleSchema,

                isDefault: Boolean,
                controllable: Boolean,
                controller: Boolean,
                action: String,
                controls: {
                    event: String,
                    getFrom: String,
                    trigger: Array,
                    read: Array,
                    title: titleSchema,
                    collections: {
                        type: { type: String },
                        collections: [String],
                        limit: { type: Number, default: 10 },
                        sort: { type: String, default: 'Recent' },
                    }
                },
            }],

            slides: [{
                name: String,
                src: String,
                link: String
            }]

        }]
    }]
})

export default mongoose.model("Controls", controlsSchema)