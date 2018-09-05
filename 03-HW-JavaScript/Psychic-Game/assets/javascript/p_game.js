console.log("Psychic Game [Seiji Test]")

var possibleKeys = "º1234567890'¡qwertyuiop`+asdfghjklñ´ç<zxcvbnm,.-";
// console.log("possibleKeys.length: " + possibleKeys.length)
var myKey = "";
var compKey = ""
// The chooseKey function.
// Receives a String of possible charaters "charStr" and randomly returns one of them.
var chooseKey = function(charStr){
    // console.log(": " + );
    // console.log("charStr: " + charStr );
    // console.log("charStr.length: " + charStr.length );
    var randPos = Math.floor(Math.random()*charStr.length);
    // console.log("randPos: " + randPos);
    var randKey = charStr.charAt(randPos);
    // console.log("randKey: " + randKey);
    return randKey;
};

var wins = 0;
var losses = 0;
var guesses = 9;
var alertOn = false;
var winsHtml = document.getElementById("wins");
var lossesHtml = document.getElementById("losses");
var yourGuessesSoFar = document.getElementById("yourGuessesSoFar");
var guessesLeft = document.getElementById("guessesLeft");
var alertH = document.getElementById("alertH");

var youWin = function(){
    alertOn = true;
    alertH.setAttribute("class", "jumbotron bg-success");
    alertH.innerHTML = "You Win!!"
}

var youLose = function(){
    alertOn = true;
    alertH.setAttribute("class", "jumbotron bg-danger");
    alertH.innerHTML = "You Lose!!"
}

var clearAlert = function(){
    alertOn = false;
    alertH.setAttribute("class", "jumbotron bg-primary");
    alertH.innerHTML = "= &gt;.&lt; ="
}

document.onkeydown = function(event){
    myKey = event.key.toLowerCase();
        console.log("myKey: " + myKey);
    guessesLeft.innerHTML = guesses.toString();

    if (alertOn) {
        clearAlert();
    }

    if (guesses === 9){
        // // Clear the Guesses So Far
        yourGuessesSoFar.innerHTML = "";
        // Generate the Computer Selection
        compKey = chooseKey(possibleKeys);
        console.log("#######  compKey: " + compKey);
    }
    
    // Updating the Guesses Counter to control the amount of chances we have to guess the key.
    if (guesses != 0){
        --guesses;
        yourGuessesSoFar.innerHTML += myKey + ', ';
    } else {
        yourGuessesSoFar.innerHTML += myKey;
        // alert("You Lose!!!!");
        ++losses;
        lossesHtml.innerHTML = losses.toString();
        guesses = 9;
        youLose();
    }
    // console.log("guesses: " + guesses);

    if ( myKey === compKey){
        ++wins
        winsHtml.innerHTML = wins.toString();
        guesses = 9;
        youWin();
    }
}


function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }