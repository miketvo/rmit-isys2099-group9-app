const express = require('express');
const attributeRouter = express.Router();
const { 
    authenticate 
} = require("../middleware/authenticate");
const {
    checkAdmin
} = require("../middleware/checkRoles");
const {
    createProductAttributeWithCategories,
    getAllProductAttributesWithCategories,
    getAllProductAttributesByCategories,
    updateProductAttributeWithCategories,
    deleteProductAttributeWithCategories
} = require("../controllers/attributeController");

// Route to create a product attribute with categories
attributeRouter.post('/create', authenticate, checkAdmin, createProductAttributeWithCategories);

// Route to get all product attributes with their associated categories
attributeRouter.get('/', authenticate, checkAdmin, getAllProductAttributesWithCategories);

// Route to get all product attributes by category
attributeRouter.get('/:category', authenticate, checkAdmin, getAllProductAttributesByCategories);

// Route to update a product attribute with categories
attributeRouter.put('/update/:attribute_name', authenticate, checkAdmin, updateProductAttributeWithCategories);

// Route to delete a product attribute
attributeRouter.delete('/delete/:attribute_name', authenticate, checkAdmin, deleteProductAttributeWithCategories);

module.exports = attributeRouter;
