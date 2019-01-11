var db = require('../models');

db.movie.create({
	title: 'Die Hard',
	year: 1998,
	genre: 'Christmas',
	runtime: 110,
	tagline: 'Yippie Yai-ye...'
})

.then(function(createdMovie){
	console.log('Successfully created movie');
})

.catch(function(err){
	console.log('Successfully created movie', err);
});

