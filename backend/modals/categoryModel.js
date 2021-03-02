import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    active: { type: Boolean, default: false, required: true },
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false, default: '' },
    last_edited: { type: Date, required: false, default: '' },
    edited_by: { type: String, required: false, default: '' },
    image: { type: String, required: false },
    name: { type: String, required: true },
    headCategory: { type: String, required: false, default: '' },
    isSubCategory: { type: Boolean, default: false, required: true },
    collections: [String],
    brand: { type: Array, required: true, default: [] },
    description: { type: String, required: true, default: '' },
})

const Category = mongoose.model("Category", categorySchema);

export default Category;