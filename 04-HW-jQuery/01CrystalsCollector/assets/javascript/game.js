$(document).ready(function(){
    console.log("01 Crystals Collector Game")


    // The following function returns a random number between minNum and maxNum
    var randNumber = function(minNum, maxNum){
        return Math.floor(Math.random()*(maxNum - minNum + 1) + minNum)
    }

    var computerScore = 0;
    var wins = 0;
    var losses = 0;
    var myScore = 0;

    // Defining Variables that store Jewels weights or values
    var rubyValue = 0;
    var sapphireValue = 0;
    var topazValue = 0;
    var emeraldValue = 0;

    // $("#wins").text("wins#")
    // $("#losses").text("losses#")

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

    startGame();

});


// 1. Create the function that start the Game.
//      set the computer score: (random number between 19 - 120)
//      set the jewel values: (random number for each one) 1 -12.