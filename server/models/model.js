//db.js
const db = require("./db.js");

let database = {};

{
  /* 
Endpoints for Lazada User
TODO: Grant SELECT permissions on lazada_user table
*/
}
database.getLazadaUser = username => {
  return new Promise((resolve, reject) => {
    db.poolWHAdmin.query(
      `SELECT * FROM lazada_user WHERE username = ?`,
      [username],
      (err, results) => {
        if (err) {
          console.error("error: " + err.stack);
          reject(err);
          return;
        }
        resolve(results[0]);
      },
    );
  });
};

database.insertLazadaUser = (username, hashedPassword) => {
  return new Promise((resolve, reject) => {
    db.poolWHAdmin.query(
      `INSERT INTO lazada_user (username, password_hash) VALUES (?, ?)`,
      [username, hashedPassword],
      (err, results) => {
        if (err) {
          console.error("error: " + err.stack);
          reject(err);
          return;
        }
        resolve(results.insertId);
      },
    );
  });
};

{
  /* Endpoints for Buyer */
}
database.getBuyer = username => {
  return new Promise((resolve, reject) => {
    db.poolWHAdmin.query(
      `SELECT * FROM buyer WHERE username = ?`,
      [username],
      (err, results) => {
        if (err) {
          console.error("error: " + err.stack);
          reject(err);
          return;
        }
        resolve(results[0]);
      },
    );
  });
};

database.insertBuyer = username => {
  return new Promise((resolve, reject) => {
    db.poolWHAdmin.query(
      `INSERT INTO buyer (username) VALUES (?)`,
      [username],
      (err, results) => {
        if (err) {
          console.error("error: " + err.stack);
          reject(err);
          return;
        }
        resolve(results.insertId);
      },
    );
  });
};

{
  /* Endpoints for Seller */
}
database.getSeller = username => {
  return new Promise((resolve, reject) => {
    db.poolWHAdmin.query(
      `SELECT * FROM seller WHERE username = ?`,
      [username],
      (err, results) => {
        if (err) {
          console.error("error: " + err.stack);
          reject(err);
          return;
        }
        resolve(results[0]);
      },
    );
  });
};

database.insertSeller = (username, shop_name) => {
  return new Promise((resolve, reject) => {
    db.poolWHAdmin.query(
      `INSERT INTO seller (username, shop_name) VALUES (?, ?)`,
      [username, shop_name],
      (err, results) => {
        if (err) {
          console.error("error: " + err.stack);
          reject(err);
          return;
        }
        resolve(results.insertId);
      },
    );
  });
};

module.exports = database;
