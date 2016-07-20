var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	page_index: {type:Number},
	page_info:{type:String},
	item_name:{type:String},
	img_dir:{type:String}
});
var Page_data = mongoose.model('Page_data', userSchema, "Page_data");
module.exports = Page_data;

/*
"page_index" : 0,
"page_info" : "today menu"
, "item_name" : "orange",
"item_price" : 5000,
"item_discount" : true,
"item_discount_price" : 4500
, "img_dir" : "http://www.tutorialspoint.com/mongodb/images/mongodb-mini-logo.jpg" }

*/