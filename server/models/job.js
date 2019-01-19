var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    Company = require('./company'),
    ObjectID = Schema.Types.ObjectId;

var jobSchema = new Schema({
    status: { type: String, required: true },
    name: { type: String, required: true },
    company: { type: ObjectID, ref: "Company" }

});

module.exports = mongoose.model('Job', jobSchema);
