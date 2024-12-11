const Cart = require("../models/cart.model");

const getCartByUserId = async (req, res) => {
  const userId = req.user.id;
  try {
    let cart = await Cart.find({ user: userId }).populate("product");
    console.log("cart", cart);

    res.send(cart);
  } catch (error) {
    console.log("error", error);

    res.status(500).send({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  req.body.user = req.user.id;

  const { user, product } = req.body;
  try {
    let isExists = await Cart.findOne({ user: user, product: product });

    if (isExists) {
      isExists.qty += 1;
      await isExists.save();
      res.status(200).send(isExists);
    } else {
      let cart = await Cart.create(req.body);

      res.status(201).send(cart);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    let cart = await Cart.findByIdAndDelete(cartId);
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addQuantity = async (req, res) => {
  let { cartId } = req.params;
  try {
    let cart = await Cart.findById(cartId);
    cart.qty += 1;
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const removeQuantity = async (req, res) => {
  let { cartId } = req.params;
  try {
    let cart = await Cart.findById(cartId);
    if (cart.qty >= 2) {
      cart.qty -= 1;
      await cart.save();
      res.status(200).send(cart);
    } else {
      cart = await Cart.findByIdAndDelete(cartId);
      res.status(200).send(cart);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getCartByUserId,
  addQuantity,
  removeQuantity,
  removeFromCart,
  addToCart,
};
