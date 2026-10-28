const mongoose = require("mongoose");

const orderStatuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    size: String,
    color: String,
    phone: String,
    address: String,
    total: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: orderStatuses,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
