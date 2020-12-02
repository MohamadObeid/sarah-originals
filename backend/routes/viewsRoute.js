import express from "express";
import Product from "../modals/productModel";
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.post("", async (req, res) => {
    console.log('post request')
    const collections = req.body.collections
    const limit = req.body.limit
    const collectionList = []
    console.log('before map')
    collections.map(async collection => {
        console.log('launch map')
        const products = await Product.find({
            $or: [
                { collections: collection }, { category: collection }
            ]
        }).limit(limit).sort({ date: -1 })
        if (products) collectionList[collectionList.length] = { title: collection, products }

        console.log(collections.indexOf(collection))

        if (collectionList.length === collections.length)
            return res.status(201).send(collectionList)
    })
})

export default router