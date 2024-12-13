const { Router } = require("express");
const {
  getCartByUserId,
  addToCart,
  removeFromCart,
  addQuantity,
  removeQuantity,
  checkout,
} = require("../controllers/cart.controller");
const { decode } = require("../middlewares/decodeJwt");

const cartRoute = Router();
cartRoute.get("/", decode, getCartByUserId);
cartRoute.post("/", decode, addToCart);
cartRoute.delete("/:cartId", decode, removeFromCart);
cartRoute.patch("/add-qty/:cartId", decode, addQuantity);
cartRoute.patch("/remove-qty/:cartId", decode, removeQuantity);
cartRoute.post("/payment", checkout);

module.exports = cartRoute;
