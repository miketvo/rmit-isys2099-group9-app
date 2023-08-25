//db.js
const db = require('./db.js');
    
let database = {};
 
// ***Requests to the LazadaUser table ***
 
database.allLazadaUser = () =>{
    return new Promise((resolve, reject)=>{
        db.poolWHAdmin.query(`SELECT * FROM lazada_user `, (err, results) => {
            if (err) {
              console.error("error: " + err.stack);
              reject(err);
              return;
            }
            resolve(results);
        });
    });
};

database.getLazadaUser = (username) =>{
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

module.exports = database;