require('dotenv').config();
var express = require('express');
var request = require('request');
var db = require('../models');

var router = express.Router();

router.post('/', function(req, res) {
    // TODO: Get form data and add a new record to DB
    db.cointype.findOrCreate({ 
        where: {
            code: req.body.code
        },
        defaults: {

            name: req.body.name,
            statuses: req.body.statuses
        }

      }).then(function(data) {
          console.log(data);
        //   res.redirect('back');
      }).catch(function(error) {
          console.log('this is the error ' + error);
      });
});

module.exports = router;
