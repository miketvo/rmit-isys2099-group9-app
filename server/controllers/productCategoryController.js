/* eslint-disable no-unused-vars */
const { db, model } = require("../models");

// Product Category
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

const updateProductCategory = async (req, res) => {
    const categoryName = req.params.category_name;
    const { parent } = req.body;
    const result = await db.poolWHAdmin.query(
        'UPDATE product_category SET parent = ? WHERE category_name = ?',
        [parent, categoryName],
        (error) => {
            if (error) {
                console.error(error);
                res.status(500).send('An error occurred while updating a product category');
            } else {
                res.status(201).json({
                    message: `Product category with name: ${categoryName} updated`,
                    parent: parent,
                    category_name: categoryName
                });
            }
        }
    );
};

const deleteProductCategory = (req, res) => {
    const { category_name } = req.params;
    db.poolWHAdmin.query('DELETE FROM product_category WHERE category_name = ?', [category_name], (error) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred while deleting a product category');
        } else {
            res.status(200).send(`Product category with name: ${category_name} deleted`);
        }
    });
};

module.exports = {
    createProductCategory,
    getAllProductCategory,
    getProductCategoryByName,
    updateProductCategory,
    deleteProductCategory
}