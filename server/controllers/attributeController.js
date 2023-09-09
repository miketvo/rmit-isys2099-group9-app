/* eslint-disable no-unused-vars */
const { db, model } = require("../models");

/* 
TODO:

* product attribute has many-to-many relationship with product category
* When create an attribute, you can choose many categories associated with it
* After inserting an attribute to the product_attribute table with according columns, 
* Loop through the product categories req.body array and insert to the product_category_attribute_association with category and new attribute.

*/

// Get all product attributes with their associated categories
const getAllProductAttributesWithCategories = async (req, res) => {
    try {
        const [results] = await db.poolWHAdmin.query(`
            SELECT pa.attribute_name, pa.attribute_type, pa.required, pcaa.category
            FROM product_attribute pa
            JOIN product_category_attribute_association pcaa ON pa.attribute_name = pcaa.attribute
            ORDER BY pa.attribute_name        
        `);
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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

// Update an association between a product attribute and a category
/* 
TODO:

* When updating the attribute, only update the product_attribute.name 
* At the same time, update the asscociated category in the pcaa table
*/
const updateProductAttributeCategoryAssociation = async (attribute, oldCategory, newCategory) => {
    const query = `UPDATE product_category_attribute_association SET category = ? WHERE attribute = ? AND category = ?`;
    await db.poolWHAdmin.query(query, [newCategory, attribute, oldCategory]);
};

// Delete a product attribute
const deleteProductAttribute = async (req, res) => {
    try {
        const attributeName = req.params.attribute_name;
        const query = `DELETE FROM product_attribute WHERE attribute_name = ?`;
        await db.poolWHAdmin.query(query, [attributeName]);
        res.status(200).json({
            message: `Product attribute with name: ${attributeName} deleted`
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllProductAttributesWithCategories,
    getProductAttributeWithCategoriesByName,
    updateProductAttributeCategoryAssociation,
    deleteProductAttribute
}