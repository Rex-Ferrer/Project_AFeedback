var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var buildingSchema = new Schema({
    //This is all for the buildings that will be selected by TAs/Professors
    name: {
        type: String, 
        required: true
      }, 
      code: {
        type: String, 
        required: true, 
        unique: true
      }, 
      address: String, 
      coordinates: {
        latitude: Number, 
        longitude: Number
      }
});

var building = mongoose.model("Building", buildingSchema);
module.exports = Building;