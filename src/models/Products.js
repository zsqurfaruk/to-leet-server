const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    bedrooms: Object,
    bedNumber: Object,
    totalBed: Object,
    bathrooms: Object,
    wifiFacility: Object,
    address: String,
    title: String,
    description: String,
    cityName: Object,
    areaName: Object,
    division: Object,
    districts: Object,
    type: Object,
    university: Object,
    available: Boolean,
    amount: {
      type: Number,
      required: true,
      min: [0, "Please input a valid amount"],
    },
    negotiable: Boolean,
    img1: {
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
      required: true,
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
