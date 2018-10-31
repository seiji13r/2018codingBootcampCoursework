// Include Letter Constructor
var Letter = require("./Letter");

// Constructor Letter
var Word = function(word){
  this.gameWord = [];

  for (let i = 0; i < word.length; i++) {
    let newLetter = new Letter(word.charAt(i));
    this.gameWord.push(newLetter);
  }

  // Display the String
  this.display = function(){
    let displayWord = []
    for (let i = 0; i < this.gameWord.length; i++){
      displayWord.push(this.gameWord[i].display());
    }
    return displayWord.join(" ");
  }
  // Force Display the String
  this.forceDisplay = function(){
    let displayWord = []
    for (let i = 0; i < this.gameWord.length; i++){
      displayWord.push(this.gameWord[i].forceDisplay());
    }
    return displayWord.join("");
  }
  // Guess a Letter
  this.charIsIn = function(myGuess){
    let someGuessed = false;
    for (let i = 0; i < this.gameWord.length; i++){
      if (this.gameWord[i].isThis(myGuess)){
        someGuessed = true;
      }
    }
    return someGuessed
  }
}

// Exporting Letter Constructor
module.exports = Word;