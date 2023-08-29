/* eslint-disable no-undef */
const { setTokenCookie, verifyToken } = require('../utils')

const authenticate = async (req, res) => {
    const { accessToken, refreshToken } = req.cookies;

    try {
        if (accessToken) {
            const payload = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.username = payload.username;
            res.status(200).json({ message: 'User authenticated', user: req.username });

        } else {
            const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            const [results] = await db.poolSeller.query(`SELECT * FROM lazada_user WHERE username = ?`, [req.username]);
            user = results[0];
            console.log(`username with the token ${user.username}`);

            if (!user.refresh_token) {
                throw new Error(
                    "Authentication Invalid"
                );
            }

            setTokenCookie(user.refresh_token, user.username);

            req.username = payload.username;
        } 
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred during authentication');
      }
};

module.exports = {
    authenticate,
};
