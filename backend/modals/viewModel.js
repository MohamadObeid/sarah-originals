import mongoose from "mongoose"

const random = Math.floor(Math.random() * 10000000000000)

const titleSchema = {
    title: String,
    description: String,
    icon: {
        name: String,
        code: String
    }
}

const search = {
    type: { type: String },
    push: { key: String, className: [String] },
    collections: [String],
    keyword: [String],
    limit: { type: Number, default: 10 },
    skip: { type: Number, default: 0 },
    sort: { type: String, default: 'Recent' },
}

const controlsSchema = {
    controllable: Boolean,
    controller: Boolean,
    action: String,
    controls: [{
        slide: [String],
        action: String,
        route: String,
        event: String, // click, hover
        push: [String], // [slides, slide, title]
        trigger: { type: { type: String }, className: [String] },
        search: search
    }]
}

const viewSchema = new mongoose.Schema({
    active: Boolean,
    website: String,

    name: { type: String, required: true },
    title: titleSchema,
    ...controlsSchema,

    slider: [{
        name: String,
        title: titleSchema,
        search: search,
        ...controlsSchema,

        slide: [{
            name: String,
            title: titleSchema,
            src: String, // image
        }],
    }]
})

export default mongoose.model("View", viewSchema)