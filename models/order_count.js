var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    order_count: {type: Number, default: 0}
});
var Order_count = mongoose.model('order_count', userSchema, "order_count");
module.exports = Order_count;

/*
 "page_index" : 0,
 "page_info" : "today menu"
 , "item_name" : "orange",
 "item_price" : 5000,
 "item_discount" : true,
 "item_discount_price" : 4500
 , "img_dir" : "http://www.tutorialspoint.com/mongodb/images/mongodb-mini-logo.jpg" }

 */