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

    // Get buyer by username
    getBuyerByUsername: async (req, res) => {
        try {
            const username = req.params.username;
            const [results] = await db.poolBuyer.query(`SELECT * FROM buyer WHERE username = ?`, [username]);
            if (results.length === 0) {
                return res.status(404).json({ error: "Buyer not found" });
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
                return res.status(404).json({ error: "Seller not found" });
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
            const oldUsername = req.params.username;
            const { newUsername } = req.body;

            // prevent SQL injection
            if (!newUsername.match(normalCharRegex)) {
                throw new Error("The new username must not have strange characters");
            }

            await db.poolBuyer.query(`UPDATE buyer SET username = ? WHERE username = ?`, [newUsername, oldUsername]);
            res.json({ message: "Buyer updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Update a seller's username and/or shop name
    updateSeller: async (req, res) => {
        try {
            const oldUsername = req.params.username;
            const { newUsername, newShopName } = req.body;

            // prevent SQL injection
            if (!newUsername.match(normalCharRegex)) {
                throw new Error("The new username must not have strange characters");
            }
            
            if (newUsername && newShopName) {
            await db.poolSeller.query(`UPDATE seller SET username = ?, shop_name = ? WHERE username = ?`, [newUsername, newShopName, oldUsername]);
            return res.json({ message: "Seller updated successfully" });
            
            } else if (newUsername) {
            await db.poolSeller.query(`UPDATE seller SET username = ? WHERE username = ?`, [newUsername, oldUsername]);
            return res.json({ message: "Seller updated successfully" });
            
            } else if (newShopName) {
            await db.poolSeller.query(`UPDATE seller SET shop_name = ? WHERE username = ?`, [newShopName, oldUsername]);
            return res.json({ message: "Seller updated successfully" });
            }
            
            return res.status(400).json({message:"Please provide either newUsername or newShopName or both"});
             
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Delete a buyer by username
    deleteBuyerByUsername: async (req, res) => {
        try {
            const username = req.params.username;
            await db.poolBuyer.query(`DELETE FROM buyer WHERE username = ?`, [username]);
            res.json({ message: "Buyer deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Delete a seller by username
    deleteSellerByUsername: async (req, res) => {
        try {
            const username = req.params.username;
            await db.poolSeller.query(`DELETE FROM seller WHERE username = ?`, [username]);
            res.json({ message: "Seller deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = userController;
