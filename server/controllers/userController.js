require('express')
const db = require("../models/db.js");

const normalCharRegex = /^[A-Za-z0-9._-]*$/;

const userController = {
    // Get all buyers
    getAllBuyers: async (req, res) => {
        try {
            const [results] = await db.poolBuyer.query(`SELECT * FROM buyer`);
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Get all sellers
    getAllSellers: async (req, res) => {
        try {
            const [results] = await db.poolSeller.query(`SELECT * FROM seller`);
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Get all wh admins
    getAllWHAdmin: async (req, res) => {
        try {
            const [results] = await db.poolWHAdmin.query(`SELECT * FROM wh_admin`);
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Get buyer by username
    getBuyerByUsername: async (req, res) => {
        try {
            const username = req.params.username;
            const [results] = await db.poolBuyer.query(`SELECT * FROM buyer WHERE username = ?`, [username]);
            if (results.length === 0) {
                return res.status(404).json({ error: `Buyer ${username} not found`, username: username, role: "buyer" });
            }
            return res.json(results[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Get wh admins by username
    getWHAdminByUsername: async (req, res) => {
        try {
            const username = req.params.username;
            const [results] = await db.poolWHAdmin.query(`SELECT * FROM wh_admin WHERE username = ?`, [username]);
            if (results.length === 0) {
                return res.status(404).json({ error: `Admin ${username} not found`, username: username, role: "admin" });
            }
            return res.json(results[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Get seller by username
    getSellerByUsername: async (req, res) => {
        try {
            const username = req.params.username;
            const [results] = await db.poolSeller.query(`SELECT * FROM seller WHERE username = ?`, [username]);
            if (results.length === 0) {
                return res.status(404).json({ error: `Seller ${username} not found`, username: username, role: "seller" });
            }
            return res.json(results[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Update a buyer's username
    updateBuyerUsername: async (req, res) => {
        try {
            const oldUsername = req.username;
            const { newUsername } = req.body;

            // prevent SQL injection
            if (!newUsername.match(normalCharRegex)) {
                throw new Error("The new username must not have strange characters");
            }

            await db.poolBuyer.query(`UPDATE buyer SET username = ? WHERE username = ?`, [newUsername, oldUsername]);
            res.json({ message: `Buyer ${newUsername} updated successfully`, username: newUsername, role: "buyer" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Update a wh admin's username
    updateWHAdminUsername: async (req, res) => {
        try {
            const oldUsername = req.username;
            const { newUsername } = req.body;

            // prevent SQL injection
            if (!newUsername.match(normalCharRegex)) {
                throw new Error("The new username must not have strange characters");
            }

            await db.poolWHAdmin.query(`UPDATE wh_admin SET username = ? WHERE username = ?`, [newUsername, oldUsername]);
            res.json({ message: `Admin ${newUsername} updated successfully`, username: newUsername, role: "admin" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Update a seller's username and/or shop name
    updateSeller: async (req, res) => {
        console.log(req.params)
        try {
            const oldUsername = req.params.username;
            const { newUsername, newShopName } = req.body;

            // prevent SQL injection
            if (!newUsername.match(normalCharRegex)) {
                throw new Error("The new username must not have strange characters");
            }
            
            if (newUsername && newShopName) {
            await db.poolSeller.query(`UPDATE seller SET username = ?, shop_name = ? WHERE username = ?`, [newUsername, newShopName, oldUsername]);
            res.json({ message: `Seller ${newUsername} updated successfully`, username: newUsername, shop_name: newShopName, role: "seller" });
            
            } else if (newUsername) {
            await db.poolSeller.query(`UPDATE seller SET username = ? WHERE username = ?`, [newUsername, oldUsername]);
            res.json({ message: `Seller ${newUsername} updated successfully`, username: newUsername, role: "seller" });
            
            } else if (newShopName) {
            await db.poolSeller.query(`UPDATE seller SET shop_name = ? WHERE username = ?`, [newShopName, oldUsername]);
            res.json({ message: `Seller ${newUsername} updated successfully`, username: oldUsername, shop_name: newShopName, role: "seller" });
            }
            
            res.status(400).json({message:"Please provide either newUsername or newShopName or both", username: oldUsername, role: "seller" });
             
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Delete a buyer by username
    deleteBuyerByUsername: async (req, res) => {
        try {
            const username = req.username;
            await db.poolBuyer.query(`DELETE FROM buyer WHERE username = ?`, [username]);
            res.json({ message: `Buyer ${username} deleted successfully`, username: username, role: "buyer" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Delete a wh admin by username
    deleteWHAdminByUsername: async (req, res) => {
        try {
            const username = req.username;
            await db.poolWHAdmin.query(`DELETE FROM wh_admin WHERE username = ?`, [username]);
            res.json({ message: `WH Admin ${username} deleted successfully`, username: username, role: "admin" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Delete a seller by username
    deleteSellerByUsername: async (req, res) => {
        try {
            const username = req.username;
            await db.poolSeller.query(`DELETE FROM seller WHERE username = ?`, [username]);
            res.json({ message: `Seller ${username} deleted successfully`, username: username, role: "seller" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = userController;
