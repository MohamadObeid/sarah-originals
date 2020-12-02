import express from "express";
import Product from "../modals/productModel";
import { isAuth, isAdmin } from '../util';

const router = express.Router();
// The use router gets and posts data from the server according to model.

router.get("", async (req, res) => {
  const products = await Product.find({})
  res.send(products)
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId })
  res.send(product);
});

router.post("/getproducts", async (req, res) => {
  const products = await Product.find({ _id: req.body })
  if (products) {
    return res.status(201).send(products)
  }
})

router.post("/searchKeyword", async (req, res) => {
  const searchKeyword = req.body.searchKeyword
    ? {
      nameEn: {
        $regex: req.body.searchKeyword,
        $options: 'i',
      },
    }
    : {}

  const products = await Product.find({ ...searchKeyword })
  if (products) {
    //console.log(products)
    return res.status(201).send(products)
  }
})

router.post("", isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    created_by: req.body.created_by,
    nameEn: req.body.nameEn,
    nameAr: req.body.nameAr,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    priceUsd: req.body.priceUsd,
    priceLbp: req.body.priceLbp,
    countInStock: req.body.countInStock,
    unit: req.body.unit,
    description: req.body.description,
    isFeatured: req.body.isFeatured,
    isPopular: req.body.isPopular,
    newArrival: req.body.newArrival,
    specialOffer: req.body.specialOffer,
    discount: req.body.discount,
    active: req.body.active,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    collections: req.body.collections,
    onSale: req.body.onSale,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res.status(201).send({ message: "New product created!", data: newProduct })
  }
  return res.status(500).send({
    message: "Error in creating product!"
  })
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId })
  if (req.body.activation) {
    if (req.body.activation === 'active') {
      product.active = req.body.active;
      product.modified = req.body.modified;
    }
  } else if (product) {
    product.modified = req.body.modified;
    product.nameEn = req.body.nameEn;
    product.nameAr = req.body.nameAr;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.priceUsd = req.body.priceUsd;
    product.priceLbp = req.body.priceLbp;
    product.countInStock = req.body.countInStock;
    product.unit = req.body.unit;
    product.description = req.body.description;
    product.isFeatured = req.body.isFeatured;
    product.isPopular = req.body.isPopular;
    product.newArrival = req.body.newArrival;
    product.specialOffer = req.body.specialOffer;
    product.discount = req.body.discount;
    product.active = req.body.active;
    product.collections = req.body.collections
    product.onSale = (req.body.onSale && req.body.onSale.amount > 0) ? req.body.onSale : {}
  }

  const productUpdated = await product.save()
  if (productUpdated) {
    // 201 is code of creating an item
    return res.status(200).send({ message: "Product has been updated!", data: productUpdated })
  }
  return res.status(500).send({
    message: "Error in updating product!"
  })
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const productDeleted = await Product.findByIdAndRemove(productId);
  if (productDeleted) {
    return res.status(200).send({ message: "Product has been deleted!", data: productDeleted });
  }
  return res.status(500).send({
    message: "Error in deleting product!"
  })
});

export default router;