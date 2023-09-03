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

productRouter.get('/products', authenticate, getAllProducts);
productRouter.get('/productsASC', authenticate, getAllProductsASC);
productRouter.get('/productsDSC', authenticate, getAllProductsDSC);

productRouter.get('/products/:id', authenticate, getProductById);
productRouter.get('/products/:title', authenticate, getProductByTitle);

productRouter.post('/create-product', authenticate, checkSeller, createProduct);
productRouter.put('/update-product', authenticate, checkSeller, updateProductById);
productRouter.delete('/delete-product', authenticate, checkSeller, deleteProductById);

module.exports = productRouter;