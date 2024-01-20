//indexClient.js


var client_id = '3b69f31f92be469e9dae0c7ab96856c9';
var redirect_uri = 'https://www.mycadences.com/authorizeSpotify'
//var redirect_uri = 'http://localhost:3000/authorizeSpotify';

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
var state = generateRandomString(16);
var stateKey = "SpotifyStateKey"
localStorage.setItem(stateKey, state);
var scope = 'user-read-private user-read-email ' +
    'playlist-read-private playlist-read-collaborative ' +
    'playlist-modify-private playlist-modify-public ' +
    'user-library-modify user-library-read';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);

const sign_in_button = document.getElementById('sign_in_button');
sign_in_button.addEventListener('click',function (e) {
    console.log("button pressed")
    console.log(url)
    window.open(url, '_blank');
})