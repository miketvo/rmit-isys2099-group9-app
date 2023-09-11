/* eslint-disable no-undef */
const { setTokenCookie, verifyToken } = require("../utils");
const { model } = require("../models");

const authenticate = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  console.log("\n");
  console.log("Access token: " + accessToken);
  console.log("Refresh token: " + refreshToken);

  try {
    // Check if there are any tokens in the cookies
    if (!refreshToken) {
      res.status(403).send("Authentication Ivalid");

      // } else if (accessToken) {
      //     const payload = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
      //     req.username = payload.username;
      //     res.status(200).json({ message: 'User authenticated', user: req.username });
      //     next();
    } else {
      const payload = verifyToken(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      console.log("\n");
      console.log(`username with the token ${payload.username}`);

      const lazada_user = await model.getLazadaUser(payload.username);
      const wh_admin = await model.getWHAdmin(payload.username);
      const user = wh_admin ? wh_admin : lazada_user;

      console.log("\n");
      console.log(
        `Auth user ${user.username} refresh token ${user.refresh_token} `,
      );

      if (!user.refresh_token) {
        throw new Error("Authentication Invalid");
      }

      setTokenCookie(res, user.username, payload.role, payload.shop_name);

      req.username = payload.username;
      req.role = payload.role;
      req.shop_name = payload.shop_name;

      next();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred during authentication");
  }
};

module.exports = {
  authenticate,
};
