// Include the Word Constructor
var Word = require("./Word");

// Include the inquirer Module
var inquirer = require("inquirer");

// Game Possible Words
var randomWords = require("./randomwords")

// Create the game Word with a randomly choosen Word
// var myWord = new Word("Cat");
var myWord = new Word(animals[Math.floor(Math.random()*animals.length)]);

var chances = 10;


// Menu User Check
function play(){

  inquirer.prompt([
    {
      name: "charGuess",
      message: "Guess a Letter?"
    },
  ]).then(answers => {
    chances--;
    var guessed = myWord.charIsIn(answers.charGuess);

    console.log(myWord.display());
    if(guessed){
      console.log('\x1b[32m%s\x1b[0m', "\nCORRECT!!!");
    }else{
      console.log('\x1b[31m%s\x1b[0m', "\nINCORRECT!!!");
    }
    console.log(chances + " guesses remaining!!\n");
    
    if (!myWord.display().includes("_")) {
      console.log('\x1b[32m%s\x1b[0m', "=====================\nWell Done!!  You Win!!!");
    } 
    else if (chances===0){
      console.log('\x1b[36m%s\x1b[0m',"The Word was: " + myWord.forceDisplay());
      console.log('\x1b[31m%s\x1b[0m',"=====================\nYou Lose!!!");
    } 
    else {
      play();
    }
  });
}

play();