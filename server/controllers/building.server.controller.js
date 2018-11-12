
/* Dependencies */
var mongoose = require('mongoose'), 
    Building = require('../models/building.js');


/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.AllBuildings = function(req, res) {
  Building.find({}, function(err, buildingList) {
    if(err) throw err;
    console.log(buildingList);
    res.json(buildingList);
  })

};

