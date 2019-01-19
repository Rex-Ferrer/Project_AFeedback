var config = require('./config'),
    mongoose = require('mongoose'),
    express = require('./express')
    cors = require('cors');

module.exports.start = function () {
    var app = express.init();
    app.use(cors());
    app.listen(config.port, function () {
        console.log('App listening in port', config.port);
    });
};