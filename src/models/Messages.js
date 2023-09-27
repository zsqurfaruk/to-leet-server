// models.js
const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    senderEmail: {
      type: String || Number,
    },
    receiverEmail: {
      type: String || Number,
    },
    conversationId: {
      type: String,
    },
    productId: {
      type: String,
    },
    message: {
      type: String,
    },

    photo: {
      type: String,
    },
    userName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messagesSchema);
