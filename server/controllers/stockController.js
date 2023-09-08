/* eslint-disable no-unused-vars */
const { db, model } = require("../models");

const getAllStockpile = async () => {
    const [results] = await db.poolWHAdmin.query(`SELECT * FROM stockpile`);
    return results;
};

module.exports = getAllStockpile;