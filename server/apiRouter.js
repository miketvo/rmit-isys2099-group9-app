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
    const [results] = await db.poolWHAdmin.query(`SELECT * FROM warehouse`);
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

{
  /* API Endpoint for all products */
}
apiRouter.get("/product", async (req, res) => {
  try {
    const [results] = await db.poolWHAdmin.query(`SELECT * FROM product`);
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

{
  /* API Endpoint for all buyer users */
}
apiRouter.get("/buyer", async (req, res) => {
  try {
    const [results] = await db.poolBuyer.query(`SELECT * FROM buyer`);
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

{
  /* API Endpoint for all seller users */
}
apiRouter.get("/seller", async (req, res) => {
  try {
    const [results] = await db.poolSeller.query(`SELECT * FROM seller`);
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
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
    await model.insertLazadaUser(role, username, salt, hashedPassword, shop_name);

    // Retrieve the user from the database
    const user = await model.getLazadaUser(role, username);

    // Generate tokens
    const tokens = await generateTokens(user);

    console.log(`tokens: ${JSON.stringify(tokens)}`);

    // Set the token as a cookie
    setTokenCookie(res, tokens.accessToken);

    res.status(200).send(`User created with username: ${username}`);
  } catch (err) {
    console.error("error: " + err.stack);
    res.status(500).send("Error inserting user into database");
  }
});


// Endpoint for /login
// Endpoint for /login
apiRouter.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    console.log(`username: ${username}`);
    console.log(`password: ${password}`);

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

    if (!username || !password || !role) {
      return res.sendStatus(400);
    }

    // Retrieve the user from the database
    const user = await model.getLazadaUser(role, username);

    if (!user) {
      return res.status(401).send("User not found");
    }

    // Hash the password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    // Compare the provided password with the stored hashed password
    const passwordMatches = compareSync(hashedPassword, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).send("Incorrect password");
    }

    // Generate tokens
    const tokens = await generateTokens(user);

    console.log(`tokens: ${JSON.stringify(tokens)}`);

    // Set the token as a cookie
    setTokenCookie(res, tokens.accessToken);

    res.status(200).send(`User logged in with username: ${username}`);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = apiRouter;
