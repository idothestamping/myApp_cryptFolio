require('dotenv').config();
var express = require('express');
var request = require('request');
var db = require('../models');
var router = express.Router();

//https://api.cryptonator.com/api/full/btc-usd


router.post('/', function(req, res) {
    console.log(req.body.selectionbox);
    var searchUrl = "https://api.cryptonator.com/api/full/" + req.body.selectionbox + "-usd"
    console.log(searchUrl);
    request(searchUrl, function(error, response, body) {
      var coinDetail = JSON.parse(body);
      console.log('API call response:', body);
      if(body){
    	res.render('coins/show', { coinDetail: coinDetail });
      }
      else if(error){
          console.log(error);
          res.send('error')
      }
    });
});
module.exports = router;

