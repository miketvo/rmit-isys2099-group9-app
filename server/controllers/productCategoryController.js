/* eslint-disable no-unused-vars */
const { db, model } = require("../models");

// Product Category
// TODO: Condition for parent if empty string -> NULL
const createProductCategory = async (req, res) => {
    try {
        const { category_name, parent } = req.body;
        const query = `INSERT INTO product_category (category_name, parent) VALUES (?, ?)`;
        const result = await db.poolWHAdmin.query(query, [category_name, parent]);

        console.log("\n"+result[0]);

        res.status(201).json({
            message: `Product category with name: ${category_name} created`,
            category_name: category_name,
            parent: parent,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllProductCategory = async (req, res) => {
    try {
        const [results] = await db.poolSeller.query(`SELECT * FROM product_category`);
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getProductCategoryByName = async (req, res) => {
    try {
        let categoryName = req.params.category_name;
        const [results] = await db.poolWHAdmin.query(`
            SELECT * FROM product_category where category_name = ?
        `, [categoryName]);
        if (results.length === 0) {
            return res.status(404).json({ error: `Product category with name: ${categoryName} not found` });
        }
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Updates two rows in the product_category table within a transaction.
 * 
 * The first row has the specified category_name, 
 * while the second row has a parent column equal to the specified category_name.
 * 
 * Using a transaction ensures that both updates are either applied successfully 
 * or not applied at all.
 * 
 * If an error occurs during the execution of either update statement, 
 * the transaction is rolled back and an error message is sent in the response.
 */

// TODO: Condition for parent if empty string -> NULL, double check on postman
const updateProductCategory = async (req, res) => {
    const categoryName = req.params.category_name;
    const { parent } = req.body;
    try {
        await db.poolWHAdmin.query('START TRANSACTION');
        await db.poolWHAdmin.query(
            'UPDATE product_category SET parent = ? WHERE category_name = ?',
            [parent, categoryName]
        );
        await db.poolWHAdmin.query(
            'UPDATE product_category child JOIN product_category parent ON child.parent = parent.category_name SET child.parent = ? WHERE parent.category_name = ?',
            [parent, categoryName]
        );
        await db.poolWHAdmin.query('COMMIT');
        res.status(201).json({
            message: `Product category with name: ${categoryName} updated`,
            parent: parent,
            category_name: categoryName
        });
    } catch (error) {
        await db.poolWHAdmin.query('ROLLBACK');
        console.error(error);
        res.status(500).send('An error occurred while updating a product category');
    }
};

/**
 * Deletes a row from the product_category table.
 * If you try to delete a row that is referenced by another row as a parent, 
 * the deletion will fail and an error will be thrown due to the foreign key constraint.
 */
const deleteProductCategory = async (req, res) => {
    const { category_name } = req.params;
    try {
        await db.poolWHAdmin.query('START TRANSACTION');
        await db.poolWHAdmin.query(
            'UPDATE product_category SET parent = NULL WHERE parent = ?',
            [category_name]
        );
        await db.poolWHAdmin.query('DELETE FROM product_category WHERE category_name = ?', [category_name]);
        await db.poolWHAdmin.query('COMMIT');
        res.status(200).send(`Product category with name: ${category_name} deleted`);
    } catch (error) {
        await db.poolWHAdmin.query('ROLLBACK');
        console.error(error);
        res.status(500).send('An error occurred while deleting a product category');
    }
};

module.exports = {
    createProductCategory,
    getAllProductCategory,
    getProductCategoryByName,
    updateProductCategory,
    deleteProductCategory
}