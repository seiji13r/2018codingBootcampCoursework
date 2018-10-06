console.log("\n\n07-HW-Firebase-TrainScheduler App");

// Initialize Firebase
var config = {
apiKey: "AIzaSyAvnRjY9FmETk620OriEoO9eyO5TPHDpjQ",
authDomain: "trainschedulerseiji.firebaseapp.com",
databaseURL: "https://trainschedulerseiji.firebaseio.com",
projectId: "trainschedulerseiji",
storageBucket: "",
messagingSenderId: "922641501815"
};
firebase.initializeApp(config);

// Variable to Reference the database.
var database = firebase.database();
// ///////////////////////////////////////////////////////
// Global Variables
// ///////////////////////////////////////////////////////
// let = $("");
// Table Element
let tableSchedule= $("#schedule-table");
// Input Elements
let trainNameInput = $("#input-train-name");
let destinationInput = $("#input-destination");
let firstTrainTimeInput = $("#input-first-train-time");
let frequencyInput = $("#input-frequency");
// Reference Form Error Messages
let msgTrainName = $("#msg-train-name");
let msgDestination = $("#msg-destination");
let msgFirstTrainTime = $("#msg-first-train-time");
let msgFrequency = $("#msg-frequency");
// Data Variables
let trainName = "";
let destination = "";
let firstTrainTime = "";
let frequency = "";
// Control Variables
// Regular Expression that Represents the HH:mm Format
const hhmmKeyRegExp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
// Regular Expresion that Represents 0 - 60; Not Used
// const minutesKeyRegExp = /^([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|60)$/;

// ///////////////////////////////////////////////////////
// Event Listeners
// ///////////////////////////////////////////////////////

// Add-Train Button
$("#add-train").on("click", function(event) {
    // Prevent the default behavior of Form' Submit button
    event.preventDefault();

    // Verify if event is being capured
    // console.log("Add Train Button pressed");

    // Check if values are properly captured by running the debug function showValues();
    // showValues();

    // Validate Form
    if (isFormValid()){
        // If form is Valid Push the information to the Database.
        // Capture values from input text boxes and build the object dbTrainRecord
        let dbTrainRecord = {
            trainName : trainNameInput.val().trim(),
            destination : destinationInput.val().trim(),
            firstTrainTime : firstTrainTimeInput.val().trim(),
            frequency : frequencyInput.val().trim(),
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };
        
        // Code for handling the Push
        database.ref().push(dbTrainRecord);

        console.log(dbTrainRecord)
        console.log("Train Successfully Added");
        clearInputs();
    } else {

    }
});

// Function to Validate if the Data in the Form is Valid
// It will check each Field for Valid Information
let isFormValid = function(){
    // Form valid Called
    // console.log("Form Valid Function Called");
    
    // Local Variables to Store Input Values.
    let trainName = trainNameInput.val().trim();
    let destination = destinationInput.val().trim();
    let firstTrainTime = firstTrainTimeInput.val().trim();
    let frequency = parseFloat(frequencyInput.val().trim());
    // console.log("Frequency: " + frequency);

    // Failed Flag
    let passed = true;
    
    // Form Validators

    // Train Name Validator
    if(trainName===""){
        trainNameInput.addClass("is-invalid");
        msgTrainName.text("Please Provide a Train Name");
        passed = false;
    }
    else{
        trainNameInput.removeClass("is-invalid");
        msgTrainName.text("");
    }

    // Destination Validator
    if (destination===""){
        destinationInput.addClass("is-invalid");
        msgDestination.text("Please Provide a Destination");
        passed = false;
    } 
    else {
        destinationInput.removeClass("is-invalid");
        msgDestination.text("");
    }

    // First Train Time Validator
    // console.log("hhmmKeyRegExp: ", hhmmKeyRegExp.test(firstTrainTime));
    if(!(hhmmKeyRegExp.test(firstTrainTime))){
        firstTrainTimeInput.addClass("is-invalid");
        msgFirstTrainTime.text("Please Check the Format HH:mm");
        passed = false;
    }
    else {
        firstTrainTimeInput.removeClass("is-invalid");
        msgFirstTrainTime.text("");
    }

    // Frequency Validator
    if(isNaN(frequency)||(frequency<=0)){
        frequencyInput.addClass("is-invalid");
        msgFrequency.text("Please Provide a Valid Frequency");
        passed = false;
    }
    else {
        frequencyInput.removeClass("is-invalid");
        msgFrequency.text("");
    }

    // Debugging Code
    // Activate All Error Messages
    // trainNameInput.addClass("is-invalid");
    // msgTrainName.text("Error");
    // destinationInput.addClass("is-invalid");
    // msgDestination.text("Error");
    // firstTrainTimeInput.addClass("is-invalid");
    // msgFirstTrainTime.text("Error");
    // frequencyInput.addClass("is-invalid");
    // msgFrequency.text("Error");

    if(passed){
        // Form Valid Message
        console.log("The Data Form is Valid");
        // Reset Form Elements to Natura State
        trainNameInput.removeClass("is-invalid");
        msgTrainName.val("");
        destinationInput.removeClass("is-invalid");
        msgDestination.val("");
        firstTrainTimeInput.removeClass("is-invalid");
        msgFirstTrainTime.val("");
        frequencyInput.removeClass("is-invalid");
        msgFrequency.val("");
        return true;
    }
    
}

// Function to Debug
let showValues = function(){
    console.log(tableSchedule);
    console.log(tableSchedule.html());
    // console.log(": ",)
    console.log("trainName: ", trainNameInput.val());
    console.log("destination: ", destinationInput.val());
    console.log("firstTrainTime: ", firstTrainTimeInput.val());
    console.log("frequency: ", frequencyInput.val());
};

let clearInputs = function(){
    trainNameInput.val("");
    destinationInput.val("");
    firstTrainTimeInput.val("");
    frequencyInput.val("");
};

// Moment JS Functions
let nextArrivalFunction = function(firstTime, tFrequency){
    
    let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    let tRemainder = diffTime % tFrequency;
    let tMinutesTillTrain = tFrequency - tRemainder;
    let nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    return moment(nextTrain).format("HH:mm");
};

let minutesAwayFunction = function(firstTime, tFrequency){
    let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    let tRemainder = diffTime % tFrequency;
    let tMinutesTillTrain = tFrequency - tRemainder;
    
    return tMinutesTillTrain;
};

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {

    // trainName : trainNameInput.val().trim(),
    // destination : destinationInput.val().trim(),
    // firstTrainTime : firstTrainTimeInput.val().trim(),
    // frequency : frequencyInput.val().trim(),
    // dateAdded: firebase.database.ServerValue.TIMESTAMP

    let firstTrainTime = snapshot.val().firstTrainTime;
    let frequency = snapshot.val().frequency;
    let nextArrival = nextArrivalFunction(firstTrainTime, frequency);
    let minutesAway = minutesAwayFunction(firstTrainTime, frequency);
    
    let row = $('<tr id="' + snapshot.key + '">');
    row.addClass("row-class");
    let trainNameTd = $("<td>");
    trainNameTd.text(snapshot.val().trainName);

    let destinationTd = $("<td>");
    destinationTd.text(snapshot.val().destination);

    let firstTrainTimeTd = $("<td>");
    firstTrainTimeTd.text(firstTrainTime);

    let frequencyTd = $("<td>");
    frequencyTd.text(frequency);

    let nextArrivalTd = $("<td>");
    nextArrivalTd.text(nextArrival);

    let minutesAwayTd = $("<td>");
    minutesAwayTd.text(minutesAway);

    let buttonTd = $("<td>");
    buttonRemove = $('<button class="btn btn-sm btn-danger btn-remove" data-key="' + snapshot.key + '">');
    buttonRemove.html("<span>&times;</span>");
    buttonTd.append(buttonRemove);
 
    console.log()

    row.append(trainNameTd);
    row.append(destinationTd);
    row.append(firstTrainTimeTd);
    row.append(frequencyTd);
    row.append(nextArrivalTd);
    row.append(minutesAwayTd);
    row.append(buttonTd);

    row.appendTo(tableSchedule);

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

let deleteRecord = function(){
    console.log("button clicked");
    // console.log(this);
    let key = $(this).attr("data-key");
    console.log(key);

    database.ref().child(key).remove();
    $("#"+key).remove()
    // database.ref().child(key).once('value').then(function(snap) {
    //     // let train = snap.val();
    //     // let key = snap.key;
    //     // console.log("Train:");
    //     // console.log(key);
    //     // console.log(train);
    // });
}

$(document).on("click", ".btn-remove", deleteRecord);



let populateDB = function(){

    // REMOVE ALL THE DB
    database.ref().remove()

    let records = [
        // {
        //     trainName : "",
        //     destination : "",
        //     firstTrainTime : "",
        //     frequency : "",
        //     dateAdded: firebase.database.ServerValue.TIMESTAMP
        // },
        {
            trainName : "North Train",
            destination : "Monterrey",
            firstTrainTime : "6:00",
            frequency : "60",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        },
        {
            trainName : "J. J.",
            destination : "Guadalajara",
            firstTrainTime : "19:15",
            frequency : "15",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        },
        {
            trainName : "Chilango",
            destination : "CDMX",
            firstTrainTime : "7:00",
            frequency : "13",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        },
        {
            trainName : "LIGHTNING",
            destination : "Neverland",
            firstTrainTime : "4:50",
            frequency : "5",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        },
        {   
            trainName : "Super Train",
            destination : "Xochimilco",
            firstTrainTime : "23:30",
            frequency : "21",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        },
        {
            trainName : "Cool Train",
            destination : "Cool Place",
            firstTrainTime : "5:00",
            frequency : "20",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        },
        {
            trainName : "Choo Choo",
            destination : "Dinsneyland",
            firstTrainTime : "3:00",
            frequency : "35",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        },
        {
            trainName : "Krusty",
            destination : "Springfield",
            firstTrainTime : "23:59",
            frequency : "2",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        },
        {
            trainName : "Expreso de Oriente",
            destination : "Puebla",
            firstTrainTime : "22:30",
            frequency : "14",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        },
        {
            trainName : "Futura",
            destination : "Queretaro",
            firstTrainTime : "12:15",
            frequency : "24",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        },
    ];
    
    // Code for handling the Push
    
    for(let i = 0; i < records.length; i++){
        // console.log(records[i]);
        database.ref().push(records[i]);
    }
}

  