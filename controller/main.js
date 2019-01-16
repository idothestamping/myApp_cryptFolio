var express = require('express');
var router = express.Router();
var db = require('../models');

var loggedIn = require('../middleware/loggedin');
var isAdmin = require('../middleware/isAdmin');

router.get('/', loggedIn, function(req, res){
    res.render('main');
});

router.get('/admins', function(req, res){
    res.render('admin');
});

module.exports = router;