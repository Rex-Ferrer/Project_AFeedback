var path = require('path');
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    passport = require('passport'),
    flash = require('connect-flash');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //Configure passport
  //require('./config/passport')(passport)//passes passport for configuration

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));
  //body parsing middleware 
  app.use(bodyParser.json());

 // Serve static files */
  app.use(express.static('src'))

//Paspport configuration

app.use(session({ secret : thisisasecretsession}));//Not sure what having a secret session does yet but we will see
app.use(passport.initialize());
app.use(passprt.session()); //Persistent login sessions
app.use(flash());// message storing in session?


require('./routes')(app, passport);//Adds in routing folder

//Redirects to static page for all routes not specified
  app.get('*' , function(req,res) {
    res.redirect('/');
  });

  return app;
};  