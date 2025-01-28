import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Boolean,
      required: true,
    },
    discountPrice: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    star: {
      type: String,
      required: true,
    },
    stock: {
      type: Boolean,
      required: true,
    },
    remark: {
      type: String,
      required: true,
    },
    subCategoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategory",
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    brandID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = mongoose.model("product", ProductSchema);

export default ProductModel;
