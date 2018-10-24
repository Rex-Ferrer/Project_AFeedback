var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

    var userSchema = new Schema({//Both of these will have to be compared with regex validation with the argument @(\w){0,10}(?:\.)?ufl\.edu
    username: {
        type: String,
        required: true,
        unique: true,
        match: "/@(\w){0,10}(?:\.)?ufl\.edu/g"//Valdiates that email is either a @<something>.ufl.edu or @ufl.edu email address

    },
    password: {type: String, required: true},
    name: {type: String, required:true},
    classes: 
        {
            type: [classSchema],
            default: undefined
        },
    });
    //Makes a super cool hash
    userSchema.methods.generateHash() = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    //Check the password to see if it is valid
    userSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.password);
    };

var User = mongoose.model("User", userSchema);
module.exports = User;