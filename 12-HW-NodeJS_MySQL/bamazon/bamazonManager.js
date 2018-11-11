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
  managerMenu();
});

// Print Table Function
function displayTable(rows) {
  const headers = ["Item", "Name", "Department", "Price [MXN]", "Stock Qt", "Product Sales"];
  let table = new Table({
    head: headers
  });

  rows.forEach(row => {
    table.push([
      row.item_id,
      row.product_name,
      row.department_name,
      row.price,
      row.stock_quantity,
      row.product_sales
    ]);
  });

  console.log(table.toString());
}

// Display Products Function
function displayProducts(){
  let query="SELECT * FROM bamazon_db.products";
  connection.query(query, function(err,res){
    if (err) throw err;
    displayTable(res);
    console.log("\n");
    continueOperations();
  });
}

// Display Low Inventory  Function
function lowInventory(callbackFunc){
  let query="SELECT * FROM bamazon_db.products WHERE stock_quantity<5";
  connection.query(query, function(err,res){
    if (err) throw err;
    displayTable(res);
    console.log("\n");
    if(callbackFunc){
      callbackFunc();
    }
  });
}

function addInventory(){
  lowInventory(function(){
    inquirer.prompt([
      {
        name: "id",
        message: "Provide the Item ID: "
      },
      {
        name: "qty",
        message: "Provide the number of products to add: "
      },
      {
        type: "confirm",
        name: "confirm",
        message: "Are you sure?",
        default: true
      }
    ]).then(answers => {
        // console.log(answers.id, answers.qty, answers.confirm);
        let current_qty;
        if(answers.confirm){
          let query = "SELECT * FROM bamazon_db.products WHERE ?";
          let query_opt = {"item_id":answers.id};
          connection.query(query, query_opt, (err,res) => {
            if(err) throw err;
            if(res.length==0){
              console.log('\x1b[31m%s\x1b[0m',"\nNo Products Found for Item ID: " + answers.id, "\n");
            }
            else{
              new_qty = parseInt(res[0].stock_quantity) + parseInt(answers.qty);
              let query2 = "UPDATE products SET stock_quantity= " + new_qty + " WHERE ?"
              let query_opt2 = {"item_id":answers.id}
              connection.query(query2, query_opt2, function(err2,res2){
                if(err2) throw err2;
                console.log('\x1b[32m%s\x1b[0m',"\nQuantity Updated to ["+ new_qty +"] for Item ID: " + answers.id, "\n");
                continueOperations();
              });
            }
          });
        } else {
          managerMenu();
        }
    });
  });
}

function addProduct(){
  let dpts = [
    "Electronics",
    "Clothing",
  ];
  inquirer.prompt([
    {
      name: "product_name",
      message: "Product Name:"
    },
    {
      type: "list",
      name: "department_name",
      message: "Select the Product Department",
      choices: dpts
    },
    {
      name: "price",
      message: "Price in [MXN]"
    },
    {
      name: "stock_quantity",
      message: "Stock Quantity [Units]"
    },
    {
      type: "confirm",
      name: "confirm",
      message: "Are you sure?",
      default: true
    }
  ]).then(answers => {
    console.log(
      answers.product_name,
      answers.department_name,
      answers.price,
      answers.stock_quantity,
      answers.confirm
    )
    if(answers.confirm){
      let query=[
        "INSERT INTO bamazon_db.products",
        "(product_name, department_name, price, stock_quantity)",
        "VALUES (?,?,?,?)"
      ]
      let query_opt = [
        answers.product_name,
        answers.department_name,
        answers.price,
        answers.stock_quantity,
      ]
      // console.log(query.join(""));
      connection.query(query.join(" "), query_opt, (err,res)=>{
        if(err) throw err;
        // console.log(res);
        console.log('\x1b[32m%s\x1b[0m',"\nProduct ["+ answers.product_name +"] Successfully Added");
        continueOperations();
      });
    }else{
      managerMenu();
    }
  });
}

// This function will function as exit.
function continueOperations(){
  inquirer.prompt(
    {
      type: "confirm",
      name: "confirm",
      message: 'Do you want to perform other "Action"?',
      default: true
    }
  ).then(answers=>{
    if(answers.confirm){
      managerMenu();
    }else{
      connection.end();
    }
  });
}

function managerMenu(){
  mychoices = [
    "View Products For Sale",
    "View Low Inventory less than 5 Items",
    "Add to Inventory",
    "Add New Product"
  ]
  inquirer.prompt(
    {
      type: "list",
      choices: mychoices,
      message: "Choose an Action:",
      name: "choice"
    }
  ).then(answers=>{
    if(answers.choice===mychoices[0]){
      console.log("Selected:",answers.choice);
      displayProducts();
    }
    else if(answers.choice===mychoices[1])
    {
      console.log("Selected:",answers.choice);
      lowInventory(continueOperations);
    }
    else if(answers.choice===mychoices[2]){
      addInventory();
    }
    else if(answers.choice===mychoices[3]){
      addProduct();
    }
    else {
      console.log("No action in this Selection")
    }
  });
}