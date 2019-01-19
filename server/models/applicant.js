var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    Class = require('./class'),
    courseTaught = require('./class');
ObjectID = Schema.Types.ObjectId;

var applicantSchema = new Schema({
    password: { type: String, required: true },
    email: { type: String,
      required: true,
    match: /([0-9A-Za-z\.]){1,100}@(\w){0,10}(?:\.)?ufl\.edu///Valdiates that email is either a @<something>.ufl.edu or @ufl.edu email address },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

});
//Makes a super cool hash
applicantSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Check the password to see if it is valid
applicantSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Applicant', applicantSchema);
