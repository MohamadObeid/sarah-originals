import express from "express"
import ScreenBox from "../modals/screenBoxModel"
import { isAuth, isAdmin } from '../util'

const router = express.Router()

router.post("/get", async (req, res) => {
    if (req.body._id) {

        const conditions = { _id: req.body._id }
        const screenBox = await ScreenBox.findOne(conditions)
        if (screenBox) return res.send(screenBox)
        else return res.send({ message: 'Screen Box is not Available!' })

    } else {
        const screenBoxList = await ScreenBox.find({})
        if (screenBoxList) return res.send(screenBoxList)
        else return res.send({ message: 'Screen Box is not Available!' })
    }
})

/*router.put("/put", isAuth, isAdmin, async (req, res) => {
    const { _id, ...updatedScreenBox } = req.body
    const options = { new: true }
    const screenBoxUpdated = await ScreenBox.findByIdAndUpdate(_id, updatedScreenBox, options)

    if (screenBoxUpdated)
        return res.status(200)
            .send({ message: "Screen Box has been updated!", data: screenBoxUpdated })

    return res.status(500)
        .send({ message: "Error in updating Screen Box!" })
})*/

router.post("/save", isAuth, isAdmin, async (req, res) => {
    var screenBoxSaved

    if (Array.isArray(req.body)) {
        const screenBoxList = []

        req.body.map(async box => {
            screenBoxSaved = false
            const index = req.body.indexOf(box)

            if (box._id) { // update a screen Box
                const { _id, ...updatedScreenBox } = box
                const conditions = { _id }
                const options = { new: true }

                screenBoxSaved = await ScreenBox.findOneAndUpdate(conditions, updatedScreenBox, options)
                if (screenBoxSaved) screenBoxList[index] = screenBoxSaved
                else {
                    // if screen box doesnot exist create a new screen Box
                    const newScreenBox = new ScreenBox(updatedScreenBox)
                    screenBoxSaved = await newScreenBox.save()
                    screenBoxList[index] = screenBoxSaved
                }

            } else { // create a new screen Box
                const screenBox = new ScreenBox(box)
                screenBoxSaved = await screenBox.save()
                screenBoxList[index] = screenBoxSaved
            }

            if (!screenBoxList.includes(undefined) && screenBoxList.length === req.body.length) {
                return res.send({ message: "Screen Box has been created!", data: screenBoxList })
                //return res.send({ message: "Error in creating Screen Box!" })
            }
        })

    } else {

        if (req.body._id) {
            const { _id, ...updatedScreenBox } = box
            const conditions = { _id }
            const options = { new: true }

            screenBoxSaved = await ScreenBox.findOneAndUpdate(conditions, updatedScreenBox, options)
            if (!screenBoxSaved) {
                // if screen box doesnot exist create a new screen Box
                const newScreenBox = new ScreenBox(updatedScreenBox)
                screenBoxSaved = await newScreenBox.save()
            }

        } else {
            const screenBox = new ScreenBox(req.body)
            screenBoxSaved = await screenBox.save()
        }

        if (screenBoxSaved) return res.send({ message: "Screen Box has been created!", data: screenBoxSaved })
        return res.send({ message: "Error in creating Screen Box!" })
    }
})

router.post("/delete", isAuth, isAdmin, async (req, res) => {
    var screenBoxDeleted

    if (Array.isArray(req.body)) {
        const screenBoxList = []

        req.body.map(async _id => {
            screenBoxSaved = false
            const index = req.body.indexOf(_id)
            const conditions = { _id }

            screenBoxDeleted = await ScreenBox.findOneAndRemove(conditions)
            screenBoxList[index] = screenBoxDeleted

            if (!screenBoxList.includes(undefined) && screenBoxList.length === req.body.length)
                return res.send({ message: "Screen Box has been deleted!", data: screenBoxList })

        })

    } else {

        if (req.body.deleteAll) {
            const screenBoxes = await ScreenBox.find({})
            const screenBoxList = []

            screenBoxes && screenBoxes.map(async screenBox => {
                const _id = screenBox._id
                const conditions = { _id }
                const index = screenBoxes.indexOf(screenBox)

                screenBoxDeleted = await ScreenBox.findOneAndRemove(conditions)
                screenBoxList[index] = screenBoxDeleted

                if (!screenBoxList.includes(undefined) && screenBoxList.length === screenBoxes.length)
                    return res.send({ message: "Screen Box has been deleted!", data: screenBoxList })

            })

        } else {
            const _id = req.body._id
            const conditions = { _id }

            screenBoxDeleted = await ScreenBox.findOneAndRemove(conditions)

            if (screenBoxDeleted)
                return res.send({ message: "Screen Box has been deleted!", data: screenBoxDeleted })
            return res.send({ message: "Error in deleting Screen Box!" })
        }
    }
})

/*router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const screenBoxDeleted = await ScreenBox.findByIdAndRemove(req.params.id);
    if (screenBoxDeleted)
        return res.status(200).send({ message: "Screen Box has been deleted!", data: screenBoxDeleted });

    return res.status(500)
        .send({ message: "Error in deleting Screen Box!" })
});*/

export default router