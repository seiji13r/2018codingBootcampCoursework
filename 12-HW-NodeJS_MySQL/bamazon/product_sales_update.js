// Load MySQL
var mysql=require("mysql");
// Load Inquirer
var inquirer=require("inquirer");
// Load Table
var Table=require("cli-table3");

var connection=mysql.createConnection({
  host:"192.168.1.240",
  port: 3306,
  user:"myroot",
  password:"myroot",
  database:"bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  displayProducts();
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
  var query="SELECT * FROM products";
  connection.query(query, function(err,res){
    if (err) throw err;
    displayTable(res);
    console.log("\n\n");
    res.forEach((row, idx, array) =>{
      sales = row.price * (Math.floor(Math.random()*10+1))
      // console.log(row.item_id, row.product_name,row.price, sales);
      let query = "UPDATE bamazon_db.products SET product_sales=" + sales + " WHERE ?";
      let query_opt = {"item_id":row.item_id};
      connection.query(query, query_opt, (err,response) =>{
        if(err) throw err;
        // console.log(response.message);
        if(idx === array.length - 1){
          displayTable(res);
          connection.end();
        }
      });
    });
    // displayTable(res);
  });
}