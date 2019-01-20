var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    Class = require('./class'),
    courseTaught = require('./class');
    ObjectID = Schema.Types.ObjectId;

var parameterSchema = new Schema({
    weight: { type: Integer},
    job: { type: ObjectID, ref: "Job" },
    name: { type: String, required: true }

});

module.exports = mongoose.model('Parameter', parametersSchema);
