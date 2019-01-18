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


cc.coinList().then(function(obj){
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'object') {
            db.allcoin.findOrCreate({
                where: { 
                    coinname: coinname
                },
                defaults: {
                    symbol: Symbol,
                    name: Name,
                    url: Url,
                    imgurl: ImageUrl,
                    totalcoinsupply: TotalCoinSupply,
                    algorithm: Algorithm,
                    prooftype: ProofType
                }
            })
            .then(function(data) {
                console.log("refresh complete");
            })
            .catch(function(error) {
                console.log('this is the error ' + error);
            })
        }
        })

});