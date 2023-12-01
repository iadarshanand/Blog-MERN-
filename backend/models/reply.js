const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    reply: {
      type: String,
      requied: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
