var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig');

router.get('/login', function(req, res){
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	successFlash: 'Login Successful.',
	failureRedirect: '/auth/login',
	failureFlash: 'Invalid Credentials'
}));

//facebook authenticate
router.get('/facebook', passport.authenticate('facebook', {
	scope: ['public_profile', 'email']
}))

router.get('/callback/facebook', passport.authenticate('facebook', {
	successRedirect: '/profile',
	successFlash: 'Facebook login successful',
	failureRedirect: '/auth/login',
	failureFlash: 'Oops, Facebook as failed you.'
}))


router.get('/signup', function(req, res){
	res.render('auth/signup', { previousData: null});
});

router.post('/signup', function(req, res, next){
	console.log('here');
	if(req.body.password != req.body.password_verify){
		console.log('here1');
		req.flash('error', 'Password must be at least 8 characters start with a capital letter followed by at least two lower case letter. Contains at least one of the following special characters: !“#$%&’()*+,-./:;<=>?@[\]^_`{|}~, or a space and finish with at least two numbers. The password cannot match any of the 10 previously used passwords and connot contain a dictionary word.');
		res.redirect('/auth/signup', { previousData: req.body, alerts: req.flash()});
	} else {
		console.log(req.body);
		db.user.findOrCreate({
			where: {username: req.body.username},
			defaults: req.body
		})
		.spread(function(user, wasCreated){
			if(wasCreated){
				console.log('was created');
				req.flash('success', 'Signup Complete');
				passport.authenticate('local', {
					successRedirect: '/profiles',
					successFlash: 'Login Successful.',
					failureRedirect: '/auth/login',
					failureFlash: 'Invalid Credentials'
				})(req, res, next);
			}
			else {
				console.log('was found');
				req.flash('error', 'Username already in use.');
				res.redirect('/auth/signup', { previousData: req.body, alerts: req.flash()});
			}
		})
		.catch(function(err){
			if(err && err.errors){
				err.errors.forEach(function(e){
					if(e.type == 'Validation Error'){
						req.flash('error', 'Validation Error: ' + e.message);
					}
					else {
						console.log('Error (not validation)', e);
					}
				})
			}
			res.render('auth/signup', { previousData: req.body, alerts: req.flash()});
		})
	}
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'Successfully Logged out.')
	res.redirect('/');
})
module.exports = router;