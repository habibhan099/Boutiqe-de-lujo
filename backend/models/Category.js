
const mongoose = require("mongoose");

const categoryImageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
    reference: { type: String },
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    categoryId: { type: String, trim: true, unique: true, sparse: true },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    image: {
      type: categoryImageSchema,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
