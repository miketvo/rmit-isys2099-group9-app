const express = require("express");
const authRouter = express.Router();

const { authenticate } = require("../middleware/authenticate");

const {
  register,
  login,
  loginAdmin,
  logout,
} = require("../controllers/authController");

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.post("/login/whadmin", loginAdmin);

authRouter.delete("/logout", authenticate, logout);

module.exports = authRouter;
