/* eslint-disable no-unused-vars */
const express = require("express");
const productRouter = express.Router();

const {
    getAllProducts,
    getAllProductsASC,
    getAllProductsDSC,
    getProductById,
    getProductByTitle,
    createProduct,
    updateProductById,
    deleteProductById
} = require("../controllers/productController");

const { authenticate } = require("../middleware/authenticate");
const {
    checkBuyer,
    checkSeller,
    checkAdmin
} = require("../middleware/checkRoles");

productRouter.get('/', authenticate, getAllProducts);
productRouter.get('/productsASC', authenticate, getAllProductsASC);
productRouter.get('/productsDSC', authenticate, getAllProductsDSC);

productRouter.get('/:id', authenticate, getProductById);
productRouter.get('/:title', authenticate, getProductByTitle);

productRouter.post('/create', authenticate, checkSeller, createProduct);
productRouter.put('/update/:id', authenticate, checkSeller, updateProductById);
productRouter.delete('/delete/:id', authenticate, checkSeller, deleteProductById);

module.exports = productRouter;