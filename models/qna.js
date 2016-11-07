var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var userSchema = new mongoose.Schema({
	username: {type:String},
	password:{type:String},
	title:{type:String},
	content:{type:String},
	answer:{type:Array, default: []}
});
userSchema.plugin(mongoosePaginate);
var Qna = mongoose.model('Qna', userSchema, "Qna");
module.exports = Qna;

/*
"username" : kkk,
"title" : "사장님 커피가 차요",
"content" : "커피에 얼음 덜넣어주세요",
*/
