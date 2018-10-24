var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
});

var Class = mongoose.model("Class", courseTaught);
module.exports = Class;