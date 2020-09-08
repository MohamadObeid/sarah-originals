import express from "express";
import Chat from "../modals/chatModel";

const router = express.Router();

router.get("", async (req, res) => {
    const chat = await Chat.find({});
    res.send(chat);
});

router.get("/:id", async (req, res) => {
    const chatId = req.params.id
    const chat = await Chat.find({ _id: chatId });
    res.send(chat);
});

router.post("", async (req, res) => {
    const chat = new Chat(req.body)
    const newChat = await chat.save()
    if (newChat) {
        return res.status(201).send({ message: "New Chat Text created!", data: newChat })
    }
    return res.status(500).send({
        message: "Error in creating Chat Text!"
    })
});

router.put("/:id", async (req, res) => {
    const chat = await Chat.findOne({ _id: req.params.id });
    if (chat) {
        chat.active = req.body.active && req.body.active;
        chat.creation_date = req.body.creation_date && req.body.creation_date;
        chat.created_by = req.body.created_by && req.body.created_by;
        chat.created_by_id = req.body.created_by_id && req.body.created_by_id;
        chat.modified = req.body.modified && req.body.modified;
        chat.users = req.body.users && req.body.users;
        chat.endDate = req.body.endDate && req.body.endDate;
        chat.rate = req.body.rate && req.body.rate;
        chat.rateNote = req.body.rateNote && req.body.rateNote;
    }
    const chatUpdated = await chat.save();

    if (chatUpdated) {
        return res.status(200).send({
            message: chatUpdated.endDate ? 'Chat has been Ended!' : "Chat Text has been updated!",
            data: chatUpdated.endDate ? undefined : chatUpdated
        })
    }
    return res.status(500).send({
        message: "Error in updating Chat Text!"
    })
});

router.delete("/:id", async (req, res) => {
    const chatDeleted = await Chat.findByIdAndRemove(req.params.id)
    if (chatDeleted) {
        return res.status(200).send({ message: "Chat has been deleted!", data: chatDeleted });
    }
    return res.status(500).send({
        message: "Error in deleting Chat!"
    })
});

export default router;