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

productRouter.get('/products', getAllProducts);
productRouter.get('/productsASC', getAllProductsASC);
productRouter.get('/productsDSC', getAllProductsDSC);

productRouter.get('/products/:id', getProductById);
productRouter.get('/products/:title', getProductByTitle);

productRouter.post('/create-product', createProduct);
productRouter.put('/update-product', updateProductById);
productRouter.delete('/delete-product', deleteProductById);

module.exports = productRouter;