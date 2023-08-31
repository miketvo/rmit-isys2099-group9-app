const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

// Get all buyers
userRouter.get("/buyers", userController.getAllBuyers);

// Get all sellers
userRouter.get("/sellers", userController.getAllSellers);

// Get buyer by username
userRouter.get("/buyers/:username", userController.getBuyerByUsername);

// Get seller by username
userRouter.get("/sellers/:username", userController.getSellerByUsername);

// Update a buyer's username
userRouter.put("/buyers/:username", userController.updateBuyerUsername);

// Update a admin's username
userRouter.put("/admin/:username", userController.updateAdminUsername);

// Update a seller's username and/or shop name
userRouter.put("/sellers/:username", userController.updateSeller);

// Delete a buyer by username
userRouter.delete("/buyers/:username", userController.deleteBuyerByUsername);

// Delete a seller by username
userRouter.delete("/sellers/:username", userController.deleteSellerByUsername);

module.exports = userRouter;
