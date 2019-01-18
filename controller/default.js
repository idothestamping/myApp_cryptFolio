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

cc.coinList()
.then(coinList => {
    res.render('main', { result: coinList.BTC });
  // ->
  // {
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
