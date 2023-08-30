const express = require("express");
const productRouter = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
} = require("../controllers/productController");

productRouter.get('/products', getAllProducts);
productRouter.get('/products/:id', getProductById);
productRouter.post('/create-product', createProduct);
productRouter.put('/update-product', updateProductById);
productRouter.delete('/delete-product', deleteProductById);

module.exports = productRouter;