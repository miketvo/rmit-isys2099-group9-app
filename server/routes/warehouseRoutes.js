/* eslint-disable no-unused-vars */
const express = require('express');
const warehouseRouter = express.Router();
const { authenticate } = require("../middleware/authenticate");
const {
    checkBuyer,
    checkSeller,
    checkAdmin
} = require("../middleware/checkRoles");
const {
    createWarehouse,
    getAllWarehouse,
    getWarehouseByID,
    updateWarehouse,
    deleteWarehouse
} = require('../controllers/warehouseController');

warehouseRouter.post('/create', authenticate, checkAdmin, createWarehouse);
warehouseRouter.get('/', authenticate, getAllWarehouse);
warehouseRouter.get('/:id', authenticate, getWarehouseByID);
warehouseRouter.put('/update/:id', authenticate, checkAdmin, updateWarehouse);
warehouseRouter.delete('/delete/:id', authenticate, checkAdmin, deleteWarehouse);

module.exports = warehouseRouter;