
/* Dependencies */
var mongoose = require('mongoose'), 
    User = require('../models/user.js');


/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.currentUser = function(req, res) {
  User.find({username : req.user.username}, function(err, user) {
    if(err) throw err;
    res.json(user);
  })
};

exports.read = function(req,res){
  res.json(req.user);
}

exports.UserByEmail = function(req, res, next, email) {
  User.find({username : email}).exec(function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.user = user;
      next();
    }
  });
};