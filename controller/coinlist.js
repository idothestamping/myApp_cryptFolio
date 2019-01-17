require('dotenv').config();
var express = require('express');
var request = require('request');
var db = require('../models');
var router = express.Router();

var apiCoinList = "https://www.cryptonator.com/api/currencies"


router.get('/refreshcointable', function(req, res) {
  	request(apiCoinList, function(error, response, body) {
        var coinList = JSON.parse(body);
        console.log(coinList);
        // console.log('API call response:', body);
        if(body){
            coinList.rows.forEach(function(c){
                db.cointype.findOrCreate({
                    where: { code: c.code },
                    defaults: {
                        name: c.name,
                        statuses: c.statuses
                    }
                  }).then(function(data) {
                      console.log(data);
                      res.send(coinList)
                    //   res.redirect('profile');
                  }).catch(function(error) {
                      console.log('this is the error ' + error);
                  });
            })   
        }
        else if(error){
            console.log(error);
            res.send('error')
        }
      });
});

router.get('/', function(req, res) {
    request(apiCoinList, function(error, response, body) {
      var coinList = JSON.parse(body);
      console.log(coinList);
      // console.log('API call response:', body);
      if(body){
          coinList.rows.forEach(function(c){
              db.cointype.findOrCreate({
                  where: { 
                      code: c.code,
                 },
                  defaults: {
                      name: c.name,
                      statuses: c.statuses
                  }
                }).then(function(data) {
                    console.log(data);
                    res.send(coinList)
                  //   res.redirect('profile');
                }).catch(function(error) {
                    console.log('this is the error ' + error);
                });
          })   
      }
      else if(error){
          console.log(error);
          res.send('error')
      }
    });
});
module.exports = router;