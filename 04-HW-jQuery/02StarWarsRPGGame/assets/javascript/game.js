console.log("02StarWarsRPGGame");

// This variable will hold all Characters Properties as Objects
var characters = {};

// These variables will reference the Game characters.
var myCharacter;
var defenderCharacter;

// Vector containing the states of the Game
var gameStates = [
    "start", // All Characters Displayed ready to be chosen.
    "defenderSelect", // Ready to Select the Defender.
    "attackReady", // Game set up and ready to use the attack Button.
    "End Game", // End Game
];
// Game State containing the current game state.
var gameState;

// Game Message to be displayed wach time an action occurred
var gameMessage;

// Listeners Loading
var loadCharListeners = function(){
    // Listener for Character Click.
    $(".character").on("click",function(){
        if (gameState === gameStates[0]){
            // Set the Character Choosen as myCharacter
            // console.log("Character Clicked");
            myCharacter = characters[$(this).attr("id")];
            // console.log('$(this).attr("id"):' + $(this).attr("id"));
            // console.log('myCharacter: ');
            // console.log(myCharacter);
            // Move the Remaining Characters to the ".enemies-available-container"
            $(".all-characters .character").each(function(index, element){
                // console.log(index, element);
                // console.log($(this).attr("id"));
                if( $(this).attr("id") !== myCharacter.id){
                    $(this).appendTo('.enemies-available-container')
                    // Change the aspect of the Character to Highlight the Enemies State.
                    $(this).removeClass('char-default');
                    $(this).addClass('char-enemy');
                }
                else{
                    $(this).appendTo(".my-character-container");
                    // Change the border color of myCharater
                    $(this).removeClass('char-default');
                    $(this).addClass('char-mychar');
                }
                // Load Listeners Again
                // loadCharListeners();
            });
            // Set the game to defenderSelect
            gameState = gameStates[1];

        } else if (gameState === gameStates[1]) {
            // Verify that the choosen character is in the ".enemies-available-container"
            if($(this).parent("div.enemies-available-container").length){
                // Reference to the defenderCharacter
                defenderCharacter = characters[$(this).attr("id")];
                // console.log($(this));
                // console.log($(this).parent("div.enemies-available-container"));
                // Move the character to 
                $(this).appendTo(".defender-character-container");
                // Style the defender Character
                $(this).removeClass("char-enemy");
                $(this).addClass("char-defender");
                // Set the game to Attack ready.
                gameState = gameStates[2];
                // Load Listeners Again
                // loadCharListeners();
            } else {
                console.log("Choosing character not allowed at this point STATE[1]");    
            }
        } else {
            console.log("Choosing character not allowed at this point STATE[2]");
        }
        
    });
};

var loadAttackListener = function(){
    // Listener for Attack Button Click
    $("#attack").on("click", function(){
        // console.log("Attack Clicked");
        if (gameState === gameStates[2]){
            // gameStates[2] means all characters [myCharacter and Defender] are set up
            // Here's all the Game Logic
            // Increase the counter Attack Power of my Character
            myCharacter.counterAttackPower ++;
            // Impact the Characters Health
            myCharacter.health -= defenderCharacter.attackPower * defenderCharacter.counterAttackPower;
            defenderCharacter.health -= myCharacter.attackPower * myCharacter.counterAttackPower;
            // Update the Characters Visual Health
            $(".character#" + myCharacter.id + " span.character-health").text(myCharacter.health);
            $(".character#" + defenderCharacter.id + " span.character-health").text(defenderCharacter.health);
            
            // Build the message to be displayed
            msg = "<span>You [" + myCharacter.name + "] attacked " + defenderCharacter.name + " for " + 
            myCharacter.attackPower * myCharacter.counterAttackPower +
            " damage </span><br>" +
            "<span>" +
            defenderCharacter.name + " attacked you back for " + 
            defenderCharacter.attackPower * defenderCharacter.counterAttackPower; + " damage </span>" ;
            // Test if continue the Game
            // console.log("myCharacter lose?:" + checkCharacterLose(myCharacter));
            if (checkCharacterLose(myCharacter)) {
                msg += '<br><br><span class="msg msg-lose">' +
                "You Lose " +
                "!!</span>"
                // Draw the Message
                drawActionResults(msg);
                // Set the Game Status to End Game
                gameState = gameStates[3]
                // Create Time Out to restart the Game.
                // setTimeout(function(){
                //     gameInit();
                // }, 5000);
            } else if (checkCharacterLose(defenderCharacter)) {
                // Remove Character from Screen
                $(".character#" + defenderCharacter.id).remove();
                // Draw the Message
                if($(".enemies-available-container").is(':empty')){
                    // Draw the Message when last Defender was Defeated [You Win!!]
                    msg += '<br><br><span class="msg msg-win">' +
                    "You Defeated " + defenderCharacter.name +
                    '!!</span><br><span class="msg msg-win">You Win!!!</span>'
                    // Set the Game Status to End Game
                    gameState = gameStates[3]
                }
                else {
                    // Draw the Message when you Defeated the Character.
                    msg += '<br><br><span class="msg msg-highlight">' +
                    "You Defeated " + defenderCharacter.name +
                    "!!</span>"
                    // Return to gameState 2 "Enemy Selection"
                    gameState = gameStates[1]
                }
                drawActionResults(msg);
                
            } else{
                // Draw the Message
                drawActionResults(msg);
            }
            if (gameState !== gameStates[3]){
                console.log("Atacking");
            }
        } else {
            if (gameState !== gameStates[3]){
                drawActionResults("No Defender Choosen!");
                console.log("No Defender Choosen!");
            }
        }
    });
};


var loadRestartListener = function(){
    // Listener for Restart Button Click
    $("#restart").on("click", function(){gameInit();});
};

// This function creates a jQuery element with the HTML Character to be displayed.
var drawCharacter = function(charObj){
    // characterArea is the main div
    var characterArea = $('<div class="character char-default" id="' + charObj.id + '">');
    var charName = $('<span class="character-name" id="character-name">').text(charObj.name);
    var charImage = $('<img src="' + charObj.image + '" alt="' + charObj.id + '" class="character-img">');
    var charHealth = $('<span class="character-health">').text(charObj.health);
    characterArea.append(charName);
    characterArea.append(charImage);
    characterArea.append(charHealth);
    return characterArea;
};

// This function draws a message in the message holder ".action-results"
var drawActionResults = function(msg){
    $(".action-results").html(msg);
}

var checkCharacterLose = function(mycharObj){
    // If myCharObj health <= 0 return lose true
    if (mycharObj.health <= 0){
        return true;
    }
    // Else return lose false
    else{
        return false;
    }
}

var setCustomRand = function(offset){
    return Math.round(offset * (1 + Math.random()));
};

// Start Game
var gameInit = function(){
    // Configure all Character Settings
    characters = {
        "obiwan": {
            id: "obiwan",
            name: "Obi Wan Kenobi",
            image: "assets/images/obiwan.jpg",
            health: setCustomRand(100),
            attackPower: setCustomRand(20),
            counterAttackPower: 1,
        },
        "luke": {
            id: "luke",
            name: "Luke Skywalker",
            image: "assets/images/luke.jpg",
            health: setCustomRand(100),
            attackPower: setCustomRand(20),
            counterAttackPower: 1,
        },
        "maul": {
            id: "maul",
            name: "Darth Maul",
            image: "assets/images/maul.jpg",
            health: setCustomRand(100),
            attackPower: setCustomRand(20),
            counterAttackPower: 1,
        },
        "sidious": {
            id: "sidious",
            name: "Darth Sidious",
            image: "assets/images/sidious.jpg",
            health: setCustomRand(100),
            attackPower: setCustomRand(20),
            counterAttackPower: 1,
        },
    }
    // Make sure all the Character Containers are empty.
    $('.all-characters').empty();
    $('.my-character-container').empty();
    $('.enemies-available-container').empty();
    $('.defender-character-container').empty();
    $('.action-results').empty();
    
    // Get the initial Game State to allow Character Choosing
    gameState = gameStates[0];

    // Draw the characters available in the main Dashboard ".characters-holder"
    for (var charId in characters) {
        // console.log(charId, characters[charId]);
        // console.log(characters[charId]);
        newCharElement = drawCharacter(characters[charId]);
        $(".all-characters").append(newCharElement);
    }

    loadCharListeners();

};

$(document).ready(function(){
    gameInit();
    loadAttackListener();
    loadRestartListener();
});
