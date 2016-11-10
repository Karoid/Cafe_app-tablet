var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var userSchema = new mongoose.Schema({
	username: {type:String},
	password:{type:String},
	title:{type:String},
	content:{type:String},
	answer:{type:Array, default: []},
	created_at: {type: Date} //기본
});
userSchema.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});
userSchema.plugin(mongoosePaginate);
var Qna = mongoose.model('Qna', userSchema, "Qna");
module.exports = Qna;

/*
"username" : kkk,
"title" : "사장님 커피가 차요",
"content" : "커피에 얼음 덜넣어주세요",
*/
