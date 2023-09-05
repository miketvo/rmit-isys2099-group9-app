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

inboundOrderRouter.put('/create', authenticate, checkSeller, createInboundOrder);
inboundOrderRouter.get('/', authenticate, checkSeller, getAllInboundOrder);
inboundOrderRouter.post('/:id', authenticate, checkSeller, getInboundOrderByID);
inboundOrderRouter.post('/update/:id', authenticate, checkSeller, updateInboundOrder);
inboundOrderRouter.delete('/delete/:id', authenticate, checkSeller, deleteInboundOrder);
inboundOrderRouter.post('/fulfill/:id', authenticate, checkSeller, fulfillInboundOrder);

module.exports = inboundOrderRouter;
