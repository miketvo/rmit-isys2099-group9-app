//db.js
const db = require('./db.js');
    
let database = {};
 
// ***Requests to the LazadaUser table ***
// TODO: Grant SELECT permissions on lazada_user table
database.getLazadaUser = (username) => {
    return new Promise((resolve, reject)=>{
        db.poolWHAdmin.query(`SELECT * FROM lazada_user WHERE username = ?`, [username], (err, results) => {
            if (err) {
              console.error("error: " + err.stack);
              reject(err);
              return;
            }
            resolve(results[0]);
        });
    });
};

database.insertLazadaUser = (username, hashedPassword) => {
    return new Promise((resolve, reject)=>{
        db.poolWHAdmin.query(`INSERT INTO lazada_user (username, password_hash) VALUES (?, ?)`, [username, hashedPassword], (err, results) => {
            if (err) {
                console.error("error: " + err.stack);
                reject(err);
                return;
            }
            resolve(results.insertId);
        });
    });
};



module.exports = database;