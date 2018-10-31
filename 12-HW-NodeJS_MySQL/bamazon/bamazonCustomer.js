// Load Inquirer
var inquirer = require("inquirer");
// Load MySQL
// var mysql

// Display Products Function
function displayProducts(){}


// Menu User Check
function customerMenu(poducts){

  inquirer.prompt([
    {
      name: "id",
      message: "What is the Product id?"
    },{
      name: "quantity",
      message: "How Many Do You Want?"
    },{
      type: "list",
      message: "Which Pokemon do you choose?",
      // choices: ["Bulbasaur", "Squirtle", "Charmander"],
      choices: products,
      name: "pokemon"
    },{
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ]).then(answers => {
    if(answers.confirm){
      console.log("");
      console.log(answers);
    } else {
      customerMenu(products);
    }
  });
}

// Main Program Calls
var products = ["Bulbasaur", "Squirtle", "Charmander"]
displayProducts();
customerMenu(products);