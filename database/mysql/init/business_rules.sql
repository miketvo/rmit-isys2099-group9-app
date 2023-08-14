USE isys2099_group9_app;


/*
 sp_move_product(product_id: int, move_quantity: int, from_warehouse: int, to_warehouse: int, OUT result: int)

 OUT result:
    -1 on rollback
    0 on successful commit
    1 on data not exists or illegal operation
    2 on illegal argument value
 */
DROP PROCEDURE IF EXISTS sp_move_product;
DELIMITER $$
CREATE PROCEDURE sp_move_product(
    IN move_product INT,
    IN move_quantity INT,
    IN from_warehouse INT,
    IN to_warehouse INT,
    OUT result INT
)
this_proc:
BEGIN
    DECLARE _rollback BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET _rollback = 1;
    START TRANSACTION;
    SET result = 0;

    -- Checks for early termination
    IF move_quantity < 1 THEN SET result = 2; LEAVE this_proc; END IF;

    IF from_warehouse = to_warehouse THEN SET result = 2; LEAVE this_proc; END IF;

    SELECT count(*) INTO @exist_product FROM product WHERE id = move_product FOR SHARE ;
    IF @exist_product = 0 THEN SET result = 1; LEAVE this_proc; END IF;

    SELECT count(*) INTO @exist_from_warehouse FROM warehouse WHERE id = from_warehouse FOR SHARE;
    IF @exist_from_warehouse = 0 THEN SET result = 1; LEAVE this_proc; END IF;

    SELECT count(*) INTO @exist_to_warehouse FROM warehouse WHERE id = to_warehouse FOR SHARE;
    IF @exist_to_warehouse = 0 THEN SET result = 1; LEAVE this_proc; END IF;

    SELECT count(*) INTO @from_warehouse_has_product FROM stockpile WHERE product_id = move_product AND warehouse_id = from_warehouse FOR UPDATE;
    IF @from_warehouse_has_product = 0 THEN SET result = 1; LEAVE this_proc; END IF;

    SELECT quantity INTO @from_warehouse_product_quantity FROM stockpile WHERE product_id = move_product AND warehouse_id = from_warehouse FOR UPDATE;
    IF move_quantity > @from_warehouse_product_quantity THEN SET result = 1; LEAVE this_proc; END IF;

    -- Calculate available space in to_warehouse
    SELECT w.volume - sum(s.quantity * p.width * p.length * p.height)
    INTO @to_warehouse_available_volume
    FROM stockpile s
        JOIN warehouse w ON s.warehouse_id = w.id
        JOIN product p on s.product_id = p.id
    WHERE w.id = to_warehouse FOR SHARE;

    -- Calculate the amount of space needed in to_warehouse
    SELECT move_quantity * width * length * height
    INTO @move_volume
    FROM product WHERE id = move_product FOR SHARE;

    IF @to_warehouse_available_volume < @move_volume THEN SET result = 1; LEAVE this_proc; END IF;


    -- Update the database for the move
    IF move_quantity = @from_warehouse_product_quantity THEN
        DELETE FROM stockpile WHERE product_id = move_product AND warehouse_id = from_warehouse;
    ELSE
        UPDATE stockpile SET quantity = quantity - move_quantity WHERE product_id = move_product AND warehouse_id = from_warehouse;
    END IF;

    SELECT count(*) INTO @to_warehouse_has_product FROM stockpile WHERE product_id = move_product AND warehouse_id = to_warehouse FOR UPDATE;
    IF @to_warehouse_has_product = 0 THEN
        INSERT INTO stockpile (product_id, warehouse_id, quantity) VALUES (move_product, to_warehouse, move_quantity);
    ELSE
        UPDATE stockpile SET quantity = quantity + move_quantity WHERE product_id = move_product AND warehouse_id = to_warehouse;
    END IF;


    -- Commit or Rollback
    IF _rollback THEN
        SET result = -1;
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END $$
DELIMITER ;


/*
 sp_delete_warehouse(warehouse_id: int, OUT result: int)

 OUT result:
    -1 on rollback
    0 on successful commit
    1 on warehouse not empty or not exist
 */
DROP PROCEDURE IF EXISTS sp_delete_warehouse;
DELIMITER $$
CREATE PROCEDURE sp_delete_warehouse(
    IN warehouse_id INT,
    OUT result INT
)
this_proc:
BEGIN
    DECLARE _rollback BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET _rollback = 1;
    START TRANSACTION;
    SET result = 0;

    -- Checks for early termination
    SELECT count(*) INTO @exist_warehouse FROM warehouse WHERE id = warehouse_id FOR SHARE;
    IF @exist_warehouse = 0 THEN SET result = 1; LEAVE this_proc; END IF;

    SELECT sum(quantity) INTO @warehouse_stockpile
    FROM warehouse LEFT JOIN stockpile s on id = s.warehouse_id WHERE id = warehouse_id GROUP BY id;
    IF @warehouse_stockpile IS NOT NULL THEN SET result = 1; LEAVE this_proc; END IF;


    -- Update the database for the move
    DELETE FROM warehouse WHERE id = warehouse_id;


    -- Commit or Rollback
    IF _rollback THEN
        SET result = -1;
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END $$
DELIMITER ;
