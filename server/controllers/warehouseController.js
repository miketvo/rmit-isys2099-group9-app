/* eslint-disable no-unused-vars */
/*

poolWHAdmin

CRUD warehouses

query moveProduct:
CALL sp_move_product(?,?,?,(OUT?)), []

*/

const { db, model } = require("../models");

// Warehouse
const createWarehouse = async (req, res) => {
  try {
    const {
      warehouse_name,
      volume,
      province,
      city,
      district,
      street,
      street_number,
    } = req.body;
    const query = `INSERT INTO view_warehouse_noid (warehouse_name, volume, province, city, district, street, street_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await db.poolWHAdmin.query(query, [
      warehouse_name,
      volume,
      province,
      city,
      district,
      street,
      street_number,
    ]);

    console.log("\n" + result[0]);
    res.status(201).json({
      message: `Warehouse with ID: ${result[0].insertId} created`,
      id: result[0].insertId,
      warehouse_name: warehouse_name,
      volume: volume,
      province: province,
      city: city,
      district: district,
      street: street,
      street_number: street_number,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllWarehouse = async (req, res) => {
  try {
    const [results] = await db.poolWHAdmin.query(`SELECT * FROM warehouse`);

    const availableVolumeQuery = `
        SELECT w.volume - coalesce(sum(s.quantity * p.width * p.length * p.height), 0)
        INTO @to_warehouse_available_volume
        FROM stockpile s
            LEFT JOIN warehouse w ON s.warehouse_id = w.id
            LEFT JOIN product p on s.product_id = p.id
        WHERE w.id = ? FOR SHARE
        `;

    for (const result of results) {
      await db.poolWHAdmin.query(availableVolumeQuery, [result.id]);
      const [[{ volume: volume }]] = await db.poolWHAdmin.query(
        "SELECT @to_warehouse_available_volume as volume",
      );
      result.available_volume = volume;
      console.log(result);
    }

    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getWarehouseByID = async (req, res) => {
  try {
    let warehouseID = req.params.id;
    const [results] = await db.poolWHAdmin.query(
      `
            SELECT * FROM warehouse where id = ?
        `,
      [warehouseID],
    );
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: `Warehouse with id: ${warehouseID} not found` });
    }
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateWarehouse = async (req, res) => {
  const warehouseID = req.params.id;
  const {
    warehouse_name,
    volume,
    province,
    city,
    district,
    street,
    street_number,
  } = req.body;
  console.log(
    `\nwarehouse_name: ${warehouse_name}, volume: ${volume}, province: ${province}, city: ${city}, district: ${district}, street: ${street}, street_number: ${street_number}`,
  );

  try {
    const result = await db.poolWHAdmin.query(
      "UPDATE warehouse SET warehouse_name = ?, volume = ?, province = ?, city = ?, district = ?, street = ?, street_number = ? WHERE id = ?",
      [
        warehouse_name,
        volume,
        province,
        city,
        district,
        street,
        street_number,
        warehouseID,
      ],
    );

    console.log("\n" + result[0]);
    res.status(201).json({
      message: `Warehouse with ID: ${warehouseID} updated`,
      id: warehouseID,
      warehouse_name: warehouse_name,
      volume: volume,
      province: province,
      city: city,
      district: district,
      street: street,
      street_number: street_number,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"An error occurred while updating a warehouse"});
  }
};

/*
 sp_delete_warehouse(warehouse_id: int, OUT result: int)

 OUT result:
    -1 on rollback
    0 on successful commit
    1 on warehouse not empty or not exist
 */
const deleteWarehouse = async (req, res) => {
  try {
    let warehouseID = req.params.id;
    const [results] = await db.poolWHAdmin.query(
      `CALL sp_delete_warehouse(?, @result)`,
      [warehouseID],
    );
    const [[{ result: resultCode }]] = await db.poolWHAdmin.query(
      `SELECT @result`,
    );
    if (resultCode === 1) {
      return res.status(400).json({
        error: `Warehouse with id: ${warehouseID} not empty or not exist`,
        result: resultCode,
      });
    } else if (resultCode === -1) {
      return res
        .status(500)
        .json({ error: "Internal server error", result: resultCode });
    }
    return res.json({
      message: `Warehouse with id: ${warehouseID} deleted successfully`,
      result: resultCode,
    });
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/*
 sp_move_product(product_id: int, move_quantity: int, from_warehouse: int, to_warehouse: int, OUT result: int)

 OUT result:
    -1 on rollback
    0 on successful commit
    1 on data not exists or illegal operation
    2 on illegal argument value
*/

const moveProduct = async (req, res) => {
  try {
    const { product_id, move_quantity, from_warehouse_id, to_warehouse_id } =
      req.body;
    const result = await db.poolWHAdmin.query(
      "CALL sp_move_product(?, ?, ?, ?, @result)",
      [product_id, move_quantity, from_warehouse_id, to_warehouse_id],
    );
    const [[{ result: resultCode }]] = await db.poolWHAdmin.query(
      "SELECT @result as result",
    );
    console.log("\nresult: " + resultCode);
    if (resultCode === 0) {
      return res
        .status(200)
        .json({ message: "Product moved successfully", result: resultCode });
    } else if (resultCode === 1) {
      return res.status(400).json({
        error: "Data not exists or illegal operation",
        result: resultCode,
      });
    } else if (resultCode === 2) {
      return res
        .status(400)
        .json({ error: "Illegal argument value", result: resultCode });
    }
    return res.status(500).json({
      error: "An error occurred while moving the product",
      result: resultCode,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWarehouse,
  getAllWarehouse,
  getWarehouseByID,
  updateWarehouse,
  deleteWarehouse,
  moveProduct,
};
