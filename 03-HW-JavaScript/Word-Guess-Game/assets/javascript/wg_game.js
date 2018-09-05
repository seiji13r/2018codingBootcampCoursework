console.log("Word Guess Game [Seiji Test]")


var gameWords = [
    "cats",
    "dogs",
    "mice",
    "lions",
    "parrots",
    "donkeys",
]

var maxGuesses = 10;
var guessesRemaining = maxGuesses;
var wordSize = 0;
var lettersGuessed = "";

var youWin = function(){};
var youLose = function(){};
var removeAlerts = function(){};

document.onkeydown = function(event){
    myKey = event.key.toLowerCase();
    // console.log("myKey: " + myKey)

    // Initialize the game if Guesses Remaining are Maximum Guesses allowed.
    if (guessesRemaining==maxGuesses){
        removeAlerts();
        gameWord = gameWords[Math.floor(Math.random()*gameWords.length)]
        console.log("gameWord: " + gameWord);
        wordSize = gameWord.length
        console.log("wordSize: " + wordSize);
        lettersGuessed = "";
    }

    // Verify if the keyletter was not chosen before, if is new then we added to our choices and
    // subtract one to the Guesses oportunities.
    if(lettersGuessed.indexOf(myKey) == -1){
        lettersGuessed += myKey;
        console.log("lettersGuessed: " + lettersGuessed)
        --guessesRemaining
        console.log("guessesRemaining: " + guessesRemaining)
    }
    

    winGame = drawGame(gameWord, lettersGuessed);

    if(guessesRemaining == 0 || winGame === true){
        guessesRemaining = maxGuesses;
    }

    if(winGame){
        youWin();
    }
    if(guessesRemaining == 0 ){
        youLose();
    }

};

var drawGame = function(gameWord, guessedLetters){
    var displayWord = ""
    var displayGuessedLetters = ""
    for (var i=0; i<gameWord.length; i++){
        if(guessedLetters.indexOf(gameWord.charAt(i)) > -1){
            displayWord += gameWord.charAt(i);
        }
        else{
            displayWord += " _ ";
        }
    }
    // console.log("displayWord: " + displayWord)
    document.getElementById('word-placeholder').innerText = displayWord;
    // for(var i; i < guessedLetters.length - 1; i++){}

    displayGuessedLetters = guessedLetters.match(/.{1}/g).join(', ');
    document.getElementById('choices-placeholder').innerText = displayGuessedLetters;

    if(displayWord.indexOf("_") > -1){
        return false;
    }
    else{
        return true;
    } 
}