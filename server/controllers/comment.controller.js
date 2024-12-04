const Comment = require("../models/Comment.model");

const getCommentByProdcutId = async (req, res) => {
  try {
    const { productId } = req.params;
    let comment = await Comment.find({ product: productId });
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const createComment = async (req, res) => {
  try {
    req.body.user = req.user.id;
    let comment = await Comment.create(req.body);
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateComment = async (req, res) => {
  let { commentId } = req.params;
  try {
    let comment = await Comment.findByIdAndUpdate(commentId, req.body, {
      new: true,
    });
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteComment = async (req, res) => {
  let { commentId } = req.params;

  try {
    let comment = await Comment.findByIdAndDelete(commentId);
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  getCommentByProdcutId,
  createComment,
  updateComment,
  deleteComment,
};
