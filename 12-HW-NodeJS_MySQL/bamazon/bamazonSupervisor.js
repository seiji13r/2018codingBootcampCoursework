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
  displayProfit();
});

// Print Table Function
function displayTable(rows) {
  const headers = ["DepartmentID", "Department", "Number of Products", "Over Head Cost [MXN]", "Department Sales [MXN]", "Profit [MXN]"];
  let table = new Table({
    head: headers
  });

  rows.forEach(row => {
    table.push([
      row.department_id,
      row.department_name,
      row.num_products,
      row.over_head_cost,
      row.department_sales,
      row.profit
    ]);
  });
  console.log(table.toString());
}

// Display Products Function
function displayProfit(){
  var query=[
    "SELECT departments.department_id, departments.department_name, num_products, over_head_cost, department_sales, (department_sales - over_head_cost) AS profit",
    "FROM bamazon_db.departments",
    "LEFT JOIN",
    "(SELECT department_name, COUNT(*) AS num_products, SUM(product_sales) AS department_sales",
    "FROM bamazon_db.products GROUP BY department_name) AS summarized",
    "ON bamazon_db.departments.department_name = summarized.department_name ORDER BY profit DESC"]
  // console.log(query);
  connection.query(query.join(" "), function(err,res){
    if (err) throw err;
    displayTable(res);
    console.log("\n\n");
    connection.end();
  });
}