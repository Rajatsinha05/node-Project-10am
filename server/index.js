const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/db");
const { userRouter } = require("./routers/user.route");


const app = express();
app.use(cors());
app.use(express.json());

// base route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello node js" });
});
app.use("/user",userRouter)

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log("listening on port ", PORT);
  connectDb();
});
