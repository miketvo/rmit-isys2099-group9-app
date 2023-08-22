//db.js
const connection = require('../server/models/db.js');
    
let db = {};
 
// ***Requests to the User table ***
 
db.allUser = () =>{
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