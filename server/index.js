const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/db");
const { userRouter } = require("./routers/user.route");
const productRoute = require("./routers/product.route");
const path = require("path");
const { CommentRouter } = require("./routers/comment.route");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// base route
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello node js" });
});
app.use("/user", userRouter);
app.use("/products", productRoute);
app.use("/comments", CommentRouter);
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log("listening on port ", PORT);
  connectDb();
});
