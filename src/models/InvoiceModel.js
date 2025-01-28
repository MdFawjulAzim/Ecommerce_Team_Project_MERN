import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    tran_id: {
      type: String,
      required: true,
    },
    val_id: {
      type: String,
      required: true,
    },
    payable_amount: {
      type: String,
      required: true,
    },
    discount_amount: {
      type: String,
      default: "0",
    },
    vat: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    cus_details: {
      type: String,
      required: true,
    },
    ship_details: {
      type: String,
      required: true,
    },
    delivery_status: {
      type: String,
      enum: ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PROCESSING",
    },
    payment_status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED","CANCELLED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const InvoiceModel = mongoose.model("invoice", DataSchema);

export default InvoiceModel;
