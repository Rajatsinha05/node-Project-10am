const { Router } = require("express");
const { GetUser, Signup, Login } = require("../controllers/user.controller");
const userRouter = Router();

userRouter.get("/", GetUser);
userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
module.exports = { userRouter };
