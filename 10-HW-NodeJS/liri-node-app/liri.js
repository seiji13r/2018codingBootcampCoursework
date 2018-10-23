// This Section Contains calls to external Modules
// make sure to perform npm install

require("dotenv").config();

// Command List Acepted by Liri
let commands = [
  "concert-this",
  "spotify-this-song",
  "movie-this",
  "do-what-it-says",
  "help",
]


let cmd;
let cmdArgString;
let validInputs = false;

if (process.argv[2]){
  cmd = process.argv[2];
};

if (process.argv[3]){
  cmdArgString = process.argv.slice(3).join(" ");
};

console.log("Command is: ",cmd)
console.log("CMD Sring", cmdArgString);
console.log("");

if ((cmd !== undefined) && (commands.includes(cmd))){
  validInputs = true;
};

if (validInputs){
  switch(cmd){
    case "concert-this":
    // Code
    console.log("concert-this", cmdArgString);
    break;

    case "spotify-this-song":
    // Code
    console.log("spotify-this-song", cmdArgString);
    break;

    case "movie-this":
    // Code
    console.log("movie-this", cmdArgString);
    break;

    case "do-what-it-says":
    // Code
    console.log("do-what-it-says", cmdArgString);
    break;

    case "help":
    // Code
    // console.log("help", cmdArgString);
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
    console.log("  *  node liri",commands[i]);
  }
  console.log("");
}