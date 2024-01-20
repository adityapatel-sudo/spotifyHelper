var express = require('express');
var path = require('path');
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

app.use('/', indexRouter);
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/dashboard.html'), { title: 'MyCadence' });
});
app.get('/authorizeSpotify', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/dashboard.html'));
});
module.exports = app;
