USE isys2099_group9_app;


-- Warehouse admin
INSERT INTO wh_admin (username, password_hash)
VALUES ('mike', '');


-- Lazada user (buyer and seller)
INSERT INTO lazada_user (username, password_hash)
VALUES ('tony', ''),
       ('loi', '');

INSERT INTO buyer (username)
VALUES ('tony');

INSERT INTO seller (username, shop_name)
VALUES ('loi', 'loc');


-- Product category and attribute

/*
 product_category
 ├── Electronic Devices
 │   ├── Mobiles
 │   ├── Tablets
 │   ├── Laptops
 │   ├── Desktop Computers
 │   ├── Computer Peripherals
 │   │   ├── Computer Mice
 │   │   ├── Keyboards
 │   │   │   ├── Mechanical Keyboards
 │   │   │   ├── Keycaps
 │   │   │   └── Switches
 │   │   └── Monitors
 │   └── Audio
 │       ├── Speaker
 │       ├── Earphones
 │       └── Headphones
 └── TV & Home Appliances
     ├── Televisions
     ├── Small Appliances
     └── Large Appliances
 */
INSERT INTO product_category (category_name, parent)
VALUES ('Electronic Devices', null),
       ('Mobiles', 'Electronic Devices'),
       ('Tablets', 'Electronic Devices'),
       ('Laptops', 'Electronic Devices'),
       ('Desktop Computers', 'Electronic Devices'),
       ('Computer Peripherals', 'Electronic Devices'),
       ('Computer Mice', 'Computer Peripherals'),
       ('Keyboards', 'Computer Peripherals'),
       ('Keyboard Key-caps', 'Keyboards'),
       ('Keyboard Switches', 'Keyboards'),
       ('Monitors', 'Computer Peripherals'),
       ('Audio', 'Electronic Devices'),
       ('Speaker', 'Audio'),
       ('Earphones', 'Audio'),
       ('Headphones', 'Audio'),
       ('TV & Home Appliances', null),
       ('Televisions', 'TV & Home Appliances'),
       ('Small Appliances', 'TV & Home Appliances'),
       ('Large Appliances', 'TV & Home Appliances');

INSERT INTO product_attribute (attribute_name)
VALUES ('Width'),
       ('Length'),
       ('Height'),
       ('Color'),
       ('RAM'),
       ('CPU'),
       ('GPU'),
       ('Storage capacity'),
       ('Brand'),
       ('Screen size'),
       ('Refresh rate'),
       ('Wireless'),
       ('Material'),
       ('Keyboard type'),
       ('Key-cap profile'),
       ('Switch type'),
       ('Latency'),
       ('Noise cancelling'),
       ('Frequency range'),
       ('Smart TV'),
       ('Voltage'),
       ('Wattage'),
       ('Warranty'),
       ('Warranty period');


-- Warehouse and products
INSERT INTO warehouse (warehouse_name, volume, province, city, district, street, streetNumber)
VALUES ('Toronto LAZ', 5000, 'Ontario', 'Toronto', NULL, NULL, NULL),
       ('Montreal LAZ', 4600, 'Quebec', 'Montreal', NULL, NULL, NULL),
       ('Vancouver LAZ', 4000, 'British Columbia', 'Vancouver', NULL, NULL, NULL),
       ('Victoria LAZ', 1800, 'British Columbia', 'Victoria', NULL, NULL, NULL),
       ('Winnipeg LAZ', 3000, 'Manitoba', 'Winnipeg', NULL, NULL, NULL),
       ('Edmonton LAZ', 2000, 'Alberta', 'Edmonton', NULL, NULL, NULL),
       ('St. John\'s LAZ', 1200, 'Newfoundland and Labrador', 'St. John\'s', NULL, NULL, NULL),
       ('Regina LAZ', 2200, 'Saskatchewan', 'Regina', NULL, NULL, NULL),
       ('Charlottetown LAZ', 800, 'Prince Edward Island', 'Charlottetown', NULL, NULL, NULL);
