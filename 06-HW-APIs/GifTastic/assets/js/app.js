console.log("GifTastic")

// This variable contains the name of the Buttons
let topics = [
    'futurama',
    'scooby doo',
    'adventure time',
    'sponge bob',
    'powerpuff girs',
    'the pink panther',
    'looney toons',
    'the flinstones',
    'gravity falls',
    'disenchantment',
    "rocko's modern life",
    "hey arnold",
    "top cat",
    "johnny bravo",
    "The Fairly OddParents",
    "Dexter's Laboratory",
    "The Grim Adventures of Billy and Mandy",
    "Freakazoid",
    "Animaniacs",
];
const maxRecords = 24;
// console.log(topics);

let createImage = function(downsized_still, downsized){
    let imgDiv = $('<div class="img-div">')
    let image = $('<img class="my-img-class">');
    // downsized_still
    image.attr("src", downsized_still);
    image.attr("data-still", downsized_still);
    image.attr("data-animated", downsized);
    image.attr("data-state", "still");
    image.appendTo(imgDiv)
    return imgDiv;
}

let displayButtons = function(arr){
    $("#buttons-container").empty();
    for (let i = 0; i < arr.length; i++){
        // console.log(arr[i]);
        let button = $('<button class="btn btn-wrap-text btn-primary topic-button">');
        button.attr("data-name", arr[i]);
        button.text(arr[i].toUpperCase());
        $("#buttons-container").append(button);
    }
}

// This Function Handles the request of data from GIPhy.
let ajaxRequestToGify = function(topicName){
    // console.log("Ajax Request Performed");
    // console.log(topicName);
    let myApiKey = "kxCW1k4IZQ9cnoj6U4RkIeWswUDg3OUt";
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName + "&limit=" + maxRecords + "&api_key=" + myApiKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).done(function(response){
        // console.log(response);
        gifs = response.data;
        let img;
        let downsized;
        let downsized_still;
        // Clear the  image-container
        $("#image-container").empty();
        for(let i = 0; i < gifs.length; i++){
            downsized = gifs[i].images.downsized.url;
            downsized_still = gifs[i].images.downsized_still.url;
            img = createImage(downsized_still, downsized);
            // console.log(img)
            $("#image-container").append(img);
        };
    });
}

// This Function Handles the events when the Button is clicked
// this is the button
let displayTopicGif = function(event){
    // Prevent from sending to forms.
    event.preventDefault();

    // console.log("Button Clicked");
    // console.log(this);
    // console.log(event);
    
    let name = $(this).attr("data-name");
    ajaxRequestToGify(name);
}

// This Function Handles the events when the Button is clicked
// this is the button
let addTopicButton = function(event){
    // Prevent from sending to forms.
    event.preventDefault();
    // console.log("Add Button Clicked");
    // console.log("")
    let newTopic = $("#text-input").val().trim();
    if(!(topics.includes(newTopic))&&(newTopic!=="")){
        topics.push(newTopic);
        // console.log(topics);
        displayButtons(topics);
    } else {
        console.log("Type Other Option");
        console.log("(" + newTopic + ") is already in topics or is blank")
    }
}

// Adding click event listeners to "add-topic-button"
$(document).on("click", "#add-topic-button", addTopicButton);
// Adding click event listeners to all elements with a class of "topic-button"
$(document).on("click", ".topic-button", displayTopicGif);

$( document ).ready(function() {
    // console.log( "ready!" );
    // Display the buttons from the topics array;
    displayButtons(topics);
});