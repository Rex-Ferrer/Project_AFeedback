module.exports = function(app, passport){

    //================= 
    //LOGIN
    //================= 
    app.get('/login', function(req, res) {

        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login' , {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));


    //====================
    //SIGNUP
    //====================
    app.get('/signup', function(req,res) {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', //redirect back to the front page but with login
        failureRedirect : '/signup', //go back to signup page
        failureFlash: true //allows for flash messages
    }));

    //Process signup
    app.post('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function(req,res) {
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req,res,next) {
        if(req.isAuthenticated())
            return next();

            res.redirect('/');
    }
}