const { Router } = require("express");
const {
  getCommentByProdcutId,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const { decode } = require("../middlewares/decodeJwt");

const CommentRouter = Router();

CommentRouter.get("/:productId", getCommentByProdcutId);
CommentRouter.post("/", decode, createComment);
CommentRouter.patch("/:commentId", decode, updateComment);
CommentRouter.delete("/:commentId", decode, deleteComment);
module.exports = { CommentRouter };
