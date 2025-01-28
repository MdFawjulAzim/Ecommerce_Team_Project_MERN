import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ContactModel = mongoose.model("contact", DataSchema);

export default ContactModel;
