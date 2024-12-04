const { Schema, default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
