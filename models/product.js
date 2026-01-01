import { model, Schema } from "mongoose";

export const Product = model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    gender: { type: String, enum: ['men', 'women', 'kid'], default: 'men' },
    new_price: { type: Number },
    old_price: { type: Number },
    date: { type: Date, default: Date.now },
    avilable: { type: Boolean, default: true },
  });
  
export const ProductV2 = model('productsv2', {
  id: String,
  stock: Number,
  sku: String,
  price: Number,
  title: String,
  date: Date,
  salePrice: Number,
  thumbnail: String,
  categoryId: String,
  description: String,
  productType: String,
  images: [String],
});