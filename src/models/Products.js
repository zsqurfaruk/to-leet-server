const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    bedrooms: Object,
    bedNumber: Object,
    totalBed: Object,
    bathrooms: Object,
    wifiFacility: Object,
    address: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
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
    email: {
      type: String || Number,
      required: true
    },
    phone: {
      type: Number,
      required: true,
      min: [0, "Please input a valid Mobile Number"],
    },
    terms: Boolean,
    field: {
      type: String,
      index: true, // Create index on the 'field' field
      unique: true, // Set 'unique' option if needed
      sparse: true, // Set 'sparse' option if needed
    },
  },
  {
    timestamps: true,
  }
  
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
