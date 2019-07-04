// Retrieve DATA from the OMDb
function searchMovie() {
    // get user input
    var userInput = document.getElementById("searchInput").value;
    console.log("User Input: " + userInput);
    
    var site = "http://www.omdbapi.com/";
    var apiKey = "?apikey=2dcf62d4&s=";
    var searchInput = encodeURIComponent(userInput);
    var url = site + apiKey + searchInput;
    console.log("search request URL: " + url);
    
    var request = new XMLHttpRequest();
    
    request.onload = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("Retrieved data from OMDb server: " + this.responseText);
            
            var results = JSON.parse(this.responseText);
            
            databaseResults(results);
        }
        else{
            console.log("Database request failed, check url: " + url);
        }
    }
    request.open('GET', url);
    request.send();
};

// Process DATA from the OMDb
function databaseResults(movieInfo) {
    console.log("Movie Titles retrieved from DB for processing: " + movieInfo.Search);
    
    var select = document.getElementById("searchResults");
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    
    if(movieInfo.Search && movieInfo.Search.length > 1){
        for(var i = 0; i < movieInfo.Search.length; i++) {
            document.getElementById("searchResults").innerHTML +=
                "<b>Title: </b>" +
                movieInfo.Search[i].Title +
                '----<button onclick="getMovieDetails(this.value)" value="' +
                movieInfo.Search[i].imdbID.trim() +
                '">Click for more Movie Details</button><br><br>';
        }
    }
    
};

// Gather Additional Movie Details from OMDb
function getMovieDetails(imdbID) {
    // get Movie ID
    var movieID = imdbID;
    
    var site = "http://www.omdbapi.com/";
    var apiKey = "?apikey=2dcf62d4&i=";
    var searchInput = encodeURIComponent(movieID);
    var full = "&plot=full";
    var url = site + apiKey + searchInput + full;
    console.log("search request URL: " + url);
    
    var request = new XMLHttpRequest();
    
    request.onload = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("Retrieved data from OMDb server: " + this.responseText);
            
            var results = JSON.parse(this.responseText);
            
            databaseDetails(results);
        }
        else{
            console.log("Database request failed, check url: " + url);
        }
    }
    request.open('GET', url);
    request.send();
};

// Process ADDITION DETAILS from the OMDb
function databaseDetails(movieInfo) {
    console.log("Movie Additional Info retrieved from DB for processing: " + movieInfo.title);
    
    var select = document.getElementById("additionalInfo");
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    
    document.getElementById("additionalInfo").innerHTML +=
        "<b>Title: </b>" +
        movieInfo.Title +
        "<br><b>OMDb ID: </b>" +
        movieInfo.imdbID +
        "<br><b>Additional Details:</b><br>" +
        movieInfo.Plot +
        "<br><img src='" + movieInfo.Poster + "' alt='Post of " + movieInfo.Title + "'>";    
};