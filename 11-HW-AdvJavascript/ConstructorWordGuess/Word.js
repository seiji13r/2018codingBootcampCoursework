// Include Letter Constructor
var Letter = require("./Letter");

// Constructor Word
var Word = function(word){
  // An Array that will contain all the Letters
  this.gameWord = [];

  // gameWord is build by creating Letter objects from characters in the 
  // string "word".
  for (let i = 0; i < word.length; i++) {
    let newLetter = new Letter(word.charAt(i));
    this.gameWord.push(newLetter);
  }

  // display: This method will display the Letters according to their guessed 
  // status.
  this.display = function(){
    let displayWord = []
    for (let i = 0; i < this.gameWord.length; i++){
      displayWord.push(this.gameWord[i].display());
    }
    return displayWord.join(" ");
  }

  //forceDisplay: This method will display the Letters regardless of their 
  // guessed status.
  this.forceDisplay = function(){
    let displayWord = []
    for (let i = 0; i < this.gameWord.length; i++){
      displayWord.push(this.gameWord[i].forceDisplay());
    }
    return displayWord.join("");
  }
  // charIsIn: This method will update the guessed status of the Letters by 
  // comparing it to `myGuess` character
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

// Exporting the Word Constructor
module.exports = Word;