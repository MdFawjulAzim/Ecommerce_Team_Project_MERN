import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

const FAQModel = mongoose.model("faq", FAQSchema);
export default FAQModel;
