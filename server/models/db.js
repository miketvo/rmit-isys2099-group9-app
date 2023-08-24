/* eslint-disable no-undef */
const mysql = require("mysql2");

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
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER_ADM,
            password: process.env.DB_PASS_ADM,
            database: process.env.MYSQL_DB,
        });
    }

    connectDB() {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) {
                    console.error("Error connecting to MySQL database: " + err.stack);
                    reject(err);
                    return;
                }
                console.log("Connected to MySQL database as id " + this.connection.threadId);
                resolve();
            });
        });
    }
}

module.exports = new Database();
