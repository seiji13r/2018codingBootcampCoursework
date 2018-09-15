console.log("02StarWarsRPGGame");

$(document).ready(function(){

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
    ];
    // Game State containing the current game state.
    var gameState;

    // Game Message to be displayed wach time an action occurred
    var gameMessage;

    // Listener for Character Click.
    $(".character").on("click",function(){
        if (gameState === gameStates[0]){
            // Set the Character Choosen as myCharacter
            console.log("Character Clicked");
            myCharacter = characters[$(this).attr("id")];
            console.log('$(this).attr("id"):' + $(this).attr("id"));
            console.log('myCharacter: ');
            console.log(myCharacter);
            // Move the Remaining Characters to the ".enemies-available-container"
            // Change the aspect of the Character to Highlight the Enemies State.

            // Set the game to defenderSelect
            gameState = gameStates[1];
        } else if (gameState === gameStates[1]) {
            // Verify that the choosen character is in the ".enemies-available-container"

                // If Verified Set the Character Choosen as The Defender

                // Else do Nothing
            
            // Move this HTML Element Character to ".defender-character-container"

            // Set the game to Attack ready.
            gameState = gameStates[2];
        } else {
            console.log("Choosing character not allowed at this point");
        }
        
    });

    // Listener for Attack Button Click
    $("#attack").on("click", function(){
        console.log("Attack Clicked");
        if (gameState === gameStates[2]){
            // gameStates[2] means all characters [myCharacter and Defender] are set up
            // Here's all the Game Logic
            // Increase the counter Attack Power of my Character
            myCharacter.counterAttackPower ++;
            // Impact the Characters Health
            myCharacter.health += defenderCharacter.attackPower * defenderCharacter.counterAttackPower;
            defenderCharacter.health += myCharacter.attackPower * myCharacter.counterAttackPower;
            // Update the Character Visual Health
            
            // Build the message to be displayed
            msg = "Attacked really bad"
            // Test if continue the Game
            if (checkCharacterLose(myCharacter)) {
                msg += "<br> You Lose!!!"
                // Draw the Message
                drawActionResults(msg);
                // Create Time Out to restart the Game.
                setTimeout(function(){
                    gameInit();
                }, 5000);
            } else if (checkCharacterLose(defenderCharacter)) {
                // Draw the Message
                drawActionResults(msg);
            } else{
                // Draw the Message
                drawActionResults(msg);
            }
            console.log("Atacking");
        } else {
            console.log("No Defender Choosen!");
        }
    });

    // This function creates a jQuery element with the HTML Character to be displayed.
    var drawCharacter = function(charObj){
        // characterArea is the main div
        var characterArea = $('<div class="character" id="">');
        var charName = $('<span class="character-name" id="character-name">');
        var charImage = $('<img src="assets/images/obiwan800x450.webp" alt="" class="character-img">');
        var charHealth = $('<span class="character-health">');
        characterArea.prepend(charName);
        characterArea.prepend(charImage);
        characterArea.prepend(charHealth);
        return characterArea;
    };

    // This function draws a message in the message holder ".action-results"
    var drawActionResults = function(msg){
        $(".action-results").html(msg);
    }

    var checkCharacterLose = function(mycharObj){
        // If myCharObj health <= 0 return lose true
        if (mycharObj.health >= 0){
            return true;
        }
        // Else return lose false
        else{
            return false;
        }
    }

    // Start Game
    var gameInit = function(){
        // Configure all Character Settings
        characters = {
            "obiwan": {
                id: "obiwan",
                name: "Obi Wan Kenobi",
                image: "",
                health: 0,
                attackPower: 0,
                counterAttackPower: 1,
            },
            "luke": {
                id: "luke",
                name: "Luke Skywalker",
                image: "",
                health: 0,
                attackPower: 0,
                counterAttackPower: 1,
            },
            "maul": {
                id: "maul",
                name: "",
                image: "",
                health: 0,
                attackPower: 0,
                counterAttackPower: 1,
            },
            "sidious": {
                id: "sidious",
                name: "",
                image: "",
                health: 0,
                attackPower: 0,
                counterAttackPower: 1,
            },
        }

        // Get the initial Game State to allow Character Choosing
        gameState = gameStates[0];

        // Draw the characters available in the main Dashboard

    };
    
    gameInit();

});


// NOTES
    // for (var key in yourobject) {
    //     console.log(key, yourobject[key]);
    // }

    // for (var key in characters) {
    //     console.log(key, characters[key]);
    // }