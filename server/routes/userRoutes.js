const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/authenticate");
const {
    checkBuyer,
    checkSeller,
    checkAdmin
} = require("../middleware/checkRoles");

// Get all buyers
userRouter.get("/buyers", authenticate, checkAdmin, userController.getAllBuyers);

// Get all sellers
userRouter.get("/sellers", authenticate, checkAdmin, userController.getAllSellers);

// Get buyer by username
userRouter.get("/buyers/:username", authenticate, checkAdmin, checkBuyer, userController.getBuyerByUsername);

// Get seller by username
userRouter.get("/sellers/:username", authenticate, checkAdmin, checkSeller, userController.getSellerByUsername);

// Update a buyer's username
userRouter.put("/buyers/:username", authenticate, checkBuyer, userController.updateBuyerUsername);

// Update a admin's username
userRouter.put("/admin/:username", authenticate, checkAdmin, userController.updateAdminUsername);

// Update a seller's username and/or shop name
userRouter.put("/sellers/:username", authenticate, checkSeller, userController.updateSeller);

// Delete a buyer by username
userRouter.delete("/buyers/:username", authenticate, checkAdmin, checkBuyer, userController.deleteBuyerByUsername);

// Delete a seller by username
userRouter.delete("/sellers/:username", authenticate, checkAdmin, checkSeller, userController.deleteSellerByUsername);

module.exports = userRouter;
