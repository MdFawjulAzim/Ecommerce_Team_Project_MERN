import mongoose from "mongoose";

const LegalSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const LegalModel = mongoose.model("legal", LegalSchema);

export default LegalModel;
