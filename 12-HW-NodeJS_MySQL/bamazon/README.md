# NodeJS and MySQL

<!-- TOC -->

- [NodeJS and MySQL](#nodejs-and-mysql)
- [Overview](#overview)
    - [Video Demo](#video-demo)
- [Installation](#installation)
    - [Requirements](#requirements)
    - [Step by Step installation](#step-by-step-installation)
        - [MySQL Connection Settings](#mysql-connection-settings)
    - [Video Installation Walk Trough](#video-installation-walk-trough)
- [Configuration](#configuration)
- [Development](#development)
    - [Libraries](#libraries)
    - [Development Process](#development-process)
    - [Development Notes](#development-notes)
        - [bamazonCustomer.js](#bamazoncustomerjs)
        - [bamazonManager.js](#bamazonmanagerjs)
        - [bamazonSupervisor.js](#bamazonsupervisorjs)

<!-- /TOC -->

# Overview

[Source Code](https://github.com/seiji13r/2018codingBootcampCoursework/tree/master/12-HW-NodeJS_MySQL/bamazon/)

## Video Demo

[Game Demo Video]()

# Installation

## Requirements
* NodeJS 8.x or above installed.

## Step by Step installation  
* Download the Package [[DownloadLink]]()
* Unzip the package locally anywhere. 
* cd into the bamazon directory.
* Install all npm dependencies with `npm install`.
* Create the `.env`file and update MySQL connection Settings accordingly.
* Open MySQL Workbench or the preferred MySQL GUI client and execute the file bamazon.sql

### MySQL Connection Settings
Create the file .env inside the project directory and write inside it the following.
Update the values accordingly.
```bash
# MySQL CONNECTION SETTINGS
BAMAZON_MYSQL_IP="127.0.0.1"
BAMAZON_MYSQL_PORT=3306
BAMAZON_MYSQL_USER="root"
BAMAZON_MYSQL_PASSWORD=""
BAMAZON_MYSQL_DB="bamazon_db"
```

## Video Installation Walk Trough
[Video Walk Trough]()

# Configuration

This software does not require any specific configuration for proper operation, however you can customize:

[Config Video]()

# Development

## Libraries
[Inquirer](https://github.com/SBoudrias/Inquirer.js#readme)

## Development Process
* Create the File Structure
* Create the sql files to define the Database and Table structure and include initial data.
* Make sure to install the dependencies **Dependencies** `mysql`, `inquirer`, `cli-table3`.
* Connect with MySQL Database and build the Initial Database with the already written sql file.
* Create the bamazonCustomer.js app.
    * Include the required npm Libraries.
    * Resolve MySQL Connection.
    * Resolve hiding the connection credentials and creating the connection's configuration file.
    * Resolve Displaying the Data with cli-table3.
    * Resolve the user input with inquirer **What?** and **How Many?**.
    * Resolve the Invoice ?????
    * Resolve the Products table Update.
    * Create a function that will be called at the end of each action to quit the program or keep operating. "This will be the only one ending mysql connection"
* Create the managerCustomer.js app.
    * Include the required npm Libraries.
    * Include  MySQL Connection.
    * Include hiding the connection credentials and creating the connection's configuration file.
    * Create a main function with the Manager's Menu Options.
    * Include the Function to list the Products for sale.
    * Create a Function to display the Inventory (Query quantity < 5) define a callback function as an argument.
    * Create the Update call back function. So it prints the inventory table and then request for the product to add inventory.
    * Create the Add Product Function.
    * Re-Use the function that request to continue or quit the program.
    
* Create the managerCustomer.js app.

## Development Notes
### bamazonCustomer.js
**Asynchronous Functions Relationship**
```console
        displayProducts()
                ^
displayTable()  productSelection()
                        ^
                inventoryUpdate()
                yes             no
                ^        displayProducts()
        continueShopping()
        yes             no
        ^               connection.end()
displayProducts() 
```

### bamazonManager.js
**Asynchronous Functions Relationship**
```console
        managerMenu()

```

### bamazonSupervisor.js
**Asynchronous Functions Relationship**
```console
        supervisorMenu()

```