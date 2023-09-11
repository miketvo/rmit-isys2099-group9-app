const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

// eslint-disable-next-line no-unused-vars
const { db, model } = require("../models");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
// eslint-disable-next-line no-unused-vars
const { generateTokens, setTokenCookie, verifyToken } = require("../utils");

const normalCharRegex = /^[A-Za-z0-9._-]*$/;

// Endpoint for /register
const register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const shop_name = req.body.shop_name;

    // prevent SQL injection
    if (!username.match(normalCharRegex)) {
      throw new Error("The username must not have strange characters");
    }
    console.log("\n");
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    console.log(`role: ${role}`);
    console.log(`shop_name: ${shop_name}`);

    if (
      (await model.getLazadaUser(username)) ||
      (await model.getWHAdmin(username))
    ) {
      return res
        .status(409)
        .json({ error: "Username already exists", username: username });
    }

    if (!username || !role) {
      return res
        .status(400)
        .json({ error: "Please enter a username and role" });
    } else if (role === "seller" && !shop_name) {
      return res.status(400).json({ error: "Please enter a shop name" });
    }

    if (role === "seller" && (await model.getShopName(shop_name))) {
      return res.status(409).json({ error: "Shop name already exists" });
    }

    // Hash the password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    console.log("\n");
    console.log(`Hashed Password: ${hashedPassword}`);

    // Insert the user into the database
    model.insertLazadaUserByRole(role, username, hashedPassword, shop_name);

    req.role = role;
    req.username = username;
    req.role = role;

    return res.status(200).json({
      message: `User ${role} created with username: ${username}`,
      username: username,
      role: role,
      shop_name: shop_name,
    });
  } catch (err) {
    console.error("error: " + err.stack);
    return res
      .status(500)
      .json({ error: "Error inserting user into database" });
  }
};

// Endpoint for /login
const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    console.log(`username: ${username}`);
    console.log(`password: ${password}`);

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please provide a username and password" });
    }

    let role, user, shop_name;

    // Retrieve the user from the database
    if (await model.getSeller(username)) {
      role = "seller";
      user = await model.getSeller(username);
      shop_name = user.shop_name;
    } else if (await model.getBuyer(username)) {
      role = "buyer";
    } else {
      return res.status(401).json({ error: "User not found" });
    }
    console.log("role: " + role);

    // Get user password
    let existingUser;
    if (role === "seller" || role === "buyer") {
      existingUser = await model.getLazadaUserByRole("lazada_user", username);
    }

    console.log("Login user's password_hash: " + existingUser.password_hash);

    // Compare the provided password with the stored hashed password
    const passwordMatches = compareSync(password, existingUser.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate tokens
    const tokens = generateTokens(username, role, shop_name);

    console.log(`tokens: ${JSON.stringify(tokens)}`);

    // Set the token as a cookie
    setTokenCookie(res, username, role, shop_name);

    req.role = role;
    req.username = username;
    req.shop_name = shop_name;

    return res.status(200).json({
      message: `User ${username} authenticated`,
      username: username,
      role: role,
      shop_name: shop_name,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    console.log(`username: ${username}`);
    console.log(`password: ${password}`);

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please provide a username and password" });
    }

    // Retrieve the user from the database
    if (!(await model.getWHAdmin(username))) {
      return res
        .status(401)
        .json({ error: "User not found or not an warehouse admin" });
    }

    const role = "admin";
    // Get user password
    const existingUser = await model.getLazadaUserByRole(role, username);

    console.log("Login user's password_hash: " + existingUser.password_hash);

    // Compare the provided password with the stored hashed password
    const passwordMatches = compareSync(password, existingUser.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const shop_name = "";
    // Generate tokens
    const tokens = generateTokens(username, role, shop_name);

    console.log(`tokens: ${JSON.stringify(tokens)}`);

    // Set the token as a cookie
    setTokenCookie(res, username, role, shop_name);

    req.role = role;
    req.username = username;

    return res.status(200).json({
      message: `User ${username} authenticated`,
      username: username,
      role: "admin",
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

// Endpoint for logout
const logout = async (req, res) => {
  console.log(`${req.username} logged out with role ${req.role}`);

  if (req.role === "admin") {
    await model.deleteWHAdminToken(req.username);
    console.log(`\nDelete ${req.role} ${req.username} token`);
  } else if (req.role === "seller" || req.role === "buyer") {
    await model.deleteLazadaUserToken(req.username);
    console.log(`\nDelete ${req.role} ${req.username} token`);
  } else {
    return res.status(401).send("User not found");
  }

  res.cookie("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({
    message: `User ${req.username} log out`,
    username: req.username,
    role: req.role,
    shop_name: req.shop_name,
  });
};

module.exports = {
  register,
  login,
  loginAdmin,
  logout,
};
