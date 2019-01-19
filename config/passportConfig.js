//enviroment variables
require('dotenv').config();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, callback){
    callback(null, user.id);
});
// facebook authentication
var FacebookStrategy = require('passport-facebook').Strategy;

passport.deserializeUser(function(id, callback){
    console.log("FIRST")
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
    console.log("SECOND")
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

passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FP_APP_SECRET,
    callbackURL: process.env.BASE_URL = '/auth/callback/facebook',
    profileFields: ['id', 'email', 'displayName', 'picture.type(large)'],
    enableProof: true
}, function(accessToken, refreshToken, profile, callback){
    // Email presence check
    var facebookEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
    // See if the email exist in the users table
    console.log("THIRD")
    db.user.findOne({
        where: { email: facebookEmail }
    })
    .then(function(existingUser){
        console.log("FOUND THIRD")
        if(existingUser && facebookEmail){
            // Returning user - need to update facebookId and Token
            existingUser.updateAttributes({
                facebookId: profile.Id,
                facebookToken: accessToken
            })
            .then(function(updatedUser){
                callback(null, updatedUser);
            })
            .catch(callback);
        }
        else {
            // This person is a new user, so create new user
            var usernameArr = profile.displayName.split(' ');
            var photo = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : 'https://png.icons8.com/ios/1600/person-female-filled.png'
            ;
            console.log("FOURTH")
            db.user.findOrCreate({
                where: { facebookId: profile.id },
                defaults: {
                    facebookToken: accessToken,
                    email: facebookEmail,
                    firstname: usernameArr[0],
                    lastname: usernameArr[usernameArr.length - 1],
                    admin: false,
                    dob: profile.birthday,
                    image: photo
                }
            })
            .spread(function(newUser, wasCreated){
                if(wasCreated){
                    callback(null, newUser);
                }
                else {
                    newUser.facebookToken = accessToken;
                    newUser.email = facebookEmail;
                    newUser.save()
                    .then(function(savedUser){
                        callback(null, savedUser)
                    })
                    .catch(callback);
                }
            })
            .catch(callback);
        }
    })
    .catch(callback);
}));

module.exports = passport;