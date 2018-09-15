# Crystals Collector Game


You will be given a random number at the start of the game.

There are four crystals below. By clicking on a crystal you will add a specific amount of points to your total score.

You win the game by matching your total score to random number, you lose the game if your total score goes above the reandom number.

The value of each crystal is hidden from you until you click on it.

Each time when the game starts, the game will change the calues of each crystal.


## Technical Implementations

### Random Numbers
The Following code has is used to generate random whole numbers into an interval.
```javascript
// The following function returns a random number between minNum and maxNum
    var randNumber = function(minNum, maxNum){
        return Math.floor(Math.random()*(maxNum - minNum + 1) + minNum)
    }
```

### The Global Variables

The Following **Variables** are the most important and global in the program, on these we are storing the ``Scores``, ``Game Statistics`` and ``Jewls Values``.

```javascript
    // Global Variables
    var computerScore = 0;
    var wins = 0;
    var losses = 0;
    var myScore = 0;

    // Defining Variables that store Jewels weights or values
    var rubyValue = 0;
    var sapphireValue = 0;
    var topazValue = 0;
    var emeraldValue = 0;
```
### The Initial Game Set Up

```javascript
    var startGame = function(){
        computerScore = randNumber(19, 120);
        myScore = 0;
        rubyValue = randNumber(1, 12);
        sapphireValue = randNumber(1, 12);
        topazValue = randNumber(1, 12);
        emeraldValue = randNumber(1, 12);

        $("#computer-score").text(computerScore);
        $("#my-score").text("0");
    }
```

### Updating the Data in the Screen
```javascript
    var updateScoreAndCheckResult = function(){
        $("#my-score").text(myScore);
        if(computerScore === myScore){
            wins ++;
            $("#wins").text(wins);
            startGame();
        }else if(computerScore < myScore){
            losses++;
            $("#losses").text(losses);
            startGame();
        }else{
            console.log()
        }
    };
```

### The Event Listenters
```javascript
    // On click Ruby Jewel
    $("#ruby").on('click', function(){
        myScore += rubyValue;
        updateScoreAndCheckResult();
    });

    // On click Sapphire Jewel
    $("#sapphire").on('click', function(){
        myScore += sapphireValue;
        updateScoreAndCheckResult();
    });

    // On click Topaz Jewel
    $("#topaz").on('click', function(){
        myScore += topazValue;
        updateScoreAndCheckResult();
    });

    // On click Emerald Jewel
    $("#emerald").on('click', function(){
        myScore += emeraldValue;
        updateScoreAndCheckResult();
    });
```