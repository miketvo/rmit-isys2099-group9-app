//apiRouter.js
const express = require('express');
const apiRouter = express.Router();
const db = require('../server/models/db.js');

apiRouter.get("/warehouse", async (req, res) => {
  try {
      const results = await new Promise((resolve, reject) => {
          db.poolWHAdmin.query(`SELECT * FROM warehouse`, (err, results) => {
              if (err) {
                  console.error("error: " + err.stack);
                  reject(err);
                  return;
              }
              resolve(results);
          });
      });

      return res.json(results);
  } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
  }
});

{/* API Endpoint for product */}
apiRouter.get("/product", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
        db.poolWHAdmin.query(`SELECT * FROM product`, (err, results) => {
            if (err) {
                console.error("error: " + err.stack);
                reject(err);
                return;
            }
            resolve(results);
        });
    });

    return res.json(results);
} catch (error) {
    return res.status(500).json({ error: "Internal server error" });
}
});

module.exports = apiRouter;