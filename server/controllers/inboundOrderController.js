/* eslint-disable no-unused-vars */
/* TODO:

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

 OUT result:
    -1 on rollback (500)
    0 on successful commit (200)
    1 on no available warehouses (all wh full) or inbound order already fulfilled (DUP)
    2 on inbound_order_id does not exist (404)

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
            message: `Inbound order with ID: ${result.insertId} updated`, 
            id: result.insertId, 
            quantity: result.quantity, 
            product_id: result.product_id, 
            created_date: result.created_date, 
            created_time: result.created_time, 
            fulfilled_date: result.fulfilled_date, 
            fulfilled_time: result.fulfilled_time, 
            seller: result.seller
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
    const result = await db.poolSeller.query(
        'UPDATE inbound_order SET quantity = ?, product_id = ?, created_date = ?, created_time = ?, fulfilled_date = ?, fulfilled_time = ?, seller = ? WHERE id = ?',
        [quantity, product_id, created_date, created_time, fulfilled_date, fulfilled_time, seller, inboundOrderID],
        (error) => {
            if (error) {
                console.error(error);
                res.status(500).send('An error occurred while updating an inbound order');
            } else {
                res.status(201).json({
                    message: `Inbound order with ID: ${inboundOrderID}} updated`, 
                    quantity: result.quantity, 
                    product_id: result.product_id, 
                    created_date: result.created_date, 
                    created_time: result.created_time, 
                    fulfilled_date: result.fulfilled_date, 
                    fulfilled_time: result.fulfilled_time,
                    seller: result.seller,
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

const fulfillInboundOrder = async (req, res) => {
    const { id } = req.params;
    await db.poolSeller.query(
        'CALL sp_fulfill_inbound_order(?, @result)',
        [id],
        (error) => {
            if (error) {
                console.error(error);
                res.status(500).send('An error occurred while fulfilling an inbound order');
            } else {
                db.poolSeller.query('SELECT @result', (error, results) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send('An error occurred while retrieving the result of the stored procedure');
                    } else {
                        const result = results[0]['@result'];
                        switch(result) {
                            case -1:
                                res.status(500).json({ message: 'Rollback occurred during fulfillment' });
                                break;
                            case 0:
                                res.status(200).json({ message: 'Inbound order successfully committed' });
                                break;
                            case 1:
                                res.status(400).json({ message: 'No available warehouses or inbound order already fulfilled' });
                                break;
                            case 2:
                                res.status(404).json({ message: 'Inbound order ID does not exist' });
                                break;
                            default:
                                res.status(500).json({ message: 'An unknown error occurred' });
                        }
                    }
                });
            }
        }
    );
};

module.exports = {
    createInboundOrder,
    getAllInboundOrder,
    getInboundOrderByID,
    updateInboundOrder,
    deleteInboundOrder,
    fulfillInboundOrder
}