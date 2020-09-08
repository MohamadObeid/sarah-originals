import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    active: { type: Boolean, required: true, default: false },
    creation_date: { type: Date, required: true, default: Date.now },
    created_by: { type: String, required: true, default: '' },
    created_by_id: { type: String, required: false },
    modified: {
        type: [{
            modified_date: { type: Date, required: false },
            modified_by: { type: String, required: false },
            modified_note: { type: String, required: false },
        }], required: false, default: []
    },
    users: {
        type: [{
            id: { type: String, required: false },
            name: { type: String, required: false },
            image: { type: String, required: false },
            isAgent: { type: Boolean, required: false, default: false },
            typing: { type: Boolean, required: false, default: false },
        }], required: false
    },
    endDate: { type: Date, required: false, default: undefined },
    rate: { type: String, required: false },
    rateNote: { type: String, required: false },
})

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;