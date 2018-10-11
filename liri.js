require("dotenv").config();

var request = require("request");

var myKeys = require("./keys.js");

var Spotify = require("node-spotify-api");

var fs = require('fs'); 

var spotify = new Spotify(myKeys.spotify);

var userInput = process.argv[2];

if (
  userInput === "spotify-this-song" ||
  userInput === "movie-this" ||
  userInput === "concert-this" ||
  userInput === "do-what-it-says"
) {
  console.log("\nYour process is: " + process.argv[2] + "\n");
} else {
  console.log("Please enter a valid process.");
}

var userQuery = process.argv[3];

if (userQuery) {
  console.log("Your search term is: " + userQuery + "\n");
} else {
  console.log("Please enter a search term.");
}

printMovie = function() {
  request(
    "https://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy",
    function(error, body) {
      if (error) {
        console.log("Movie error!!");
      }
      // console.log("Line28error:", error); // Print the error if one occurred
      // console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      // console.log("Response: " + JSON.stringify(response));
      // console.log(body.body);
      
   var mainBandBody = body.body;
   // console.log(mainBandBody);
   
   var str = mainBandBody;
   var newString = str.replace(/[^a-zA-Z ]/g, "");
   console.log("Good luck with this:... " + newString.split("  "));
      // console.log(Object.entries(response.body));
      // for (var [key, value] of Object.entries(response)) {
      //   console.log(`${key} ${value}`);
      // }
    }
  );
};

// var defaultArtist = "Ace-of-Base";

printSong = function() {
  {
    spotify.search({ type: "track", limit: 3, query: userQuery }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Song Error: " + err);
      }
      console.log(
        "The artist is: " + data.tracks.items[0].album.artists[0].name
      );
      console.log("The song is called: " + data.tracks.items[0].name);
      console.log(
        "Follow this link to play your song: " +
          data.tracks.items[0].external_urls.spotify
      );
      console.log(
        "The title of this album is " + data.tracks.items[0].album.name
      );
    });
  }
};

// var apiInstance = new BandsintownApi.ArtistEventsApi();

// var artistname = "artistname_example"; // String | The name of the artist. If it contains one of the special characters below, please be sure to replace it by the corresponding code: for / use %252F, for ? use %253F, for * use %252A, and for \" use %27C

// var appId = "appId_example"; // String | The application ID assigned to you by Bandsintown

// var opts = {
//   _date: "_date_example" // String | Can be one of the following values: \"upcoming\", \"past\", \"all\", or a date range e.g. \"2015-05-05,2017-05-05\". If not specified, only upcoming shows are returned
// };

var moment = require("moment");

moment().format();

printBand = function() {
  // Then run a request to the OMDB API with the movie specified
  var bandUrl =
    "https://rest.bandsintown.com/artists/" +
    userQuery +
    "?app_id=codingbootcamp";

  // This line is just to help us debug against the actual URL.
  // console.log(bandUrl);

  request(bandUrl, function(error, response, body) {
    if (error) {
      // Print the error if one occurred
      console.log("Song Error: " + error);
    };
  
    // console.log(response.statusCode); // Print the response status code if a response was received
    // console.log(response.body.name);
    // console.log(response.body);
   var mainBandBody = response.body;
    // console.log(mainBandBody);
    
    var str = mainBandBody;
    console.log(str.replace(/[^a-zA-Z ]/g, ""));

  });
  // var callback = function(error, data, response) {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log("API called successfully. Returned data: " + data);
  //     console.log(response);
  //   }callback();
  // };
  // apiInstance.artistEvents(artistname, appId, opts, callback);
};
var randomText = require("./random.txt");

whatISaid = function() {

  fs.readFile(randomText, function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();

  });
 
var newUserInput = randomText.split("");

console.log(newUserInput);

  printSong();
;}

if (userInput === "movie-this") {
  // console.log("movie-this chosen");
  printMovie();
} else if (userInput === "spotify-this-song") {
  // console.log("spotify-this-song chosen");
  printSong();
} else if (userInput === "concert-this") {
  // console.log("concert-this chosen");
  printBand();
} else if (userInput === "do-what-it-says") {
  // console.log("concert-this chosen");
  whatISaid();
} else {
  console.log("error: no process chosen");
  return false;
}
