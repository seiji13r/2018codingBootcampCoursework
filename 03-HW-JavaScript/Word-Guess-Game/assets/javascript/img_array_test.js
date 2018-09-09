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

function displayNextImage() {
    var gameWord;
    x = (x === gameWords.length - 1) ? 0 : x + 1;
    gameWord = gameWords[x];
    gameWord = gameWord.toLowerCase();
    console.log(gameWord)
    document.getElementById("image-result").src = "assets/images/" + gameWord + ".png";
}

function startTimer() {
    setInterval(displayNextImage, 1000);
}

var x = -1;

startTimer()
