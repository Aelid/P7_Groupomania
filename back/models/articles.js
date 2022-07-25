const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  username: { type: String, required: true },
  date: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  usersLiked: { type: [String], required: true, default: [] },
});

module.exports = mongoose.model("Article", articleSchema);
