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
            acousticness.innerText = "Acousticness: " + data.acousticness
            dancability.innerText = "Danceability: " + data.danceability
            energy.innerText = "Energy: "+ data.energy
            instrumentalness.innerText = "Instrumentalness: "+ data.instrumentalness
            loudness.innerText = "Loudness: "+ data.loudness
            speechiness.innerText = "Speechiness: "+data.speechiness
            tempo.innerText = "Tempo: " + data.tempo
            valence.innerText = "Valence: " + data.valence

            console.log(songAcousticData)
        })
    })
}

