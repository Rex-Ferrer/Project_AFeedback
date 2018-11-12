
/* Dependencies */
var mongoose = require('mongoose'), 
    User = require('../models/user.js');


/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.currentUser = function(req, res) {
  User.find({username : req.user.username}, function(err, user) {
    if(err) throw err;
    console.log(user);
    res.json(user);
  })
};

