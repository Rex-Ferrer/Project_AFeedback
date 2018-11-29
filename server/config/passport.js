var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Listing = require('../models/listing');

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
                return done(err,req.flash(err));//Sends the error thta occured as a flash message
            }
            if(user) {//If the user already exists
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {//Create the new User
                var newUser = new User();

                newUser.username = username;//From passport authenticate function
                newUser.password = newUser.generateHash(password);//Uses bcrypt to hash a password
                newUser.firstname = req.body.firstname;//Gets the firstname field from the request
                newUser.lastname = req.body.lastname;//Gets the lastname field from the request
                newUser.role = req.body.role;
                newUser.save(function(err) {

                    if (err){
                        console.log(err);
                        return done(null, false, req.flash('signupMessage', 'You must sign up with a ufl email'));//Have to edit it so signup message actually reflects error
                        //Right now only sends message for invalid UF email, even if the issue is in not filling out a username or password
                    }
                    if (newUser.role = 'Professor'){
                        var newListing = new Listing();
                        newListing.name = req.body.firstname + " " + req.body.lastname;
                        newListing.role = req.body.role;

                        newListing.email = req.body.username;
                        newListing.createdBy.push(req.body.username);//rudy test

                        newListing.save(function(err){
                            if(err){
                                console.log(err);
                            }
                        })
                    }
                    return done(null, newUser);
                });
            }
        });
        });
    }));

    //TODO: Add local login function
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        User.findOne({'username' : username}, function(err, user) {
            if (err){
                console.log(err);
                return done(err);
            }
            if(!user){
                return done(null, false, req.flash('loginMessage' , 'No user found.'));
            }
            if(!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'));
            }
            return done(null, user);
        });
    }));
};
