import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    subCategoryName: {
      type: String,
      required: true,
    },
    subCategoryImg: {
      type: String,
      required: true,
      default: "",
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SubCategory = mongoose.model("subcategory", SubCategorySchema);

export default SubCategory;
