/* eslint-disable no-unused-vars */
/*

CRUD
poolSeller: isys2099_group9_app_seller_user
query for creating ib_ord: put
- Insert INTO view_inbound_order_noid
query retrive: get
- SELECT * FROM inbound_order;
query update: post
- UPDATE inbound_order SET ??
query delete: delete
- DELETE inbound_order WHERE ??

For inbound orders, Seller can: 

query fulfill: post
- CALL sp_fulfill_inbound_order(?, ?), [inbound_order_id, result];
*/

require("express");
const { db, model } = require("../models");

/*
SELECT CURDATE(); -- Returns the current date
SELECT CURTIME(); -- Returns the current time
+------------+
| CURDATE()  |
+------------+
| 2023-09-08 |
+------------+
1 row in set (0.01 sec)

mysql> SELECT CURTIME(); -- Returns the current time
+-----------+
| CURTIME() |
+-----------+
| 00:06:09  |
+-----------+
1 row in set (0.00 sec)

* The CURDATE() function returns the time stamp of the client 
* while the SYSDATE() function returns the time stamp of the server. 
* If both server and the client are on the same machine, then, 
* the result of both commands are the same. 
* But in case that your sever is for example in USA and your clients are in China, then, 
* these two functions return completely different results.

*/
const createInboundOrder = async (req, res) => {
  try {
    const seller = req.username;
    const { quantity, product_id } = req.body;

    const [results] = await db.poolWHAdmin.query(
      `
            SELECT * FROM product where id = ?
        `,
      [product_id],
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: `Product with id: ${product_id} not found` });
    }

    const currentDate = new Date();
    const dateString = currentDate.toISOString().slice(0, 10);
    const timeString = currentDate.toTimeString().slice(0, 8);

    console.log("\nCreated Date: " + dateString + " " + timeString);

    /**
         * This error message indicates that a foreign key constraint has failed. 
         * In this case, the `inbound_order_product_id_fk` constraint is causing the issue. 
         * This constraint specifies that the `product_id` column in the `inbound_order` table must reference a valid `id` in the `product` table.
    
         * The error message suggests that you are trying to add or update a row in the `inbound_order` table with a `product_id` value that does not exist in the `product` table. 
         * To resolve this issue, you can either insert a row into the `product` table with the missing `id` value 
         * or update the `product_id` value in the `inbound_order` table to reference an existing `id` in the `product` table.
         */

    const query = `INSERT INTO view_inbound_order_noid (quantity, product_id, created_date, created_time, seller) VALUES (?, ?, CURDATE(), CURTIME(), ?)`;
    const result = await db.poolSeller.query(query, [
      quantity,
      product_id,
      seller,
    ]);

    res.status(201).json({
      message: `Inbound order with ID: ${result[0].insertId} created`,
      id: result[0].insertId,
      quantity: quantity,
      product_id: product_id,
      created_date: dateString,
      created_time: timeString,
      fulfilled_date: null,
      fulfilled_time: null,
      seller: seller,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllInboundOrder = async (req, res) => {
  try {
    const [results] = await db.poolSeller.query(`SELECT * FROM inbound_order`);
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getInboundOrderByID = async (req, res) => {
  try {
    let inboundOrderID = req.params.id;
    const [results] = await db.poolSeller.query(
      `
            SELECT * FROM inbound_order where id = ?
        `,
      [inboundOrderID],
    );
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: `Product with id: ${inboundOrderID} not found` });
    }
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateInboundOrder = async (req, res) => {
  try {
    const inboundOrderID = req.params.id;
    const seller = req.username;
    const { quantity } = req.body;
    const currentDate = new Date();
    const dateString = currentDate.toISOString().slice(0, 10);
    const timeString = currentDate.toTimeString().slice(0, 8);
    console.log("\nCreated Date: " + dateString + " " + timeString);

    let result = await db.poolSeller.query(
      "UPDATE inbound_order SET quantity = ?, created_date = CURDATE(), created_time = CURTIME(), seller = ? WHERE id = ?",
      [quantity, seller, inboundOrderID],
    );

    console.log(result);
    result = result[0];
    res.status(201).json({
      message: `Inbound order with ID: ${inboundOrderID} updated`,
      quantity: quantity,
      created_date: dateString,
      created_time: timeString,
      fulfilled_date: 0,
      fulfilled_time: 0,
      seller: seller,
      id: inboundOrderID,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating an inbound order" });
  }
};

const deleteInboundOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await db.poolSeller.query("DELETE FROM inbound_order WHERE id = ?", [id]);
    res
      .status(200)
      .json({ error: `Inbound order with ID: ${id} deleted`, id: id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ erorr: "An error occurred while deleting an inbound order" });
  }
};

/*
sp_fulfill_inbound_order(inbound_order_id: int, OUT result: int)

OUT result:
    -1 on rollback (500)
    0 on successful commit (200)
    1 on no available warehouses (all wh full) or inbound order already fulfilled (DUP)
    2 on inbound_order_id does not exist (404)

*/

const fulfillInboundOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await db.poolSeller.query("CALL sp_fulfill_inbound_order(?, @result)", [
      id,
    ]);
    const [[{ result: resultCode }]] = await db.poolSeller.query(
      "SELECT @result as result",
    );
    if (resultCode === 0) {
      // Call the getInboundOrderByID function to retrieve the updated data for the fulfilled inbound order
      const [results] = await db.poolSeller.query(
        `
                SELECT * FROM inbound_order where id = ?
            `,
        [id],
      );
      const inboundOrder = results[0];
      return res.status(200).json({
        message: "Inbound order successfully committed",
        result: resultCode,
        id: inboundOrder.id,
        fulfilled_date: inboundOrder.fulfilled_date,
        fulfilled_time: inboundOrder.fulfilled_time,
      });
    } else if (resultCode === 1) {
      return res.status(400).json({
        error: "No available warehouses or inbound order already fulfilled",
        result: resultCode,
      });
    } else if (resultCode === 2) {
      return res
        .status(404)
        .json({
          error: `Inbound order ID ${id} does not exist`,
          result: resultCode,
        });
    }
    return res.status(500).json({
      error: "An error occurred while fulfilling an inbound order",
      result: resultCode,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createInboundOrder,
  getAllInboundOrder,
  getInboundOrderByID,
  updateInboundOrder,
  deleteInboundOrder,
  fulfillInboundOrder,
};
