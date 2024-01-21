//dashboardClient.js

var userObj
var userData
var userID
var simplifiedPlaylists

const playlistsContent = document.getElementById("playlists_content")
const songContent = document.getElementById("song_content")
const tempContent = document.getElementById("temp_content")

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

            var playListsUrlFinal = playlistsUrl + userID + playlistsUrl2
            fetch(playListsUrlFinal, {
                method: 'GET',
                headers: headers
            }).then(result => {
                result.json().then(data => {
                    console.log(data)
                })
            })
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
