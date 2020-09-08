import express from "express";
import LiveUser from "../modals/liveUserModel";

// Live Chat

const router = express.Router();

router.get("", async (req, res) => {
    const liveUser = await LiveUser.find({});
    res.send(liveUser);
});

router.get("/:id", async (req, res) => {
    const liveUserId = req.params.id
    const liveUser = await LiveUser.find({ _id: liveUserId });
    res.send(liveUser);
});

router.post("", async (req, res) => {
    const liveUser = new LiveUser(req.body)
    const newLiveUser = await liveUser.save()
    if (newLiveUser) {
        return res.status(201).send({ message: "Live User Created!", data: newLiveUser })
    }
    return res.status(500).send({
        message: "Error in Creating Live User!"
    })
});

router.put("/:id", async (req, res) => {
    const liveUser = await LiveUser.findOne({ _id: req.params.id });
    if (liveUser) {
        liveUser.startDate = req.body.startDate && req.body.startDate;
        liveUser.chatId = req.body.chatId && req.body.chatId;
        liveUser.userId = req.body.userId && req.body.userId;
        liveUser.userName = req.body.userName && req.body.userName;
        liveUser.agent = req.body.agent && req.body.agent;
    }
    const liveUserUpdated = await liveUser.save();

    if (liveUserUpdated) {
        return res.status(200).send({
            message: "Live User has been updated!",
            data: liveUserUpdated
        })
    }
    return res.status(500).send({
        message: "Error in updating Live User!"
    })
});

router.delete("/:id", async (req, res) => {
    const liveUserDeleted = await LiveUser.findByIdAndRemove(req.params.id)
    if (liveUserDeleted) {
        return res.status(200).send({ message: "Live User has been deleted!", data: liveUserDeleted });
    }
    return res.status(500).send({
        message: "Error in deleting Live User!"
    })
});

export default router;