const mongoose = require("mongoose");
const User = require("./User");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Todos", todoSchema);
