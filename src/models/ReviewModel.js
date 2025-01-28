import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ReviewModel = mongoose.model("review", ReviewSchema);

export default ReviewModel;
