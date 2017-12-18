var mongoose = require('mongoose');
var schema=mongoose.Schema;
var signupschema=new schema({
	name:String,
	email:String,
    pass:String,
});
var user=mongoose.model('user',signupschema)
module.exports=user;