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
department_name VARCHAR(30) NOT NULL DEFAULT "",
-- price (cost to customer)
price DECIMAL(10,2) NOT NULL DEFAULT 0.0,
-- stock_quantity (how much of the product is available in stores)
stock_quantity INT(10) NOT NULL DEFAULT 0,
-- product sales
product_sales DECIMAL(10,2) NOT NULL DEFAULT 0.0,
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

SELECT * FROM bamazon_db.products ORDER BY department_name;


CREATE TABLE departments(
  -- Create a numeric column called "item_id" which will automatically increment its default value as we create new rows. --
  -- item_id (unique id for each product)
department_id INT AUTO_INCREMENT NOT NULL,
-- department_name
department_name VARCHAR(30) NOT NULL DEFAULT "",
-- overhead cost
over_head_cost DECIMAL(10,2) NOT NULL DEFAULT 0.0,
  -- Set the id as this table's primary key
PRIMARY KEY(department_id)
);

INSERT INTO bamazon_db.departments (department_name, over_head_cost) VALUES ("Books", 2000);
INSERT INTO bamazon_db.departments (department_name, over_head_cost) VALUES ("Clothing", 3000);
INSERT INTO bamazon_db.departments (department_name, over_head_cost) VALUES ("Electronics", 100000);
INSERT INTO bamazon_db.departments (department_name, over_head_cost) VALUES ("Home", 10000);
INSERT INTO bamazon_db.departments (department_name, over_head_cost) VALUES ("Video Games", 8000);

SELECT * FROM bamazon_db.departments;

SELECT * FROM bamazon_db.products ORDER BY department_name;

USE bamazon_db;
SELECT departments.department_id, departments.department_name, num_products, over_head_cost, department_sales, (department_sales - over_head_cost) AS profit
FROM bamazon_db.departments
LEFT JOIN
(SELECT department_name, COUNT(*) AS num_products, SUM(product_sales) AS department_sales FROM bamazon_db.products GROUP BY department_name) AS summarized
ON bamazon_db.departments.department_name = summarized.department_name ORDER BY profit DESC;  

USE bamazon_db; SELECT departments.department_id, departments.department_name, num_products, over_head_cost, department_sales, (department_sales - over_head_cost) AS profit FROM bamazon_db.departments LEFT JOIN (SELECT department_name, COUNT(*) AS num_products, SUM(product_sales) AS department_sales FROM bamazon_db.products GROUP BY department_name) AS summarized ON bamazon_db.departments.department_name = summarized.department_name ORDER BY profit DESC;


SELECT * FROM bamazon_db.products;