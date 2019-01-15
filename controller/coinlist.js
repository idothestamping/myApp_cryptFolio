require('dotenv').config();
var express = require('express');
var request = require('request');
var db = require('../models');
var router = express.Router();

var apiCoinList = "https://www.cryptonator.com/api/currencies"


router.get('/refresh', function(req, res) {
  	request(apiCoinList, function(error, response, body) {
        var coinList = JSON.parse(body);
        console.log(coinList);
        // console.log('API call response:', body);
        if(body){
            // coinList.rows.forEach(function(c){
                var c = coinList.rows[0];
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
            // })   
        }
        else if(error){
            console.log(error);
            res.send('error')
        }
      });
});

// router.post('/refresh', function(req, res) {
//     // TODO: Get form data and add a new record to DB
//     db.cointype.findOrCreate({ 
//         code: req.body.code,
//         name: req.body.name,
//         statuses: req.body.statuses,
//       }).then(function(data) {
//           console.log(data);
//           res.redirect('profile');
//       }).catch(function(error) {
//           console.log('this is the error ' + error);
//       });
// });

// router.post('/', function(req, res) {
//     // TODO: Get form data and add a new record to DB
//     db.cointype.findOrCreate({ 
//         where: { name: req.body.name }
//         })
//     .spread( function(pokemon, created) {
//         console.log(pokemon.get());
//         res.redirect('/pokemon');
//     })
//     .catch( function(error){
//       console.log("error", error);
//       res.render('error')
//     })
  
//   });

// router.get('/', function(req, res){
// 	rp(requestOptions).then(response => {
//     console.log('API call response:', response);
// 		res.render('home', { coins: response });
// 	  }).catch((err) => {
// 		console.log('API call error:', err.message);
// 	  });
// });

module.exports = router;