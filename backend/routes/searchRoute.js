import express from "express";
import Product from "../modals/productModel";
import Brand from "../modals/brandModel";

const router = express.Router()

router.post("/get", async (req, res) => {

    const search = req.body.search
    const website = req.body.website

    if (search) {

        const collections = !search.collections.includes('Any')
            && search.collections.length > 0
            ? {
                $or: [{
                    collections: { $in: search.collections }
                }, {
                    category: { $in: search.collections }
                }]
            } : {}

        const keyword = search.keyword
            ? {
                nameEn: {
                    $regex: search.keyword.join("|"),
                    $options: 'i',
                }
            } : {}
        if (search.keyword.includes('Watermelon')) console.log(keyword, collections)
        if (search.type === 'Product') {

            var conditions = { $and: [collections, keyword/*, website*/] }

            await Product
                .find(conditions)
                .sort(search.sort)
                .limit(search.limit)
                .then(slides => {
                    if (slides) return res.send(slides)
                })

        } else return res.send([])
    }
})

export default router