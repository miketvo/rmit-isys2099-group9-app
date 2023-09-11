/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const db = require("../models/db.js");

const generateTokens = (username, role, shop_name) => {
  try {
    // Check if environment variables are set
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      throw new Error(
        "Token secrets are not set in the environment variables.",
      );
    }

    // Generate an access token
    const accessToken = jwt.sign(
      { username: username, role: role, shop_name: shop_name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" },
    );

    // Generate a refresh token
    const refreshToken = jwt.sign(
      { username: username, role: role, shop_name: shop_name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    console.log("\n");
    console.log(`User for tokens: ${username}`);

    // Store the refresh token in the database
    if (role === "admin") {
      db.poolWHAdmin.query(
        "UPDATE wh_admin SET refresh_token = ? WHERE username = ?",
        [refreshToken, username],
      );
    } else {
      db.poolBuyer.query(
        "UPDATE lazada_user SET refresh_token = ? WHERE username = ?",
        [refreshToken, username],
      );
    }

    return { accessToken, refreshToken };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = generateTokens;
