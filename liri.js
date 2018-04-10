require("dotenv").config();
var request = require("request");
var keys = require('./keys.js');
var fs = require('fs');
var userInput1 = process.argv[2];
// var userInput2 = process.argv[3];



// TWITTER STUFF //
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
function getTweets(){
    var parameters = {
    screen_name: 'urcodebootcamp',
    count: 10
    };
	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
                console.log(`============================Tweet: ${(i+1)}===============================
                ${tweets[i].created_at}
                ${tweets[i].text}
                `);
                console.log("=====================================================================");
                fs.appendFile('./log.txt',
                `
                ============================Tweet: ${(i+1)}===============================
                ${tweets[i].created_at}
                ${tweets[i].text}
                =====================================================================
                `, (err) => {
                  if (err) throw err;
                  console.log('The "data to append" was appended to file!');
                });
	        }
	    };
	});
};
// END TWITTER STUFF //


    //  SPOTIFY STUFF //
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

	function getSong(songName) {
        var songName = process.argv[3];
        for(i=4; i<process.argv.length; i++){
            songName += '+' + process.argv[i];
        }
        var defaultSong = "all the small things";
        if (songName !== undefined) {
             defaultSong = songName;
        }
    spotify.search({ type: 'track', query: defaultSong }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }else {
            console.log('===================Liri Music========================');
            console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
            console.log(`Song Name: ${data.tracks.items[0].name}`);
            console.log(`Spotify Preview Link: ${data.tracks.items[0].external_urls.spotify}`);
            console.log(`Album: ${data.tracks.items[0].album.name}`);
            console.log('=====================================================');
            fs.appendFile('./log.txt',
            `
            ===================Liri Music========================
            Artist: ${data.tracks.items[0].artists[0].name}
            Song Name: ${data.tracks.items[0].name}
            Spotify Preview Link: ${data.tracks.items[0].external_urls.spotify}
            Album: ${data.tracks.items[0].album.name}
            =====================================================
            `, (err) => {
              if (err) throw err;
              console.log('The "data to append" was appended to file!');
            });
        }
    });
};
// END SPOTIFY STUFF



// OMDB STUFF
function getMovie() {
    var movie = process.argv[3];
    for(i=4; i<process.argv.length; i++){
        movie += '+' + process.argv[i];
    }
    var defaultMovie = "Sharknado";
    if (movie !== undefined) {
         defaultMovie = movie;
    }

	var url = `http://www.omdbapi.com/?apikey=trilogy&t=${defaultMovie}&y=&plot=long&tomatoes=true&r=json`;
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
            var movieData = JSON.parse(body);
            // * Title of the movie.
            console.log(`Title: ${movieData.Title}`);
            // * Year the movie came out.
            console.log(`Year: ${movieData.Year}`);
            // * IMDB Rating of the movie.
            console.log(`IMDB Rating: ${movieData.imdbRating}`);
            // * Rotten Tomatoes Rating of the movie.
            console.log(`Rotten Tomatoes Rating: ${movieData.tomatoUserRating}`);
            console.log(`Rotten Tomatoes URL: ${movieData.tomatoURL}`);
            // * Country where the movie was produced.
            console.log(`Country: ${movieData.Country}`);
            // * Language of the movie.
            console.log(`Language: ${movieData.Language}`);
            // * Plot of the movie.
            console.log(`Plot: ${movieData.Plot}`);
            // * Actors in the movie.
            console.log(`Actors: ${movieData.Actors}`);
            fs.appendFile('./log.txt',
            `
            ===================Liri Movies======================== 
            Title: ${movieData.Title}
            Year: ${movieData.Year}
            IMDB Rating: ${movieData.imdbRating}
            Rotten Tomatoes Rating: ${movieData.tomatoUserRating}
            Rotten Tomatoes URL: ${movieData.tomatoURL}
            Country: ${movieData.Country}
            Language: ${movieData.Language}
            Plot: ${movieData.Plot}
            Actors: ${movieData.Actors}
            =====================================================
            `, (err) => {
              if (err) throw err;
              console.log('The "data to append" was appended to file!');
            });
	    }
    });
}
// END OMDB STUFF



// DO WHAT IT SAYS STUFF
function getRandom() {
    fs.readFile("random.txt", "utf8", function(error, data)
    {
        // If an error was experienced we say it.
        if(error){
            console.log(error);
        }
         else {
              var dataArray = data.split(',');
              var argOne = dataArray[0];
              var argTwo = dataArray[1];
              switch(argOne) {
                   case "spotify-this-song":
                        function getSong() {
                             var queryInput = "what's my age again";
                             if (argTwo !== undefined) {
                                  queryInput = argTwo;
                             }
                             spotify.search({ type: 'track', query: queryInput, count: 1 }, function(err, data) {
                                  if ( err ) {
                                       console.log('Error occurred: ' + err);
                                       return;
                                  }
                                  console.log('===================Liri Music========================');
                                  console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
                                  console.log(`Song Name: ${data.tracks.items[0].name}`);
                                  console.log(`Spotify Preview Link: ${data.tracks.items[0].external_urls.spotify}`);
                                  console.log(`Album: ${data.tracks.items[0].album.name}`);
                                  console.log('=====================================================');
                                  fs.appendFile('./log.txt',
                                  `
                                  ===================Liri Music========================
                                  Artist: ${data.tracks.items[0].artists[0].name}
                                  Song Name: ${data.tracks.items[0].name}
                                  Spotify Preview Link: ${data.tracks.items[0].external_urls.spotify}
                                  Album: ${data.tracks.items[0].album.name}
                                  =====================================================
                                  `, (err) => {
                                    if (err) throw err;
                                    console.log('The "data to append" was appended to file!');
                                  });
                             })
                        };
                        getSong();
                        break;
              }
         }
    });
}
// END DO WHAT IT SAYS STUFF


// LIRI COMMANDS //
switch(userInput1) {
    case "my-tweets":
         getTweets();
         break;
    case "spotify-this-song":
         getSong();
         break;
    case "movie-this":
         getMovie();
         break;
    case "do-what-it-says":
         getRandom();
         break;
}
// END LIRI COMMANDS 
