const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    address: {
      type: String || Number,
      required: [true, "Address is required"],
    },

    description: {
      type: String,
      required: [true, "Please provide your feedback"],
      minLength: [3, " Name must be at least 3 character"],
      maxLength: [300, "Name is too large"],
    },

    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
