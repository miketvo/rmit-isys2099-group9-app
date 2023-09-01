/* eslint-disable no-undef */
const { setTokenCookie, verifyToken } = require('../utils')
const { model } = require('../models');

const authenticate = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    console.log('\n');
    console.log('access token: ' + accessToken);
    try {
        if (!accessToken && !refreshToken) {
            res.status(403).send('Authentication Ivanlid');

        } else if (!accessToken) {
            const payload = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.username = payload.username;
            res.status(200).json({ message: 'User authenticated', user: req.username });
            return next();
        } else {
            const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            
            console.log('\n');
            console.log(`username with the token ${payload.username}`);

            let user, role;
            if (await model.getWHAdmin(payload.username)) {
                user = await model.getWHAdmin(payload.username);
                role = "admin";
            } else if (await model.getLazadaUser(payload.username)) {
                user = await model.getLazadaUser(payload.username);
                role = "lazada_user";
            }

            console.log('\n');
            console.log(`auth user ${user.username} refresh token ${user.refresh_token} `);

            if (!user.refresh_token) {
                throw new Error(
                    "Authentication Invalid"
                );
            }

            setTokenCookie(res, user.username, role);

            req.username = payload.username;
            req.role = role;

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
