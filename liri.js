var keys = require("./keys.js");
var axios = require("axios"); 
// var request = require("request");
// require("dotenv").config();
// var dotenv = require("dotenv").config();
var moment = require("moment");
var fs = require('fs');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// var spotify = new Spotify({
//     id: "ee016eea97de4d82ad0d0ae647902e9d",
//     secret: "d741b9fe37bb45dbbeb7fed9cc054db4"
//   });
var args = process.argv;
var command = args[2];
var nodeThis = args[0].split("/");
var nodeCom = nodeThis[nodeThis.length-1];
var liri = args[1].split("/");
var liriCom = liri[liri.length-1];
// var name = args[3];
var term = args.slice(3).join(" ");
var fullComm = "--- "+nodeCom+" "+liriCom+" "+command+" "+term+" ---";

function concert()
{
  var artist = term;
  // var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  // var movie = "Tess";
  // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  // request(queryURL, function(error, response, body) {
  //     // If the request was successful...
  //     if (!error && response.statusCode === 200) {
  //       // Then log the body from the site!
  //       console.log(body);
  //     }
  //   });
  addLog(fullComm);
  axios.get(queryURL)
  .then(
    function(response) {
      // Then we print out the imdbRating
      //console.log("The movie's rating is: " + response.data.imdbRating);
      for (var i = 0; i<response.data.length;i++)
      {
      addLog(response.data[i].venue.name);
      addLog(response.data[i].venue.city);
      // console.log(response.data[i].datetime);
      // 2018-12-02T01:15:19+00:00
      // 2018-12-02T01:15:19Z
      // var day = moment("2019-05-31T19:00:00");
      // var day = moment(response.data[i].datetime,"YYYY-MM-DDTHH:MI:SS");
      // var day = moment(response.data[i].datetime,moment.ISO_8601);
      var day = moment(response.data[i].datetime,moment.ISO_8601);
      if (moment(response.data[i].datetime,moment.ISO_8601).isValid)
      {
        addLog(day.format("MM/DD/YYYY"));
      }
      else {
        addLog("Invalid");
      }
      // console.log(moment(response.data[i].datetime,moment.ISO_8601).isValid);
      }
      // console.log(response.data[0].description);
      // console.log(response.data);
    }
  )
  .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        addLog(error.response.data);
        addLog(error.response.status);
        addLog(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        addLog(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        addLog("Error", error.message);
      }
      addLog(error.config);
    });
  } 
function spot() {
  addLog(fullComm);
  if (!term){
    term = "The Sign";
  }
  spotify.search({ type: 'track', query: term, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  // console.log(data); 
  // console.log(data.tracks.items[0]); 
  addLog(term);
  for (var i =0; i< data.tracks.items[0].artists.length; i++)
  {
    addLog(data.tracks.items[0].artists[i].name); 
  }
  addLog(data.tracks.items[0].name); 
  addLog(data.tracks.items[0].external_urls.spotify); 
  });
}
function addLog(text){
  console.log(text);
  fs.appendFile("log.txt", text+"\n", function(err) {
      if (err) throw err;
    });
}
      
function movie(){
  addLog(fullComm);
  if (!term){
    term = "Mr. Nobody";
  }
  // addLog(args[0]+" "+args[1]+" "+args[2]+" "+term);
  var queryURL = "https://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";
  axios.get(queryURL)
  .then(
    function(response) {
            var isFound = false;
            // console.log(response.data);
            addLog(response.data.Title);
            addLog(response.data.Year);
            addLog(response.data.imdbRating);
            for (var i = 0; i<response.data.Ratings.length;i++)
            {
            if (response.data.Ratings[i].Source === "Rotten Tomatoes")
              {
                addLog(response.data.Ratings[i].Value);
                isFound = true;
                break;
               }
            }   
            if (!isFound){
              addLog("N/A");
            }        
            addLog(response.data.Country);
            addLog(response.data.Language);
            addLog(response.data.Plot);
            addLog(response.data.Actors);
    }
  )
  .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        addLog(error.response.data);
        addLog(error.response.status);
        addLog(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        addLog(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        addLog("Error", error.message);
      }
      addLog(error.config);
    });
}

if (command === "concert-this"){
   concert();
   }
if (command === "spotify-this-song")
  {
   spot();
  }
if (command === "movie-this") {
   movie();
  }  
if (command === "do-what-it-says"){
  fs.readFile('random.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var dataArr = data.split(",");
    // console.log(dataArr);
    if (dataArr[0] === "spotify-this-song"){
      term = dataArr[1];
      spot();
    }
  });
}
