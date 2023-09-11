/* eslint-disable no-unused-vars */
/*

CRUD
poolBuyer: isys2099_group9_app_buyer_user

query for creating ib_ord: put
CALL sp_place_buyer_order(?, ?, ?, (OUT?)), []

query retrive: get
- SELECT * FROM buyer_order;

query update:
- UPDATE buyer_order SET ??

query delete: delete
- DELETE buyer_order WHERE ??

For buyer orders, Buyer can: 

query accpet: post
UPDATE buyer_order SET order_status = 'A'

query reject: post
UPDATE buyer_order SET order_status = 'R'

Errors handling:

    -1 on rollback
    0 on successful commit
    1 on not enough warehouse space to return product
    2 on buyer_order_id not exist

err_msg = concat('Order already accepted.');
err_msg = concat('Order already rejected.');
err_msg = concat('Order already pending.');
err_msg = 'Cannot reopen rejected buyer order. Place a new order with sp_return_product_from_buyer_order() instead.';
err_msg = concat('Cannot accept rejected buyer order. Place a new order with sp_return_product_from_buyer_order() instead.');
err_msg = 'Cannot reopen accepted buyer order. Place a new order with sp_return_product_from_buyer_order() instead.';
err_msg = concat('Cannot reject accepted buyer order.');

*/

const { db, model } = require("../models");

// Buyer Order

/*
 sp_place_buyer_order(order_quantity: int, order_product_id: int, buyer_username: varchar(45), OUT result: int)

 OUT result:
    -1 on rollback
    0 on successful commit
    1 on not enough stockpile
    2 on product_id or buyer_id not exist
 */
const placeOrder = async (req, res) => {
  try {
    const order_product_id = req.params.id;
    const buyer_username = req.username;
    const { order_quantity } = req.body;
    await db.poolBuyer.query("CALL sp_place_buyer_order(?, ?, ?, @result)", [
      order_quantity,
      order_product_id,
      buyer_username,
    ]);
    const [[{ result: resultCode }]] = await db.poolBuyer.query(
      "SELECT @result as result",
    );
    if (resultCode === 0) {
      return res
        .status(200)
        .json({ message: "Order placed successfully", result: resultCode });
    } else if (resultCode === 1) {
      return res
        .status(400)
        .json({ error: "Not enough stockpile", result: resultCode });
    } else if (resultCode === 2) {
      return res
        .status(400)
        .json({ error: "Product or buyer does not exist", result: resultCode });
    }
    return res.status(500).json({
      error: "An error occurred while processing your request",
      result: resultCode,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBuyerOrders = async (req, res) => {
  try {
    const [results] = await db.poolBuyer.query(`
        SELECT buyer_order.*, product.title AS product_title, product.category AS category, product.price AS price
        FROM buyer_order JOIN product ON buyer_order.product_id = product.id
        `);
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getBuyerOrderByID = async (req, res) => {
  try {
    let buyerOrderID = req.params.id;
    const [results] = await db.poolBuyer.query(
      `
            SELECT buyer_order.*, product.title AS product_title, product.category AS category, product.price AS price
            FROM buyer_order JOIN product ON buyer_order.product_id = product.id
            WHERE buyer_order.id = ?
        `,
      [buyerOrderID],
    );
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: `Buyer order with id: ${buyerOrderID} not found` });
    }
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getBuyerOrderByCategory = async (req, res) => {
  try {
    let category = req.params.category;
    const [results] = await db.poolBuyer.query(
      `
            SELECT buyer_order.*, product.title AS product_title, product.category AS category, product.price AS price
            FROM buyer_order JOIN product ON buyer_order.product_id = product.id
            WHERE product.category = ?
        `,
      [category],
    );
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getBuyerOrderByStatus = async (req, res) => {
  try {
    let status = req.params.status;
    const [results] = await db.poolBuyer.query(
      `
            SELECT buyer_order.*, product.title AS product_title, product.category AS category, product.price AS price
            FROM buyer_order JOIN product ON buyer_order.product_id = product.id
            WHERE order_status = ?
        `,
      [status],
    );
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateBuyerOrderQuantity = async (req, res) => {
  try {
    let buyerOrderID = req.params.id;
    let { quantity } = req.body;
    const [results] = await db.poolBuyer.query(
      `
            UPDATE buyer_order SET quantity = ? WHERE id = ?
        `,
      [quantity, buyerOrderID],
    );
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: `Buyer order with id: ${buyerOrderID} not found` });
    }
    return res.json({
      message: `Quantity of buyer order with id: ${buyerOrderID} updated successfully`,
    });
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateBuyerOrderStatusAccept = async (req, res) => {
  try {
    let buyerOrderID = req.params.id;
    const [results] = await db.poolBuyer.query(
      `
            UPDATE buyer_order SET order_status = 'A', fulfilled_date = DATE(SYSDATE()), fulfilled_time = TIME(SYSDATE()) WHERE id = ?
        `,
      [buyerOrderID],
    );
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: `Buyer order with id: ${buyerOrderID} not found` });
    }
    return res.json({
      message: `Status of buyer order with id: ${buyerOrderID} updated to accepted`,
    });
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateBuyerOrderStatusReject = async (req, res) => {
  try {
    let buyerOrderID = req.params.id;
    const [results] = await db.poolBuyer.query(
      `
            UPDATE buyer_order SET order_status = 'R' WHERE id = ?
        `,
      [buyerOrderID],
    );
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: `Buyer order with id: ${buyerOrderID} not found` });
    }
    return res.json({
      message: `Status of buyer order with id: ${buyerOrderID} updated to rejected`,
    });
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteBuyerOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await db.poolBuyer.query("DELETE FROM buyer_order WHERE id = ?", [id]);
    res
      .status(200)
      .json({ message: `Buyer order with ID: ${id} deleted`, id: id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting a buyer order" });
  }
};

module.exports = {
  placeOrder,
  getAllBuyerOrders,
  getBuyerOrderByID,
  getBuyerOrderByCategory,
  getBuyerOrderByStatus,
  updateBuyerOrderQuantity,
  updateBuyerOrderStatusAccept,
  updateBuyerOrderStatusReject,
  deleteBuyerOrder,
};
