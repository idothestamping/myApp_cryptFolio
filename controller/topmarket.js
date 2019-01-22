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


router.get('/', loggedIn, function(req, res){
    var top10marketUrl = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key={" + process.env.MY_APIKEY + "}"
    request(top10marketUrl, function(error, response, body) {
        var top10market = JSON.parse(body);
        res.render('coins/topmarket', {top10market: top10market.Data });
        })
   });

module.exports = router;