import { Schema, model } from "mongoose";

const productSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sides: [String],
});

const Product = model("product", productSchema);

export default Product;
