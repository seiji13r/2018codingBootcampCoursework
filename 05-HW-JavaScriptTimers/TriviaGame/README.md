# Totally Trivial Trivia
## Game Instructions
In Totally Trivial Game you'll be asked to respond several Multiple Choice Questions. 
Some of these questions are Trivial and others not so much. 
You'll be challenged with a 10 second Timer to answer each Question. 
If the time is up we'll move to the next Question.

Only 10 questions are provided on this game.

The game also performs perfectly in mobile devices.

## Technical Notes
### Development Approach
In the first stages of the assignment resolution, I tried to:

1. Understand the main objective of the Assignment.
2. Identify and Describe Individual Features.
3. Identify challenges and possible solutions.
4. Start the first Pseudo Code approach.
    1. Identify Global Variables
    2. Write the HTML elements and assign classes and ID's.
    3. Identify the html elements of user interaction.
    4. Identify the states of the game.
5. Code and Iterate over steps 3, 4, 5.


#### 1. Understand the main objective of the Assignment.
As the instructions and videos of the assignment explain, I was challenged to to create a trivia game.

#### 2. Identify and Describe Individual Features.
The main features are:
* Multiple Choice questions will appear in the game.
* Count Down Timer that will reset on each question transition. Question will fail if not answered correctly or if time is up.
* Messages will notify the user when:
    * Question is answered correctly.
    * Question is not answered correctly.
    * Question time up.
* Display Game results.

Additionally the following features were implemented.
* Restart the Game Option.
* Shuffle the Questions.
* Shuffle the Answers.

#### 3. Identify challenged and possible solutions.

Challenges:
* Arrange the setInterval and SetTimeout in such a way that the countdown is functional.
* Use mechanisms to lock the interations of the user when a message is shown.
* Shuffle the Answers.
* Shuffle Questions.
#### 4. Start the first Pseudo Code aproach.
Honestly this is one of the most difficult steps and usually is not performed completelly in pseudocode.

##### 1. Identify Global Variables
We required the following Variables:


```javascript
let questions // An Object included in the questions.js file
let gameQindex = 0; // Current Index of the Questions Array
let gameQorder = []; // Array Containing the New Order of the Questions to be displayed
for (let i = 0 ; i < questions.length; i++){
    gameQorder[i] = i;
}
// gameQorder = shuffle(gameQorder); // << Check Start Game

// Variables which store Game Statistics
let rightQ = 0;
let wrongQ = 0;

// Variable to contain the Count Down function.
let countDownId;

// Time Limit to Answer the Question
const questionTime = 10;
let timeLeft = questionTime - 1;

// Time to Clear the Response Messages
const clearMsgTime = 2;

// Declare Final Grade
let finalGrade = 0;
```

##### 2. Write the HTML elements and assign classes and ID's.

These are the main sections written in the HTML:
* start / re-start button
* timer-container
* title
* message-container
* question-container
* stats-container

##### 3. Identify the html elements of user interaction.
Having these clear help me to create the required **event listeners** and isolate those pieces of code.

* start / re-start button
* checkboxes of the Answers of each question.
  
##### 4. Identify the states of the game.
Game States
* Page load
* Game starts
* Question and Answers Displayed and Timer Start.
* Question resolved (Right, Wrong, Time up)
* Game Over

#### 5. Code and Iterate over steps 3, 4, 5.

On this process several pieces of code where created or re-used.

Below some are listed:

##### Timer
```javascript
// Countdown Timer to be Draw
let drawCountdown = function(){
    //The Counter is decreased by one and displayed in the HTML, with an interval of 1 second this will change every second.
    $('#time-counter').text(--timeLeft);
    if(timeLeft===0){
        // Get the Question Index
        let qIndex = $('#question-container').attr('qindex');
        // Get the Correct Answer
        let correctAnswer = questions[qIndex][questions[qIndex].s]
        // Display the Correct Answer within the Message.
        $("#c_answer-to").text(correctAnswer);

        clearInterval(countDownId);
        timeLeft = questionTime;
        $("#timeout-msg").show();
        wrongQ++;
        $("input").prop( "disabled", true );
        setTimeout(setNextQuestion, 3000);
    }
}

// The following 3 Instructions will initialize the count Down.
clearInterval(countDownId);
timeLeft = questionTime;
countDownId = setInterval(drawCountdown, 1000);

```
##### Start Game

This function performs as follows:

* Sets the order of the questions.
* Initialize all the game metrics.
* Hide all unrequired containers.
* Displays the first question.
* Shuffle and Displays the possible Answers.
* Initialize the countdown timer.

```javascript
let startGame = function(){
    // Set Global Variables
    gameQorder = shuffle(gameQorder);
    rightQ = 0;
    wrongQ = 0;
    finalGrade = 0;
    // Hide Instructions Container
    $("#instructions-container").hide();
    // Hide the stats container if visible
    $("#stats-container").hide()
    // Initialize the Countdown
    $('#time-counter').text(questionTime);
    clearInterval(countDownId);
    timeLeft = questionTime;
    countDownId = setInterval(drawCountdown, 1000);

    // Render Information of the First Question
    drawQuestion(questions[gameQorder[gameQindex]], gameQorder[gameQindex]);
    shuffleDOMAnswers();
}
```

##### Next Question
This function performs as follows:

* Sets the order of the questions.
* Clear the Messages.
* Displays the Next Question.
* Shuffle and Displays the possible Answers.
* Initialize the countdown timer.
* Identifies if no more questions are available in the queue.

```javascript
let setNextQuestion = function(){
    // Initialize the Countdown
    $('#time-counter').text(questionTime);
    clearInterval(countDownId);
    timeLeft = questionTime;
    countDownId = setInterval(drawCountdown, 1000);
    // Hide All Messages
    clearMessages();
    // Increment the Question Index
    gameQindex++
    if(gameQindex===(gameQorder.length)){
        // End Game
        // Reset gameQindex
        gameQindex = 0;
        // Stop Counter
        clearInterval(countDownId);
        // Hide Question and Timer Elements
        $("#question-container").hide();
        $("#timer-container").hide();
        // Draw Stats in HTML prior to display it.
        $("#a_rights").text(rightQ);
        $("#a_wrongs").text(wrongQ);
        finalGrade = rightQ/(rightQ+wrongQ)*100;
        $("#final-grade").text(finalGrade.toFixed(2) + " %");
        // Display Score
        $("#stats-container").show()
        // Enable and Rename the Start Button
        $("#start-game").text("Re-Start");
        $("#start-game").show();
    }else{
        // Draw the Next Question
        drawQuestion(questions[gameQorder[gameQindex]], gameQorder[gameQindex]);
        shuffleDOMAnswers();
    }
}
```

##### Event Listeners

There's only 2 events implemented:
* One for the Button to start or restart the Game.
* And the other for eachtime the User answers a question.

This last one is the most important of the program. It is asociated to the checkboxes elements. It will trigger other behaviors in the game such as:
* Display the messages.
* Block the checkboxes.
* It has a Timeout before drawing the next question.


```javascript
let setEventListeners = function(){
    $('input').on('change', function(){
        if(this.checked){
            // Once an Answer has been selected All the answers are Blocked for Selection and will be evaluetaed.
            $("input").prop( "disabled", true );
            // Get The Answer and The Question Number from the Input Element Checked
            let value = $(this).attr('name').replace('answer-',"");
                // console.log("Answer Number:" + $(this).attr('name').replace('answer-',""));
            let qIndex = $(this).parent().parent().attr('qIndex')
                // console.log("Question Number:" + $(this).parent().parent().attr('qIndex'));
            
            // Verify if the Answer is correct
            // console.log(answerCorrect(questions, qIndex, value))
            if (answerCorrect(questions, qIndex, value)){
                // Stop the Count Down
                clearInterval(countDownId);
                // Increment the Right Answers Counter by 1
                rightQ++;
                // Display Message of Correct Answer
                $("#right-msg").show();
                console.log("Message of Correct Answer");
                // Wait 3 Seconds Before next
                setTimeout(setNextQuestion, clearMsgTime * 1000);
                
            } else{
                // Stop the Count Down
                clearInterval(countDownId);
                // Increment the Wrong Answers Counter by 1
                wrongQ++;
                // Display Message of Wrong Answer
                let correctAnswer = questions[qIndex][questions[qIndex].s]
                $("#c_answer-wr").text(correctAnswer);
                console.log(correctAnswer);
                $("#wrong-msg").show();
                console.log("Message of Wrong Answer");
                // Wait 3 Seconds Before next
                setTimeout(setNextQuestion, clearMsgTime * 1000);
            }   
        }
    });

    $("#start-game").on("click", function(){
        // Hide the Button
        $(this).hide();
        // Initialize the Game
        startGame();
        $("#question-container").show();
        $("#timer-container").show();
    });
}
```

##### Shuffle Array
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

```javascript
    function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
    }

    // Used like so
    var arr = [2, 11, 37, 42];
    arr = shuffle(arr);
    console.log(arr);
```