const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  return res.json("Server is running");
});

app.get("/warehouse", async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "isys2099_group9_app_whadmin_user",
      password: "jlAfD3sBdpJvz0phULIq4CAaAMIIoGNA",
      database: "isys2099_group9_app",
    });

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

    await new Promise((resolve, reject) => {
      connection.end(err => {
        if (err) {
          console.error("Error connecting to MySQL database: " + err.stack);
          reject(err);
          return;
        }
        console.log("Connection closed");
        resolve();
      });
    });

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/product", async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "isys2099_group9_app_buyer_user",
      password: "gxQJCza0eADkT5AKmeE865ZN8p1nBsar",
      database: "isys2099_group9_app",
    });

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

    await new Promise((resolve, reject) => {
      connection.end(err => {
        if (err) {
          console.error("Error connecting to MySQL database: " + err.stack);
          reject(err);
          return;
        }
        console.log("Connection closed");
        resolve();
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
