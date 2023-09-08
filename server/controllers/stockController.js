/* eslint-disable no-unused-vars */
const { db, model } = require("../models");

// TODO: Double check this function
const getAllStockpile = async (req, res) => {
    try {
        const [results] = await db.poolWHAdmin.query(`SELECT * FROM stockpile`);
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getAllStockpile };