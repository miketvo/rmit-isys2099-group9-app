//db.js
const connection = require('./db.js');
    
let db = {};
 
// ***Requests to the User table ***
 
db.allLazadaUser = () =>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM lazada_user`, (err, results) => {
            if (err) {
              console.error("error: " + err.stack);
              reject(err);
              return;
            }
            resolve(results);
        });
    });
};

db.getLazadaUser = (username) =>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM lazada_user WHERE username = ?`, [username], (err, results) => {
            if (err) {
              console.error("error: " + err.stack);
              reject(err);
              return;
            }
            resolve(results[0]);
        });
    });
};

module.exports = db;