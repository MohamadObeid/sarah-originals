import express from "express"
import Screen from "../modals/screenModel"
import { isAuth, isAdmin } from '../util'

const router = express.Router()

router.post("/get", async (req, res) => {
    const { _id, name, viewPort } = req.body
    const limit = req.body.limit || 100
    const fields = req.body.fields || null
    const skip = 0
    const active = true

    if (_id || name) {

        const conditions = { $and: [{ $or: [{ _id }, { name }] }, { viewPort }] }
        const screen = await Screen.findOne(conditions, fields)
        if (screen) return res.send(screen)
        else return res.send({ message: 'Screen are not Available!' })

    } else {

        const conditions = { $and: [{ active }, { viewPort }] }
        const screens = await Screen.find(conditions, fields, { viewList: { $slice: [skip, limit] } })

        if (screens) return res.send(screens)
        else return res.send({ message: 'Screen are not Available!' })
    }
})

router.post("/save", isAuth, isAdmin, async (req, res) => {
    try {
        var screenSaved
        var message

        if (Array.isArray(req.body)) { // save multiple screen
            const screenList = []

            req.body.map(async (screen, index) => {
                screenSaved = false

                if (Screen._id || Screen.name) { // update a screen
                    const { _id, name, viewPort, ...updatedscreen } = screen
                    const conditions = { $and: [{ $or: [{ _id }, { name }] }, { viewPort }] }
                    const options = { new: true }

                    screenSaved = await Screen.findOneAndUpdate(conditions, updatedscreen, options)
                    if (screenSaved) {
                        screenList[index] = screenSaved
                        message = 'Screen has been updated!'

                    } else {
                        // if screen box doesnot exist create a new screen Box
                        const newScreen = new Screen({ ...updatedscreen, name })
                        screenSaved = await newScreen.save()
                        screenList[index] = screenSaved
                        message = "Screen has been created!"
                    }

                    if (!screenList.includes(undefined) && screenList.length === req.body.length) {
                        if (screenSaved) return res.send({ message, data: screenList })
                        return res.send({ message: "Error in creating Screen!" })
                    }

                } else { // create a new screen Box
                    const newScreen = new Screen(screen)
                    screenSaved = await newScreen.save()
                    screenList[index] = screenSaved
                    message = 'Screen has been created'

                    if (!screenList.includes(undefined) && screenList.length === req.body.length) {
                        return res.send({ message, data: screenList })
                        // return res.send({ message: "Error in creating screen!" })
                    }
                }
            })

        } else {
            if (req.body._id || req.body.name) { // there exist _id or name

                const { _id, name, viewPort, ...updatedscreen } = req.body
                const conditions = { $and: [{ $or: [{ _id }, { name }] }, { viewPort }] }
                const options = { new: true }

                screenSaved = await Screen.findOneAndUpdate(conditions, updatedscreen, options)
                if (screenSaved) message = 'Screen has been updated!'
                else {
                    // if screen doesnot exist create a new screen
                    const newScreen = new Screen({ ...updatedscreen, name, viewPort })
                    screenSaved = await newScreen.save()
                    message = 'Screen has been created!'
                }

            } else { // no _id
                const newScreen = new Screen(req.body)
                screenSaved = await newScreen.save()
                message = 'Screen has been created!'
            }

            if (screenSaved) return res.send({ message, data: screenSaved })
            return res.send({ message: "Error in creating Screen!" })
        }
    } catch (err) { console.log(err) }
})

router.post("/delete", isAuth, isAdmin, async (req, res) => {
    var screenDeleted

    if (Array.isArray(req.body)) {
        const screenList = []

        req.body.map(async (screen, index) => {
            const { _id, name, viewPort } = screen
            const conditions = { $and: [{ $or: [{ _id }, { name }] }, { viewPort }] }

            screenDeleted = await Screen.findOneAndRemove(conditions)
            screenList[index] = screenDeleted

            if (!screenList.includes(undefined) && screenList.length === req.body.length) {
                return res.send({ message: "Screen has been deleted!", data: screenList })
                //return res.send({ message: "Error in deleting Screen!" })
            }
        })

    } else {
        if (req.body.deleteAll) {
            const deletedScreen = await Screen.find({})
            const screenList = []

            deletedScreen.map(async (screen, index) => {
                const _id = screen._id
                const conditions = { _id }

                screenDeleted = await Screen.findOneAndRemove(conditions)
                screenList[index] = screenDeleted

                if (!screenList.includes(undefined) && screenList.length === deletedScreen.length) {
                    return res.send({ message: "Screen has been deleted!", data: screenList })
                }
            })

        } else {
            const { _id, name, viewPort } = req.body
            const conditions = { $and: [{ $or: [{ _id }, { name }] }, { viewPort }] }
            screenDeleted = await Screen.findOneAndRemove(conditions)
            if (screenDeleted)
                return res.send({ message: "Screen has been deleted!", data: screenDeleted })
            return res.send({ message: "Error in deleting Screen!" })
        }
    }
})

export default router