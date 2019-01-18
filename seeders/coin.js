var db = require('../models');

db.coin.create({
        base: "BTC",
        target: "USD",
        price: "3668.32634186",
        volume: "69195.58183816",
        change: "1.13862714"
})

.then(function(createdMovie){
	console.log('Successfully created coin');
})

.catch(function(err){
	console.log('Error during test migration:', err);
});

