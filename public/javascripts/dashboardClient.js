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

let topPlaylistData
let newPlaylistID
let newPlaylistURL
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



/**
 * gets users top songs in timeframe and creates playlist with the songs
 *
 */
function createPlaylist() {
    disableButton("create_playlist_top_songs")
    var select_playlist_length = document.getElementById("select_playlists")
    var length;
    switch (select_playlist_length.selectedIndex) {
        case 0:
           length = "short_term"
           break;
        case 1:
            length = "medium_term"
            break;
        case 2:
            length = "long_term"
            break
    }
    console.log(length)
    let type = "tracks"
    var getTopTracksURL = 'https://api.spotify.com/v1/me/top/tracks';
    getTopTracksURL += '?time_range=' + encodeURIComponent(length);
    getTopTracksURL += '&limit=50';
    console.log(getTopTracksURL)

    fetch(getTopTracksURL, {
        method:"GET",
        headers: headers
    }).then(response => {
        response.json().then(data => {
            topPlaylistData = data
            console.log(topPlaylistData)
            var createPlaylistURL = "https://api.spotify.com/v1/users/"+userID+"/playlists"
            var today = new Date()
            var day = today.getDate();
            var month = today.getMonth() + 1; // Months are zero-based, so add 1
            var year = today.getFullYear() % 100; // Get the last two digits of the year
            day = (day < 10) ? '0' + day : day;
            month = (month < 10) ? '0' + month : month;
            var formattedDate = month + '/' + day + '/' + year;
            var playlistBody = {
                name: "Top Songs "+formattedDate,
                description: "Playlist created by MyCadence. Includes Top songs from "+length
            }
            fetch(createPlaylistURL, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(playlistBody)
            })
                .then(response => response.json())
                .then(data => {
                    newPlaylistID = data.id
                    newPlaylistURL = data.external_urls.spotify
                    console.log(data)
                    console.log(newPlaylistID)
                    addSongs()
                })
        })
    })
}

function enablePlaylistButton() {
    let playlistButton = document.getElementById("open_playlist")
    playlistButton.style.display = "inline-block"
    playlistButton.addEventListener("click",function () {
        window.open(newPlaylistURL)
    })
}

function disableButton(elementID) {
    let myButton = document.getElementById(elementID);
    // Disable the button
    myButton.disabled = true;
    // Set a timeout to enable the button after 5 seconds (5000 milliseconds)
    setTimeout(function() {
        myButton.disabled = false;
    }, 5000);
}

function addSongs(){
    let addSongsURL = "https://api.spotify.com/v1/playlists/"+newPlaylistID+"/tracks"
    let songsArray = []
    for (let i = 0; i < topPlaylistData.total; i++) {
        songsArray[i] = topPlaylistData.items[i].uri
    }
    let songsBody = {
        uris:songsArray
    }
    console.log(songsBody)
    fetch(addSongsURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(songsBody)
    }).then(request => request.json()).then(res => {
        showNotification("Playlist Created")
        enablePlaylistButton()
    })
}

function showNotification(message) {
    var notification = document.getElementById('notification');
    var notiText = document.getElementById("notification_text")
    notiText.innerText = message
    // Show the notification
    notification.style.opacity = 1;
    notification.classList.remove('hidden');

    // Set a timeout to fade out the notification after 3 seconds (adjust as needed)
    setTimeout(function() {
        notification.style.opacity = 0;
        // Hide the notification after fading out
        setTimeout(function() {
            notification.classList.add('hidden');
        }, 500); // Adjust this timeout to match the transition duration
    }, 3000); // Adjust this timeout to control how long the notification is visible
}


async function getInfo() {
    const completion = await ({

        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
}