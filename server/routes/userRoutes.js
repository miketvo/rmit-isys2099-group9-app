const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/authenticate");
const {
  checkBuyer,
  checkSeller,
  checkAdmin,
} = require("../middleware/checkRoles");

// Get all buyers
userRouter.get(
  "/buyers",
  authenticate,
  checkAdmin,
  userController.getAllBuyers,
);

// Get all sellers
userRouter.get(
  "/sellers",
  authenticate,
  checkAdmin,
  userController.getAllSellers,
);

// Get all wh admins
userRouter.get(
  "/admins",
  authenticate,
  checkAdmin,
  userController.getAllWHAdmin,
);

// Get buyer by username
userRouter.get(
  "/buyer/:username",
  authenticate,
  checkBuyer,
  userController.getBuyerByUsername,
);

// Get seller by username
userRouter.get(
  "/seller/:username",
  authenticate,
  checkSeller,
  userController.getSellerByUsername,
);

// Get wh admin by username
userRouter.get(
  "/admin/:username",
  authenticate,
  checkAdmin,
  userController.getWHAdminByUsername,
);

// Update a buyer's username
userRouter.put(
  "/buyer/:username",
  authenticate,
  checkBuyer,
  userController.updateBuyerUsername,
);

// Update wh admin's username
userRouter.put(
  "/admin/:username",
  authenticate,
  checkAdmin,
  userController.updateWHAdminUsername,
);

// Update a seller's username and/or shop name
userRouter.put(
  "/seller/:username",
  authenticate,
  checkSeller,
  userController.updateSeller,
);

// Delete a buyer by username
userRouter.delete(
  "/buyer/:username",
  authenticate,
  checkAdmin,
  checkBuyer,
  userController.deleteBuyerByUsername,
);

// Delete a wh admin by username
userRouter.delete(
  "/admin/:username",
  authenticate,
  checkAdmin,
  userController.deleteWHAdminByUsername,
);

// Delete a seller by username
userRouter.delete(
  "/seller/:username",
  authenticate,
  checkAdmin,
  checkSeller,
  userController.deleteSellerByUsername,
);

module.exports = userRouter;
