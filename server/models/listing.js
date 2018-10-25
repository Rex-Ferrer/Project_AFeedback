var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    courseTaught = require('./course');

var adminListing = new Schema({
    name: {
        type : String,
        require: true,
        unique: true //There shoudn't ever be two listing for the same person
    },
    role : {
        type: String,
        enum : ['professor' , 'TA'],//Right now there are only TAs and professors for simplicity
        required : true
    },
    classes: {
        type : [courseTaught]//Array of class schema from class.js
    },
    officeHours : {
        type : []
    }
})