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
product_name VARCHAR(50) NOT NULL,
-- department_name
department_name VARCHAR(30) NOT NULL,
-- price (cost to customer)
price DECIMAL(10,2) NOT NULL,
-- stock_quantity (how much of the product is available in stores)
stock_quantity INT(10) NOT NULL DEFAULT 0,
  -- Set the id as this table's primary key
PRIMARY KEY(item_id)
);

-- Create new example rows
USE bamazon_db;

INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("HDMI Cable 1.82m", "Electronics", 182.30, 10);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("51-inch Flat TV", "Electronics", 13799.99, 2);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("White T-Shirt", "Clothing", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Funny Tie", "Clothing", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Fancy Tie", "Clothing", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Green Socks", "Clothing", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Javascript for Dumies", "Books", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("The Lord of the Rings", "Books", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("The Little Prince", "Books", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Alice's Adventures in Wonderland", "Books", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Bart Simpson's Guide to Life", "Books", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Wood Table", "Home", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Steel Chair", "Home", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Queen Size Mattress", "Home", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Macbook Pro", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("iPad Pro", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Home Theater", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Super Smash Bros. Ultimate", "Video Games", 1260.00, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("Diablo III: Eternal Collection", "Video Games", 1399.00, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("LEGO Marvel Superheroes 2", "Video Games", 359.10, 10);

SELECT COUNT(*) FROM bamazon_db.products;

SELECT * FROM bamazon_db.products;