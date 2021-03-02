import express from "express"
import Website from "../modals/websiteModel"
import { isAuth, isAdmin } from '../util'

const router = express.Router()

router.post("/get", async (req, res) => {
    const { _id, name } = req.body
    const limit = req.body.limit || 100
    const fields = req.body.fields || null
    const skip = 0
    const active = true

    if (_id || name) {

        const conditions = { $or: [{ _id }, { name }] }
        const website = await Website.findOne(conditions, fields)
        if (website) return res.send(website)
        else return res.send({ message: 'Website is not Available!' })

    } else {

        const conditions = { active }
        const websites = await Website.find(conditions, fields, { viewList: { $slice: [skip, limit] } })

        if (websites) return res.send(websites)
        else return res.send({ message: 'Websites are not Available!' })
    }
})

router.post("/save", /*isAuth, isAdmin, */async (req, res) => {
    try {
        var websiteSaved
        var message

        if (Array.isArray(req.body)) { // save multiple website
            const websiteList = []

            req.body.map(async (website, index) => {
                websiteSaved = false

                if (website._id || website.name) { // update a website
                    const { _id, name, ...updatedWebsite } = website
                    const conditions = { $or: [{ _id }, { name }] }
                    const options = { new: true }

                    websiteSaved = await Website.findOneAndUpdate(conditions, updatedWebsite, options)
                    if (websiteSaved) {
                        websiteList[index] = websiteSaved
                        message = 'Website has been updated!'

                    } else {
                        // if website doesnot exist create a new Website
                        const newWebsite = new Website({ ...updatedWebsite, name })
                        websiteSaved = await newWebsite.save()
                        websiteList[index] = websiteSaved
                        message = "Website has been created!"
                    }

                    if (!websiteList.includes(undefined) && websiteList.length === req.body.length) {
                        if (websiteSaved) return res.send({ message, data: websiteList })
                        return res.send({ message: "Error in creating Website!" })
                    }

                } else { // create a new Website
                    const newWebsite = new Website(website)
                    websiteSaved = await newWebsite.save()
                    websiteList[index] = websiteSaved
                    message = 'Website has been created'

                    if (!websiteList.includes(undefined) && websiteList.length === req.body.length) {
                        return res.send({ message, data: websiteList })
                        // return res.send({ message: "Error in creating website!" })
                    }
                }
            })

        } else {
            if (req.body._id || req.body.name) { // there exist _id or name

                const { _id, name, ...updatedwebsite } = req.body
                const conditions = { $or: [{ _id }, { name }] }
                const options = { new: true }

                websiteSaved = await Website.findOneAndUpdate(conditions, updatedwebsite, options)
                if (websiteSaved) message = 'Website has been updated!'
                else {
                    // if website doesnot exist create a new Website
                    const newWebsite = new Website({ ...updatedwebsite, name })
                    websiteSaved = await newWebsite.save()
                    message = 'Website has been created!'
                }

            } else { // no _id
                const newWebsite = new Website(req.body)
                websiteSaved = await newWebsite.save()
                message = 'Website has been created!'
            }

            if (websiteSaved) return res.send({ message, data: websiteSaved })
            return res.send({ message: "Error in creating Website!" })
        }
    } catch (err) { console.log(err) }
})

router.post("/delete", isAuth, isAdmin, async (req, res) => {
    var websiteDeleted

    if (Array.isArray(req.body)) {
        const websiteList = []

        req.body.map(async (website, index) => {
            const { _id, name } = website
            const conditions = { $or: [{ _id }, { name }] }

            websiteDeleted = await Website.findOneAndRemove(conditions)
            websiteList[index] = websiteDeleted

            if (!websiteList.includes(undefined) && websiteList.length === req.body.length) {
                return res.send({ message: "Website has been deleted!", data: websiteList })
                //return res.send({ message: "Error in deleting Website!" })
            }
        })

    } else {
        if (req.body.deleteAll) {
            const deletedWebsite = await Website.find({})
            const websiteList = []

            deletedWebsite.map(async (website, index) => {
                const _id = website._id
                const conditions = { _id }

                websiteDeleted = await Website.findOneAndRemove(conditions)
                websiteList[index] = websiteDeleted

                if (!websiteList.includes(undefined) && websiteList.length === deletedWebsite.length) {
                    return res.send({ message: "Website has been deleted!", data: websiteList })
                }
            })

        } else {
            const { _id, name } = req.body
            const conditions = { $or: [{ _id }, { name }] }
            websiteDeleted = await Website.findOneAndRemove(conditions)
            if (websiteDeleted)
                return res.send({ message: "Website has been deleted!", data: websiteDeleted })
            return res.send({ message: "Error in deleting Website!" })
        }
    }
})

export default router