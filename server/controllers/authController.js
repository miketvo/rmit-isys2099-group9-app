const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

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

    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    console.log(`role: ${role}`);
    console.log(`shop_name: ${shop_name}`);

    if(await model.getLazadaUser(role, username)) {
      return res.status(409).send('Username already exists');
    };

    if (!username || !password || !role) {
      return res.sendStatus(400);
    }

    // Hash the password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    console.log(`hashedPassword: ${hashedPassword}`);

    // Insert the user into the database
    model.insertLazadaUser(role, username, hashedPassword, shop_name);

    // Generate tokens
    const tokens = await generateTokens(username);

    console.log(`tokens: ${JSON.stringify(tokens)}`);

    // Set the token as a cookie
    setTokenCookie(res, username);

    res.status(200).send(`User created with username: ${username}`);
  } catch (err) {
    console.error("error: " + err.stack);
    res.status(500).send("Error inserting user into database");
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

    let role;
    let seller = await model.getSeller(username);
    if (seller) {
      role = "seller";
    } else {
      role = "buyer";
    }
    console.log("role: " + role);

    // Retrieve the user from the database
    let user = await model.getLazadaUser(role, username);
    if (!user) {
      return res.status(401).send("User not found");
    }

    const [results] = await db.poolSeller.query(`SELECT * FROM lazada_user WHERE username = ?`, [username]);
    user = results[0];
    
    console.log("login user's password_hash: " + user.password_hash);

    // Compare the provided password with the stored hashed password
    const passwordMatches = compareSync(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).send("Incorrect password");
    }

    // if (user.refresh_token) {
    //   res.cookie('refreshToken', user.refresh_token, { httpOnly: true });
    //   return res.status(200).json({ message: 'User authenticated', user: username});
    // }

    // Generate tokens
    const tokens = await generateTokens(username);

    console.log(`tokens: ${JSON.stringify(tokens)}`);

    // Set the token as a cookie
    setTokenCookie(res, username);

    return res.status(200).json({ message: 'User authenticated', user: username});
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

// Endpoint for logout
const logout = async (req, res) => {

  res.cookie("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
  });

  res.cookie("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
  });

  if (req.username) {
    await db.poolBuyer.query(
      "UPDATE lazada_user SET refresh_token = NULL WHERE username = ?",
      [req.username]
    );
  } else {
    return res.status(401).send("User not found");
  }

  res.status(200).json({ message: `User log out`, user: req.username});
};

const allUsers = async (req, res) => {
  try {
    const [results] = await db.poolSeller.query(`SELECT * FROM lazada_user`);
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  register,
  login,
  logout,
  allUsers
}