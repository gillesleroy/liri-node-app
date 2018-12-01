// Grab the request package...
var request = require("request");
var dotenv = require("dotenv").config();
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "ee016eea97de4d82ad0d0ae647902e9d",
  secret: "d741b9fe37bb45dbbeb7fed9cc054db4"
});
// Run the request function...
// The request function takes in a URL then returns three arguments:
// 1. It provides an error if one exists.
// 2. It provides a response (usually that the request was successful)
// 3. It provides the actual body text from the website <---- what actually matters.

// request("https://en.wikipedia.org/wiki/Kudos_(granola_bar)", function(error, response, body) {
//   // If the request was successful...
//   if (!error && response.statusCode === 200) {
//     // Then log the body from the site!
//     console.log(body);
//   }
// });

var artist = "beatles";
var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
// var movie = "Tess";
// var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

request(queryURL, function(error, response, body) {
  // If the request was successful...
  if (!error && response.statusCode === 200) {
    // Then log the body from the site!
    console.log(body);
  }
});

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
// console.log(data); 
// });