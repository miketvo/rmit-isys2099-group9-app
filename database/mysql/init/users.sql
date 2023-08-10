-- Warehouse Administrator
CREATE USER IF NOT EXISTS 'isys2099_group9_app_whadmin_user'@'localhost'
    IDENTIFIED WITH 'caching_sha2_password' BY 'jlAfD3sBdpJvz0phULIq4CAaAMIIoGNA';

GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.wh_admin TO 'isys2099_group9_app_whadmin_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.warehouse TO 'isys2099_group9_app_whadmin_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.product_category TO 'isys2099_group9_app_whadmin_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.product_attribute TO 'isys2099_group9_app_whadmin_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.product_category_attribute_association TO 'isys2099_group9_app_whadmin_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.product TO 'isys2099_group9_app_whadmin_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.inbound_order TO 'isys2099_group9_app_whadmin_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.buyer_order TO 'isys2099_group9_app_whadmin_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.lazada_user TO 'isys2099_group9_app_whadmin_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.seller TO 'isys2099_group9_app_whadmin_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.buyer TO 'isys2099_group9_app_whadmin_user'@'localhost';


-- Seller
CREATE USER IF NOT EXISTS 'isys2099_group9_app_seller_user'@'localhost'
    IDENTIFIED WITH 'caching_sha2_password' BY 'IAAX8qFR3bdXkQrb4dM77QGgV9FxRGap';

GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.lazada_user TO 'isys2099_group9_app_seller_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.seller TO 'isys2099_group9_app_seller_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.buyer TO 'isys2099_group9_app_seller_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.product TO 'isys2099_group9_app_seller_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.inbound_order TO 'isys2099_group9_app_seller_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.buyer_order TO 'isys2099_group9_app_seller_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.warehouse TO 'isys2099_group9_app_seller_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.product_category TO 'isys2099_group9_app_seller_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.product_attribute TO 'isys2099_group9_app_seller_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.product_category_attribute_association TO 'isys2099_group9_app_seller_user'@'localhost';


-- Buyer
CREATE USER IF NOT EXISTS 'isys2099_group9_app_buyer_user'@'localhost'
    IDENTIFIED WITH 'caching_sha2_password' BY 'gxQJCza0eADkT5AKmeE865ZN8p1nBsar';

GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.lazada_user TO 'isys2099_group9_app_buyer_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.buyer TO 'isys2099_group9_app_buyer_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.seller TO 'isys2099_group9_app_buyer_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON isys2099_group9_app.buyer_order TO 'isys2099_group9_app_buyer_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.warehouse TO 'isys2099_group9_app_buyer_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.product_category TO 'isys2099_group9_app_buyer_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.product_attribute TO 'isys2099_group9_app_buyer_user'@'localhost';
GRANT SELECT ON isys2099_group9_app.product_category_attribute_association TO 'isys2099_group9_app_buyer_user'@'localhost';
