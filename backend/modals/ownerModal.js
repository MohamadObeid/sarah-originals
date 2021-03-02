import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
    name: String,
    familyName: String,
    companyName: String,
    phone: String,
    website: [String]
});

const ownerModel = mongoose.model("Owner", ownerSchema);

export default ownerModel
