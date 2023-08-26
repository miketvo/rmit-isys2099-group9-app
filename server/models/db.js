/* eslint-disable no-undef */
const mysql = require("mysql2/promise");

class Database {
  constructor() {
    if (Database.exists) {
      return Database.instance;
    }
    this.initDB();
    Database.instance = this;
    Database.exists = true;
    return this;
  }

  initDB() {
    this.poolWHAdmin = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER_ADM,
      password: process.env.DB_PASS_ADM,
      database: process.env.MYSQL_DB,
      connectionLimit: process.env.CONNECTION_LIMIT,
    });

    this.poolBuyer = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER_BUYER,
      password: process.env.DB_PASS_BUYER,
      database: process.env.MYSQL_DB,
      connectionLimit: process.env.CONNECTION_LIMIT,
    });

    this.poolSeller = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER_SELLER,
      password: process.env.DB_PASS_SELLER,
      database: process.env.MYSQL_DB,
      connectionLimit: process.env.CONNECTION_LIMIT,
    });
  }

  connectDB() {
    return new Promise((resolve, reject) => {
      this.poolWHAdmin.connect(err => {
        if (err) {
          console.error("Error connecting to MySQL database: " + err.stack);
          reject(err);
          return;
        }
        console.log(
          "Connected to MySQL database as id " + this.connection.threadId,
        );
        resolve();
      });

      this.poolBuyer.connect(err => {
        if (err) {
          console.error("Error connecting to MySQL database: " + err.stack);
          reject(err);
          return;
        }
        console.log(
          "Connected to MySQL database as id " + this.connection.threadId,
        );
        resolve();
      });

      this.poolSeller.connect(err => {
        if (err) {
          console.error("Error connecting to MySQL database: " + err.stack);
          reject(err);
          return;
        }
        console.log(
          "Connected to MySQL database as id " + this.connection.threadId,
        );
        resolve();
      });
    });
  }
}

module.exports = new Database();
