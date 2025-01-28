import mongoose from "mongoose";

const ProductSliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductSliderModel = mongoose.model("productslider", ProductSliderSchema);

export default ProductSliderModel;
