//dashboardClient.js

var userObj

console.log(window.location.hash)
const accessToken = window.location.hash.split('#')[1].split('&')[0].split("access_token=")[1]
console.log(accessToken)

const userIDUrl = "https://api.spotify.com/v1/me"
const headers = new Headers({
    'Authorization': "Authorization: Bearer  "+accessToken,
});

fetch(userIDUrl,{
    method: 'GET',
    headers: headers
})
    .then(result => {
        userObj = result.json().then(userData => {
            console.log(userData)
            console.log(userData.display_name)
            const displayName = userData.display_name;
            const textWelcome = document.getElementById("text_welcome")
            textWelcome.innerText = "Welcome " + displayName
        })
    })
    .catch(error => {
        console.error('Error:', error);
    })
