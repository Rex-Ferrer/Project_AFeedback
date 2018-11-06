var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    courseTaught = require('./class');

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
    classes: [Schema.Types.ObjectId], //Will take in a reference to another item in the database, used for ordering
    twitter : {String},
    slack : {String},
    linkedin : {String},
    email : {String}
})

module.exports = mongoose.model('Listing', adminListing);