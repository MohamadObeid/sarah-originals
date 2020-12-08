import express from "express";
import Product from "../modals/productModel";

const router = express.Router();

router.post("", async (req, res) => {
    const views = req.body.views || []
    const limit = req.body.limit || 10
    // Get All Products
    const productViews = views
        .filter(view => view.active && view.type === 'Product Box')
        .map(view => { return view.name })

    const products = await Product.find({
        $or: [
            { collections: { $in: productViews } }, { category: { $in: productViews } }
        ]
    }).sort({ date: -1 })

    if (products) {
        views.map(view => {
            if (view.active && view.type === 'Product Box') {
                view.products = products
                    .filter(product =>
                        product.category.includes(view.name) ||
                        product.collections.includes(view.name))
                // limit 10
                view.products.length = view.products.length > limit ? limit : view.products.length
            }
        })
    }

    //console.log(views)
    return res.send(views)
})

export default router