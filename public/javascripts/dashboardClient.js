//dashboardClient.js

var userObj
var userData
var userID
var simplifiedPlaylists

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

const playlists = getElementById('playlists');
const song_data = getElementById('song_data');
const temp = getElementById('temp');