// This Section Contains calls to external Modules
// make sure to perform npm install

// Load the "dotenv" package to make .env info readable.
require("dotenv").config();

// Load fs
var fs = require("fs");

// Load Moment
var moment = require('moment');
moment().format();

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

// Debugging Console Logs
// console.log("Command is: ",cmd)
// console.log("CMD Sring", cmdArgString);
// console.log("");

// Functions Definition Starts Here
// concertThis Uses Bands in town it retrieves the Events of a given Artist
function concertThis(key, artist){
  
  let formatedOutput = ""

  if (artist===undefined){
    console.log("Command Incomplete!!")
  }
  else{
    let entryUrl = "https://rest.bandsintown.com/artists/" + artist.replace(/ /g, "+") + "/events?app_id=" + key
    // console.log(entryUrl)
    request(entryUrl, function (error, response, body) {
      if(error===null){
        let data = [];
        try{
          data = JSON.parse(body);
        } catch (e){
          console.log("API response error for", artist, ": ", body);
        }
        
        if(data.length===0){
          formatedOutput += "\nNo Near Events Found for " + artist + "\n";
        }
        
        for (let i = 0;i < data.length; i++ ){
          
          if(formatedOutput!==""){
            formatedOutput += "\n";
          }
          
          formatedOutput += "Name of the Venue: " + data[i].venue.name +
          "\nVenue Location: "  + data[i].venue.city + ", " + data[i].venue.country +
          "\nDate of the Event: "  + moment(data[i].datetime).format("MM/DD/YYYY") + "\n";
          
          // Test the Date Time Format output with Moment JS
          // console.log(moment(data[i].datetime));
          // console.log(moment(data[i].datetime).format("MM/DD/YYYY"));
        }
        console.log(formatedOutput);
        logIt(formatedOutput);
        
      } else {
        formatedOutput = "Something Went Wrong!!!!!!\n" +
        JSON.stringify(error) + "\nRequest Status Code:" + response.statusCode + "\n";
        
        console.log(formatedOutput)
        logIt(formatedOutput);
      }
    });
  }
};

// spotifyThisSong Uses the Spotify API to retrieve information from a given Song
function spotifyThisSong(song){
  let formatedOutput = ""
  let myDefault = false;
  if(song===undefined){
    song = "The Sign";
    myDefault = true;
  }

  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      formatedOutput = 'Error occurred: ' + err;
      logIt(formatedOutput);
      return console.log(formatedOutput);
    } else {
      formatedOutput = ""
      if(myDefault){
        let currentSong = data.tracks.items[7];
        formatedOutput += "\nArtist(s): " + currentSong.artists[0].name;
        formatedOutput += "\nSong's Name: " + currentSong.name;
        formatedOutput += "\nSong's Link @ Spotify: " + currentSong.external_urls.spotify;
        formatedOutput += "\nAlbum Name: " + currentSong.album.name + "\n";
      }
      else{
        for (let i = 0; i < data.tracks.items.length; i++){
          let currentSong = data.tracks.items[i];
          let artistsStr = ""
          for (let i = 0; i < currentSong.artists.length; i++){
            if (i!==0){
              artistsStr += ", " + currentSong.artists[i].name;
            } else{
              artistsStr = currentSong.artists[i].name;
            }
          }

          formatedOutput += "\nArtist(s): " + artistsStr;
          formatedOutput += "\nSong's Name: " + currentSong.name;
          formatedOutput += "\nSong's Link @ Spotify: " + currentSong.external_urls.spotify;
          formatedOutput += "\nAlbum Name: " + currentSong.album.name + "\n";
        }
      }
    }

    console.log(formatedOutput);
    logIt(formatedOutput);
  });
}

// movieThis Uses the OMBD API to retrieve information from a given Movie
function movieThis(key, movie){
  let formatedOutput = "";
  if (movie === undefined){
    movie = "Mr. Nobody.";
  }

  let entryUrl = "https://www.omdbapi.com/?t=" + movie.replace(/ /g, "+") + "&plot=short&apikey=" + key;
  // console.log(entryUrl);
  request(entryUrl, function (error, response, body) {
    if(error===null){
      let data = [];
      try{
        data = JSON.parse(body);
      } catch (e){
        formatedOutput = "API response error for" + movie, ": " + body;
        console.log(formatedOutput);
        logIt(formatedOutput);
      }

      let rotTomRat="";
      if(data.Ratings){
        for(let i = 0; i < data.Ratings.length; i++){
          if (data.Ratings[i].Source==='Rotten Tomatoes'){
            rotTomRat = data.Ratings[i].Value;
          }
        }
      }

      // console.log(data);
      formatedOutput += "\nMovie Title: " + data.Title;
      formatedOutput += "\nYear Released: " + data.Year;
      formatedOutput += "\nIMDB Rating: " + data.imdbRating;
      formatedOutput += "\nRotten Tomatoes Rating: " + rotTomRat;
      formatedOutput += "\nProduction Country: " + data.Country;
      formatedOutput += "\nLanguage: " + data.Language;
      formatedOutput += "\nPlot: " + data.Plot;
      formatedOutput += "\nActors: " + data.Actors + "\n";

      console.log(formatedOutput);
      logIt(formatedOutput);
      // * Title of the movie.
      // * Year the movie came out.
      // * IMDB Rating of the movie.
      // * Rotten Tomatoes Rating of the movie.
      // * Country where the movie was produced.
      // * Language of the movie.
      // * Plot of the movie.
      // * Actors in the movie.

    } else {
      formatedOutput = "Something Went Wrong!!!!!!\n" +
      JSON.stringify(error) + "\nRequest Status Code:" + response.statusCode + "\n";
      console.log(formatedOutput)
      logIt(formatedOutput);
    }
  });

  // // Then we print out the imdbRating
    // console.log("The movie's rating is: " + JSON.parse(body).imdbRating);

}

function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // Then split it by commas (to make it more readable)
    var cmdInFile = data.split("\n");
    // console.log(cmdInFile);

    // Then split it by commas (to make it more readable)
    var randPos = Math.floor(Math.random()*cmdInFile.length);
    var randCommand = cmdInFile[randPos].split(",");
  
    // We will then re-display the content as an array for later use.
    // console.log(randCommand);

    // Call Liri again with the commands
    console.log("\nnode liri", randCommand[0].trim(), randCommand[1].trim());
    liriMain(randCommand[0].trim(), randCommand[1].trim());
  });
}

// Help Function Definition
function Help(){
  let formatedOutput = "\nUse Any of the following Valid Commands:\n\n";

  for (i = 0; i < commands.length; i++){
    formatedOutput += "  -  node liri " + commands[i] + " " + user_input_opts[i] + "\n";
  }
  console.log(formatedOutput);
  logIt(formatedOutput);
}

function logIt(text){
  fs.appendFile("log.txt", text, function(err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log("COMMAND NOT LOGGED!");
      console.log(err);
    }
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
      console.log("COMMAND LOGGED!");
    }
  });
}


function liriMain(cmd, cmdArgString){
  // Rise the valid Inputs flag if the Command Line Inputs are correct.
  if ((cmd !== undefined) && (commands.includes(cmd))){
    validInputs = true;
  };

  if (validInputs){
    switch(cmd){
      case "concert-this":
      logIt("\nnode liri concert-this " + cmdArgString + "\n");
      concertThis(keys.bandsintown, cmdArgString);
      break;

      case "spotify-this-song":
      // Code
      logIt("\nnode liri spotify-this-song " + cmdArgString + "\n");
      spotifyThisSong(cmdArgString);
      break;

      case "movie-this":
      logIt("\nnode liri movie-this " + cmdArgString + "\n");
      movieThis(keys.ombd, cmdArgString);;
      break;

      case "do-what-it-says":
      // Code
      logIt("\nnode liri do-what-it-says\n");
      doWhatItSays();
      break;

      case "help":
      logIt("\nnode liri help\n");
      Help();
      break;

      default:
      // Code
    }
  } else {
    // Not Valid Inputs - Display Help
    // Print Help
    console.log("\nSomething Went Wrong!!\n");
    logIt("\nSomething Went Wrong!!\n");
    Help();
  }
}

liriMain(cmd, cmdArgString);