import mongoose from "mongoose"

const titleSchema = {
    title: String,
    description: String
}

const controlsSchema = new mongoose.Schema({
    active: Boolean,
    name: { type: String, unique: true },
    actionNote: {
        active: Boolean,
        styles: {
            desktop: {
                _id: String,
                type: String,
                name: String,
            }
        }
    },
    HomeScreen: [{
        active: Boolean,
        name: String,
        title: titleSchema,
        controllable: Boolean,
        controlAction: String,

        styles: {
            desktop: {
                _id: String,
                type: { type: String },
                name: String,
            }
        },

        slider: [{
            title: titleSchema,
            control: {
                controllable: Boolean,
                commander: Boolean,
                action: String,
            },

            collections: {
                type: { type: String },
                collections: [String],
                limit: { type: Number, default: 10 },
                sort: { type: String, default: 'Recent' },
            },

            slides: [{
                title: String,
                src: String,
                link: String
            }]

        }]
    }]
})

export default mongoose.model("Controls", controlsSchema)