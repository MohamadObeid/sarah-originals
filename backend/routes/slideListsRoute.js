import express from "express";
import Product from "../modals/productModel";
import Brand from "../modals/brandModel";

const router = express.Router();

router.post("", async (req, res) => {
    const views = req.body.views || []

    const collectionLists = views
        .filter(view => view.active && view.collections.length > 0)
        .map(view => view.collections
            .map(collection => {
                delete view['collections']
                return { ...view, collection }
            }))
        .flat()

    const slideLists = []

    collectionLists.map(async list => {
        try {
            const type = list.type
            const collection = list.collection
            const limit = list.limit || 10
            const sort = list.sort === 'Newest' ? { date: -1 } : {}
            const index = collectionLists.indexOf(list)

            if (type === 'Product Box')
                await Product
                    .find({
                        $or: [{ collections: { $in: collection } }, { category: { $in: collection } }]
                    })
                    .sort(sort)
                    .limit(limit)
                    .then(products => {
                        if (products)
                            slideLists[index] = { collection, slideList: products }
                    })

            else if (type === 'Brand Box')
                await Brand
                    .find({ collections: { $in: collection } })
                    .sort(sort)
                    .limit(limit)
                    .then(brands => {
                        if (brands)
                            slideLists[index] = { collection, slideList: brands }
                    })

            if (!slideLists.includes(undefined) && slideLists.length === collectionLists.length)
                return res.send(slideLists)

        } catch (err) {
            console.log(err)
        }
    })
})

export default router