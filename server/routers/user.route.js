const { Router } = require("express");
const { GetUser, Signup, Login, deleteUser, verifyUser } = require("../controllers/user.controller");
const userRouter = Router();

userRouter.get("/", GetUser);
userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.delete("/:id", deleteUser);
userRouter.get("/verify/:token/:otp",verifyUser)
module.exports = { userRouter };
