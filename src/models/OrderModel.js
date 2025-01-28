import mongoose from "mongoose";
const OrderSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
    status_history: [
      {
        status: {
          type: String,
          enum: ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
        },
        updated_at: {
          type: Date,
          default: Date.now,
        },
        updated_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OrderModel = mongoose.model("order", OrderSchema);

export default  OrderModel ;
