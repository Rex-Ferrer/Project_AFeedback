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
      },
      created_at: Date,
      updated_at: Date

});
//Gonna try to implement some kind of roles situation here, will have to look for it elsewher
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {type: String, required: true},
    name: {type: String, required:true},
    classes: {
        type: [classSchema],
        default: undefined
    },
});

var adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

var courseTaught = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: ListingSchema,
        required: true
    },
    //Gonna have to figure a way to have recurring dates 
    day: {
        type:String
    }
})