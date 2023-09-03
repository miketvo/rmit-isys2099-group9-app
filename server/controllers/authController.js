const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

// eslint-disable-next-line no-unused-vars
const { db, model } = require("../models");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { generateTokens, setTokenCookie } = require("../utils");

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
    console.log('\n');
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    console.log(`role: ${role}`);
    console.log(`shop_name: ${shop_name}`);

    if(await model.getLazadaUserByRole(role, username)) {
      return res.status(409).json({ message: 'Username already exists', username: username, role: role });
    };

    if (!username || !password || !role) {
      return res.sendStatus(400);
    }

    // Hash the password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    console.log('\n');
    console.log(`hashedPassword: ${hashedPassword}`);

    // Insert the user into the database
    model.insertLazadaUserByRole(role, username, hashedPassword, shop_name);

    // Generate tokens
    // const tokens = generateTokens(username);

    // console.log('\n');
    // console.log(`tokens: ${JSON.stringify(tokens)}`);

    // setTokenCookie(res, username);

    req.role = role;
    req.username = username;

    return res.status(200).json({message: `User ${role} created with username: ${username}`, username: username, role: role });
  } catch (err) {
    console.error("error: " + err.stack);
    return res.status(500).send("Error inserting user into database");
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
      return res.status(400).send('Please provide a username and password');
    }

    let role, user;

    // Retrieve the user from the database
    if (await model.getSeller(username)) {
      role = "seller";
      user = await model.getSeller(username)
    } else if (await model.getBuyer(username)) {
      role = "buyer";
      user = await model.getBuyer(username)
    } else if (await model.getWHAdmin(username)) {
      role = "admin";
      user = await model.getWHAdmin(username)
    }
    console.log("role: " + role);

    if (!user) {
      return res.status(401).send("User not found");
    }

    // Get user password
    let existingUser;
    if (role === "seller" || role === "buyer") {
      existingUser = await model.getLazadaUserByRole("lazada_user", username);
    } else {
      existingUser = await model.getLazadaUserByRole(role, username);
    }

    console.log("login user's password_hash: " + existingUser.password_hash);

    // Compare the provided password with the stored hashed password
    const passwordMatches = compareSync(password, existingUser.password_hash);

    if (!passwordMatches) {
      return res.status(401).send("Incorrect password");
    }

    // If the refresh token exists
    // if (existingUser.refresh_token && existingUser.refresh_token !== null) {
    //   res.cookie("refreshToken", existingUser.refreshToken, {
    //     httpOnly: true,
    //     // secure: true, // later in production
    //     samesite: "strict",
    //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    //   });      
    //   return res.status(200).json({ message: `User ${username} authenticated`, username: username, role: role });
    // }

    // Generate tokens
    const tokens = generateTokens(username, role);

    console.log(`tokens: ${JSON.stringify(tokens)}`);

    // Set the token as a cookie
    setTokenCookie(res, username, role);

    req.role = role;
    req.username = username;

    return res.status(200).json({ message: `User ${username} authenticated`, username: username, role: role });
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

  } else if (req.role === "lazada_user") {
    await model.deleteLazadaUserToken(req.username);

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

  return res.status(200).json({ message: `User ${req.username} log out`, username: req.username, role: req.role });
};

module.exports = {
  register,
  login,
  logout
}