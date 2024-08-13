const { Schema, model } = require("mongoose");

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      min: 1,
      max: 30,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      max: 500,
    },

    category: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    supply: {
      type: String,
      reuired: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Product = model("Product", productSchema);

module.exports = Product;
