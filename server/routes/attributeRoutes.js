const express = require('express');
const attributeRouter = express.Router();
const { authenticate } = require("../middleware/authenticate");
const {
    checkAdmin
} = require("../middleware/checkRoles");

// Routes for product attributes with their associated categories
attributeRouter.get('/', authenticate, checkAdmin);
attributeRouter.get('/:category', authenticate, checkAdmin);

// Associate a product attribute with a product category
attributeRouter.post('/:category/associate', authenticate, checkAdmin);
attributeRouter.put('/:category/update', authenticate, checkAdmin);
attributeRouter.delete('/:category/delete', authenticate, checkAdmin);

module.exports = attributeRouter;
