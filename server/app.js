const express = require("express");
const cors = require("cors");
const connection = require("../server/models/db.js");

const app = express();
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  return res.json("Server is running");
});

{/* API Endpoint for warehouse */}
app.get("/warehouse", async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      connection.connect(err => {
        if (err) {
          console.error("Error connecting to MySQL database: " + err.stack);
          reject(err);
          return;
        }
        console.log("Connected to MySQL database as id " + connection.threadId);
        resolve();
      });
    });

    const results = await new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM warehouse`, (err, results) => {
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

{/* API Endpoint for product */}
app.get("/product", async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      connection.connect(err => {
        if (err) {
          console.error("Error connecting to MySQL database: " + err.stack);
          reject(err);
          return;
        }
        console.log("Connected to MySQL database as id " + connection.threadId);
        resolve();
      });
    });

    const results = await new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM product`, (err, results) => {
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

app.listen(port, () => {
  console.log(`Backend API Server listening on port ${port}`);
});
