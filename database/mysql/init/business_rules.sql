USE isys2099_group9_app;


/*
 int so_move_product(product_id int, move_quantity int, to_warehouse: int)
 */
DROP PROCEDURE IF EXISTS sp_move_product;
DELIMITER $$
CREATE FUNCTION sp_move_product(IN product_id INT, IN move_quantity INT, IN to_warehouse INT) RETURNS INT
this_func:
BEGIN
    DECLARE _rollback BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET _rollback = 1;
    START TRANSACTION;



    -- Commit or Rollback
    IF _rollback THEN
        ROLLBACK;
        RETURN 1;
    ELSE
        COMMIT;
        RETURN 0;
    END IF;
END $$
DELIMITER ;
