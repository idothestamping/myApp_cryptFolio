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

// Route for Top10 By Volume page
router.get('/', loggedIn, function(req, res){
    var top10url = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key={" + process.env.MY_APIKEY + "}"
    request(top10url, function(error, response, body) {
        var top10 = JSON.parse(body);
        res.render('coins/top10', {top10: top10.Data});        
    })
});

module.exports = router;