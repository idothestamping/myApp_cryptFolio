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
    console.log(req.user);
	db.coin.findAll().then(function(favcoin) {
        console.log(favcoin);
        res.render('main', {favcoin: favcoin});
   })
   // db.favorite.count({where: {userId: req.user.id}}).then(function(data) {
   // 	console.log('this is the data passed back', data)
   // 	if (data === 0) {
   // 		res.render('profile', {count: data});
   // 	};
   // });

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
    .then(function(coinList){
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


router.post('/favorite', loggedIn, function(req, res) {
    console.log("INSIDE ROUTE")
    var faveName = req.body.Symbol
    // console.log(req.body)
    cc.coinList()
    .then(coinList => {
        console.log("INSIDE THEN")
        db.coin.findOrCreate({ 
            where: { 
                Id: coinList.Data[faveName].Id,
                // Url: coinList.Data[faveName].Url,
                // ImageUrl: coinList.Data[faveName].ImageUrl,
                // Name: coinList.Data[faveName].Name,
                // Symbol: coinList.Data[faveName].Symbol,
                // CoinName: coinList.Data[faveName].CoinName,
                // Algorithm: coinList.Data[faveName].Algorithm,
                // ProofType: coinList.Data[faveName].ProofType,
                // FullyPremined: coinList.Data[faveName].FullyPremined,
                // TotalCoinSupply: coinList.Data[faveName].TotalCoinSupply,
                // BuiltOn: coinList.Data[faveName].BuiltOn,
                // SmartContractAddress: coinList.Data[faveName].SmartContractAddress,
                // PreMinedValue: coinList.Data[faveName].PreMinedValue,
                // TotalCoinsFreeFloat: coinList.Data[faveName].TotalCoinsFreeFloat,
                // SortOrder: coinList.Data[faveName].SortOrder,
                // Sponsored: coinList.Data[faveName].Sponsored,
                // IsTrading: coinList.Data[faveName].IsTrading,
                // TotalCoinsMined: coinList.Data[faveName].TotalCoinsMined,
                // BlockNumber: coinList.Data[faveName].BlockNumber,
                // NetHashesPerSecond: coinList.Data[faveName].NetHashesPerSecond,
                // BlockReward: coinList.Data[faveName].BlockReward,
                // BlockTime: coinList.Data[faveName].BlockTime
            },
            defaults: coinList.Data[faveName]
        }).spread((thisCoin, wasCreated)=>{
            console.log("INSIDE SPREAD");
            db.user.findOne({
                where: {
                    id: req.user.id
                }
            }).then((thisFave)=>{
                // console.log("THISFAVE", thisFave);
                console.log("here again", thisCoin.id);
                thisFave.addCoin(thisCoin);
                res.redirect('/main');
            })
        })
        .catch( function(error){
            console.log("error", error);
            res.render('error')
        })
    })
});



module.exports = router;