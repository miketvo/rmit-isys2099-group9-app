/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const model = require('../models/model.js');

async function verifyToken(token) {
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Check if a user with the given username exists
        const user = await model.getLazadaUser(decoded.username);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = verifyToken;
