/* eslint-disable no-unused-vars */
/*
TODO:

poolWHAdmin

CRUD warehouses

query moveProduct:
CALL sp_move_product(?,?,?,(OUT?)), []

 OUT result:
    -1 on rollback
    0 on successful commit
    1 on data not exists or illegal operation
    2 on illegal argument value
*/

const { db, model } = require("../models");

// Warehouse
const createWarehouse = async (req, res) => {
    try {
        const { warehouse_name, volume, province, city, district, street, street_number } = req.body;
        const query = `INSERT INTO warehouse (warehouse_name, volume, province, city, district, street, street_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const result = await db.poolWHAdmin.query(query, [warehouse_name, volume, province, city, district, street, street_number]);
        res.status(201).json({
            message: `Warehouse with ID: ${result.insertId} created`,
            id: result.insertId,
            warehouse_name: result.warehouse_name,
            volume: result.volume,
            province: result.province,
            city: result.city,
            district: result.district,
            street: result.street,
            street_number: result.street_number
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllWarehouse = async (req, res) => {
    try {
        const [results] = await db.poolWHAdmin.query(`SELECT * FROM warehouse`);
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getWarehouseByID = async (req, res) => {
    try {
        let warehouseID = req.params.id;
        const [results] = await db.poolWHAdmin.query(`
            SELECT * FROM warehouse where id = ?
        `, [warehouseID]);
        if (results.length === 0) {
            return res.status(404).json({ error: `Warehouse with id: ${warehouseID} not found` });
        }
        return res.json(results);
    } catch (error) {
        console.error("error: " + error.stack);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const updateWarehouse = async (req, res) => {
    const warehouseID = req.params.id;
    const { warehouse_name, volume, province, city, district, street, street_number } = req.body;
    const result = await db.poolWHAdmin.query(
        'UPDATE warehouse SET warehouse_name = ?, volume = ?, province = ?, city = ?, district = ?, street = ?, street_number = ? WHERE id = ?',
        [warehouse_name, volume, province, city, district, street, street_number, warehouseID],
        (error) => {
            if (error) {
                console.error(error);
                res.status(500).send('An error occurred while updating a warehouse');
            } else {
                res.status(201).json({
                    message: `Warehouse with ID: ${warehouseID} updated`,
                    id: warehouseID,
                    warehouse_name: result.warehouse_name,
                    volume: result.volume,
                    province: result.province,
                    city: result.city,
                    district: result.district,
                    street: result.street,
                    street_number: result.street_number
                });
            }
        }
    );
};

const deleteWarehouse = (req, res) => {
    const { id } = req.params;
    db.poolWHAdmin.query('DELETE FROM warehouse WHERE id = ?', [id], (error) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred while deleting a warehouse');
        } else {
            res.status(200).send(`Warehouse with ID: ${id} deleted`);
        }
    });
};

module.exports = {
    createWarehouse,
    getAllWarehouse,
    getWarehouseByID,
    updateWarehouse,
    deleteWarehouse
}
