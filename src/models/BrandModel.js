import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    brandImg: {
      type: String,
      required: true,
      default: "",
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BrandModel = mongoose.model("brand", BrandSchema);

export default BrandModel;
