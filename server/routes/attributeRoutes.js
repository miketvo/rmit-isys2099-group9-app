const express = require('express');
const attributeRouter = express.Router();
const { authenticate } = require("../middleware/authenticate");
const {
    checkAdmin
} = require("../middleware/checkRoles");

const {
    getAllProductAttributesWithCategories,
    getProductAttributeWithCategoriesByName,
    associateProductAttributeWithCategory,
    updateProductAttributeCategoryAssociation,
    deleteProductAttributeCategoryAssociation
} = require('../controllers/attributeController');

// Routes for product attributes with their associated categories
attributeRouter.get('/', authenticate, checkAdmin, getAllProductAttributesWithCategories);
attributeRouter.get('/:category', authenticate, checkAdmin, getProductAttributeWithCategoriesByName);

// Associate a product attribute with a product category
attributeRouter.post('/:category/associate', authenticate, checkAdmin, associateProductAttributeWithCategory);
attributeRouter.put('/:category/update', authenticate, checkAdmin, updateProductAttributeCategoryAssociation);
attributeRouter.delete('/:category/delete', authenticate, checkAdmin, deleteProductAttributeCategoryAssociation);

module.exports = attributeRouter;
