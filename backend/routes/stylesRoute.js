import express from "express"
import { Styles, Title } from "../modals/stylesModel"
import { isAuth, isAdmin } from '../util'

const router = express.Router()

router.post("/get", async (req, res) => {
    const { _id, name } = req.body
    if (_id || name) {

        const conditions = { $or: [{ _id }, { name }] }
        const styles = await Styles.findOne(conditions)
        if (styles) return res.send(styles)
        else return res.send({ message: 'Styles are not Available!' })

    } else {
        const stylesList = await Styles.find({})
        if (stylesList) return res.send(stylesList)
        else return res.send({ message: 'Styles are not Available!' })
    }
})

router.post("/save", isAuth, isAdmin, async (req, res) => {

    try {
        var stylesSaved
        var message

        if (Array.isArray(req.body)) {
            const stylesList = []

            req.body.map(async (styles, index) => {
                stylesSaved = false

                if (styles._id || styles.name) { // update a Styles
                    const { _id, name, ...updatedstyles } = styles
                    const conditions = name ? { name } : _id ? { _id } : {}
                    const options = { new: true }

                    stylesSaved = await Styles.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)

                    if (stylesSaved) {
                        stylesList[index] = stylesSaved
                        message = 'Styles has been updated!'
                    } else {
                        // if Styles doesnot exist create a new Styles
                        const newstyles = new Styles({ ...updatedstyles, name })
                        stylesSaved = await newstyles.save()
                        stylesList[index] = stylesSaved
                        message = 'Styles has been created!'
                    }

                } else { // create a new Styles
                    const styles = new Styles(styles)
                    stylesSaved = await styles.save()
                    stylesList[index] = stylesSaved
                    message = 'Styles has been created!'
                }

                if (!stylesList.includes(undefined) && stylesList.length === req.body.length)
                    return res.send({ message, data: stylesList })

            })

        } else {
            if (req.body._id || req.body.name) {

                const { _id, name, ...updatedstyles } = req.body
                const conditions = name ? { $or: [{ _id }, { name }] } : { _id }
                const options = { new: true }

                stylesSaved = await Styles.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)
                if (stylesSaved) {
                    message = 'Styles has been updated!'
                } else {
                    // if Styles doesnot exist create a new Styles
                    const newstyles = new Styles({ ...updatedstyles, name })
                    stylesSaved = await newstyles.save()
                    message = 'Styles has been created!'
                }

            } else {
                const styles = new Styles(req.body)
                stylesSaved = await styles.save()
                message = 'Styles has been created!'
            }

            if (stylesSaved) return res.send({ message, data: stylesSaved })
            return res.send({ message: "Error in creating Styles!" })
        }
    } catch (err) { console.log(err) }
})

router.post("/delete", isAuth, isAdmin, async (req, res) => {
    var stylesDeleted

    if (Array.isArray(req.body)) {
        const stylesList = []

        req.body.map(async (_id, index) => {
            stylesSaved = false
            const conditions = { _id }

            stylesDeleted = await Styles.findOneAndRemove(conditions)
            stylesList[index] = stylesDeleted

            if (!stylesList.includes(undefined) && stylesList.length === req.body.length)
                return res.send({ message: "Styles has been deleted!", data: stylesList })

        })

    } else {

        if (req.body.deleteAll) {
            const stylesArray = await Styles.find({})
            const stylesList = []

            stylesArray && stylesArray.map(async (styles, index) => {
                const _id = styles._id
                const conditions = { _id }

                stylesDeleted = await Styles.findOneAndRemove(conditions)
                stylesList[index] = stylesDeleted

                if (!stylesList.includes(undefined) && stylesList.length === stylesArray.length)
                    return res.send({ message: "Styles has been deleted!", data: stylesList })
            })

        } else {
            const { _id, name } = req.body
            const conditions = name ? { name } : _id ? { _id } : {}

            stylesDeleted = await Styles.findOneAndRemove(conditions)

            if (stylesDeleted)
                return res.send({ message: "Styles has been deleted!", data: stylesDeleted })
            return res.send({ message: "Error in deleting Styles!" })
        }
    }
})

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

router.post("/getTitle", async (req, res) => {
    const { _id, name } = req.body
    if (_id || name) {

        const conditions = { $or: [{ _id }, { name }] }
        const styles = await Title.findOne(conditions)
        if (styles) return res.send(styles)
        else return res.send({ message: 'Title Styles are not Available!' })

    } else {
        const stylesList = await Title.find({})
        if (stylesList) return res.send(stylesList)
        else return res.send({ message: 'Title Styles are not Available!' })
    }
})

router.post("/saveTitle", isAuth, isAdmin, async (req, res) => {
    try {
        var stylesSaved
        var message

        if (Array.isArray(req.body)) {
            const stylesList = []

            req.body.map(async (styles, index) => {
                stylesSaved = false

                if (styles._id || styles.name) { // update a Styles
                    const { _id, name, ...updatedstyles } = styles
                    const conditions = { $or: [{ _id }, { name }] }
                    const options = { new: true }

                    stylesSaved = await Title.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)

                    if (stylesSaved) {
                        stylesList[index] = stylesSaved
                        message = 'Title Styles has been updated!'
                    } else {
                        // if Styles doesnot exist create a new Styles
                        const newstyles = new Title({ ...updatedstyles, name })
                        stylesSaved = await newstyles.save()
                        stylesList[index] = stylesSaved
                        message = 'Title Styles has been created!'
                    }

                } else { // create a new Styles
                    const styles = new Title(styles)
                    stylesSaved = await styles.save()
                    stylesList[index] = stylesSaved
                    message = 'Title Styles has been created!'
                }

                if (!stylesList.includes(undefined) && stylesList.length === req.body.length)
                    return res.send({ message, data: stylesList })

            })

        } else {
            if (req.body._id || req.body.name) {

                const { _id, name, ...updatedstyles } = req.body
                const conditions = name ? { $or: [{ _id }, { name }] } : { _id }
                const options = { new: true }

                stylesSaved = await Title.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)
                if (stylesSaved) {
                    message = 'Title Styles has been updated!'
                } else {
                    // if Styles doesnot exist create a new Styles
                    const newstyles = new Title({ ...updatedstyles, name })
                    stylesSaved = await newstyles.save()
                    message = 'Title Styles has been created!'
                }

            } else {
                const styles = new Title(req.body)
                stylesSaved = await styles.save()
                message = 'Title Styles has been created!'
            }

            if (stylesSaved) return res.send({ message, data: stylesSaved })
            return res.send({ message: "Error in creating Title Styles!" })
        }
    } catch (err) { console.log(err) }
})

router.post("/deleteTitle", isAuth, isAdmin, async (req, res) => {

    var stylesDeleted

    if (Array.isArray(req.body)) {
        const stylesList = []

        req.body.map(async (_id, index) => {
            stylesSaved = false
            const conditions = { _id }

            stylesDeleted = await Title.findOneAndRemove(conditions)
            stylesList[index] = stylesDeleted

            if (!stylesList.includes(undefined) && stylesList.length === req.body.length)
                return res.send({ message: "Title Styles has been deleted!", data: stylesList })

        })

    } else {

        if (req.body.deleteAll) {
            const stylesArray = await Title.find({})
            const stylesList = []

            stylesArray && stylesArray.map(async (styles, index) => {
                const _id = styles._id
                const conditions = { _id }

                stylesDeleted = await Title.findOneAndRemove(conditions)
                stylesList[index] = stylesDeleted

                if (!stylesList.includes(undefined) && stylesList.length === stylesArray.length)
                    return res.send({ message: "Title Styles has been deleted!", data: stylesList })
            })

        } else {
            const { _id, name } = req.body
            const conditions = name ? { name } : _id ? { _id } : {}

            stylesDeleted = await Title.findOneAndRemove(conditions)

            if (stylesDeleted)
                return res.send({ message: "Title Styles has been deleted!", data: stylesDeleted })
            return res.send({ message: "Error in deleting Title Styles!" })
        }
    }
})


export default router