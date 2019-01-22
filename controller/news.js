var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
require('dotenv').config();

var loggedIn = require('../middleware/loggedin');
var isAdmin = require('../middleware/isAdmin');

var Sequelize = require('sequelize');
const Op = Sequelize.Op;
global.fetch = require('node-fetch')
const cc = require('cryptocompare')
cc.setApiKey(process.env.MY_APIKEY)

// route for Top 10 Market Share link
router.get('/', loggedIn, function(req, res){
    var newsUrl = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key={" + process.env.MY_APIKEY + "}"
        request(newsUrl, function(error, response, body) {
            var newsResult = JSON.parse(body);
            res.render('coins/news', {newsResult: newsResult.Data} );        
            
        })
   });

module.exports = router;