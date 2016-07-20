var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	item_index: {type:Number},
	item_name:{type:String},
	item_price:{type:Number},
	like:{type:Number},
	item_discount:{type:Boolean},
	item_discount_price:{type:Number},
	bestable:{type:Boolean},
	created_at:{type:Date}
});
userSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  if( !this.bestable )
  {
  	this.bestable=true;
  }
  next();
});
var Item_data = mongoose.model('Item_data', userSchema, "Item_data");
module.exports = Item_data;

/*
"page_index" : 0,
"page_info" : "today menu"
, "item_name" : "orange",
"item_price" : 5000,
"item_discount" : true,
"item_discount_price" : 4500
, "img_dir" : "http://www.tutorialspoint.com/mongodb/images/mongodb-mini-logo.jpg" }

*/