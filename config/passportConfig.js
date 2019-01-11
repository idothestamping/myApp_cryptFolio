var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, callback){
    callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
    db.user.findByPk(id)
    .then(function(user){
        callback(null, user);
    })
    .catch(function(err){
        callback(err, null);
    })
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passportField: 'password'
}, function(email, password, callback){
    db.user.findOne({
        where: { email: email }
    })
    .then(function(foundUser){
        // If no valid user and password, hashed, and matches to the db
        if(!foundUser || !foundUser.validPassword(password)){
            // bad
            callback('Bad or no credentials', null);
        }
        else{
            // good
            callback(null, foundUser);
        }
    })
    .catch(function(err){
        callback(err, null);
    })
}));

module.exports = passport;