import express from "express"
import Controls from "../modals/controlsModel"
import { isAuth, isAdmin } from '../util'

const router = express.Router()

router.post("/get", async (req, res) => {
    const { _id, name } = req.body
    const limit = req.body.limit || 100
    const fields = req.body.fields || null
    const skip = 0

    if (_id || name) {

        const conditions = { $or: [{ _id }, { name }] }
        const controls = await Controls.findOne(conditions, fields)
        if (controls) return res.send(controls)
        else return res.send({ message: 'Controls are not Available!' })

    } else {

        const conditions = { active: true }
        const controls = await Controls.findOne(conditions, fields, { HomeScreen: { $slice: [skip, limit] } })
        if (controls) return res.send(controls)
        else return res.send({ message: 'Controls are not Available!' })
    }
})

router.post("/save", isAuth, isAdmin, async (req, res) => {
    try {
        var controlsSaved
        var message

        if (Array.isArray(req.body)) { // save multiple Controls
            const controlsList = []

            req.body.map(async (controls, index) => {
                controlsSaved = false

                if (controls._id || controls.name) { // update a controls
                    const { _id, name, ...updatedcontrols } = controls
                    const conditions = { $or: [{ _id }, { name }] }
                    const options = { new: true }

                    controlsSaved = await Controls.findOneAndUpdate(conditions, updatedcontrols, options)
                    if (controlsSaved) {
                        controlsList[index] = controlsSaved
                        message = 'Controls has been updated!'

                    } else {
                        // if screen box doesnot exist create a new screen Box
                        const newcontrols = new Controls({ ...updatedcontrols, name })
                        controlsSaved = await newcontrols.save()
                        controlsList[index] = controlsSaved
                        message = "Controls has been created!"
                    }

                    if (!controlsList.includes(undefined) && controlsList.length === req.body.length) {
                        if (controlsSaved) return res.send({ message, data: controlsList })
                        return res.send({ message: "Error in creating Controls!" })
                    }

                } else {// create a new screen Box
                    const newcontrols = new Controls(controls)
                    controlsSaved = await newcontrols.save()
                    controlsList[index] = controlsSaved
                    message = 'Controls has been created'

                    if (!controlsList.includes(undefined) && controlsList.length === req.body.length) {
                        return res.send({ message, data: controlsList })
                        // return res.send({ message: "Error in creating controls!" })
                    }
                }
            })

        } else {
            if (req.body._id || req.body.name) { // there exist _id or name

                const { _id, name, ...updatedcontrols } = req.body
                const conditions = { $or: [{ _id }, { name }] }
                const options = { new: true }

                controlsSaved = await Controls.findOneAndUpdate(conditions, updatedcontrols, options)
                if (controlsSaved) message = 'Controls has been updated!'
                else {
                    // if controls doesnot exist create a new controls
                    const newcontrols = new Controls({ ...updatedcontrols, name })
                    controlsSaved = await newcontrols.save()
                    message = 'Controls has been created!'
                }

            } else { // no _id
                const newcontrols = new Controls(req.body)
                controlsSaved = await newcontrols.save()
                message = 'Controls has been created!'
            }

            if (controlsSaved) return res.send({ message, data: controlsSaved })
            return res.send({ message: "Error in creating Controls!" })
        }
    } catch (err) { console.log(err) }
})

router.post("/delete", isAuth, isAdmin, async (req, res) => {
    var controlsDeleted

    if (Array.isArray(req.body)) {
        const controlsList = []

        req.body.map(async (_id, index) => {

            const conditions = { _id }
            controlsDeleted = await Controls.findOneAndRemove(conditions)
            controlsList[index] = controlsDeleted

            if (!controlsList.includes(undefined) && controlsList.length === req.body.length) {
                return res.send({ message: "controls has been deleted!", data: controlsList })
                //return res.send({ message: "Error in deleting controls!" })
            }
        })

    } else {
        if (req.body.deleteAll) {
            const deletedControls = await Controls.find({})
            const controlsList = []

            deletedControls.map(async (controls, index) => {
                const _id = controls._id
                const conditions = { _id }

                controlsDeleted = await Controls.findOneAndRemove(conditions)
                controlsList[index] = controlsDeleted

                if (!controlsList.includes(undefined) && controlsList.length === deletedControls.length) {
                    return res.send({ message: "controls has been deleted!", data: controlsList })
                }
            })

        } else {
            const conditions = { _id: req.body._id }
            controlsDeleted = await Controls.findOneAndRemove(conditions)
            if (controlsDeleted)
                return res.send({ message: "Controls has been deleted!", data: controlsDeleted })
            return res.send({ message: "Error in deleting Controls!" })
        }
    }
})

export default router