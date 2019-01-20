var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    Job = require('./job'),
    Applicant = require('./applicant'),
ObjectID = Schema.Types.ObjectId;

var applicationSchema = new Schema({
    date: { type: String, required: true },
    job: { type: ObjectID, ref: "Job" },
    email: { type: ObjectID, ref: "Applicant" }

});

module.exports = mongoose.model('Applicaion', applicationSchema);
