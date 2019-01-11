//enviroment variables
require('dotenv').config();

var flash = require('connect-flash');
var express = require('express');
var layouts = require('express-ejs-layouts');
var parser = require('body-parser');
var session = require('express-session');
var passport = require('./config/passportConfig');

var app = express();
var db= require('./models');

app.set('view engine', 'ejs');

app.use(layouts);
app.use('/', express.static('./static'));
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

app.use(flash());

app.use(function(req, res, next){
	res.locals.alerts = req.flash();
	res.locals.user = req.user;
	next();
});

app.get('/', function(req, res){
	res.render('home');
});


app.use('/auth', require('./controller/auth'));
app.use('/profile', require('./controller/profiles'));


app.listen(3000, function(){
  console.log('I\'m listening to the smooth sounds of port 3000 in the morning. ☕');
});