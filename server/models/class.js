var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Building = require('./building'),
    ObjectID = Schema.Types.ObjectId;

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
        type: ObjectID,
        ref: "Building",
        required: true
    },
    //Gonna have to figure a way to have recurring dates 
    day: {
        type:String
    }
});

var Class = mongoose.model("Class", courseTaught);

module.exports = Class, courseTaught;