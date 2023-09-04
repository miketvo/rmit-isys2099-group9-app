/* eslint-disable no-unused-vars */
const express = require('express');
const productCategoryRouter = express.Router();
const { authenticate } = require("../middleware/authenticate");
const {
    checkBuyer,
    checkSeller,
    checkAdmin
} = require("../middleware/checkRoles");
const {
    createProductCategory,
    getAllProductCategory,
    getProductCategoryByName,
    updateProductCategory,
    deleteProductCategory
} = require('../controllers/productCategoryController');

productCategoryRouter.post('/', authenticate, checkAdmin, createProductCategory);
productCategoryRouter.get('/', authenticate, getAllProductCategory);
productCategoryRouter.get('/:category_name', authenticate, getProductCategoryByName);
productCategoryRouter.put('/:category_name', authenticate, checkAdmin, updateProductCategory);
productCategoryRouter.delete('/:category_name', authenticate, checkAdmin, deleteProductCategory);

module.exports = productCategoryRouter;
