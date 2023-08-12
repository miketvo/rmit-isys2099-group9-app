USE isys2099_group9_app;


/*
 int so_move_product(product_id int, move_quantity int, from_warehouse: int, to_warehouse: int)

 Returns:
    -1 on rollback
    0 on successful commit
    1 on data not exists
    2 on illegal argument value
 */
DROP PROCEDURE IF EXISTS sp_move_product;
DELIMITER $$
CREATE FUNCTION sp_move_product(
    IN product_id INT,
    IN move_quantity INT,
    IN from_warehouse INT,
    IN to_warehouse INT
) RETURNS INT
BEGIN
    DECLARE _rollback BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET _rollback = 1;
    START TRANSACTION;

    -- Checks for early termination
    IF move_quantity < 1 THEN RETURN 2; END IF;

    SELECT count(*) INTO @exist_product FROM product WHERE id = product_id FOR UPDATE;
    IF @exist_product = 0 THEN RETURN 1; END IF;

    SELECT count(*) INTO @exist_from_warehouse FROM warehouse WHERE id = from_warehouse FOR UPDATE;
    IF @exist_from_warehouse = 0 THEN RETURN 1; END IF;

    SELECT count(*) INTO @exist_to_warehouse FROM warehouse WHERE id = to_warehouse FOR UPDATE;
    IF @exist_to_warehouse = 0 THEN RETURN 1; END IF;



    -- Commit or Rollback
    IF _rollback THEN
        ROLLBACK;
        RETURN -1;
    ELSE
        COMMIT;
        RETURN 0;
    END IF;
END $$
DELIMITER ;
