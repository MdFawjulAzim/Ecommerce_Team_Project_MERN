const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    invoiceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "invoice",
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    qty: { type: String, required: true },
    price: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const InvoiceProductModel = mongoose.model("invoiceproduct", DataSchema);

export default InvoiceProductModel;
