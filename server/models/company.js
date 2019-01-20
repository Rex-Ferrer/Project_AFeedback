var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    ObjectID = Schema.Types.ObjectId;

var companySchema = new Schema({
    password: { type: String, required: true },
    name: { type: String, required: true },

});
//Makes a super cool hash
companySchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Check the password to see if it is valid
companySchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Company', companySchema);
