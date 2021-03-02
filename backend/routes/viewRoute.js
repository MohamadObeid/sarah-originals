import express from "express"
import View from "../modals/viewModel"
import { isAuth, isAdmin } from '../util'

const router = express.Router()

router.post("/get", async (req, res) => {
    try {
        const { _id, name, website } = req.body
        const limit = req.body.limit || 100
        const fields = req.body.fields || null
        const skip = 0

        if (_id || name) {

            // get view that have 
            const conditions = { $and: [{ $or: [{ _id }, { name }] }, { website }] }
            const view = await View.findOne(conditions, fields)
            if (view) return res.send(view)
            else return res.send({ message: 'View is not Available!' })

        } else {

            const conditions = { $and: [{ active }, { website }] }
            const view = await View.find(conditions, fields, { $slice: [skip, limit] })
            if (view) return res.send(view)
            else return res.send({ message: 'Views are not Available!' })

        }
    } catch (err) { console.log(err) }
})

router.post("/save", isAuth, isAdmin, async (req, res) => {
    try {
        var viewSaved
        var message

        if (Array.isArray(req.body)) { // save multiple View
            const viewList = []

            req.body.map(async (view, index) => {
                viewSaved = false

                if (view._id || view.name) { // update a View
                    const { _id, name, website, ...updatedView } = view
                    const conditions = { $and: [{ $or: [{ _id }, { name }] }, { website }] }
                    const options = { new: true }

                    viewSaved = await View.findOneAndUpdate(conditions, updatedView, options)

                    if (viewSaved) {
                        viewList[index] = viewSaved
                        message = 'View has been updated!'

                    } else {
                        // if screen box doesnot exist create a new screen Box
                        const newView = new View({ ...updatedView, name, website })
                        viewSaved = await newView.save()
                        viewList[index] = viewSaved
                        message = "View has been created!"
                    }

                    if (!viewList.includes(undefined) && viewList.length === req.body.length) {
                        if (viewSaved) return res.send({ message, data: viewList })
                        return res.send({ message: "Error in creating View!" })
                    }

                } else {// create a new screen Box

                    const newView = new View(view)
                    viewSaved = await newView.save()
                    viewList[index] = viewSaved
                    message = 'View has been created'

                    if (!viewList.includes(undefined) && viewList.length === req.body.length) {
                        return res.send({ message, data: viewList })
                        // return res.send({ message: "Error in creating View!" })
                    }
                }
            })

        } else {
            if (req.body._id || req.body.name) { // there exist _id or name

                const { _id, name, website, ...updatedView } = req.body
                const conditions = { $and: [{ $or: [{ _id }, { name }] }, { website }] }
                const options = { new: true }

                viewSaved = await View.findOneAndUpdate(conditions, updatedView, options)
                if (viewSaved) message = 'View has been updated!'
                else {
                    // if View doesnot exist create a new View
                    const newView = new View({ ...updatedView, name, website })
                    viewSaved = await newView.save()
                    message = 'View has been created!'
                }

            } else { // no _id
                const newView = new View(req.body)
                viewSaved = await newView.save()
                message = 'View has been created!'
            }

            if (viewSaved) return res.send({ message, data: viewSaved })
            return res.send({ message: "Error in creating View!" })
        }
    } catch (err) { console.log(err) }
})

router.post("/delete", isAuth, isAdmin, async (req, res) => {
    try {
        var viewDeleted

        if (Array.isArray(req.body)) {
            const viewList = []

            req.body.map(async (view, index) => {
                const { _id, name, website } = view
                const conditions = { $and: [{ $or: [{ _id }, { name }] }, { website }] }

                viewDeleted = await View.findOneAndRemove(conditions)
                viewList[index] = viewDeleted

                if (!viewList.includes(undefined) && viewList.length === req.body.length) {
                    return res.send({ message: "View has been deleted!", data: viewList })
                    //return res.send({ message: "Error in deleting View!" })
                }
            })

        } else {
            if (req.body.deleteAll) {

                const deletedView = await View.find({})
                const viewList = []

                deletedView.map(async (view, index) => {
                    const { _id, name } = view
                    const conditions = { $or: [{ _id }, { name }] }

                    viewDeleted = await View.findOneAndRemove(conditions)
                    viewList[index] = viewDeleted

                    if (!viewList.includes(undefined) && viewList.length === deletedView.length) {
                        return res.send({ message: "View has been deleted!", data: viewList })
                    }
                })

            } else {

                const { _id, name, website } = req.body
                const conditions = { $and: [{ $or: [{ _id }, { name }] }, { website }] }

                viewDeleted = await View.findOneAndRemove(conditions)
                if (viewDeleted)
                    return res.send({ message: "View has been deleted!", data: viewDeleted })
                return res.send({ message: "Error in deleting View!" })
            }
        }
    } catch (err) { console.log(err) }
})

export default router