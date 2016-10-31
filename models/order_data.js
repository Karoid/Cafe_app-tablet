/**
 * Created by AJH322 on 2016-10-31.
 */
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    order_count: {type: Number}, //총 주문횟수
    order_count_today: {type: Number}, //하루의 주문횟수
    order_date: {type: Date}, //주문날짜
    order_item_index: {type: String}, //주문한 제품들 배열로 받을것임.
    order_total_price: {type: Number}, //총 가격
    order_state: {type: String}, //주문상태 주문접수, 주문완료
    order_personal: {type: String}, //주문한사람의 정보 user.js에서 연동하고 PK 무결성 기능 추가하기
    created_at: {type: Date} //기본
});
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
var order_data = mongoose.model('order_data', userSchema, "order_data");
module.exports = order_data;