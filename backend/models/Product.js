
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, trim: true, unique: true, sparse: true },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids"],
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      name: {
        type: String,
        default: "",
      },
      type: {
        type: String,
        default: "",
      },
      size: {
        type: Number,
        default: 0,
      },
      data: {
        type: Buffer,
        default: undefined,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
