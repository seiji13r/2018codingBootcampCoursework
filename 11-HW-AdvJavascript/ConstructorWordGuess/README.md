#Advanced JavaScript Assignment: Constructor Word Guess

<!-- TOC -->

- [Overview](#overview)
  - [Video Demo](#video-demo)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Step by Step installation](#step-by-step-installation)
  - [Video Installation Walk Trough](#video-installation-walk-trough)
- [Configuration](#configuration)
- [Development](#development)
  - [Libraries](#libraries)
  - [Development Process](#development-process)
  - [Development Notes](#development-notes)
    - [The Letter Constructor](#the-letter-constructor)
    - [The Word Constructor](#the-word-constructor)
    - [The Main Program](#the-main-program)
    - [Coloring Strings in Node JS](#coloring-strings-in-node-js)

<!-- /TOC -->

# Overview

Constructor Word Guess is a Node JS command line program. 

As Hangup like Game you will be challenged to guess a word and type the letters until you guess it or you exhaust all your 10 chances.

[Source Code](https://github.com/seiji13r/2018codingBootcampCoursework/tree/master/11-HW-AdvJavascript/ConstructorWordGuess/)

## Video Demo

[Game Demo Video]()

# Installation

## Requirements
* NodeJS 8.x or above installed.

## Step by Step installation  
* Download the Package [[DownloadLink]](../constructorword.zip)
* Unzip the package locally anywhere. 
* cd into the ConstructorWordGuess directory.
* Install all npm dependencies with `npm install`.

## Video Installation Walk Trough
[Video Walk Trough](hello)


# Configuration

This software does not require any specific configuration for proper operation, however you can customize:
1. The words of the game by editing the file `randomwords.js`
```javascript
// randomwords.js
wordsArray = [
    "Word1",
    "Word2",
    "Word3",
    "Word4"
]

module.exports = wordsArray;
```
2. The number of chances of each game iteration in `index.js`
```javascript
// index.js
15: var chances = 10;
```
# Development

## Libraries
[Inquirer](https://github.com/SBoudrias/Inquirer.js#readme)

## Development Process
* Create the File Structure
* Make sure to create a file per Object Constructor Letter/Word
* Build the constructors of each element, making sure to totally describe it according to what we want to accomplish.
* Initialize the Menu with inquirer and test it by displaying console messages.
* Encapsulate the main function `play()` so we can Recursively call it to repeat the Letter Selection.
* Properly use the Word Methods to keep reveling the word during the game.

## Development Notes
### The Letter Constructor

```javascript
// Letter.js
// Letter Constructor
var Letter = function(character){
 
  // Letter Properties
  this.character = character.charAt(0);
  // Check if the letter is an Space, if so then always display it.
  if(this.character !== " "){
    this.guessed = false;
  }
  else {
    this.guessed = true;
  }
  
  // Letter Methods
  // display: This Method will return the Letter only if this has been guessed
  this.display = function(){
    if(this.guessed){
      // console.log(this.character);
      return this.character;
    }else{
      // console.log("_")
      return "_"
    }
  }

  // isThis: This Method will compare a character to this Letter and turn the 
  // guessed value to true if it was guessed.
  this.isThis = function(charInput){
    if(charInput.toUpperCase().charAt(0) === this.character.toUpperCase()){
      this.guessed = true;
      return true;
    }
    else{
      return false;
    }
  }

  // forceDisplay: This Method will force display the Letter regardless if it 
  // was not guessed.
  this.forceDisplay = function(){
    return this.character;
  }
}

// Exporting Letter Constructor
module.exports = Letter;
```
### The Word Constructor

```javascript
// Word.js
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
```
### The Main Program
```javascript
// index.js
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
```
### Coloring Strings in Node JS
[Reference](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)

```javascript

// Example
console.log('\x1b[36m%s\x1b[0m', 'I am cyan');  //cyan
console.log('\x1b[33m%s\x1b[0m', stringToMakeYellow);  //yellow

// Reference

Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
```