/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const db = require('../models/db.js');

async function generateTokens(user) {
    try {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });

        // Generate a refresh token
        const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        // Store the refresh token in the database
        await db.poolWHAdmin.query('INSERT INTO UserToken (user_id, refresh_token) VALUES (?, ?)', [user.id, refreshToken]);

        return { accessToken, refreshToken };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = generateTokens;
