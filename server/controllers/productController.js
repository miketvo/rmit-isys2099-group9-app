require("express");
const { db } = require("../models");

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
        let id = req.params.id;
        const [results] = await db.poolWHAdmin.query(`
            SELECT * FROM product where id = ?
        `, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: `Product with id: ${id} not found` });
        }
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const getProductByTitle = async (req, res) => {
    try {
        let title = req.params.title;
        const [results] = await db.poolWHAdmin.query(`
            SELECT * FROM product WHERE title LIKE CONCAT('%', ?, '%')
        `, [title]);
        if (results.length === 0) {
            return res.status(404).json({ error: `Product ${title} not found` });
        }
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// TODO: Review Insert Product on MongoDB with product attributes associated
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

        const fileName = req.file.filename;
        if (!fileName) {
            return res.status(404).json({ message: 'File not found in the request' });
        }
        // eslint-disable-next-line no-undef
        const basePath = `http://localhost:${process.env.SERVER_PORT}/uploads/`
        // `${basePath}${fileName}` will return the image that is stored in the server
        const image = `${basePath}${fileName}`; // For example: "http://localhost:3000/server/uploads/<image>"

        console.log(image);

        const query = `INSERT INTO view_product_noid (title, image, product_description, category, price, width, length, height, seller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const result = await db.poolWHAdmin.query(
            query, 
            [
                title,
                image, 
                product_description, 
                category, 
                price, 
                width, 
                length, 
                height, 
                seller
            ]);

        console.log(result[0]);

        res.status(201).json({ 
            message: 'Product created successfully',
            id: result[0].insertId, 
            title: title,
            image: image, 
            product_description: product_description, 
            category: category, 
            price: price,
            width: width,
            length: length,
            height: height,
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

        const fileName = req.file.filename;
        if (!fileName) {
            return res.status(404).json({ message: 'File not found in the request' });
        }
        // eslint-disable-next-line no-undef
        const basePath = `http://localhost:${process.env.SERVER_PORT}/uploads/`
        // `${basePath}${fileName}` will return the image that is stored in the server
        const image = `${basePath}${fileName}`; // For example: "http://localhost:3000/server/uploads/<image>"

        console.log(image);

        const query = `UPDATE product SET title = ?, image = ?, product_description = ?, category = ?, price = ?, width = ?, length = ?, height = ?, seller = ? WHERE id = ?`;
        const result = await db.poolWHAdmin.query(
            query, 
            [
                title,
                image,  
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
            id: result[0].insertId, 
            title: title,
            image: image,
            product_description: product_description, 
            category: category, 
            price: price,
            seller: seller, 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteProductById = async (req, res) => {
    try{
        let productID = req.params.id;
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

//  TODO: Implement GET product attributes

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