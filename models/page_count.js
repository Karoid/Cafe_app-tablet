var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	page_count:{type:Number}
});
var Page_count = mongoose.model('page_count', userSchema, "page_count");
module.exports = Page_count;

/*
"page_index" : 0,
"page_info" : "today menu"
, "item_name" : "orange",
"item_price" : 5000,
"item_discount" : true,
"item_discount_price" : 4500
, "img_dir" : "http://www.tutorialspoint.com/mongodb/images/mongodb-mini-logo.jpg" }

*/