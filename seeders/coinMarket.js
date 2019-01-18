var db = require('../models');
var request = require('request');
var apiCoinList = "https://min-api.cryptocompare.com/data/all/coinlist&api_key={51b085c72e5ffc528b5cc7b33a7fbb3390eca441fb70b231e951573b2ddfca38}"

  	request(apiCoinList, function(error, response, body) {
        var coinList = JSON.parse(body.Data.BTC);
        if(body){
            coinList.forEach(function(c){
                db.allcoin.findOrCreate({
                    where: { 
                        coinname: c.CoinName
                    },
                    defaults: {
                        symbol: c.Symbol,
                        name: c.Name,
                        url: c.Url,
                        imgurl: c.ImageUrl,
                        totalcoinsupply: c.TotalCoinSupply,
                        algorithm: c.Algorithm,
                        prooftype: c.ProofType
                    }
                  }).then(function(data) {
                      console.log("refresh complete");
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
