//db.js
const db = require("./db.js");

let database = {};

{
  /* 
Endpoints for Lazada User
TODO: Grant SELECT permissions on lazada_user table
*/
}
database.getLazadaUser = (role, username) => {
  return new Promise(() => {
    if (role === "seller") {
      return database.getSeller(username);
    } else if (role === "buyer") {
      return database.getBuyer(username);
    }
  });
};

database.insertLazadaUser = (role, username, hashedPassword) => {
  return new Promise((resolve, reject) => {
    if (role === "seller") {
      db.poolSeller.query(
        `INSERT INTO lazada_user (username, password_hash)
         VALUES (?, ?)`,
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
    } else if (role === "buyer") {
      db.poolBuyer.query(
        `INSERT INTO lazada_user (username, password_hash)
         VALUES (?, ?)`,
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
    }
  });
};

{
  /* Endpoints for Buyer */
}
database.getBuyer = username => {
  return new Promise((resolve, reject) => {
    db.poolBuyer.query(
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
    db.poolBuyer.query(
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
    db.poolSeller.query(
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
    db.poolSeller.query(
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
