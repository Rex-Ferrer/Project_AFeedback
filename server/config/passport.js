var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err,user);
        });
    });

    //This is for the local signup function

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {

        process.nextTick(function() {
            //Find the user whose email was passed into the function
        User.findOne({ 'username' : username }, function(err, user) {
            if(err){
                console.log(err);
                return done(err,req.flash('please'));
            }
            if(user) {
                console.log(user);
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                console.log('got to actually saving it')
                //if there is no user with that email
                var newUser = new User();

                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
        });
    }));

    //TODO: Add local login function
};
