/* eslint-disable no-undef */
const { setTokenCookie, verifyToken } = require('../utils')
const { db } = require('../models');

const authenticate = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    console.log('access token: ' + accessToken);
    try {
        if (!accessToken) {
            const payload = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.username = payload.username;
            res.status(200).json({ message: 'User authenticated', user: req.username });
            return next();
        } else {
            const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            console.log(`username with the token ${payload.username}`);

            const [results] = await db.poolSeller.query(`SELECT * FROM lazada_user WHERE username = ?`, [payload.username]);
            user = results[0];

            console.log(`auth user ${user}`);

            if (!user.refresh_token) {
                throw new Error(
                    "Authentication Invalid"
                );
            }

            setTokenCookie(res, user.username);

            req.username = payload.username;

            next();
        } 
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred during authentication');
      }
};

module.exports = {
    authenticate,
};
