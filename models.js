var mongoose = require('mongoose');
var schema=mongoose.Schema;
var signupschema=new schema({
	name:String,
	email:String,
    pass:String,
});

var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;



signupschema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('pass')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the pass using our new salt
        bcrypt.hash(user.pass, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext pass with the hashed one
            user.pass = hash;
            next();
        });
    });
});

signupschema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.pass, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var user=mongoose.model('user',signupschema);
module.exports=user;
