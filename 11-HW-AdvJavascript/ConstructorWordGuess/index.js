// Include the Word Constructor
var Word = require("./Word");

// Include the inquirer Module
var inquirer = require("inquirer");

// Game Possible Words
var randomWords = require("./randomwords")

// Create the game Word with a randomly chosen Word
// var myWord = new Word("Cat");
var myWord = new Word(randomWords[Math.floor(Math.random()*randomWords.length)]);

// This Variable store the Number of Chances
var chances = 10;

// Play Function
function play(){
  // User Menu
  inquirer.prompt([
    {
      name: "charGuess",
      message: "Guess a Letter?"
    },
  ]).then(answers => {
    // Decrease the remaining chances
    chances--;
    // Compare the captured character with all word letters
    var guessed = myWord.charIsIn(answers.charGuess);
    // Display the result word with letters guessed.
    console.log(myWord.display());
    // Display Messages according to guessed status.
    if(guessed){
      // Display Message in Green Color
      console.log('\x1b[32m%s\x1b[0m', "\nCORRECT!!!");
    }else{
      // Display Message in Red Color
      console.log('\x1b[31m%s\x1b[0m', "\nINCORRECT!!!");
    }
    // Display the remaining guesses
    console.log(chances + " guesses remaining!!\n");
    
    // The game ends with a Winner when no more underscores "_"
    // are shown in the Word
    if (!myWord.display().includes("_")) {
      console.log('\x1b[32m%s\x1b[0m', "=====================\nWell Done!!  You Win!!!");
    } 
    // The game ends with a Loser when we run out of chances
    else if (chances===0){
      console.log('\x1b[36m%s\x1b[0m',"The Word was: " + myWord.forceDisplay());
      console.log('\x1b[31m%s\x1b[0m',"=====================\nYou Lose!!!");
    } 
    // We Recursively call the the play() function until Winner or Loser.
    else {
      play();
    }
  });
}

play();