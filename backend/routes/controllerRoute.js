import express from "express"
import Controller from "../modals/controllerModel"
import { isAuth, isAdmin } from '../util'

const router = express.Router()

router.post("/get", async (req, res) => {

    if (req.body._id) {

        const conditions = { _id: req.body._id }
        const controller = await Controller.findOne(conditions)
        if (controller) return res.send(controller)
        else return res.send({ message: 'Controller is not Available!' })

    } else {
        const controllerList = await Controller.find({})
        if (controllerList) return res.send(controllerList)
        else return res.send({ message: 'Controller is not Available!' })
    }
})

/*router.put("/put", isAuth, isAdmin, async (req, res) => {
    const { _id, ...updatedController } = req.body
    const options = { new: true }
    const controllerUpdated = await Controller.findByIdAndUpdate(_id, updatedController, options)

    if (controllerUpdated)
        return res.status(200)
            .send({ message: "Controller has been updated!", data: controllerUpdated })

    return res.status(500)
        .send({ message: "Error in updating Controller!" })
})*/

router.post("/save", isAuth, isAdmin, async (req, res) => {
    var controllerSaved

    if (Array.isArray(req.body)) { // save multiple controllers
        const controllerList = []

        req.body.map(async controller => {
            const index = req.body.indexOf(controller)
            controllerSaved = false

            if (controller._id) { // update a Controller
                const { _id, ...updatedController } = controller
                const conditions = { _id }
                const options = { new: true }

                controllerSaved = await Controller.findOneAndUpdate(conditions, updatedController, options)
                if (controllerSaved) controllerList[index] = controllerSaved
                else {
                    // if screen box doesnot exist create a new screen Box
                    const newController = new Controller(updatedController)
                    controllerSaved = await newController.save()
                    controllerList[index] = controllerSaved
                }

                if (!controllerList.includes(undefined) && controllerList.length === req.body.length) {
                    if (controllerSaved) return res.send({ message: "Controller has been created!", data: controllerList })
                    return res.send({ message: "Error in creating Controller!" })
                }

            } else {// create a new screen Box
                const newController = new Controller(controller)
                controllerSaved = await newController.save()
                controllerList[index] = controllerSaved

                if (!controllerList.includes(undefined) && controllerList.length === req.body.length) {
                    return res.send({ message: "Controller has been created!", data: controllerList })
                    // return res.send({ message: "Error in creating Controller!" })
                }
            }
        })

    } else {
        if (req.body._id) {
            const { _id, ...updatedController } = box
            const conditions = { _id }
            const options = { new: true }

            controllerSaved = await Controller.findOneAndUpdate(conditions, updatedController, options)
            if (!controllerSaved) {
                // if controller doesnot exist create a new controller
                const newController = new Controller(updatedController)
                controllerSaved = await newController.save()
            }

            if (controllerSaved) return res.send({ message: "Controller has been created!", data: controllerSaved })
            return res.send({ message: "Error in creating Controller!" })

        } else {
            const newController = new Controller(req.body)
            controllerSaved = await newController.save()

            if (controllerSaved) return res.send({ message: "Controller has been created!", data: controllerSaved })
            return res.send({ message: "Error in creating Controller!" })
        }
    }
})

router.post("/delete", isAuth, isAdmin, async (req, res) => {
    var controllerDeleted

    if (Array.isArray(req.body)) {
        const controllerList = []

        req.body.map(async _id => {
            const index = req.body.indexOf(_id)
            const conditions = { _id }

            controllerDeleted = await Controller.findOneAndRemove(conditions)
            controllerList[index] = controllerDeleted

            if (!controllerList.includes(undefined) && controllerList.length === req.body.length) {
                return res.send({ message: "Controller has been deleted!", data: controllerList })
                //return res.send({ message: "Error in deleting Controller!" })
            }
        })

    } else {
        if (req.body.deleteAll) {
            const controllers = await Controller.find({})
            const controllerList = []

            controllers.map(async controller => {
                const _id = controller._id
                const conditions = { _id }
                const index = controllers.indexOf(controller)

                controllerDeleted = await Controller.findOneAndRemove(conditions)
                controllerList[index] = controllerDeleted

                if (!controllerList.includes(undefined) && controllerList.length === controllers.length) {
                    return res.send({ message: "Controller has been deleted!", data: controllerList })
                    //return res.send({ message: "Error in deleting Controller!" })
                }
            })

        } else {
            const conditions = { _id: req.body._id }
            controllerDeleted = await Controller.findOneAndRemove(conditions)
            if (controllerDeleted)
                return res.send({ message: "Controller has been deleted!", data: controllerDeleted })
            return res.send({ message: "Error in deleting Controller!" })
        }
    }
})

/*router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const controllerDeleted = await Controller.findByIdAndRemove(req.params.id)

    if (controllerDeleted)
        return res.status(200).send({ message: "Controller has been deleted!", data: controllerDeleted });
    return res.send({ message: "Error in deleting Controller!" })
})*/

export default router