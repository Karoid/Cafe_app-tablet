var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	like: {type:Number},
	info:{type:String}
});
var User = mongoose.model('User', userSchema);

module.exports = User;