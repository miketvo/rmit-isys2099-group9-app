/* eslint-disable no-unused-vars */
const { db, model } = require("../models");

/* 

* product attribute has many-to-many relationship with product category
* When create an attribute, you can choose many categories associated with it
* After inserting an attribute to the product_attribute table with according columns, 
* Loop through the product categories req.body array and insert to the product_category_attribute_association with category and new attribute.

*/
const createProductAttributeWithCategories = async (req, res) => {
    try {
        const { attribute_name, attribute_type, required, categories } = req.body;
        console.log(`attribute_name: ${attribute_name}, attribute_type: ${attribute_type}, required: ${required}, categories: ${categories}`);
        
        // Insert the new attribute into the product_attribute table
        await db.poolWHAdmin.query(
            'INSERT INTO product_attribute (attribute_name, attribute_type, required) VALUES (?, ?, ?)',
            [attribute_name, attribute_type, required]
        );
        
        // Loop through the categories and insert into the product_category_attribute_association table
        for (const category of categories) {
            console.log(`Inserting category: ${category}`);
            await db.poolWHAdmin.query(
                'INSERT INTO product_category_attribute_association (category, attribute) VALUES (?, ?)',
                [category, attribute_name]
            );
        }
        
        res.status(201).json({
            message: `Product attribute ${attribute_name} created and associated with categories`,
            attribute_name: attribute_name,
            attribute_type: attribute_type,
            required: required,
            categories: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating a product attribute and associating it with categories');
    }
};


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
const getAllProductAttributesByCategories = async (req, res) => {
    try {
        const { category } = req.params;
        const [results] = await db.poolWHAdmin.query(`
            SELECT pa.attribute_name, pa.attribute_type, pa.required, pcaa.category
            FROM product_attribute pa
            JOIN product_category_attribute_association pcaa ON pa.attribute_name = pcaa.attribute
            WHERE pcaa.category = ?
        `, [category]);
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/* 

* When updating the attribute, only update the product_attribute.name 
* At the same time, update the asscociated category in the pcaa table
*/
const updateProductAttributeWithCategories = async (req, res) => {
    try {
        const attribute_name = req.params.attribute_name;
        const { new_attribute_name, categories } = req.body;
        console.log(`attribute_name: ${attribute_name}, new_attribute_name: ${new_attribute_name}, categories: ${categories}`);
        
        // Update the attribute name in the product_attribute table
        await db.poolWHAdmin.query(
            'UPDATE product_attribute SET attribute_name = ? WHERE attribute_name = ?',
            [new_attribute_name, attribute_name]
        );
        console.log(`Updated attribute name from ${attribute_name} to ${new_attribute_name}`);

        // Delete old associations in the product_category_attribute_association table
        await db.poolWHAdmin.query(
            'DELETE FROM product_category_attribute_association WHERE attribute = ?',
            [attribute_name]
        );
        console.log(`Deleted old associations for attribute ${attribute_name}`);

        // Insert new associations into the product_category_attribute_association table
        for (const category of categories) {
            console.log(`Inserting association for category: ${category}`);
            await db.poolWHAdmin.query(
                'INSERT INTO product_category_attribute_association (category, attribute) VALUES (?, ?)',
                [category, new_attribute_name]
            );
        }
        
        res.status(200).json({
            message: `Product attribute ${attribute_name} updated and associated with categories`,
            old_attribute_name: attribute_name,
            new_attribute_name: new_attribute_name,
            categories: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating a product attribute and associating it with categories');
    }
};

// Delete a product attribute
const deleteProductAttributeWithCategories = async (req, res) => {
    try {
        const attributeName = req.params.attribute_name;
        
        // Delete associations from product_category_attribute_association
        await db.poolWHAdmin.query(
            'DELETE FROM product_category_attribute_association WHERE attribute = ?',
            [attributeName]
        );
        
        // Delete attribute from product_attribute
        await db.poolWHAdmin.query(
            'DELETE FROM product_attribute WHERE attribute_name = ?',
            [attributeName]
        );
        
        res.status(200).json({
            message: `Product attribute with name: ${attributeName} deleted`,
            attribute_name: attributeName
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createProductAttributeWithCategories,
    getAllProductAttributesWithCategories,
    getAllProductAttributesByCategories,
    updateProductAttributeWithCategories,
    deleteProductAttributeWithCategories
}