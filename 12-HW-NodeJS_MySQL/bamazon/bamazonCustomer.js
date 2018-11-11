// Load dotenv
require("dotenv").config();
// Load MySQL
var mysql=require("mysql");
// Load Inquirer
var inquirer=require("inquirer");
// Load Table
var Table=require("cli-table3");

var connection=mysql.createConnection({
  host:process.env.BAMAZON_MYSQL_IP,
  port: process.env.BAMAZON_MYSQL_PORT,
  user:process.env.BAMAZON_MYSQL_USER,
  password:process.env.BAMAZON_MYSQL_PASSWORD,
  database:process.env.BAMAZON_MYSQL_DB
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  displayProducts();
});

// Print Table Function
function displayTable(rows) {
  const headers = ["Item", "Name", "Department", "Price [MXN]", "Stock Qt"];
  let table = new Table({
    head: headers
  });

  rows.forEach(row => {
    table.push([
      row.item_id,
      row.product_name,
      row.department_name,
      row.price,
      row.stock_quantity
    ]);
  });

  console.log(table.toString());
}

// Display Products Function
function displayProducts(){
  var query="SELECT * FROM products";
  connection.query(query, function(err,res){
    if (err) throw err;
    displayTable(res);
    console.log("\n\n");
    productSelection();
  });
}

// Start the User Input request with inquirer.
function productSelection(){
  inquirer.prompt([
    {
      name: "id",
      message: "What product do you want? Provide the Item id:"
    },
    {
      name: "quantity",
      message: "How Many Do you Want?"
    },
    {
      type: "confirm",
      name: "confirm",
      message: "Are you sure?",
      default: true
    }
  ]).then(answers=>{
    console.log("Item ID:", answers.id);
    console.log("Quantity:", answers.quantity);
    if(answers.confirm){
      inventoryUpdate(answers.id, answers.quantity);
    }
    else{
      displayProducts();
    }
  });
}

// This function updates the inventory.
function inventoryUpdate(id, quantity){
  query = "SELECT stock_quantity FROM products WHERE ?"
  connection.query(query, {"item_id":id}, function(err, res){
    if (err) throw err;
    // console.log(res);
    if(res.length > 0){
      // console.log("Check for existence and Update Table");
      // console.log("Stock Quantity", res[0].stock_quantity);
      if(quantity<=res[0].stock_quantity){
        newQuantity = res[0].stock_quantity-Math.abs(quantity)
        query = "UPDATE products SET stock_quantity=" + newQuantity + " WHERE ?"
        query_obj = {"item_id":id}
        connection.query(query, query_obj, function(err, res){
          if (err) throw err;
          continueShopping();
        });
      }
      else{
        console.log('\x1b[31m%s\x1b[0m',"\nInsufficient quantity in the Inventory!!!\n");
        continueShopping();
      }
    }
    else{
      console.log('\x1b[31m%s\x1b[0m',"\nNo Products Found for Item ID: " + id, "\n");
      continueShopping();
    }
  });
}

// This function will function as exit.
function continueShopping(){
  inquirer.prompt(
    {
      type: "confirm",
      name: "confirm",
      message: "Do you want to continue shopping?",
      default: true
    }
  ).then(answers=>{
    if(answers.confirm){
      displayProducts();
    }else{
      connection.end();
    }
  });
}