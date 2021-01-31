import express from "express"
import { MagicBox, Title, AddToCart, LiteBox } from "../modals/stylesModel"
import { isAuth, isAdmin } from '../util'

const router = express.Router()

router.post("/get", async (req, res) => {
    const { _id, name, type } = req.body

    if (_id || name) {
        const conditions = name && _id
            ? { $or: [{ _id }, { name }] }
            : name
                ? { name }
                : _id
                    ? { _id }
                    : {}
        var styles

        if (type === 'MagicBox')
            styles = await MagicBox.findOne(conditions)
        else if (type === 'LiteBox')
            styles = await LiteBox.findOne(conditions)
        else if (type === 'Title')
            styles = await Title.findOne(conditions)
        else if (type === 'AddToCart')
            styles = await AddToCart.findOne(conditions)

        if (styles) return res.send(styles)
        else return res.send({ message: 'Styles are not Available!' })

    } else {
        var stylesList
        if (type === 'MagicBox')
            stylesList = await MagicBox.find({})
        else if (type === 'LiteBox')
            stylesList = await LiteBox.find({})
        else if (type === 'Title')
            stylesList = await Title.find({})
        else if (type === 'AddToCart')
            stylesList = await AddToCart.find({})

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
                const { _id, name, type, ...updatedstyles } = styles
                stylesSaved = false

                if (_id || name) { // update a Styles
                    const conditions = name && _id
                        ? { $or: [{ _id }, { name }] }
                        : name
                            ? { name }
                            : _id
                                ? { _id }
                                : {}

                    const options = { new: true }

                    if (type === 'MagicBox')
                        stylesSaved = await MagicBox.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)
                    else if (type === 'LiteBox')
                        stylesSaved = await LiteBox.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)
                    else if (type === 'Title')
                        stylesSaved = await Title.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)
                    else if (type === 'AddToCart')
                        stylesSaved = await AddToCart.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)

                    if (stylesSaved) {
                        stylesList[index] = stylesSaved
                        message = 'Styles has been updated!'
                    } else {
                        // if Styles doesnot exist create a new Styles
                        var newStyles

                        if (type === 'MagicBox')
                            newStyles = new MagicBox({ ...updatedstyles, name })
                        else if (type === 'LiteBox')
                            newStyles = new LiteBox({ ...updatedstyles, name })
                        else if (type === 'Title')
                            newStyles = new Title({ ...updatedstyles, name })
                        else if (type === 'AddToCart')
                            newStyles = new AddToCart({ ...updatedstyles, name })

                        stylesSaved = await newStyles.save()
                        stylesList[index] = stylesSaved
                        message = 'Styles has been created!'
                    }

                } else { // create a new Styles
                    var styles
                    if (type === 'MagicBox')
                        styles = new MagicBox(styles)
                    else if (type === 'LiteBox')
                        styles = new LiteBox(styles)
                    else if (type === 'Title')
                        styles = new Title(styles)
                    else if (type === 'AddToCart')
                        styles = new AddToCart(styles)

                    stylesSaved = await styles.save()
                    stylesList[index] = stylesSaved
                    message = 'Styles has been created!'
                }

                if (!stylesList.includes(undefined) && stylesList.length === req.body.length)
                    return res.send({ message, data: stylesList })

            })

        } else {
            const { _id, name, type, ...updatedstyles } = req.body

            if (_id || name) {

                const conditions = name && _id
                    ? { $or: [{ _id }, { name }] }
                    : name
                        ? { name }
                        : _id
                            ? { _id }
                            : {}

                const options = { new: true }

                if (type === 'MagicBox')
                    stylesSaved = await MagicBox.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)
                else if (type === 'LiteBox')
                    stylesSaved = await MagicBox.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)
                else if (type === 'Title')
                    stylesSaved = await MagicBox.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)
                else if (type === 'AddToCart')
                    stylesSaved = await MagicBox.findOneAndUpdate(conditions, { name, ...updatedstyles }, options)

                if (stylesSaved) {
                    message = 'Styles has been updated!'
                } else {
                    // if Styles doesnot exist create a new Styles
                    var newstyles
                    if (type === 'MagicBox')
                        newstyles = new MagicBox({ ...updatedstyles, name })
                    else if (type === 'LiteBox')
                        newstyles = new LiteBox({ ...updatedstyles, name })
                    else if (type === 'Title')
                        newstyles = new Title({ ...updatedstyles, name })
                    else if (type === 'AddToCart')
                        newstyles = new AddToCart({ ...updatedstyles, name })

                    stylesSaved = await newstyles.save()
                    message = 'Styles has been created!'
                }

            } else {
                var styles
                if (type === 'MagicBox')
                    styles = new MagicBox(req.body)
                else if (type === 'LiteBox')
                    styles = new LiteBox(req.body)
                else if (type === 'Title')
                    styles = new Title(req.body)
                else if (type === 'AddToCart')
                    styles = new AddToCart(req.body)

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

        req.body.map(async (styles, index) => {
            const { _id, type, name } = styles
            const conditions = name && _id
                ? { $or: [{ _id }, { name }] }
                : name
                    ? { name }
                    : _id
                        ? { _id }
                        : {}

            stylesSaved = false

            if (type === 'MagicBox')
                stylesDeleted = await MagicBox.findOneAndRemove(conditions)
            else if (type === 'LiteBox')
                stylesDeleted = await LiteBox.findOneAndRemove(conditions)
            else if (type === 'Title')
                stylesDeleted = await Title.findOneAndRemove(conditions)
            else if (type === 'AddToCart')
                stylesDeleted = await AddToCart.findOneAndRemove(conditions)

            stylesList[index] = stylesDeleted

            if (!stylesList.includes(undefined) && stylesList.length === req.body.length)
                return res.send({ message: "Styles has been deleted!", data: stylesList })

        })

    } else {

        if (req.body.deleteAll) {
            const type = req.body.type
            var stylesArray

            if (type === 'MagicBox')
                stylesArray = await MagicBox.find({})
            else if (type === 'LiteBox')
                stylesArray = await LiteBox.find({})
            else if (type === 'Title')
                stylesArray = await Title.find({})
            else if (type === 'AddToCart')
                stylesArray = await AddToCart.find({})

            const stylesList = []

            stylesArray && stylesArray.map(async (styles, index) => {
                const { _id, name, type } = req.body
                const conditions = name && _id
                    ? { $or: [{ _id }, { name }] }
                    : name
                        ? { name }
                        : _id
                            ? { _id }
                            : {}

                if (type === 'MagicBox')
                    stylesDeleted = await MagicBox.findOneAndRemove(conditions)
                else if (type === 'LiteBox')
                    stylesDeleted = await LiteBox.findOneAndRemove(conditions)
                else if (type === 'Title')
                    stylesDeleted = await Title.findOneAndRemove(conditions)
                else if (type === 'AddToCart')
                    stylesDeleted = await AddToCart.findOneAndRemove(conditions)

                stylesList[index] = stylesDeleted

                if (!stylesList.includes(undefined) && stylesList.length === stylesArray.length)
                    return res.send({ message: "Styles has been deleted!", data: stylesList })
            })

        } else {
            const { _id, name, type } = req.body
            const conditions = name && _id
                ? { $or: [{ _id }, { name }] }
                : name
                    ? { name }
                    : _id
                        ? { _id }
                        : {}

            if (type === 'MagicBox')
                stylesDeleted = await MagicBox.findOneAndRemove(conditions)
            else if (type === 'LiteBox')
                stylesDeleted = await LiteBox.findOneAndRemove(conditions)
            else if (type === 'Title')
                stylesDeleted = await Title.findOneAndRemove(conditions)
            else if (type === 'AddToCart')
                stylesDeleted = await AddToCart.findOneAndRemove(conditions)

            if (stylesDeleted)
                return res.send({ message: "Styles has been deleted!", data: stylesDeleted })
            return res.send({ message: "Error in deleting Styles!" })
        }
    }
})

export default router