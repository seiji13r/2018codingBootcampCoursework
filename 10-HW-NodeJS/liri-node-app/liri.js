// This Section Contains calls to external Modules
// make sure to perform npm install

// Load the "dotenv" package to make .env info readable.
require("dotenv").config();
// Load the Keys from keys.js this way we can access them with:
// keys.spotify
// keys.omdb
// keys.bandsintown
var keys = require("./keys.js")
// Initialize the Request Module.
var request = require('request');

// Initialize the Spotify API Module and bind it with the API Credentials.
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Test if the Keys are being loaded Properly
// console.log("Spotify Keys: ", keys.spotify);
// console.log("OMBD Key: ", keys.ombd);
// console.log("Bands In Town Key: ", keys.bandsintown);

// Command List Acepted by Liri
let commands = [
  "concert-this",
  "spotify-this-song",
  "movie-this",
  "do-what-it-says",
  "help",
]

let user_input_opts = [
  "[Artist]",
  "[Song]",
  "[Movie]",
  "",
  "",
]

// Declaring the variables that will Store the Command Inputs
let cmd;
let cmdArgString;
let validInputs = false;

// Capture Further Command Arguments
if (process.argv[2]){
  cmd = process.argv[2];
};

if (process.argv[3]){
  cmdArgString = process.argv.slice(3).join(" ");
};

console.log("Command is: ",cmd)
console.log("CMD Sring", cmdArgString);
console.log("");

// Rise the valid Inputs flag if the Command Line Inputs are correct.
if ((cmd !== undefined) && (commands.includes(cmd))){
  validInputs = true;
};

// Functions Definition Starts Here
// concertThis Uses Bands in town it retrieves the Events of a given Artist
function concertThis(key, artist){
  let entryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + key

  request(entryUrl, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });

  // let events;
  // return events;
};

// spotifyThisSong Uses the Spotify API to retrieve information from a given Song
function spotifyThisSong(song){
  let info;
  return info;
}

// movieThis Uses the OMBD API to retrieve information from a given Movie
function movieThis(key, movie){
  let entryUrl = "https://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=" + key;

  request(entryUrl, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });

  let info;
  return info;
}

if (validInputs){
  switch(cmd){
    case "concert-this":
    // Code
    console.log("Typed concert-this with: ", cmdArgString, "\n");
    concertThis(keys.bandsintown, cmdArgString);
    break;

    case "spotify-this-song":
    // Code
    console.log("Typed spotify-this-song with: ", cmdArgString, "\n");
    spotifyThisSong(cmdArgString);
    break;

    case "movie-this":
    // Code
    console.log("Typed movie-this with:", cmdArgString, "\n");
    if (cmdArgString === undefined){
      cmdArgString = "Mr. Nobody.";
    }
    movieThis(keys.ombd, cmdArgString);;
    break;

    case "do-what-it-says":
    // Code
    console.log("Typed do-what-it-says with: ", cmdArgString, "\n");
    break;

    case "help":
    // Code
    Help();
    break;

    default:
    // Code
  }
} else {
  // Not Valid Inputs - Display Help
  // Print Help
  console.log("Something Went Wrong!!");
  console.log("")
  Help();
}

// Help Function Definition
function Help(){
  console.log("Use Any of the following Valid Commands:");
  console.log("");
  for (i = 0; i < commands.length; i++){
    console.log("  -  node liri", commands[i], user_input_opts[i]);
  }
  console.log("");
}