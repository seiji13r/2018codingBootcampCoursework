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
price FLOAT(10) NOT NULL,
-- stock_quantity (how much of the product is available in stores)
stock_quantity INT(10) NOT NULL DEFAULT 0,
  -- Set the id as this table's primary key
PRIMARY KEY(item_id)
);

-- Create new example rows
USE bamazon_db;

INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("HDMI Cable 1.82m", "Electronics", 182.30, 10);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("51-inch Flat TV", "Electronics", 13799.99, 2);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Clothing", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Clothing", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Books", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Books", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Home", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Home", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);
INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ("", "Electronics", 0, 0);

SELECT COUNT(*) FROM bamazon_db.products;

-- SELECT * FROM bamazon_db.products;