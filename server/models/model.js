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
  /* Endpoints for WH Admin */
}
database.getWHAdmin = async username => {
  try {
    const [results] = await db.poolWHAdmin.query(
      `SELECT * FROM wh_admin WHERE username = ?`,
      [username]
    );
    return results[0];
  } catch (err) {
    console.error("error: " + err.stack);
    throw err;
  }
};

database.insertWHAdmin = (username, password_hash) => {
  return new Promise((resolve, reject) => {
    db.poolWHAdmin.query(
      `INSERT INTO wh_admin (username, password_hash) VALUES (?, ?)`,
      [username, password_hash],
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

database.deleteWHAdminToken = async username => {
  try {
    await db.poolWHAdmin.query(
      `UPDATE wh_admin SET refresh_token = NULL WHERE username = ?`,
      [username]
    );
  } catch (err) {
    console.error("error: " + err.stack);
    throw err;
  }
}

{
  /* 
Endpoints for Lazada User
*/
}
database.getLazadaUserByRole = (role, username) => {
  if (role === "seller") {
    return database.getSeller(username);
  } else if (role === "buyer") {
    return database.getBuyer(username);
  } else if (role === "admin") {
    return database.getWHAdmin(username);
  } else if (role === "lazada_user") {
    return database.getLazadaUser(username);
  }
};

database.getLazadaUser = async (username) => {
  try {
    const [results] = await db.poolSeller.query(
      `SELECT * FROM lazada_user WHERE username = ?`,
      [username]
    );
    return results[0];
  } catch (err) {
    console.error("error: " + err.stack);
    throw err;
  }
}

database.insertLazadaUserByRole = async (role, username, hashedPassword, shop_name) => {
  try {
    const queryMall = `INSERT INTO lazada_user (username, password_hash) VALUES (?, ?)`;

    const values = [username, hashedPassword];

    // Insert the user into the table based on their role

    if (role === 'buyer') {
      // Insert the user into the lazada_user table
      await db.poolBuyer.query(queryMall, values);

      // Insert the user into the buyer table
      database.insertBuyer(username);

    } else if (role === 'seller') {
      // Insert the user into the lazada_user table
      await db.poolSeller.query(queryMall, values);

      // Insert the user into the seller table
      database.insertSeller(username, shop_name);

    } else if (role === 'admin') {
      // Insert the user into the wh_admin table
      database.insertWHAdmin(username, hashedPassword);

    } else {
      throw new Error('Invalid role');
    }

  } catch (err) {
    console.error("error: " + err.stack);
  }
};

database.deleteLazadaUserToken = async username => {
  try {
    await db.poolSeller.query(
      `UPDATE lazada_user SET refresh_token = NULL WHERE username = ?`,
      [username]
    );
  } catch (err) {
    console.error("error: " + err.stack);
    throw err;
  }
}

module.exports = database;
