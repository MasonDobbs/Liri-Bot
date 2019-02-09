var dotenv = require("dotenv").config();

var fs = require("fs");

var keys = require("./keys.js");

var input = process.argv.slice(2).join(" ");

var concert = input.includes("concert-this");

var song = input.includes("spotify-this-song");

var movie = input.includes("movie-this");

var says = input.includes("do-what-it-says");

//searched song variable from doWhatSays function gives back undefined

function searchParam() {

    if (concert) {
        var searchedConcert = input.split("concert-this ")[1];
        console.log("Searching for " + searchedConcert);
    }
    else if (song) {
        var songSearched = input.split("spotify-this-song ")[1];
        console.log("Searching for " + songSearched);
    }
    else if (movie) {
        var movieSearched = input.split("movie-this ")[1];
        console.log("Searching for " + movieSearched);
    }

}

function doWhatSays() {

    if (says) {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                console.log(error);
            }
            var dataArr = data.split(",")[1];
            
            var concert = data.includes("concert-this");

            var song = data.includes("spotify-this");

            var movie = data.includes("movie-this");

            if (concert) {
                var searchedConcert = input.split("concert-this,")[1];
                console.log("Searching for " + searchedConcert);
            }
            else if (song) {
                var searchedSong = input.split("spotify-this-song,")[1];
                console.log("Searching for " + searchedSong);
            }
            else if (movie) {
                var searchedMovie = input.split("movie-this,")[1];
                console.log("Searching for " + searchedMovie);
            }

        });
    }

}

searchParam();
doWhatSays();

//searched song variable from doWhatSays function gives back undefined