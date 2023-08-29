const express = require("express");
const router = express.Router();

const {
    authenticate,
} = require("../middleware/authenticate");

const {
    register,
    login,
    logout,
    allUsers
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticate, logout);

router.get("/lazada_user", allUsers);

module.exports = router;
