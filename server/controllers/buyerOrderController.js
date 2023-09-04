/* eslint-disable no-unused-vars */
/* TODO:

CRUD
poolBuyer: isys2099_group9_app_buyer_user

query for creating ib_ord: put
CALL sp_place_buyer_order(?, ?, ?, (OUT?)), []

 OUT result:
    -1 on rollback
    0 on successful commit
    1 on not enough stockpile
    2 on product_id or buyer_id not exist

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

const placeOrder = async (req, res) => {
    const order_product_id = req.params.id;
    const buyer_username = req.username;
    const { order_quantity } = req.body;
    try {
        const results = await db.poolBuyer.query(
            'CALL sp_place_buyer_order(?, ?, ?, @result); SELECT @result;',
            [order_quantity, order_product_id, buyer_username]
        );
        const result = results[1][0]['@result'];
        switch (result) {
            case -1:
                res.status(500).send('An error occurred while processing your request');
                break;
            case 0:
                res.status(200).send('Order placed successfully');
                break;
            case 1:
                res.status(400).send('Not enough stockpile');
                break;
            case 2:
                res.status(400).send('Product or buyer does not exist');
                break;
            default:
                res.status(500).send('An unknown error occurred');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while processing your request');
    }
};

const getAllBuyerOrders = async (req, res) => {
    try {
        const [results] = await db.poolBuyer.query(`SELECT * FROM buyer_order`);
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getBuyerOrderByID = async (req, res) => {
    try {
        let buyerOrderID = req.params.id;
        const [results] = await db.poolBuyer.query(`
            SELECT * FROM buyer_order where id = ?
        `, [buyerOrderID]);
        if (results.length === 0) {
            return res.status(404).json({ error: `Buyer order with id: ${buyerOrderID} not found` });
        }
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const updateBuyerOrder = async (req, res) => {
    const buyerOrderID = req.params.id;
    const buyer = req.username;
    const { quantity, product_id, created_date, created_time, order_status, fulfilled_date, fulfilled_time } = req.body;
    const result = await db.poolBuyer.query(
        'UPDATE buyer_order SET quantity = ?, product_id = ?, created_date = ?, created_time = ?, order_status=?, fulfilled_date=?, fulfilled_time=?, buyer=? WHERE id=?',
        [quantity || 0 , product_id || 0 , created_date || null , created_time || null , order_status || 'P', fulfilled_date || null , fulfilled_time || null , buyer , buyerOrderID],
        (error) => {
            if (error) {
                console.error(error);
                res.status(500).send('An error occurred while updating a buyer order');
            } else {
                res.status(201).json({
                    message: `Buyer order with ID: ${buyerOrderID} updated`,
                    id: buyerOrderID,
                    quantity: result.quantity,
                    product_id: result.product_id,
                    created_date: result.created_date,
                    created_time: result.created_time,
                    order_status: result.order_status || 'P',
                    fulfilled_date: result.fulfilled_date || null,
                    fulfilled_time: result.fulfilled_time || null,
                    buyer: result.buyer
                });
            }
        }
    );
};

const deleteBuyerOrder = (req, res) => {
    const { id } = req.params;
    db.poolBuyer.query('DELETE FROM buyer_order WHERE id = ?', [id], (error) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred while deleting a buyer order');
        } else {
            res.status(200).send(`Buyer order with ID: ${id} deleted`);
        }
    });
};

module.exports = {
    placeOrder,
    getAllBuyerOrders,
    getBuyerOrderByID,
    updateBuyerOrder,
    deleteBuyerOrder
}
