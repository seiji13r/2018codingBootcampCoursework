# Advanced JavaScript Assignment: Constructor Word Guess

<!-- TOC -->

- [Advanced JavaScript Assignment: Constructor Word Guess](#advanced-javascript-assignment-constructor-word-guess)
- [Overview](#overview)
    - [Requirements](#requirements)
    - [Step by Step installation](#step-by-step-installation)
    - [Video Installation Walk Trough](#video-installation-walk-trough)

<!-- /TOC -->

# Overview

Constructor Word Guess is a Node JS command line program. 

As Hangup like Game you will be challenged to guess a word and type the letters until you guess it or you exhaust all your 10 chances.


#Installation

## Requirements
* NodeJS 8.x or above installed.

## Step by Step installation  
* Download the Package [[DownloadLink]](../constructorword.zip)
* Unzip the package locally anywhere. 
* cd into the ConstructorWordGuess directory.
* Install all npm dependencies with `npm install`.

## Video Installation Walk Trough
[Video Walk Trough]()

#Configuration
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
14: var chances = 10;
```
#Development

##Libraries

##Development Process

##Development Notes
###The Letter Object

```javascript
```