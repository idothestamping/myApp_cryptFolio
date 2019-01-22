//enviroment variables
require('dotenv').config();
var flash = require('connect-flash');
var express = require('express');
var request = require('request');
var layouts = require('express-ejs-layouts');
var parser = require('body-parser');
var favicon = require('serve-favicon');
var session = require('express-session');
var passport = require('./config/passportConfig');
var loggedin = require('./middleware/loggedin');
var methodOverride = require('method-override');
var db= require('./models');
var app = express();
global.fetch = require('node-fetch')

app.set('view engine', 'ejs');
app.use(layouts);
app.use('/', express.static('public'));
app.use(methodOverride('_method'));
app.use(favicon(__dirname + '/public/img/fingerheart.ico'));
app.use(parser.urlencoded({ extended: false }));
// order matters here for session, before flash
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.alerts = req.flash();
	res.locals.currentUser = req.user;
	next();
});

app.get('/', function(req, res) {
	console.log('LOADING ROUTE - HOME PAGE')
	res.render('index');
});

app.use('/news', require('./controller/news'));
app.use('/auth', require('./controller/auth'));
app.use('/profile', require('./controller/profiles'));
app.use('/main', require('./controller/main'));
app.use('/top10', require('./controller/top10'));
app.use('/topmarket', require('./controller/topmarket'));

var server = app.listen(process.env.PORT || 3000, function(){
	console.log("Hello World!");
});

module.exports = server;