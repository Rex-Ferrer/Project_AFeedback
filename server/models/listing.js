var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    courseTaught = require('./class');
    ObjectID = Schema.Types.ObjectId;

var adminListing = new Schema({
    name: {
        type : String,
        require: true,
        unique: true //There shoudn't ever be two listing for the same person
    },
    role : {
        type: String,
        enum : ['Professor' , 'TA'],//Right now there are only TAs and professors for simplicity
        required : true
    },
    //classes: [Schema.Types.ObjectId], //Will take in a reference to another item in the database, used for ordering
    classes: [{
      type: ObjectID,
      ref: "courseTaught"
      }],
    createdBy: [String], //This adds in who created the listings so that only listings a professor created will pop up when they go to edit them
    twitter : String,
    slack : String,
    linkedin : String,
    email : String,
    information: String

});

var Listing = mongoose.model('Listing', adminListing);

module.exports = Listing;
