-- Drops the bamazon_db if it already exists --
DROP DATABASE IF EXISTS bamazon_db;
-- Create a database called bamazon_db --
CREATE DATABASE bamazon_db;

-- Use bamazon_db for the following statements --
USE bamazon_db;

CREATE TABLE products(
  -- Create a numeric column called "item_id" which will automatically increment its default value as we create new rows. --
  -- item_id (unique id for each product)
item_id INT AUTO_INCREMENT NOT NULL,

-- product_name (Name of product)
product_name VARCHAR(50) UNIQUE NOT NULL,
-- department_name
department_name VARCHAR(30) NOT NULL,
-- price (cost to customer)
price DECIMAL(10,2) NOT NULL,
-- stock_quantity (how much of the product is available in stores)
stock_quantity INT(10) NOT NULL DEFAULT 0,
-- product sales
product_sales DECIMAL(10,2) NOT NULL,
-- Set the id as this table's primary key
PRIMARY KEY(item_id)
);

-- Create new example rows
USE bamazon_db;

INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("HDMI Cable 1.82m", "Electronics", 182.30, 10);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("51-inch Flat TV", "Electronics", 13799.99, 2);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("White T-Shirt", "Clothing", 350, 10);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Funny Tie", "Clothing", 250, 5);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Fancy Tie", "Clothing", 250, 7);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Green Socks", "Clothing", 60, 20);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Javascript for Dumies", "Books", 400, 10);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("The Lord of the Rings", "Books", 300, 5);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("The Little Prince", "Books", 99, 15);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Alice's Adventures in Wonderland", "Books", 99, 15);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Bart Simpson's Guide to Life", "Books", 320, 5);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Wood Table", "Home", 1850, 3);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Steel Chair", "Home", 675, 20);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Queen Size Mattress", "Home", 5999, 4);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Macbook Pro", "Electronics", 34999, 3);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("iPad Pro", "Electronics", 15499, 5);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Home Theater", "Electronics", 4780, 2);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Super Smash Bros. Ultimate", "Video Games", 1260.00, 3);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Diablo III: Eternal Collection", "Video Games", 1399.00, 3);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("LEGO Marvel Superheroes 2", "Video Games", 359.10, 10);

SELECT COUNT(*) FROM bamazon_db.products;

SELECT * FROM bamazon_db.products;


CREATE TABLE departments(
  -- Create a numeric column called "item_id" which will automatically increment its default value as we create new rows. --
  -- item_id (unique id for each product)
department_id INT AUTO_INCREMENT NOT NULL,
-- department_name
department_name VARCHAR(30) NOT NULL,
-- overhead cost
over_head_cost DECIMAL(10,2) NOT NULL,
  -- Set the id as this table's primary key
PRIMARY KEY(item_id)
);