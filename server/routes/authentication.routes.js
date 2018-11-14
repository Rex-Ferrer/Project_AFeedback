var path = require('path'),
    listingsRouter = require('../routes/listings.routes');
module.exports = function(app, passport){

    app.get('/', isLoggedIn, function(req, res, next){//Checks if user is logged in and then...
        if(req.user.role == "Professor"){//Redirects based off of user roles
            if(isLoggedIn){
                res.redirect('/professor');
            };//TODO: Change to professor view
        }
        return next();

    });
    //=================
    //LOGIN

    //================= 
    app.get('/login', function(req, res) {//Does login
        res.render('login.ejs', {message: req.flash('loginMessage')});//Loads login view
    });

    app.post('/login', passport.authenticate('local-login' , {//Uses passport to handle authentication
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));
    //====================
    //PROFESSOR
    //====================
    app.get('/professor', isLoggedIn, function(req,res, next) {
        if(req.user.role == "Professor"){
            res.sendFile(path.resolve('client/professor.html'), req.user);//This is a bad idea
        }else{
            res.send("You must be a professor to access this page!")
        }
    });

    //====================
    //SIGNUP
    //====================
    app.get('/signup', function(req,res) {//redirects to singup
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', //redirect back to the front page but with login
        failureRedirect : '/signup', //go back to signup page
        failureFlash: true //allows for flash messages
    }));

    app.get('/logout', function(req,res) {
        req.logout();
        res.redirect('/');
    });

    app.use("/api", isLoggedIn, listingsRouter);//Must be logged in for any request to the API

    function isLoggedIn(req,res,next) {//USE THIS TO CHECK IF THERE IS A LOGIN
        if(req.isAuthenticated())
            return next();

            res.redirect('/login');
    }


}
