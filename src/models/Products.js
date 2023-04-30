const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    bedrooms: {
      type: Number,
      min: [0, "Please input a valid amount"],
    },
    bedNumber: {
      type: Number,
      min: [0, "Please input a valid amount"],
    },
    bathrooms: {
      type: Number,
      min: [0, "Please input a valid amount"],
    },
    houseSize: {
      type: Number,
      min: [0, "Please input a valid amount"],
    },
    unit: String,
    address: String,
    title: String,
    description: String,
    district: String,
    rentType: String,
    amount: {
      type: Number,
      required: true,
      min: [0, "Please input a valid amount"],
    },
    negotiable: Boolean,
    img1:  {
      type: String,
      required: true,
    },
    img2: String,
    img3: String,
    img4: String,
    img5: String,
    name: String,
    email: String || Number,
    phone: {
      type: Number,
      // required: true,
      min: [0, "Please input a valid Phone Number"],
    },
    terms: Boolean,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
