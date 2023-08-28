//db.js
const db = require("./db.js");

let database = {};

{
  /* Endpoints for Buyer */
}
database.getBuyer = async username => {
  try {
    const [results] = await db.poolBuyer.query(
      `SELECT * FROM buyer WHERE username = ?`,
      [username]
    );
    return results[0];
  } catch (err) {
    console.error("error: " + err.stack);
    throw err;
  }
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
database.getSeller = async username => {
  try {
    const [results] = await db.poolSeller.query(
      `SELECT * FROM seller WHERE username = ?`,
      [username]
    );
    return results[0];
  } catch (err) {
    console.error("error: " + err.stack);
    throw err;
  }
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

{
  /* 
Endpoints for Lazada User
TODO: Grant SELECT permissions on lazada_user table
*/
}
database.getLazadaUser = (role, username) => {
  if (role === "seller") {
    return database.getSeller(username);
  } else if (role === "buyer") {
    return database.getBuyer(username);
  }
};

database.insertLazadaUser = async (role, username, hashedPassword, shop_name) => {
  try {
    // Insert the user into the lazada_user table
    const query = `INSERT INTO lazada_user (username, password_hash) VALUES (?, ?)`;
    const values = [username, hashedPassword];

    // Insert the user into the buyer or seller table based on their role
    if (role === 'buyer') {
      db.poolBuyer.query(query, values);
      return database.insertBuyer(username);

    } else if (role === 'seller') {
      db.poolSeller.query(query, values);
      return database.insertSeller(username, shop_name);

    } else {
      throw new Error('Invalid role');
    }

  } catch (err) {
    console.error("error: " + err.stack);
  }
};


module.exports = database;
