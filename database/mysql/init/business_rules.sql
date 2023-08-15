USE isys2099_group9_app;


-- Utility functions
DROP FUNCTION IF EXISTS fn_min;
DELIMITER $$
CREATE FUNCTION fn_min(
    a BIGINT,
    b BIGINT
) RETURNS BIGINT DETERMINISTIC
BEGIN
    IF a < b THEN RETURN a; END IF;
    IF a > b THEN RETURN b; END IF;
    RETURN a;
END $$
DELIMITER ;


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


/*
 sp_fulfill_inbound_order(inbound_order_id: int, OUT result: int)

 OUT result:
    -1 on rollback
    0 on successful commit
    1 on no available warehouses or inbound order already fulfilled
    2 on inbound_order_id does not exist
 */
DROP PROCEDURE IF EXISTS sp_fulfill_inbound_order;
DELIMITER $$
CREATE PROCEDURE sp_fulfill_inbound_order(
    IN inbound_order_id INT,
    OUT result INT
)
this_proc:
BEGIN
    DECLARE _rollback BOOL DEFAULT 0;
    DECLARE remaining_product_items_count INT DEFAULT 0;
    DECLARE product_items_fill_count INT DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET _rollback = 1;
    START TRANSACTION;
    SET result = 0;

    -- Checks for early termination
    SELECT count(*) INTO @exist_order FROM inbound_order WHERE id = inbound_order_id FOR UPDATE;
    IF @exist_order = 0 THEN SET result = 2; LEAVE this_proc; END IF;

    SELECT count(fulfilled_date) INTO @order_fulfilled_date FROM inbound_order WHERE id = inbound_order_id;
    SELECT count(fulfilled_time) INTO @order_fulfilled_time FROM inbound_order WHERE id = inbound_order_id;
    IF (@order_fulfilled_date = 1) OR (@order_fulfilled_time = 1) THEN SET result = 1; LEAVE this_proc; END IF;

    SELECT sum(available_volume)
    INTO @total_available_warehouse_volume
    FROM (SELECT w.volume - sum(s.quantity * p.width * p.length * p.height) AS available_volume
          FROM stockpile s
              JOIN warehouse w ON s.warehouse_id = w.id
              JOIN product p on s.product_id = p.id
          GROUP BY w.id) as warehouse_available_volume;

    SELECT o.quantity * p.width * p.length * p.height
    INTO @order_volume
    FROM inbound_order o
        JOIN product p ON o.product_id = p.id
    WHERE o.id = inbound_order_id;

    IF @total_available_warehouse_volume < @order_volume THEN SET result = 1; LEAVE this_proc; END IF;


    -- Update the database
    SELECT p.id INTO @product_id
    FROM inbound_order o JOIN product p ON o.product_id = p.id
    WHERE o.id = inbound_order_id;

    SELECT p.width * p.length * p.height INTO @product_unit_volume
    FROM inbound_order o JOIN product p ON o.product_id = p.id
    WHERE o.id = inbound_order_id;

    SELECT quantity INTO remaining_product_items_count FROM inbound_order WHERE id = inbound_order_id;

    WHILE remaining_product_items_count > 0
        DO
            SELECT warehouse_id
            INTO @best_warehouse_id
            FROM (SELECT w.id                                                       AS warehouse_id,
                         w.volume - sum(s.quantity * p.width * p.length * p.height) AS available_volume
                  FROM stockpile s
                           JOIN warehouse w ON s.warehouse_id = w.id
                           JOIN product p on s.product_id = p.id
                  GROUP BY w.id
                  ORDER BY available_volume DESC
                  LIMIT 1) best_warehouse;

            SELECT w.volume - sum(s.quantity * p.width * p.length * p.height)
            INTO @best_warehouse_volume
            FROM stockpile s
                     JOIN warehouse w ON s.warehouse_id = w.id
                     JOIN product p on s.product_id = p.id
            WHERE w.id = @best_warehouse_id
            GROUP BY w.id;

            SET product_items_fill_count = fn_min(@best_warehouse_volume DIV @product_unit_volume, remaining_product_items_count);

            SELECT count(*) INTO @best_warehouse_has_product FROM stockpile WHERE product_id = @product_id AND warehouse_id = @best_warehouse_id FOR UPDATE;
            IF @best_warehouse_has_product = 0 THEN
                INSERT INTO stockpile (product_id, warehouse_id, quantity) VALUES (@product_id, @best_warehouse_id, product_items_fill_count);
            ELSE
                UPDATE stockpile SET quantity = quantity + product_items_fill_count WHERE product_id = @product_id AND warehouse_id = @best_warehouse_id;
            END IF;

            SET remaining_product_items_count = remaining_product_items_count - product_items_fill_count;
    END WHILE;

    UPDATE inbound_order
    SET fulfilled_date = date(sysdate()),
        fulfilled_time = time(sysdate())
    WHERE id = inbound_order_id;


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
 sp_place_buyer_order(order_quantity: int, order_product_id: int, buyer_username: varchar(45), OUT result: int)

 OUT result:
    -1 on rollback
    0 on successful commit
    1 on not enough stockpile
    2 on product_id or buyer_id not exist
 */
DROP PROCEDURE IF EXISTS sp_place_buyer_order;
DELIMITER $$
CREATE PROCEDURE sp_place_buyer_order(
    IN order_quantity INT,
    IN order_product_id INT,
    IN buyer_username VARCHAR(45),
    OUT result INT
)
this_proc:
BEGIN
    DECLARE _rollback BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET _rollback = 1;
    START TRANSACTION;
    SET result = 0;

    -- Checks for early termination
    SELECT count(*) INTO @product_exist FROM product WHERE id = order_product_id;
    IF @product_exist = 0 THEN SET result = 2; LEAVE this_proc; END IF;

    SELECT count(*) INTO @buyer_exist FROM buyer WHERE username = buyer_username;
    IF @buyer_exist = 0 THEN SET result = 2; LEAVE this_proc; END IF;


    -- Check if warehouse stockpile can fulfill order
    SELECT sum(quantity) INTO @product_stock_quantity FROM stockpile s WHERE s.product_id = order_product_id FOR UPDATE;
    IF @product_stock_quantity < order_quantity THEN SET result = 1; LEAVE this_proc; END IF;


    -- Update the database
    INSERT INTO buyer_order (quantity, product_id, created_date, created_time, buyer)
    VALUES (order_quantity, order_product_id, date(sysdate()), time(sysdate()), buyer_username);

    SELECT warehouse_id INTO @serving_warehouse FROM stockpile WHERE product_id = order_product_id ORDER BY quantity LIMIT 1;
    -- TODO: Implement removing product from stockpile here


    -- Commit or Rollback
    IF _rollback THEN
        SET result = -1;
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END $$
DELIMITER ;
