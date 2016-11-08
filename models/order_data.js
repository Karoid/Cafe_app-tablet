/**
 * Created by AJH322 on 2016-10-31.
 */
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
//var User_data = require('./user');
var userSchema = new mongoose.Schema({
    order_count: {type: Number, unique: true, default: 0}, //총 주문횟수 PK
    order_count_today: {type: Number}, //하루의 주문횟수
    order_date: {type: Date}, //주문날짜
    order_item_index: {type: Array}, //주문한 제품들 배열로 받을것임.
    user_index : {type : Object},
    order_total_price: {type: Number}, //총 가격
    order_state: {type: String}, //주문상태 주문접수, 주문완료
    order_id: {type: String, required: true}, //주문한사람의 폰번호 KEY로써 삭제되면 이것과 이어진것은 전부다 삭제해야할수도있음
    created_at: {type: Date} //기본
});
//회원탈퇴하면 관련데이터 삭제기능 구현??
userSchema.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    if (!this.bestable) {
        this.bestable = true;
    }
    next();
});
userSchema.plugin(mongoosePaginate);
var order_data = mongoose.model('order_data', userSchema, "order_data");
module.exports = order_data;
