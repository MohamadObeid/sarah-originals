import mongoose from "mongoose";

const liveUserSchema = new mongoose.Schema({
    startDate: { type: Date, required: false },
    chatId: { type: Array, required: false },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    agent: { type: Array, required: false, default: undefined }
})

const LiveUser = mongoose.model("LiveUser", liveUserSchema);
export default LiveUser;