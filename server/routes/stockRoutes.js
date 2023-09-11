const express = require("express");
const stockRouter = express.Router();
const { authenticate } = require("../middleware/authenticate");
const { checkAdmin } = require("../middleware/checkRoles");
const { getAllStockpile } = require("../controllers/stockController");

stockRouter.get("/", authenticate, checkAdmin, getAllStockpile);

module.exports = stockRouter;
