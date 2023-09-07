/* eslint-disable no-unused-vars */
const { db, model } = require("../models");

// Get all product attributes with their associated categories
const getAllProductAttributesWithCategories = async () => {
    const query = `
        SELECT pa.attribute_name, pa.attribute_type, pa.required, pcaa.category
        FROM product_attribute pa
        LEFT JOIN product_category_attribute_association pcaa ON pa.attribute_name = pcaa.attribute
        ORDER BY pa.attribute_name
    `;
    const [results] = await db.poolWHAdmin.query(query);
    return results;
};

// Get a product attribute with its associated categories by name
const getProductAttributeWithCategoriesByName = async (attribute_name) => {
    const query = `
        SELECT pa.attribute_name, pa.attribute_type, pa.required, pcaa.category
        FROM product_attribute pa
        LEFT JOIN product_category_attribute_association pcaa ON pa.attribute_name = pcaa.attribute
        WHERE pa.attribute_name = ?
    `;
    const [results] = await db.poolWHAdmin.query(query, [attribute_name]);
    return results;
};

// Associate a product attribute with a product category
const associateProductAttributeWithCategory = async (attribute, category) => {
    const query = `INSERT INTO product_category_attribute_association (category, attribute) VALUES (?, ?)`;
    await db.poolWHAdmin.query(query, [category, attribute]);
};

// Update an association between a product attribute and a category
const updateProductAttributeCategoryAssociation = async (attribute, oldCategory, newCategory) => {
    const query = `UPDATE product_category_attribute_association SET category = ? WHERE attribute = ? AND category = ?`;
    await db.poolWHAdmin.query(query, [newCategory, attribute, oldCategory]);
};

// Delete an association between a product attribute and a category
const deleteProductAttributeCategoryAssociation = async (attribute, category) => {
    const query = `DELETE FROM product_category_attribute_association WHERE attribute = ? AND category = ?`;
    await db.poolWHAdmin.query(query, [attribute, category]);
};

module.exports = {
    getAllProductAttributesWithCategories,
    getProductAttributeWithCategoriesByName,
    associateProductAttributeWithCategory,
    updateProductAttributeCategoryAssociation,
    deleteProductAttributeCategoryAssociation
}