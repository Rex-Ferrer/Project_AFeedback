
/* Dependencies */
var mongoose = require('mongoose'),
  User = require('../models/user.js');


/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.currentUser = function (req, res) {
  User.find({ username: req.user.username }, function (err, user) {
    if (err) throw err;
    res.json(user);
  })
};

exports.read = function (req, res) {
  res.json(req.user);
}

exports.list = function (req, res) {
  User.find({}, function (err, users) {
    if (err) throw err;
    res.json(users);
  })
};

exports.update = function (req, res) {
  var user = req.user;
  user.username = req.body.username;
  user.password = req.body.password;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.role = req.body.role;
  user.class = req.body.class;

  // Then save the listing
  user.save(function (err) {
    if (err) {
      console.log('error is here');
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

exports.userByID = function (req, res, next, id) {
  User.findById(id).exec(function (err, user) {
    if (err) {
      res.status(400).send(err);
    } else {
      req.user = user;
      next();
    }
  });
};


exports.UserByEmail = function (req, res, next, email) {
  User.find({ username: email }).exec(function (err, user) {
    if (err) {
      res.status(400).send(err);
    } else {
      req.user = user;
      next();
    }
  });
};
