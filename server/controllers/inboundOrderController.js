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

const createInboundOrder = async (req, res) => {
    try {
        const seller = req.username;
        const { 
            quantity, 
            product_id, 
            created_date, 
            created_time, 
            fulfilled_date, 
            fulfilled_time, 
        } = req.body;
        const query = `INSERT INTO view_inbound_order_noid (quantity, product_id, created_date, created_time, fulfilled_date, fulfilled_time, seller) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const result = await db.poolSeller.query( 
            query, 
            [
                quantity, 
                product_id, 
                created_date, 
                created_time, 
                fulfilled_date, 
                fulfilled_time, 
                seller
            ]
        );

        res.status(201).json({
            message: `Inbound order with ID: ${result[0].insertId} updated`, 
            id: result[0].insertId, 
            quantity: quantity, 
            product_id: product_id, 
            created_date: created_date, 
            created_time: created_time, 
            fulfilled_date: fulfilled_date, 
            fulfilled_time: fulfilled_time, 
            seller: seller
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
}

const getInboundOrderByID = async (req, res) => {
    try {
        let inboundOrderID = req.params.id;
        const [results] = await db.poolSeller.query(`
            SELECT * FROM inbound_order where id = ?
        `, [inboundOrderID]);
        if (results.length === 0) {
            return res.status(404).json({ error: `Product with id: ${inboundOrderID} not found` });
        }
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const updateInboundOrder = async (req, res) => {
    const inboundOrderID = req.params.id;
    const seller = req.username
    const { quantity, product_id, created_date, created_time, fulfilled_date, fulfilled_time } = req.body;
    let result = await db.poolSeller.query(
        'UPDATE inbound_order SET quantity = ?, product_id = ?, created_date = ?, created_time = ?, fulfilled_date = ?, fulfilled_time = ?, seller = ? WHERE id = ?',
        [quantity, product_id, created_date, created_time, fulfilled_date, fulfilled_time, seller, inboundOrderID],
        (error) => {
            if (error) {
                console.error(error);
                res.status(500).send('An error occurred while updating an inbound order');
            } else {
                console.log(result);
                result = result[0];
                res.status(201).json({
                    message: `Inbound order with ID: ${inboundOrderID}} updated`, 
                    quantity: quantity, 
                    product_id: product_id, 
                    created_date: created_date, 
                    created_time: created_time, 
                    fulfilled_date: fulfilled_date, 
                    fulfilled_time: fulfilled_time,
                    seller: seller,
                    id: inboundOrderID
                });            
            }
        }
    );
};

const deleteInboundOrder = (req, res) => {
    const { id } = req.params;
    db.poolSeller.query('DELETE FROM inbound_order WHERE id = ?', [id], (error) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred while deleting an inbound order');
        } else {
            res.status(200).send(`Inbound order with ID: ${id} deleted`);
        }
    });
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
        await db.poolSeller.query(
            'CALL sp_fulfill_inbound_order(?, @result)',
            [id]
        );
        const [[{ result: resultCode }]] = await db.poolSeller.query('SELECT @result as result');
        if (resultCode === 0) {
            return res.status(200).json({ message: 'Inbound order successfully committed', result: resultCode });
        } else if (resultCode === 1) {
            return res.status(400).json({ error: 'No available warehouses or inbound order already fulfilled', result: resultCode });
        } else if (resultCode === 2) {
            return res.status(404).json({ error: 'Inbound order ID does not exist', result: resultCode });
        }
        return res.status(500).json({ error: 'An error occurred while fulfilling an inbound order', result: resultCode });
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
    fulfillInboundOrder
}