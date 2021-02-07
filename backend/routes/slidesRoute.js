import express from "express";
import Product from "../modals/productModel";
import Brand from "../modals/brandModel";

const router = express.Router();

router.post("/get", async (req, res) => {
    /*const view = req.body || []
    const slides = []
    var length = 0

    view.slider.map(async (box, index) => {
        try {
            slides[index] = []

            if (box.slides && box.slides.length > 0)
                slides[index].push(...box.slides)

            if (view.type === 'Product Box') {
                var conditions = !box.collections.includes('Any')
                    ? { $or: [{ collections: { $in: box.collections } }, { category: { $in: box.collections } }] }
                    : {}

                await Product
                    .find(conditions)
                    .sort(view.sort)
                    .limit(view.limit)
                    .then(products => {
                        length++
                        if (products) slides[index].push(...products)
                    })
            } else length++

            if (length === view.slider.length)
                return res.send({ _id: view._id, slides })

        } catch (err) { console.log(err) }
    })*/
    //////////////////////////////////////
    const slider = req.body
    const _id = slider._id
    var slides = []

    if (slider.collections) {
        const collections = slider.collections

        if (collections.type === 'Product') {
            var conditions = !collections.collections.includes('Any')
                ? { $or: [{ collections: { $in: collections.collections } }, { category: { $in: collections.collections } }] }
                : {}

            await Product
                .find(conditions)
                .sort(collections.sort)
                .limit(collections.limit)
                .then(products => {
                    if (products) {
                        slides.push(...products)
                        return res.send({ _id, slides, collections })
                    }
                })

        } else return res.send({ _id, slides, collections: {} })
    }
})

export default router