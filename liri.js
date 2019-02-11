var dotenv = require("dotenv").config();

var axios = require("axios");

var fs = require("fs");

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var input = process.argv.slice(2).join(" ");

var concert = input.includes("concert-this");

var song = input.includes("spotify-this-song");

var movie = input.includes("movie-this");

var says = input.includes("do-what-it-says");

var spotify = new Spotify(keys.spotify);

var songSearched = input.split("spotify-this-song ")[1];

var searchedConcert = input.split("concert-this ")[1];

var movieSearched = input.split("movie-this ")[1];

function artist() {
    var artist = "https://rest.bandsintown.com/artists/" + searchedConcert + "/events?app_id=codingbootcamp";

    axios.get(artist).then(function (response) {
        var jsonData = response.data[0].venue;

        var concertData = [
            "Venue Name: " + jsonData.name,
            "\nVenue Location: " + jsonData.city,
            "\nDate of Venue: " + jsonData.datetime
        ];

        console.log(concertData);

    });
}

function spotifySong() {
    spotify.search({ type: 'track', query: songSearched }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
        } else {

            console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2) + "\n ");
            console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n ");
            console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name) + "\n ");
            console.log("Link: " + JSON.stringify(data.tracks.items[0].album.external_urls));
        }
    });
};

function movieInfo() {
    var URL = "http://www.omdbapi.com/?t=" + movieSearched + "&y=&plot=short&apikey=40e9cece";

    axios.get(URL).then(function (response) {

        var jsonData = response.data;

        var movieData = [
            "Title: " + JSON.stringify(jsonData.Title),
            "\nYear: " + JSON.stringify(jsonData.Year),
            "\nIMDB Rating: " + JSON.stringify(jsonData.imdbRating),
            "\nRotten Tomatoe Rating: " + JSON.stringify(jsonData.Ratings[1].Value),
            "\nCountry: " + JSON.stringify(jsonData.Country),
            "\nLanguage: " + JSON.stringify(jsonData.Language),
            "\nPlot: " + JSON.stringify(jsonData.Plot),
            "\nActors: " + JSON.stringify(jsonData.Actors)
        ];

        console.log(movieData);
    });
};


function searchParam() {

    if (concert) {
        var searchedConcert = input.split("concert-this ")[1];
        console.log("Searching for " + searchedConcert);
        artist();
    }
    else if (song) {
        var songSearched = input.split("spotify-this-song ")[1];
        console.log("Searching for " + songSearched);
        spotifySong();
    }
    else if (movie) {
        var movieSearched = input.split("movie-this ")[1];
        console.log("Searching for " + movieSearched);
        movieInfo();
    }

}

function doWhatSays() {

    if (says) {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                console.log(error);
            }

            var concert = data.includes("concert-this");

            var song = data.includes("spotify-this-song");

            var movie = data.includes("movie-this");

            if (concert) {
                var searchedConcert = data.split("concert-this,")[1];
                console.log("Searching for" + searchedConcert);
                artist();
            }
            else if (song) {
                var searchedSong = data.split("spotify-this-song,")[1];
                console.log("Searching for" + searchedSong);
                spotifySong();
            }
            else if (movie) {
                var searchedMovie = data.split("movie-this,")[1];
                console.log("Searching for" + searchedMovie);
                movieInfo();
            }

            spotify.search({ type: 'track', query: songSearched }, function (err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                } else {

                    console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2) + "\n ");
                    console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n ");
                    console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name) + "\n ");
                    console.log("Link: " + JSON.stringify(data.tracks.items[0].album.external_urls));
                }
            });

        });
    }

}

searchParam();
doWhatSays();
