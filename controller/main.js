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
    res.render('main');
});


// router.get('/', loggedIn, function(req, res) {
//     var initialUrl = "https://api.cryptonator.com/api/full/btc-usd"
// 	db.cointype.findAll()
//         .then(function(coin) {
//         var coin = JSON.parse(coin);
//         request(initialUrl, function(error, response, body) {
//             var coinDetail = JSON.parse(body.ticker);
//             db.coin.findOrCreate({
//                     base: coinDetail.base,
//                     target: coinDetail.target,
//                     price: coinDetail.price,
//                     volume: coinDetail.volume,
//                     change: coinDetail.change
//             })
//             .then(function(thisCoin){
//                 var coinDetail = JSON.parse(thisCoin);
//                 console.log("resultCoin: ", coinDetail);
//             res.send('main', {coin: coin}, {coinDetail: coinDetail})            
//             // res.render('main', {coin: coin, thisCoin: thisCoin})
//             })
//     })
//     })
// });


// router.post('/result', loggedIn, function(req, res) {
//     // var searchUrl = "https://api.cryptonator.com/api/full/" + req.body.search + "-usd"
//     var searchUrl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + req.body.search.toUpperCase() +"&tsyms=USD,EUR&api_key={" + process.env.MY_APIKEY + "}"
//     request(searchUrl, function(error, response, body) {
//       var coinDetail = JSON.parse(body);
//       if(body){
//         console.log("am i here?");
//          res.render('coins/show', { coinDetail: coinDetail });
//       }
//       else if(error){
//           console.log(error);
//           res.send('error')
//       }
//     });
// });

router.get('/admins', function(req, res){
    res.render('admin');
});

router.post('/result', loggedIn, function(req, res) {
    var searchname = req.body.search.toUpperCase()
    console.log(searchname)
    cc.coinList()
    .then(coinList => {
        res.render('coins/show', { 
            coinDetail: coinList.Data[searchname]
        });
  // ->
  // 
  //   BTC: {
  //    Id: "1182",
  //    Url: "/coins/btc/overview",
  //    ImageUrl: "/media/19633/btc.png",
  //    Name: "BTC",
  //    Symbol: "BTC",
  //    CoinName: "Bitcoin",
  //    FullName: "Bitcoin (BTC)",
  //    Algorithm: "SHA256",
  //    ProofType: "PoW",
  //    FullyPremined: "0",
  //    TotalCoinSupply: "21000000",
  //    PreMinedValue: "N/A",
  //    TotalCoinsFreeFloat: "N/A",
  //    SortOrder: "1",
  //    Sponsored: false
  // },
  //   ETH: {...},
  // }
})
.catch(console.error)
});


router.post('/favorite', function(req, res) {
    console.log("we here now", req.body)
    // TODO: Get form data and add a new record to DB
    // db.coin.findOrCreate({ 
    //     where: { name: req.body.name }
    //     })
    // .spread( function(pokemon, created) {
    //     console.log(pokemon.get());
    //     res.redirect('/pokemon');
    // })
    // .catch( function(error){
    //   console.log("error", error);
    //   res.render('error')
    // })
  
  });



module.exports = router;