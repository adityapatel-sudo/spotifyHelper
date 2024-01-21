var express = require('express');
var path = require('path');
require('dotenv').config();
var chatGPTclient = process.env.chatgpt_client_API
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.chatgpt_client_API,
    organization: 'org-Vu8WKlWuorYXSPr54tLv2nGD',
});
const bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/dashboard.html'), { title: 'MyCadence' });
});
app.get('/authorizeSpotify', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/dashboard.html'));
});
app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    /*recieved data should be array of variables in the form
    * {
        Acousticness: 0.255
Danceability: 0.441
Energy: 0.403
Instrumentalness: 0.0000127
Loudness: -11.18
Speechiness: 0.147
Tempo: 139.92
Valence: 0.158}

    * */
    console.log('Received data:', receivedData);
    var body = {
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are Caden, a funny assistant. Address the user as "+userData.displayName+"." +
                "You will be given data about a User's Spotify music listening habits. Using this data, create a 100-200 word summary of the users habit. Your goal is to be informative and politely humorous. Here are the following criteria. Given the following 8 characteristics, describe the user.\n" +
                "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.\n" +
                "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.\n" +
                "Predicts whether a track contains no vocals. \"Ooh\" and \"aah\" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly \"vocal\". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.\n" +
                "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.\n" +
                "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.\n" +
                "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.\n" +
                "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."},
            {"role": "user", "content": "Where was it played?"}],    }
    openai.chat.completions.create(body)

    let url = 'https://api.openai.com/v1/chat/completions';
    const headers = new Headers({
        "Content-Type": "application/json",
        'Authorization': "Authorization: Bearer "+process.env.chatgpt_client_API,
    });    fetch()

    // Process the data or send a response
    res.json({ message: 'Data received successfully' });
});

app.get
module.exports = app;

