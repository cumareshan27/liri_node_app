var request = require("request");
var fs = require("fs");
require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
// Create the selector constructor
var SELECTOR = function () {
    // divider will be used as a spacer between the tv data we print in log.txt
    var divider =
        "\n------------------------------------------------------------\n\n";

    // findSong takes in the name of a song and searches the spotify API

    this.findSong = function (song) {
        var URL = spotify.search({ type: 'track', query: song });

        request(URL, function (err, response, body) {
            // parse the response body (string) to a JSON object
            var jsonsong = JSON.parse(body);

           // showData ends up being the string containing the show data we will print to the console
            var songData = [
                "Show: " + jsonsong.name,
                "Genre(s): " + jsonsong.genres.join(", "),
                "Rating: " + jsonsong.rating.average,
                "Network: " + jsonsong.network.name,
                "Summary: " + jsonsong.summary
            ].join("\n\n");

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw err;
                console.log(showData);
            });
        });
    };

        // The API will return a string containing movie details
    this.findmovie = function (actor) {
        var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + actor;

        // Add code to search the TVMaze API for the given actor
        request(URL, function (err, response, body) {
            //   var jsonactor = JSON.parse(body)[0].person;
            var jsonmovie = JSON.parse(body);
            console.log(body);
            console.log(jsonmovie);
            var moviedetails = (`
      -----------------------------------------------------
       Name   ${jsonmovie.Title} //Title of the movie.
      Genres ${jsonmovie.Year} //Year the movie came out.
      Rating ${jsonmovie.Rated} //IMDB Rating of the movie.
      Network ${jsonmovie.Ratings.Value} //Rotten Tomatoes Rating of the movie.
      Summary ${jsonmovie.Language}//Language of the movie.
      Summary ${jsonmovie.Plot}//Plot of the movie.
      Summary ${jsonmovie.Actors}//Actors in the movie.
       ---------------------------------------------------`);
            console.log(moviedetails);
            fs.appendFile("log.txt", moviedetails, function (err) {
                if (err) throw err;
                console.log(moviedetails);
            });
        });
        

        // Append the actor's name, birthday, gender, country, and URL to the `log.txt` file
        // Print this information to the console
    };

    this.ffindconcert = function (artisit) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp" ;

        // Add code to search the TVMaze API for the given actor
        request(URL, function (err, response, body) {
            //   var jsonactor = JSON.parse(body)[0].person;
            var jsonconcert = JSON.parse(body)[0].person);
            console.log(body);
            console.log(sonconcert);
            var moviedetails = (`
      -----------------------------------------------------
       Name   ${jsonconcert.Title} //Title of the movie.
      Genres ${jsonconcert.Year} //Year the movie came out.
      Rating ${jsonconcert.Rated} //IMDB Rating of the movie.
      Network ${jsonconcert.Ratings.Value} //Rotten Tomatoes Rating of the movie.
      Summary ${jsonconcert.Language}//Language of the movie.
      Summary ${jsonconcert.Plot}//Plot of the movie.
      Summary ${jsonconcert.Actors}//Actors in the movie.
       ---------------------------------------------------`);
            console.log(moviedetails);
            fs.appendFile("log.txt", moviedetails, function (err) {
                if (err) throw err;
                console.log(moviedetails);
            });
        });
        

        // Append the actor's name, birthday, gender, country, and URL to the `log.txt` file
        // Print this information to the console
    };
};

module.exports = SELECTOR;
