$(document).ready(function(){
    console.log("01 Crystals Collector Game")


    // The following function returns a random number between minNum and maxNum
    var randNumber = function(minNum, maxNum){
        return Math.floor(Math.random()*(maxNum - minNum + 1) + minNum)
    }

    var computerScore = randNumber(0, 40)
    var wins = 0;
    var losses = 0;
    var myScore = 0;

    // Defining Variables that store Jewels weights or values
    var rubyValue = 0;
    var sapphireValue = 0;
    var topazValue = 0;
    var emeraldValue = 0;


    $("#computer-score").text(computerScore)
    $("#wins").text("wins#")
    $("#losses").text("losses#")
    $("#ruby")
    $("#sapphire")
    $("#topaz")
    $("#emerald")
    $("#my-score").text("myscore")

    // On click Ruby Jewel
    $("#ruby").on('click', function(){
        console.log($(this));
    });

    // On click Sapphire Jewel
    $("#sapphire").on('click', function(){
        console.log($(this));
    });

    // On click Topaz Jewel
    $("#topaz").on('click', function(){
        console.log($(this));
    });

    // On click Emerald Jewel
    $("#emerald").on('click', function(){
        console.log($(this));
    });
});
