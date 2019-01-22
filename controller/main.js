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

router.get('/admins', function(req, res){
    res.render('admin');
});

// Main Page, renders any user's current favorited coins
router.get('/', loggedIn, function(req, res){
    console.log(req.user);
	db.coin.findAll().then(function(favcoin) {
        res.render('main', {favcoin: favcoin});
    })
});
   
// Recieves Search input from user and call API using that input
router.post('/result', loggedIn, function(req, res) {
    var searchname = req.body.search.toUpperCase()
    var coinFullPriceUrl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + req.body.search.toUpperCase() + "&tsyms=USD&api_key={" + process.env.MY_APIKEY + "}"
    request(coinFullPriceUrl, function(error, response, body) {
        var resultCoin = JSON.parse(body);
        res.render('coins/show', { resultCoin: resultCoin.RAW[searchname]});        
        })
});

// From Results, add selected coin to 'coin' database and assoicate current user
router.post('/favorite', loggedIn, function(req, res) {
    var faveName = req.body.Symbol
    cc.coinList()
    .then(function(coinList){
        console.log("INSIDE THEN")
        db.coin.findOrCreate({ 
            where: { 
                Id: coinList.Data[faveName].Id,
                // REFRENCE:
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

// get selected coin from user's favorite coin list and populate more details using that coin's name as indentifier for API URL
router.get('/watchlist/:coindetail', function(req, res) {
    var coindetail = req.params.coindetail;
    console.log("here", req.params.coindetail);
	db.coin.find({where: {Name: coindetail}}).then(function(data) {
        var coinFullPriceUrl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + coindetail + "&tsyms=USD&api_key={" + process.env.MY_APIKEY + "}"
        request(coinFullPriceUrl, function(error, response, body) {
			resultCoin = JSON.parse(body);
			res.render('coins/detail', {resultCoin: resultCoin.RAW[coindetail]});
		});
	})
});

module.exports = router;