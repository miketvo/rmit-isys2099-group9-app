/* eslint-disable no-undef */
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_ADM,
    password: process.env.DB_PASS_ADM,
    database: process.env.MYSQL_DB,
});

module.exports = connection;