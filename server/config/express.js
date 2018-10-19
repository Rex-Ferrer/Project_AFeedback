var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes');

modules.exports.inti = function() {
    mongoose.connect(config.db.uri);

    var app = express();

    app.use(morgan('dev'));

    app.use(bodyParser.json());

    app.use(express.static('client'))

    app.get('*', function(req,res) {
        res.redirect('/');
    });

    return app;
}