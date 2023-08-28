USE isys2099_group9_app;


-- Warehouse admin
INSERT INTO wh_admin (username, refresh_token, password_hash)
VALUES ('mike', '', '');


-- Lazada user (buyer and seller)
INSERT INTO lazada_user (username, salt, refresh_token, password_hash)
VALUES ('tony', '', '', ''),
       ('loi', '', '', ''),
       ('mike', '', '', '');

INSERT INTO buyer (username)
VALUES ('tony');

INSERT INTO seller (username, shop_name)
VALUES ('loi', 'loc'),
       ('mike', 'vo');


-- Product category and attribute

/*
 product_category
 ├── Electronic Devices
 │   ├── Mobiles
 │   ├── Computers
 │   ├── Computer Peripherals
 │   │   ├── Computer Mice
 │   │   ├── Keyboards
 │   │   │   └── Mechanical Keyboards
 │   │   ├── Mechanical Keyboard Key-caps
 │   │   ├── Mechanical Keyboard Switches
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
       ('Computers', 'Electronic Devices'),
       ('Computer Peripherals', 'Electronic Devices'),
       ('Computer Mice', 'Computer Peripherals'),
       ('Keyboards', 'Computer Peripherals'),
       ('Mechanical Keyboards', 'Keyboards'),
       ('Mechanical Keyboard Key-caps', 'Computer Peripherals'),
       ('Mechanical Keyboard Switches', 'Computer Peripherals'),
       ('Monitors', 'Computer Peripherals'),
       ('Audio', 'Electronic Devices'),
       ('Speaker', 'Audio'),
       ('Earphones', 'Audio'),
       ('Headphones', 'Audio'),
       ('TV & Home Appliances', null),
       ('Televisions', 'TV & Home Appliances'),
       ('Small Appliances', 'TV & Home Appliances'),
       ('Large Appliances', 'TV & Home Appliances');

INSERT INTO product_attribute (attribute_name, attribute_type, required)
VALUES ('Width', 'Number', FALSE),
       ('Length', 'Number', FALSE),
       ('Height', 'Number', FALSE),
       ('Thickness', 'Number', FALSE),
       ('Color', 'String', FALSE),
       ('RAM', 'String', TRUE),
       ('CPU', 'String', TRUE),
       ('GPU', 'String', FALSE),
       ('Storage capacity', 'String', FALSE),
       ('Brand', 'String', FALSE),
       ('Screen size', 'String', FALSE),
       ('Resolution', 'String', FALSE),
       ('Refresh rate', 'String', FALSE),
       ('Wireless', 'Boolean', FALSE),
       ('Battery powered', 'Boolean', FALSE),
       ('Material', 'String', FALSE),
       ('Key-cap profile', 'String', TRUE),
       ('Switch type', 'String', TRUE),
       ('Latency', 'String', FALSE),
       ('Noise cancelling', 'Boolean', FALSE),
       ('Frequency range', 'String', FALSE),
       ('Smart TV', 'Boolean', FALSE),
       ('Voltage', 'String', TRUE),
       ('Wattage', 'String', TRUE),
       ('Warranty', 'Boolean', TRUE),
       ('Warranty period', 'String', FALSE);

INSERT INTO product_category_attribute_association (category, attribute)
VALUES ('Electronic Devices', 'Warranty'),
       ('Electronic Devices', 'Warranty period'),
       ('Electronic Devices', 'Brand'),
       ('Mobiles', 'Width'),
       ('Mobiles', 'Length'),
       ('Mobiles', 'Thickness'),
       ('Mobiles', 'Color'),
       ('Mobiles', 'RAM'),
       ('Mobiles', 'CPU'),
       ('Mobiles', 'Storage capacity'),
       ('Mobiles', 'Resolution'),
       ('Computers', 'Width'),
       ('Computers', 'Length'),
       ('Computers', 'Thickness'),
       ('Computers', 'Color'),
       ('Computers', 'RAM'),
       ('Computers', 'CPU'),
       ('Computers', 'GPU'),
       ('Computers', 'Storage capacity'),
       ('Computers', 'Screen size'),
       ('Computers', 'Resolution'),
       ('Computer Peripherals', 'Wireless'),
       ('Computer Peripherals', 'Battery powered'),
       ('Computer Mice', 'Color'),
       ('Computer Mice', 'Latency'),
       ('Keyboards', 'Color'),
       ('Keyboards', 'Latency'),
       ('Mechanical Keyboards', 'Key-cap profile'),
       ('Mechanical Keyboard Switches', 'Switch type'),
       ('Mechanical Keyboard Key-caps', 'Key-cap profile'),
       ('Mechanical Keyboard Key-caps', 'Material'),
       ('Monitors', 'Screen size'),
       ('Monitors', 'Resolution'),
       ('Monitors', 'Refresh rate'),
       ('Audio', 'Wireless'),
       ('Audio', 'Battery powered'),
       ('Audio', 'Latency'),
       ('Audio', 'Noise cancelling'),
       ('Audio', 'Frequency range'),
       ('TV & Home Appliances', 'Warranty'),
       ('TV & Home Appliances', 'Warranty period'),
       ('TV & Home Appliances', 'Brand'),
       ('TV & Home Appliances', 'Color'),
       ('TV & Home Appliances', 'Voltage'),
       ('TV & Home Appliances', 'Wattage'),
       ('Televisions', 'Smart TV'),
       ('Televisions', 'Screen size'),
       ('Televisions', 'Resolution'),
       ('Televisions', 'Width'),
       ('Televisions', 'Height'),
       ('Televisions', 'Thickness'),
       ('Small Appliances', 'Width'),
       ('Small Appliances', 'Length'),
       ('Small Appliances', 'Height'),
       ('Large Appliances', 'Width'),
       ('Large Appliances', 'Length'),
       ('Large Appliances', 'Height');


-- Warehouse and products
INSERT INTO warehouse (warehouse_name, volume, province, city, district, street, street_number)
VALUES ('Toronto LAZ', 5000000, 'Ontario', 'Toronto', NULL, NULL, NULL),
       ('Montreal LAZ', 4600000, 'Quebec', 'Montreal', NULL, NULL, NULL),
       ('Vancouver LAZ', 4000000, 'British Columbia', 'Vancouver', NULL, NULL, NULL),
       ('Victoria LAZ', 1800000, 'British Columbia', 'Victoria', NULL, NULL, NULL),
       ('Winnipeg LAZ', 3000000, 'Manitoba', 'Winnipeg', NULL, NULL, NULL),
       ('Edmonton LAZ', 2000000, 'Alberta', 'Edmonton', NULL, NULL, NULL),
       ('St. John\'s LAZ', 1200000, 'Newfoundland and Labrador', 'St. John\'s', NULL, NULL, NULL),
       ('Regina LAZ', 2200000, 'Saskatchewan', 'Regina', NULL, NULL, NULL),
       ('Charlottetown LAZ', 800000, 'Prince Edward Island', 'Charlottetown', NULL, NULL, NULL);

INSERT INTO product (id, title, image, product_description, category, price, width, length, height, seller)
VALUES (1, 'Smartphone Model X', load_file('mock-data/1.jpg'), 'High-end smartphone with top-notch features.', 'Mobiles', 899.99, 6, 12, 1, 'loi'),
       (2, 'Gaming Laptop Pro', load_file('mock-data/2.jpg'), 'Powerful gaming laptop for enthusiasts.', 'Computers', 1499.99, 35, 25, 2, 'loi'),
       (3, 'RGB Mechanical Keyboard', load_file('mock-data/3.jpg'), 'Mechanical keyboard with customizable RGB lighting.', 'Mechanical Keyboards', 89.99, 44, 14, 4, 'loi'),
       (4, 'Membrane Keyboard', load_file('mock-data/4.jpg'), 'Standard membrane keyboard for daily use.', 'Keyboards', 39.99, 42, 15, 3, 'loi'),
       (5, '27-inch Gaming Monitor', load_file('mock-data/5.jpg'), 'High-refresh rate gaming monitor for smooth gameplay.', 'Monitors', 399.99, 60, 33, 5, 'loi'),
       (6, 'Wireless Bluetooth Speaker', load_file('mock-data/6.jpg'), 'Portable speaker with long battery life.', 'Speaker', 49.99, 12, 8, 8, 'loi'),
       (7, 'Noise-Cancelling Headphones', load_file('mock-data/7.jpg'), 'Over-ear headphones with active noise cancellation.', 'Headphones', 199.99, 18, 15, 25, 'loi'),
       (8, 'Smart LED TV', load_file('mock-data/8.jpg'), 'High-definition smart TV with various features.', 'Televisions', 799.99, 48, 28, 3, 'loi'),
       (9, 'Compact Refrigerator', load_file('mock-data/9.jpg'), 'Small refrigerator for dorm rooms and offices.', 'Small Appliances', 179.99, 20, 18, 33, 'loi'),
       (10, 'Front-Load Washing Machine', load_file('mock-data/10.jpg'), 'Energy-efficient washing machine with multiple programs.', 'Large Appliances', 599.99, 30, 27, 39, 'loi'),
       (11, 'High-Performance Desktop PC', load_file('mock-data/11.jpg'), 'Custom-built desktop PC for gaming and heavy tasks.', 'Computers', 2499.99, 45, 50, 25, 'mike'),
       (12, 'Ultra-Narrow Curved Monitor', load_file('mock-data/12.jpg'), 'Curved narrow monitor for disruptive viewing experience.', 'Monitors', 599.99, 80, 35, 10, 'mike'),
       (13, 'Wireless Gaming Mouse', load_file('mock-data/13.jpg'), 'Precision gaming mouse with customizable buttons.', 'Computer Mice', 69.99, 12, 7, 4, 'mike'),
       (14, 'Bluetooth Earbuds', load_file('mock-data/14.jpg'), 'True wireless earbuds with advanced audio quality.', 'Earphones', 119.99, 5, 3, 2, 'mike'),
       (15, 'Portable Air Conditioner', load_file('mock-data/15.jpg'), 'Cool down your space with this portable AC unit.', 'Small Appliances', 299.99, 18, 15, 30, 'mike'),
       (16, 'Low-Performance Desktop PC', load_file('mock-data/16.jpg'), 'Custom-built desktop potato.', 'Computers', 2499.99, 45, 50, 25, 'mike'),
       (17, 'Ultra-Wide Curved Monitor', load_file('mock-data/17.jpg'), 'Curved monitor for immersive viewing experience.', 'Monitors', 599.99, 80, 35, 10, 'mike'),
       (18, 'Wired Gaming Mouse', load_file('mock-data/18.jpg'), 'Low-precision gaming mouse with customizable buttons.', 'Computer Mice', 69.99, 12, 7, 4, 'mike'),
       (19, 'Green-toe Earbuds', load_file('mock-data/19.jpg'), 'True wireless earbuds with advanced audio quality.', 'Earphones', 119.99, 5, 3, 2, 'mike'),
       (20, 'Importable Air Conditioner', load_file('mock-data/20.jpg'), 'Cool down your space with this immovable AC unit.', 'Small Appliances', 299.99, 18, 15, 30, 'mike'),
       (21, 'Office Keyboard', load_file('mock-data/21.jpg'), 'Mechanical office keyboard with customizable lighting.', 'Keyboards', 79.99, 42, 15, 4, 'mike'),
       (22, 'Smartphone Model Y', load_file('mock-data/22.jpg'), 'Mid-range smartphone with sleek design.', 'Mobiles', 499.99, 5, 11, 1, 'mike'),
       (23, 'Noise-Boosting Over-Ear Headphones', load_file('mock-data/23.jpg'), 'Premium over-ear headphones with cutting-edge noise boosting.', 'Headphones', 249.99, 18, 16, 25, 'mike'),
       (24, 'Low Resolution Smart TV', load_file('mock-data/24.jpg'), '320p TV with mediocre visuals.', 'Televisions', 999.99, 55, 32, 5, 'mike'),
       (25, 'Robotic Vacuum Dust Depositor', load_file('mock-data/25.jpg'), 'Automated dust depositor for a dirtier than ever house.', 'Small Appliances', 149.99, 14, 14, 4, 'mike'),
       (26, 'A Cube', null, 'A mysterious dense 1x1x1 centimeter cube of exotic material. Where is it from? Why is it here? What is its purpose? No one knows...', 'Large Appliances', 9999.99, 1, 1, 1, 'mike');

INSERT INTO stockpile (product_id, warehouse_id, quantity)
VALUES (1, 1, 100),
       (2, 2, 50),
       (3, 3, 30),
       (4, 5, 40),
       (5, 1, 20),
       (6, 4, 80),
       (7, 2, 40),
       (8, 6, 15),
       (9, 8, 25),
       (10, 3, 10),
       (11, 3, 15),
       (12, 5, 10),
       (13, 7, 30),
       (14, 1, 50),
       (15, 6, 5),
       (16, 3, 15),
       (17, 5, 10),
       (18, 7, 30),
       (19, 1, 50),
       (20, 6, 5),
       (21, 3, 20),
       (22, 1, 75),
       (23, 2, 25),
       (24, 6, 10),
       (25, 8, 15),
       (26, 9, 1);


-- Orders
INSERT INTO inbound_order (quantity, product_id, created_date, created_time, fulfilled_date, fulfilled_time, seller)
VALUES (50, 1, '2022-08-01', '10:00:00', '2022-08-02', '14:30:00', 'loi'),
       (30, 2, '2022-08-02', '14:30:00', '2022-08-03', '09:45:00', 'loi'),
       (20, 3, '2022-08-03', '09:45:00', null, null, 'loi'),
       (15, 4, '2022-08-04', '13:20:00', null, null, 'loi'),
       (60, 5, '2022-08-05', '16:15:00', null, null, 'loi'),
       (50, 11, '2022-08-01', '10:00:00', '2022-08-02', '14:30:00', 'mike'),
       (30, 12, '2022-08-02', '14:30:00', '2022-08-03', '09:45:00', 'mike'),
       (20, 13, '2022-08-03', '09:45:00', null, null, 'mike'),
       (15, 14, '2022-08-04', '13:20:00', null, null, 'mike'),
       (60, 15, '2022-08-05', '16:15:00', null, null, 'mike');

INSERT INTO buyer_order (quantity, product_id, created_date, created_time, order_status, fulfilled_date, fulfilled_time, buyer)
VALUES (3, 1, '2023-08-06', '11:30:00', 'A', '2023-08-07', '15:45:00', 'tony'),
       (1, 4, '2023-08-07', '15:45:00', 'A', '2023-08-08', '10:20:00', 'tony'),
       (2, 2, '2023-08-08', '10:20:00', 'A', '2023-08-09', '12:00:00', 'tony'),
       (5, 3, '2023-08-09', '12:00:00', 'R', null, null, 'tony'),
       (4, 5, '2023-08-10', '14:10:00', 'P', null, null, 'tony');
