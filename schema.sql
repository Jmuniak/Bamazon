DROP DATABASE IF EXISTS Bamazon;
CREATE database Bamazon;

USE Bamazon;

CREATE TABLE products
    (item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
        product_name VARCHAR(100) NULL,
        department_name VARCHAR(100) NULL,
        price DECIMAL(10, 2) NULL,
        quantity INT NULL,
        PRIMARY KEY(item_id) 
        );

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Hard Cover Book", "Education", 15, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES
    ("Paperback Book", "Education", 10, 150),
    ("Chocolate Bars", "Food", 30, 120),
    ("Hammock", "Furniture", 33, 75),
    ("Snowboard", "Outdoor Sports", 300, 50),
    ("Bass Guitar", "Music", 250, 400),
    ("Hatchet", "Tools", 20, 2000),
    ("MacBook", "Electronics", 2500, 100);


