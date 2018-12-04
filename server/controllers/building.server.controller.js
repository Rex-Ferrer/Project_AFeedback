
/* Dependencies */
var mongoose = require('mongoose'),
  Building = require('../models/building.js');


/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.AllBuildings = function (req, res) {
  Building.find({}, function (err, buildingList) {
    if (err) throw err;
    res.json(buildingList);
  })
};

exports.read = function (req, res) {
  /* send back the listing as json from the request */
  res.json(req.building);
};


exports.buildingByID = function (req, res, next, id) {
  Building.findById(id).exec(function (err, building) {
    if (err) {
      res.status(400).send(err);
    } else {
      req.building = building;
      next();
    }
  });
};
