require("express");
const { db } = require("../models");

// const LocalStorage = require('node-localstorage').LocalStorage;
// const localStorage = new LocalStorage('');

// const cart = JSON.parse(localStorage.getItem('cart')) || {};
// const cartItemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

const getAllProducts = async (req, res) => {
    try {
        const [results] = await db.poolWHAdmin.query(`SELECT * FROM product`);
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllProductsASC = async (req, res) => {
    try {
        const [results] = await db.poolWHAdmin.query(`SELECT * FROM product ORDER BY price ASC`);
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllProductsDSC = async (req, res) => {
    try {
        const [results] = await db.poolWHAdmin.query(`SELECT * FROM product ORDER BY price DESC`);
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getProductById = async (req, res) => {
    try {
        let productID = req.params.id;
        const [results] = await db.poolWHAdmin.query(`
            SELECT * FROM product where id = ?
        `, [productID]);
        if (results.length === 0) {
            return res.status(404).json({ error: `Product with id: ${productID} not found` });
        }
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const getProductByTitle = async (req, res) => {
    try {
        let productTitle = req.body.title;
        const [results] = await db.poolWHAdmin.query(`
            SELECT * FROM product WHERE title LIKE CONCAT('%', ?, '%')
        `, [productTitle]);
        if (results.length === 0) {
            return res.status(404).json({ error: `Product ${productTitle} not found` });
        }
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// TODO: Review Insert Product on MongoDB
const createProduct = async (req, res) => {
    try {
        const seller = req.username;
        const { 
            title, 
            product_description, 
            category, 
            price, 
            width, 
            length, 
            height, 
        } = req.body;

        // For Postman Testing
        // const { 
        //     title, 
        //      
        //     product_description, 
        //     category, 
        //     price, 
        //     width, 
        //     length, 
        //     height,
        //     seller, 
        // } = req.body;
        const query = `INSERT INTO product (title,  product_description, category, price, width, length, height, seller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const result = await db.poolWHAdmin.query(
            query, 
            [
                title, 
                product_description, 
                category, 
                price, 
                width, 
                length, 
                height, 
                seller
            ]);
        res.status(201).json({ 
            id: result.insertId, 
            title: result.title, 
            product_description: result.product_description, 
            category: result.category, 
            price: result.price,
            seller: seller, 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateProductById = async (req, res) => {
    try {
        const seller = req.username;
        const id = req.params.id;
        const { 
            title, 
            product_description, 
            category, 
            price, 
            width, 
            length, 
            height, 
        } = req.body;
        // For Postman Testing
        // const { 
        //     title, 
        //      
        //     product_description, 
        //     category, 
        //     price, 
        //     width, 
        //     length, 
        //     height,
        //     seller, 
        // } = req.body;
        const query = `UPDATE product SET title = ?, image = ?, product_description = ?, category = ?, price = ?, width = ?, length = ?, height = ?, seller = ? WHERE id = ?`;
        const result = await db.poolWHAdmin.query(
            query, 
            [
                title,  
                product_description, 
                category, 
                price, 
                width, 
                length, 
                height, 
                seller,
                id
            ]);
        res.json({ 
            message: "Product updated", 
            id: result.insertId, 
            title: result.title, 
            product_description: result.product_description, 
            category: result.category, 
            price: result.price,
            seller: seller, 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteProductById = async (req, res) => {
    try{
        let productID = req.params.productID;
        const [results] = await db.poolWHAdmin.query(`
            SELECT * FROM product where id = ?
        `, [productID]);
        if (results.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        const query=`DELETE FROM product WHERE id = ?`;
        await db.poolWHAdmin.query(query,[productID]);
        res.json({message:"Product deleted", id: productID});
    } catch(error){
        res.status(400).json({error:error.message});
    }
}

module.exports = {
    getAllProducts,
    getAllProductsASC,
    getAllProductsDSC,
    getProductById,
    getProductByTitle,
    createProduct,
    updateProductById,
    deleteProductById
}