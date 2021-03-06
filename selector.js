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
        console.log("findsong");
        console.log(song);
        // var URL = spotify.search({ type: 'track', query: song });

        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //var jsonsong = JSON.parse(data);
            var jsonsong = data;
            console.log("JSONSONG: " + jsonsong);
            //console.log("Spoptify data return" + data);
            var songData = [
                "Show: " + jsonsong.name,
                "Genre(s): " + jsonsong.genres,
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
        //console.log(URL);
        // request(URL, function (err, response, body) {
        //     // parse the response body (string) to a JSON object
        //     var jsonsong = JSON.parse(body);



        //    // showData ends up being the string containing the show data we will print to the console

        // });
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
      Network ${jsonmovie.Ratings} //Rotten Tomatoes Rating of the movie.
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

    this.findconcert = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        // Add code to search the TVMaze API for the given actor
        request(URL, function (err, response, body) {
            //   var jsonactor = JSON.parse(body)[0].person;
            //var jsonconcert = JSON.parse(body)[0].offers;
            console.log("Body console "+body);
            var jsonconcert = JSON.parse(body);
            
            console.log(jsonconcert[0].venue);
            var moviedetails = (`
      -----------------------------------------------------
      Venue Name   ${jsonconcert[0].venue.name} 
      Venue Country ${jsonconcert[0].venue.country} 
      Venue Region ${jsonconcert[0].venue.region} 
      Venue City ${jsonconcert[0].venue.city} 
      Concert Date ${jsonconcert[0].datetime}
    
       ---------------------------------------------------`);
            
            fs.appendFile("log.txt", jsonconcert, function (err) {
                if (err) throw err;
                console.log(jsonconcert);
            });
        });
    };
};

module.exports = SELECTOR;
