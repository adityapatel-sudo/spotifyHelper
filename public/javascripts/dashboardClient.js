//dashboardClient.js

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
    .then(response => console.log(response.json()))
    .then(data => {
        console.log('Response from server:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
