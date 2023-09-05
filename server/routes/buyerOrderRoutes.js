/* eslint-disable no-unused-vars */
const express = require("express");
const buyerOrderRoutes = express.Router();

const {
    placeOrder,
    getAllBuyerOrders,
    getBuyerOrderByID,
    getBuyerOrderByCategory,
    getBuyerOrderByStatus,
    updateBuyerOrderQuantity,
    updateBuyerOrderStatusAccept,
    updateBuyerOrderStatusReject,
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
buyerOrderRoutes.get('/category/:category', authenticate, checkBuyer, getBuyerOrderByCategory);
buyerOrderRoutes.get('/status/:status', authenticate, checkBuyer, getBuyerOrderByStatus);
buyerOrderRoutes.put('/:id/quantity', authenticate, checkBuyer, updateBuyerOrderQuantity);
buyerOrderRoutes.put('/:id/accept', authenticate, checkBuyer, updateBuyerOrderStatusAccept);
buyerOrderRoutes.put('/:id/reject', authenticate, checkBuyer, updateBuyerOrderStatusReject);
buyerOrderRoutes.delete('/delete/:id', authenticate, checkBuyer, deleteBuyerOrder);

module.exports = buyerOrderRoutes;
