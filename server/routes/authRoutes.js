const express = require("express");
const router = express.Router();

const {
    authenticate,
} = require("../middleware/authenticate");

const {
    register,
    login,
    logout,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticate, logout);

module.exports = router;
