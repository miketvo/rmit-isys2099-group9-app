const express = require("express");
const authRouter = express.Router();

const {
    authenticate,
} = require("../middleware/authenticate");

const {
    register,
    login,
    logout
} = require("../controllers/authController");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.delete("/logout", authenticate, logout);

module.exports = authRouter;
