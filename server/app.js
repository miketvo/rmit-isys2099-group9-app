const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "isys2099_group9_app",
});

app.get("/", (req, res) => {
  connection.connect(err => {
    if (err) {
      console.error("Error connecting to MySQL database: " + err.stack);
      return;
    }
    console.log("Connected to MySQL database as id " + connection.threadId);

    connection.query(`SELECT * FROM warehouse`, (err, results) => {
      if (err) {
        console.error("error: " + err.stack);
        return;
      }

      res.send("Hello, world\n" + results[0].warehouse_name);
    });

    connection.end(err => {
      if (err) {
        console.error("Error connecting to MySQL database: " + err.stack);
        return;
      }
      console.log("Connection closed");
    });
  });
});

app.listen(port, () => {
  console.log(`Backend API Server listening on port ${port}`);
});
