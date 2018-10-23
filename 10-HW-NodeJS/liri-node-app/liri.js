// This Section Contains calls to external Modules
// make sure to perform npm install

require("dotenv").config();

// Command List Acepted by Liri
let commands = [
    "concert-this",
    "spotify-this-song",
    "movie-this",
    "do-what-it-says",
]


let cmd;
let cmdArgString;
cmd = process.argv[2];
cmdArgString = process.argv.slice(3).join(" ");

console.log("Command is: ",cmd)
console.log("CMD Sring", cmdArgString);
