//apiRouter.js
const express =require('express');
const apiRouter = express.Router();
 
const jsonwebtoken = require('jsonwebtoken');
const db = require('./models/db.js');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const cookieParser = require('cookie-parser');

apiRouter.use(cookieParser());

{/* API Endpoint for all warehouses */}
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

{/* API Endpoint for all products */}
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

{/* API Endpoint for all buyer users */}
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

{/* API Endpoint for all seller users */}
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

apiRouter.post('/register', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.sendStatus(400);
        }

        // Hash the password
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        // Insert the user into the database
        const userId = await db.insertLazadaUser(username, hashedPassword);

        // Create a JWT token
        // eslint-disable-next-line no-undef
        const jsontoken = jsonwebtoken.sign({user: userId}, process.env.SECRET_KEY, { expiresIn: '1d'} );

        // Set the token as a cookie
        res.cookie('token', jsontoken, { httpOnly: true, secure: true, SameSite: 'strict' , expires: new Date(Number(new Date()) + 30*60*1000) }); //we add secure: true, when using https.

        res.status(200).send(`User created with ID: ${userId}`);
    } catch (err) {
        console.error("error: " + err.stack);
        res.status(500).send('Error inserting user into database');
    }
});

apiRouter.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.sendStatus(400);
        }

        // Retrieve the user from the database
        const user = await db.getLazadaUser(username);

        if (!user) {
            return res.status(401).send('User not found');
        }

        // Compare the provided password with the stored hashed password
        const passwordMatches = compareSync(password, user.password_hash);

        if (!passwordMatches) {
            return res.status(401).send('Incorrect password');
        }

        // Create a JWT token
        // eslint-disable-next-line no-undef
        const jsontoken = jsonwebtoken.sign({ user: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Set the token as a cookie
        res.cookie('token', jsontoken, { httpOnly: true, secure: true, SameSite: 'strict', expires: new Date(Number(new Date()) + 30*60*1000) });

        res.json({ token: jsontoken });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = apiRouter;