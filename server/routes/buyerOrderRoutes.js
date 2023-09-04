/* eslint-disable no-unused-vars */
const express = require("express");
const buyerOrderRoutes = express.Router();

const {
    placeOrder,
    getAllBuyerOrders,
    getBuyerOrderByID,
    updateBuyerOrder,
    deleteBuyerOrder
} = require("../controllers/buyerOrderController")

const { authenticate } = require("../middleware/authenticate");
const {
    checkBuyer,
    checkSeller,
    checkAdmin
} = require("../middleware/checkRoles");

// Define your routes here, for example:
buyerOrderRoutes.post('/create', authenticate, checkBuyer, placeOrder);
buyerOrderRoutes.get('/', authenticate, checkBuyer, getAllBuyerOrders);
buyerOrderRoutes.get('/:id', authenticate, checkBuyer, getBuyerOrderByID);
buyerOrderRoutes.put('/update/:id', authenticate, checkBuyer, updateBuyerOrder);
buyerOrderRoutes.delete('/delete/:id', authenticate, checkBuyer, deleteBuyerOrder);

module.exports = buyerOrderRoutes;
