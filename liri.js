// http://www.omdbapi.com/?apikey=trilogy&t=+movie
var SELECTOR = require("./selector");
require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
// Create a new Selector object
var selector = new SELECTOR();

var search = process.argv[2];
var term = process.argv.slice(3).join(" "); 


// if (!search) {
//     search = "spotify-this-song";
//   }if (!term) {
//     term = "Andy Griffith";
//   }
  
  // By default, if no search term is provided, search for "Andy Griffith"
  
  
  // Print whether searching for a show or actor, print the term as well
  if (search === "spotify-this-song") {
    if(term === undefined){
        term = "The Sign";
    }else if (search==="movie-this"){
        if(term===undefined){
            term = "Masks"
        }
    }else if (search === "concert-this"){
        if(term === undefined){
            term = "justin"
        }
        selector.findconcert(term);
    }
    //console.log("Searching for Song");
    selector.findSong(term);
  }  else{
    selector.findmovie(term);
    console.log("Searching for Movie");

  }

