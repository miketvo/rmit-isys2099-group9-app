USE isys2099_group9_app;


INSERT INTO wh_admin (username, password_hash)
VALUES ('mike', '');

INSERT INTO lazada_user (username, password_hash)
VALUES ('tony', ''),
       ('loi', '');

INSERT INTO buyer (username)
VALUES ('tony');

INSERT INTO seller (username, shop_name)
VALUES ('loi', 'loc');

INSERT INTO warehouse (warehouse_name, volume, province, city, district, street, streetNumber)
VALUES ('Ontario LAZ', 2000)
