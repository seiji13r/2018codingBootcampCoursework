//////////////////////////////////////////////
// Questions Array
// questions Variable required
// from the questions.js file
// //////////////////////////////////////////


//////////////////////////////////////////////
// Global Variables
//////////////////////////////////////////////

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

//////////////////////////////////////////////
// Functions
//////////////////////////////////////////////

//////////////////////////////////////////////
// Function to shuffle elements from an array
// Source https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//////////////////////////////////////////////
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

//////////////////////////////////////////////
// The Following Block of code Randomize 
// the Answers in the Question 
//////////////////////////////////////////////
let shuffleDOMAnswers = function() {
    $(".question-container").hide();
    // Original Question Order
    let answOrder = [0, 1, 2, 3];
    // New Question Order
    let newOrder = shuffle(answOrder)
        // console.log(newOrder)
    // Move form-check Elements "Answers" in the new Order 
    for (let i = 0; i < answOrder.length; i++){
        $("#form-check-" + answOrder[i] ).appendTo(".question-container");
    }
    $(".question-container").show();
}

// This Function Populates the Answer Chackbox with its values in the HTML
let drawAnswer = function(ansNum, value){
    $("input[name=answer-" + ansNum + "]").val(value);
    $("label[for=answer-" + ansNum + "]").text(value);
}

let drawQuestion = function (qObj, qIndex){
    $("#question-box").text(qObj.q);
    $("#question-container").attr('qIndex', qIndex);
    for (let n=1; n<=4; n++ ){
        drawAnswer(n, qObj[n]);
        // console.log(n);
    }
    // Make Sure that all Answers are unchecked and enabled
    $("input").prop( "checked", false );
    $("input").prop( "disabled", false );
}

// Validate if the choice is correct agains the "s" solution atribute in the question
let answerCorrect = function(questionsArr, qIndex, value){
    if (questionsArr[qIndex].s === value){
        return true;
    }else{
        return false;
    }
}

let clearMessages = function(){
    $("#right-msg").hide();
    $("#wrong-msg").hide();
    $("#timeout-msg").hide();
}

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

// Countdown Timer to be Draw
let drawCountdown = function(){
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

// *******************
// Main Program Flow
// *******************
$(document).ready(function(){

    setEventListeners();
    
});




// Pseudo Code
// Format the object to store the questions
// Randomize the Questions Array
// Draw the Question in the container //Initialize coundown
// Create an event listener that will sense somehow when the answer is ready.
// If user answers the question:
//      Check the answer update stats and move to the next Question
// If timeouts
// Display message of time out and move to the next question.