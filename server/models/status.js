var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    Class = require('./job'),
    courseTaught = require('./job');
    ObjectID = Schema.Types.ObjectId;

var statusSchema = new Schema({
    score: { type: Integer},
    parameter: { type: ObjectID, ref: "Parameter" },
    email: { type: ObjectID, ref: "Applicant" },
    job: { type: ObjectID, ref: "Job" }

});

module.exports = mongoose.model('Status', parametersSchema);
