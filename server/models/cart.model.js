const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  qty: { type: Number, default: 1 },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
