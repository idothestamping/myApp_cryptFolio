var db = require('../models');

db.cointype.create({
	code: 'OMT',
	name: 'Original Money Talks Coin',
	statuses: [
		"primary",
		"secondary"
		]
})

.then(function(createdMovie){
	console.log('Successfully created coin');
})

.catch(function(err){
	console.log('Error during test migration:', err);
});

