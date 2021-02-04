import mongoose from "mongoose"

const titleSchema = {
    title: String,
    description: String
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
        control: {
            event: String,
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
            control: {
                event: String,
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

                controllable: Boolean,
                controller: Boolean,
                action: String,
                control: {
                    event: String,
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