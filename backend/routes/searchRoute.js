import express from "express";
import Product from "../modals/productModel";
import Brand from "../modals/brandModel";

const router = express.Router()

router.post("/get", async (req, res) => {

    const search = req.body.search
    const website = req.body.website

    var slides = []

    if (search) {
        const collections = !search.collections.includes('Any')
            ? {
                $or: [{
                    collections: { $in: search.collections }
                }, {
                    category: { $in: search.collections }
                }]
            } : {}

        const keyword = search.keyword
            ? {
                $or: [{
                    name: {
                        $regex: search.keyword.join("|"),
                        $options: 'i',
                    }
                }, {
                    nameEn: {
                        $regex: search.keyword.join("|"),
                        $options: 'i',
                    }
                }]
            } : {}

        if (search.type === 'Product') {

            var conditions = { $and: [collections, keyword/*, website*/] }
            //console.log(conditions)
            await Product
                .find(conditions)
                .sort(search.sort)
                .limit(search.limit)
                .then(products => {
                    if (products) {
                        slides.push(...products)
                        return res.send({ slides, search })
                    }
                })

        } else return res.send({ slides, search })
    }
})

export default router