//apiRouter.js
const express = require("express");
const apiRouter = express.Router();

const { db, model } = require("./models");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const cookieParser = require("cookie-parser");
const { generateTokens, setTokenCookie } = require("./utils");

apiRouter.use(cookieParser());

{
  /* API Endpoint for all warehouses */
}
apiRouter.get("/warehouse", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.poolWHAdmin.query(`SELECT * FROM warehouse`, (err, results) => {
        if (err) {
          console.error("error: " + err.stack);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

{
  /* API Endpoint for all products */
}
apiRouter.get("/product", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.poolWHAdmin.query(`SELECT * FROM product`, (err, results) => {
        if (err) {
          console.error("error: " + err.stack);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

{
  /* API Endpoint for all buyer users */
}
apiRouter.get("/buyer", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.poolWHAdmin.query(`SELECT * FROM buyer`, (err, results) => {
        if (err) {
          console.error("error: " + err.stack);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

{
  /* API Endpoint for all seller users */
}
apiRouter.get("/seller", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.poolWHAdmin.query(`SELECT * FROM seller`, (err, results) => {
        if (err) {
          console.error("error: " + err.stack);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for /register
apiRouter.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const shop_name = req.body.shop_name;

    if (!username || !password || !role) {
      return res.sendStatus(400);
    }

    // Hash the password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    // Insert the user into the database
    await model.insertLazadaUser(role, username, hashedPassword);

    if (role === "seller") {
      await model.insertSeller(username, shop_name);
    } else if (role === "buyer") {
      await model.insertBuyer(username);
    }

    // Generate tokens
    const tokens = await generateTokens({ username: username });

    // Set the token as a cookie
    setTokenCookie(res, tokens.accessToken);

    res.status(200).send(`User created with username: ${username}`);
  } catch (err) {
    console.error("error: " + err.stack);
    res.status(500).send("Error inserting user into database");
  }
});

// Endpoint for /login
apiRouter.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.sendStatus(400);
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
    const user = await model.getLazadaUser(role, username);

    if (!user) {
      return res.status(401).send("User not found");
    }

    // Compare the provided password with the stored hashed password
    const passwordMatches = compareSync(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).send("Incorrect password");
    }


    // Generate tokens
    const tokens = await generateTokens({ username: username });

    // Set the token as a cookie
    setTokenCookie(res, tokens.accessToken);

    res.json({ token: tokens.accessToken });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = apiRouter;
