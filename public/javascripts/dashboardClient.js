//dashboardClient.js

var userObj
var userData
var userID
var simplifiedPlaylists

const playlistsContent = document.getElementById("playlists_content")
const songContent = document.getElementById("song_content")
const tempContent = document.getElementById("temp_content")
const songInput = document.getElementById("songInput")

console.log(window.location.hash)
const accessToken = window.location.hash.split('#')[1].split('&')[0].split("access_token=")[1]
console.log(accessToken)

const userIDUrl = "https://api.spotify.com/v1/me"
const playlistsUrl = "https://api.spotify.com/v1/users/"
const playlistsUrl2 = "/playlists"
const headers = new Headers({
    'Authorization': "Authorization: Bearer  "+accessToken,
});

fetch(userIDUrl,{
    method: 'GET',
    headers: headers
}).then(result => {
        userObj = result.json().then(data => {
            userData = data
            console.log(data)
            console.log(data.display_name)
            const displayName = data.display_name;
            userID = data.id
            const textWelcome = document.getElementById("text_welcome")
            textWelcome.innerText = "Welcome " + displayName
            reload()
        })
    }).catch(error => {
        console.error('Error:', error);
    })

const playlistsIDUrl = "https://api.spotify.com/v1/me"

function togglePlaylists() {
    playlistsContent.style.display = "block";
    songContent.style.display = "none";
    tempContent.style.display = "none";
}
function toggleSongs() {
    playlistsContent.style.display = "none";
    songContent.style.display = "block";
    tempContent.style.display = "none";
}
function toggleTemp() {
    playlistsContent.style.display = "none";
    songContent.style.display = "none";
    tempContent.style.display = "block";
}
function reload() {

    var loaderWrapper = document.querySelector(".loader-wrapper");

    if (loaderWrapper) {
        loaderWrapper.style.transition = "opacity 0.5s";

        // Delay the fade-out by 500 milliseconds (0.5 seconds)
        setTimeout(function() {
            loaderWrapper.style.opacity = 0;

            // Hide the loader after the transition
            loaderWrapper.addEventListener("transitionend", function() {
                loaderWrapper.style.display = "none";
            });
        }, 500);
    }

}

var searchResult
var firstSearch
var songData
var songAcousticData
var songNameText = document.getElementById("song_name")
var albumNameText = document.getElementById("album_name")
var songPicture = document.getElementById("album_picture")

//song acoustic info docs:
let acousticness = document.getElementById("acousticness")
let dancability = document.getElementById("dancability")
let energy = document.getElementById("energy")
let instrumentalness = document.getElementById("instrumentalness")
let loudness = document.getElementById("loudness")
let speechiness = document.getElementById("speechiness")
let tempo = document.getElementById("tempo")
let valence = document.getElementById("valence")

function searchSong() {
    console.log("in search song")
    var songInput = document.getElementById("songInput");

    var searchUrl = 'https://api.spotify.com/v1/search';
    searchUrl += '?q=' + encodeURIComponent(songInput.value);
    searchUrl += '&type=track';
    console.log(searchUrl)

    fetch(searchUrl, {
        method:"GET",
        headers: headers
    }).then(result => {
        result.json().then(data => {
            searchResult = data
            firstSearch = searchResult.tracks.items[0]
            updateSong(firstSearch)
            console.log("found song")
            console.log(firstSearch)
        })
    })
}
function updateSong(song) {
    //get track
    var trackUrl = "https://api.spotify.com/v1/tracks/"+ song.id
    fetch(trackUrl, {
            method:"GET",
            headers: headers
        }).then(result => {
            result.json().then(data => {
                songData = data;
                songNameText.innerText = "Song Name: " +songData.name
                albumNameText.innerText = "Album Name: "+ songData.album.name
                let imagesArray = songData.album.images
                let chosenIndex = -1;
                let distanceFrom300 = 1000000
                for (let i = 0; i < imagesArray.length; i++) {
                    if (Math.abs(300-imagesArray[i].height) < distanceFrom300) {
                        chosenIndex = i
                        distanceFrom300 = Math.abs(300 - imagesArray[i].height)
                    }
                }
                songPicture.src = imagesArray[chosenIndex].url
                songPicture.style.display = "block";
                songPicture.style.margin = "auto";
                songPicture.style.padding = "30px";
                console.log(songData)
            })
    })
    // get acoustic data
    const acousticUrl = "https://api.spotify.com/v1/audio-features/" + song.id
    fetch(acousticUrl,{
        method:"GET",
        headers: headers
    }).then(response => {
        response.json().then(data => {
            songAcousticData = data
            acousticness.innerText =  data.acousticness
            dancability.innerText =  data.danceability
            energy.innerText =  data.energy
            instrumentalness.innerText = "Instrumentalness: "+ data.instrumentalness
            loudness.innerText = data.loudness
            speechiness.innerText = data.speechiness
            tempo.innerText =  data.tempo
            valence.innerText = "Valence: " + data.valence

            console.log(songAcousticData)
            updateProgressBar();

        })
    })
}
function updateProgressBar() {

   

    // Update the width of the progress bar
    var acoustic = document.getElementById('acousticness');
    var loud = document.getElementById('loudness');
    var dance = document.getElementById('dancability');
    var speech = document.getElementById("speechiness");
    var energy = document.getElementById('energy');
    var tempo = document.getElementById('tempo');
    var instrument = document.getElementById('instrumentalness');
    var valence = document.getElementById('valence');


    acoustic.style.width = (songAcousticData.acousticness * 100).toFixed(2) + '%';
    let decibals = Math.min(0, Math.max(-60, songAcousticData.loudness));
    decibals = (((decibals + 60) / 60) * 100).toFixed(2);
    loud.style.width =  decibals + '%';
    dance.style.width = (songAcousticData.danceability * 100).toFixed(2) + '%';
    speech.style.width = (songAcousticData.speechiness * 100).toFixed(2) + '%';
    energy.style.width = (songAcousticData.energy * 100).toFixed(2) + '%';
    tempo.style.width =  (songAcousticData.tempo / 2).toFixed(2) + '%';
    instrument.style.width = (songAcousticData.instrumentalness * 100).toFixed(2) + '%';
    valence.style.width = (songAcousticData.energy * 100).toFixed(2) + '%';

    // Update the text inside the progress bar
    document.getElementById('acousticness').textContent = songAcousticData.acousticness * 100 + '%';
    document.getElementById('loudness').textContent = decibals + '%';
    document.getElementById('dancability').textContent = songAcousticData.danceability * 100 + '%';
    speech.textContent =  songAcousticData.speechiness * 100 + '%';
    energy.textContent =  songAcousticData.energy * 100 + '%';

    tempo.textContent = songAcousticData.tempo + "%";
    instrument.textContent =  songAcousticData.instrumentalness * 100 + '%';


}



