USE isys2099_group9_app;


-- Auxiliary views

/*
 Note: For some tables with AUTO_INCREMENT id column, the user should not be able to manually INSERT this column, thus
 the need for _noid views.
 */

DROP VIEW IF EXISTS view_warehouse_noid;
CREATE VIEW view_warehouse_noid AS
SELECT warehouse_name, volume, province, city, district, street, street_number
FROM warehouse;

DROP VIEW IF EXISTS view_product_noid;
CREATE VIEW view_product_noid AS
SELECT title, image, product_description, category, price, width, height, length, seller
FROM product;

DROP VIEW IF EXISTS view_inbound_order_noid;
CREATE VIEW view_inbound_order_noid AS
SELECT quantity, product_id, created_date, created_time, fulfilled_date, fulfilled_time, seller
FROM inbound_order;

DROP VIEW IF EXISTS view_buyer_order_noid;
CREATE VIEW view_buyer_order_noid AS
SELECT quantity, product_id, created_date, created_time, order_status, fulfilled_date, fulfilled_time, buyer
FROM buyer_order;


-- Warehouse Administrator
CREATE USER IF NOT EXISTS 'isys2099_group9_app_whadmin_user'@'%'
    IDENTIFIED WITH 'caching_sha2_password' BY 'jlAfD3sBdpJvz0phULIq4CAaAMIIoGNA';

/*
 The Warehouse Administrator shall be able to:
    - CRUD **their own** account (username and password): wh_admin table.
    - CRUD warehouses: warehouse table.
    - CRUD categories and their attributes: product_category, product_attribute, and
      product_category_attribute_association table.
    - CRUD products, in case a product needs to be manually edited: product table.
    - CRUD stockpiles, to move products between warehouses.
    - CRUD inbound orders, to fulfill those orders, or in case some inbound order needs to be manually edited:
      inbound_order table.
    - CRUD buyer orders, to fulfill buyer orders, in case some buyer order needs to be manually edited:
      buyer_order table.
    - View seller username: SELECT privilege on seller table, restricted to username column.
    - View buyer username: SELECT privilege on buyer table, restricted to username column.

 The Warehouse Administrator shall not be able to:
    - Modify seller information.
    - View seller password hash.
    - Modify buyer information.
    - View buyer password hash.

 Summary: The Warehouse Administrator has unlimited CRUD privileges on all tables within the database, except for the
 seller, and buyer tables, which they only have the SELECT privilege on. The Warehouse Administrator also does not have
 any access to the lazada_user, which contains sensitive password hash for all Lazada users.
 */
GRANT SELECT, INSERT, UPDATE, DELETE ON wh_admin TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT SELECT, UPDATE, DELETE ON warehouse TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT INSERT ON view_warehouse_noid TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON product_category TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON product_attribute TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON product_category_attribute_association TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT SELECT, UPDATE, DELETE ON product TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT INSERT ON view_product_noid TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON stockpile TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT SELECT, UPDATE, DELETE ON inbound_order TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT INSERT ON view_inbound_order_noid TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT SELECT, UPDATE, DELETE ON buyer_order TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT INSERT ON view_buyer_order_noid TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT SELECT ON seller TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT SELECT ON buyer TO 'isys2099_group9_app_whadmin_user'@'%';

GRANT EXECUTE ON PROCEDURE sp_move_product TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT EXECUTE ON PROCEDURE sp_delete_warehouse TO 'isys2099_group9_app_whadmin_user'@'%';
GRANT EXECUTE ON PROCEDURE sp_fulfill_inbound_order TO 'isys2099_group9_app_whadmin_user'@'%';


-- Seller
CREATE USER IF NOT EXISTS 'isys2099_group9_app_seller_user'@'%'
    IDENTIFIED WITH 'caching_sha2_password' BY 'IAAX8qFR3bdXkQrb4dM77QGgV9FxRGap';

/*
 The Seller shall be able to:
    - CRUD **their own** account (username and password): seller and lazada_user table.
    - CRUD **their own** products: product table.
    - View categories and their attributes to support the above operation: product_category, product_attribute, and
      product_category_attribute_association table.
    - CRUD inbound orders: inbound_order table.
    - CRU stockpile information, to support the above operation.
    - View warehouse information, to support the above operation: SELECT privilege on warehouse table.
    - View buyer orders for **their own** products.
    - View buyer username to support the above operation: SELECT privilege on buyer and lazada_user table, restricted to
      username column.

 The Seller shall not be able to:
    - Have any access to Warehouse Admin information.
    - Modify warehouses.
    - Delete stockpile information.
    - View buyer password hash.
    - Modify buyer information.
    - Modify buyer orders.
    - Modify any product category and their attributes.

 Summary: The Seller has unlimited CRUD privileges only on the tables required for their main operations: account
 management, product management, and inbound order management, plus some other SELECT privileges on relevant
 information to support these operations.
 */
GRANT SELECT, INSERT, UPDATE, DELETE ON lazada_user TO 'isys2099_group9_app_seller_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON seller TO 'isys2099_group9_app_seller_user'@'%';
GRANT SELECT ON buyer TO 'isys2099_group9_app_seller_user'@'%';
GRANT SELECT, UPDATE, DELETE ON product TO 'isys2099_group9_app_seller_user'@'%';
GRANT INSERT ON view_product_noid TO 'isys2099_group9_app_seller_user'@'%';
GRANT SELECT, UPDATE, DELETE ON inbound_order TO 'isys2099_group9_app_seller_user'@'%';
GRANT INSERT ON view_inbound_order_noid TO 'isys2099_group9_app_seller_user'@'%';
GRANT SELECT ON buyer_order TO 'isys2099_group9_app_seller_user'@'%';
GRANT SELECT ON warehouse TO 'isys2099_group9_app_seller_user'@'%';
GRANT SELECT, INSERT, UPDATE ON stockpile TO 'isys2099_group9_app_seller_user'@'%';
GRANT SELECT ON product_category TO 'isys2099_group9_app_seller_user'@'%';
GRANT SELECT ON product_attribute TO 'isys2099_group9_app_seller_user'@'%';
GRANT SELECT ON product_category_attribute_association TO 'isys2099_group9_app_seller_user'@'%';

GRANT EXECUTE ON PROCEDURE sp_fulfill_inbound_order TO 'isys2099_group9_app_seller_user'@'%';


-- Buyer
CREATE USER IF NOT EXISTS 'isys2099_group9_app_buyer_user'@'%'
    IDENTIFIED WITH 'caching_sha2_password' BY 'gxQJCza0eADkT5AKmeE865ZN8p1nBsar';

/*
 The Buyer shall be able to:
    - CRUD **their own** account (username and password): seller and lazada_user table.
    - View products: product table, excluding the id and warehouse_id columns.
    - CRUD stockpile information for when we simulate buyer_oder fulfillment on the buyer's end: stockpile table.
    - View warehouse id, to support the above operation: warehouse table, restricted to only the id column.
    - View categories and their attributes to support the above operation: product_category, product_attribute, and
      product_category_attribute_association table.
    - CRUD buyer orders: buyer_order table.
    - View buyer orders for **their own** products.
    - View buyer username to support the above operation: SELECT privilege on buyer and lazada_user table, restricted to
      username column.

 The Buyer shall not be able to:
    - Have any access to Warehouse Admin information.
    - Have any access to warehouse information, except the warehouse id.
    - Have any access to inbound order information.
    - Modify product information.
    - Modify any product category their attributes.
    - View seller password hash.
    - Modify seller information.

 Summary: The Buyer has unlimited CRUD privileges only on the tables required for their main operations: account
 management, viewing products, and buyer order management, plus some other SELECT privileges on relevant
 information to support these operations.
 */
GRANT SELECT, INSERT, UPDATE, DELETE ON lazada_user TO 'isys2099_group9_app_buyer_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON buyer TO 'isys2099_group9_app_buyer_user'@'%';
GRANT SELECT ON seller TO 'isys2099_group9_app_buyer_user'@'%';
GRANT SELECT, UPDATE, DELETE ON buyer_order TO 'isys2099_group9_app_buyer_user'@'%';
GRANT INSERT ON view_buyer_order_noid TO 'isys2099_group9_app_buyer_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON stockpile TO 'isys2099_group9_app_buyer_user'@'%';
GRANT SELECT ( id ) ON warehouse TO 'isys2099_group9_app_buyer_user'@'%';
GRANT SELECT ON product TO 'isys2099_group9_app_buyer_user'@'%';
GRANT SELECT ON product_category TO 'isys2099_group9_app_buyer_user'@'%';
GRANT SELECT ON product_attribute TO 'isys2099_group9_app_buyer_user'@'%';
GRANT SELECT ON product_category_attribute_association TO 'isys2099_group9_app_buyer_user'@'%';

GRANT EXECUTE ON PROCEDURE sp_place_buyer_order TO 'isys2099_group9_app_buyer_user'@'%';
GRANT EXECUTE ON PROCEDURE sp_return_product_from_buyer_order TO 'isys2099_group9_app_buyer_user'@'%';
