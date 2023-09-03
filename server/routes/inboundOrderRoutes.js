/* eslint-disable no-unused-vars */
const express = require("express");
const inboundOrderRouter = express.Router();

const {
    createInboundOrder,
    getAllInboundOrder,
    getInboundOrderByID,
    updateInboundOrderByID,
    deleteInboundOrder,
    fulfillInboundOrder
} = require("../controllers/inboundOrderController")

const { authenticate } = require("../middleware/authenticate");
const {
    checkBuyer,
    checkSeller,
    checkAdmin
} = require("../middleware/checkRoles");

inboundOrderRouter.put('/', authenticate, createInboundOrder);
inboundOrderRouter.get('/', authenticate, getAllInboundOrder);
inboundOrderRouter.post('/', authenticate, getInboundOrderByID);
inboundOrderRouter.post('/:id', authenticate, updateInboundOrderByID);
inboundOrderRouter.delete('/:id', authenticate,deleteInboundOrder);
inboundOrderRouter.post('/:id', fulfillInboundOrder);
