const { Router } = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const upload = require("../utils/imageUplaod");
const { decode } = require("../middlewares/decodeJwt");

const productRoute = Router();
productRoute.get("/", getProducts);
productRoute.get("/:productId", getProductById);
productRoute.post("/", decode, upload.single("img"), createProduct);
productRoute.patch("/:productId", decode, updateProduct);
productRoute.delete("/:productId", decode, deleteProduct);

module.exports = productRoute;
