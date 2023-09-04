/* eslint-disable no-unused-vars */
const express = require("express");
const inboundOrderRouter = express.Router();

const {
    createInboundOrder,
    getAllInboundOrder,
    getInboundOrderByID,
    updateInboundOrder,
    deleteInboundOrder,
    fulfillInboundOrder
} = require("../controllers/inboundOrderController")

const { authenticate } = require("../middleware/authenticate");
const {
    checkBuyer,
    checkSeller,
    checkAdmin
} = require("../middleware/checkRoles");

inboundOrderRouter.put('/create', authenticate, createInboundOrder);
inboundOrderRouter.get('/', authenticate, getAllInboundOrder);
inboundOrderRouter.post('/:id', authenticate, getInboundOrderByID);
inboundOrderRouter.post('/update/:id', authenticate, updateInboundOrder);
inboundOrderRouter.delete('/delete/:id', authenticate,deleteInboundOrder);
inboundOrderRouter.post('/fulfill/:id', fulfillInboundOrder);
