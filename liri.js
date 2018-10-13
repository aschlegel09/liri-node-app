require("dotenv").config();

var request = require("request");

var fs = require("fs");

var myKeys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(myKeys.spotify);

var userInput = process.argv[2];

var userQuery = process.argv.slice(3).join(" ");

if (
  userInput === "spotify-this-song" ||
  userInput === "movie-this" ||
  userInput === "concert-this" ||
  userInput === "do-what-it-says"
) {
  console.log("\nYour process is: " + process.argv[2] + "\n");
}
else if (userInput === "spotify-this-song" || !userInput) {
  userQuery = "Ace-of-Base";
  userInput = "spotify-this-song";
} 
else {
  console.log("Please enter a valid process.");
}

if (userQuery) {
  console.log("Your search term is: " + userQuery + "\n");
} 
else if (userInput === "movie-this") {
  userQuery = "Mr. Nobody";
  userInput = "movie-this";
} 
else if (userInput === "do-what-it-says"){
  console.log("OK!");
} 
else if (userInput === "spotify-this-song") {
  userQuery = "Ace-of-Base";
  userInput = "spotify-this-song";
}
else {
  console.log("Please enter a search term.");
}

printMovie = function() {
  request(
    "https://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy",
    function(error, body) {
      if (error) {
        console.log("Movie error!!");
      }
      var movieBody = body.body;
      // console.log(typeof movieBody);

      var parsedString = JSON.parse(movieBody);
      // console.log(parsedString);
      console.log("Name of movie: " + parsedString.Title); //WORKS
      console.log("Year Released: " + parsedString.Year);
      console.log("IMDB Rating: " + parsedString.imdbRating);
      console.log("Rotten Tomatoes Rating: " + parsedString.Ratings[1].Value);
      console.log("Country: " + parsedString.Country);
      console.log("Language: " + parsedString.Language);
      console.log("Plot: " + parsedString.Plot);
      console.log("Actors: " + parsedString.Actors);
    }
  );
};

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

var moment = require("moment");

printBand = function() {
  // Then run a request to the OMDB API with the movie specified
  var bandUrl =
    "https://rest.bandsintown.com/artists/" +
    userQuery +
    "/events?app_id=codingbootcamp";

  // This line is just to help us debug against the actual URL.
  // console.log(bandUrl);

  request(bandUrl, function(error, response, body) {
    if (error) {
      // Print the error if one occurred
      console.log("Song Error: " + error);
    }
    var concerts = JSON.parse(body);
    console.log("Name of Venue: " + concerts[0].venue.name); // WORKING NAME
    console.log("City: " + concerts[0].venue.city);
    console.log("Region: " + concerts[0].venue.region);
    console.log("Country: " + concerts[0].venue.country);

    var dateOfConcert = concerts[0].datetime;

    var momentDate = moment(dateOfConcert).format("MM/DD/YYYY");

    console.log("Date of Concert: " + momentDate);
  });
};

whatISaid = function() {
  fs.readFile("random.txt", function(err, data) {
    if (err) throw err;
    // convert data object to a string
    var newData = data.toString();

    var splitData = newData.split(",");
    // console.log(splitData);

    userInput = splitData[0];
    userQuery = splitData[1];
    printSong();
  });
};

if (userInput === "movie-this") {
  printMovie();
} else if (userInput === "spotify-this-song") {
  printSong();
} else if (userInput === "concert-this") {
  printBand();
} else if (userInput === "do-what-it-says") {
  whatISaid();
} else {
  console.log("error: no process chosen");
  return false;
}
