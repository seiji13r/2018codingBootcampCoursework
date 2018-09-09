console.log("Word Guess Game [Seiji Test]")


var gameWords = [
    "homer",
    "bart",
    "marge",
    "lisa",
    "maggie",
    "milhouse",
    "burns",
    "smithers",
    "apu",
    "barney",
    "flanders",
    "krabappel",
    "krusty",
    "moe",
]

var maxGuesses = 10;
var guessesRemaining = maxGuesses;
var wordSize = 0;
var lettersGuessed = "";
var resultImage = document.getElementById("image-result");
var wordPlaceholder = document.getElementById('word-placeholder');
var wordPlaceholderMessage = document.getElementById('word-placeholder-message');

var youWin = function(gameWord){
    console.log("you win");
    wordPlaceholder.setAttribute("style","color: green");
    wordPlaceholderMessage.innerText = "Hit Any Key To Play Again"
    resultImage.setAttribute(
        "src","assets/images/" + gameWord.toLowerCase() + ".png");
    resultImage.setAttribute(
        "alt", gameWord);
    var audio = new Audio("assets/sounds/" + gameWord.toLowerCase()+'.mp3');
    audio.play();
};
var youLose = function(gameWord){
    console.log("you lose");
    // console.log(resultImage);
    wordPlaceholder.innerText = gameWord;
    wordPlaceholder.setAttribute("style","color: red");
    wordPlaceholderMessage.innerText = "Hit Any Key To Play Again"
    resultImage.setAttribute("src","assets/images/you_lose.jpg");
    var audio = new Audio("assets/sounds/doh1.mp3");
    audio.play();
};
var removeAlerts = function(){
    wordPlaceholder.removeAttribute("style")
    wordPlaceholderMessage.innerText = ""
    resultImage.setAttribute("src","assets/images/simpsons_logo.png");
};

document.onkeydown = function(event){
    myKey = event.key.toUpperCase();
    // console.log("myKey: " + myKey)

    // Initialize the game if Guesses Remaining are Maximum Guesses allowed.
    if (guessesRemaining==maxGuesses){
        removeAlerts();
        gameWord = gameWords[Math.floor(Math.random()*gameWords.length)]
        gameWord = gameWord.toUpperCase();
        console.log("gameWord: " + gameWord);
        wordSize = gameWord.length
        console.log("wordSize: " + wordSize);
        lettersGuessed = "";
    }

    // Verify if the keyletter was not chosen before, if is new then we added to our choices and
    // subtract one to the Guesses oportunities.
    if(lettersGuessed.indexOf(myKey) == -1){
        lettersGuessed += myKey;
        // console.log("lettersGuessed: " + lettersGuessed)
        --guessesRemaining
        // console.log("guessesRemaining: " + guessesRemaining)
    }
    

    winGame = drawGame(gameWord, lettersGuessed);

    if(guessesRemaining === 0 && winGame !== true){
        youLose(gameWord);
    }

    if(guessesRemaining === 0 || winGame === true){
        guessesRemaining = maxGuesses;
    }

    if(winGame){
        youWin(gameWord);
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

    // Display the global variable guessesRemaining in the page
    document.getElementById('guesses-remaining').innerText = guessesRemaining;

    if(displayWord.indexOf("_") > -1){
        // console.log("Draw Game return false");
        return false;
    }
    else{
        // console.log("Draw Game return true");
        return true;
    } 
}