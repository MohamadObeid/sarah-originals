import mongoose from "mongoose";

// Define how the data will be saved in the database
const productSchema = new mongoose.Schema({
  active: { type: Boolean, required: true, default: false },
  creation_date: { type: Date, required: false, default: Date.now },
  created_by: { type: String, required: false, default: '' },
  modified: {
    type: [{
      modified_date: { type: Date, required: false, default: '' },
      modified_by: { type: String, required: false, default: '' },
      modified_note: { type: Array, required: false, default: [] },
    }], required: false, default: []
  },
  nameEn: { type: String, required: true },
  nameAr: { type: String, default: '', required: true },
  image: { type: String, required: true },
  brand: { type: String, required: false },
  category: { type: Array, required: true, default: [] },
  priceUsd: { type: Number, default: 0, required: true },
  priceLbp: { type: Number, default: 0, required: true },
  countInStock: { type: Number, default: 0, required: true },
  unit: { type: String, default: '', required: true },
  description: { type: String, required: false },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, min: 0, max: 5, default: 0, required: true },
  collections: { type: Array, required: false },
  /*isFeatured: { type: Boolean, required: true, default: false },
  isPopular: { type: Boolean, required: true, default: false },
  newArrival: { type: Boolean, required: true, default: false },
  specialOffer: { type: Boolean, required: true, default: false },*/
  tags: { type: Array, required: false },
  discount: { type: Number, default: 0, required: true },
  cancellable: { type: Boolean, required: false, default: false },
  refundable: { type: Boolean, required: false, default: false },
  onSale: {
    onSale: { type: Boolean, required: false },
    unit: { type: String, required: false },
    amount: { type: Number, required: false },
    startDate: { type: String, required: false },
    endDate: { type: String, required: false },
  }
})

const Product = mongoose.model("Product", productSchema);

export default Product;
