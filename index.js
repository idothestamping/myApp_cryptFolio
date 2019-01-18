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
var db= require('./models');
var app = express();
global.fetch = require('node-fetch')

app.set('view engine', 'ejs');
app.use(layouts);
app.use('/', express.static('./public'));
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
	res.render('index');
  });


// app.use(function(req, res, next) {
// 	for (var key in req.query)
// 	{ 
// 	  req.query[key.toLowerCase()] = req.query[key];
// 	}
// 	next();
//   });

app.use('/auth', require('./controller/auth'));
app.use('/profile', require('./controller/profiles'));
app.use('/coinlist', require('./controller/coinlist'));
app.use('/main', require('./controller/main'));
app.use('/coindetail', require('./controller/coindetail'));

var server = app.listen(process.env.PORT || 3000, function(){
	console.log("Hello World!");
});

module.exports = server;