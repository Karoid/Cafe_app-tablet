/**
 * Created by AJH322 on 2016-09-16.
 */
$(document).ready(function () {
        preset();
        var asd = setInterval(function(){
                rotate();
        }, 1000);
        //clearInterval(intervalID);
})
var iframe_position;
var box_x;
var item_x;
var x;
var box_y;
var item_y;
var y;
var i=0;
function preset() {
        //아이템을 박스의 정중앙에 놓기
        iframe_position=$('div#today').offset();
        box_x=$('div#today').width();
        item_x=$('div#today div.item').eq(0).width();
        x=iframe_position.left+(box_x-item_x)/2;
        box_y=$('div#today').height();
        item_y=$('div#today div.item').eq(0).height();
        y=iframe_position.top+(box_y-item_y)/2;
        //console.log(iframe_position);
        $('div#today div.item').eq(0).css({left:x+"px",top:y+"px"});
        $('div#today div.item').eq(1).css({left:x+3*item_x+"px",top:y+"px",opacity:0.5});
        $('div#today div.item').eq(2).css({left:x-3*item_x+"px",top:y+"px",opacity:0.5});
}
function  rotate() {
        //console.log("rolling")
        if(i==0) {
                //2 0 1 => 1 2 0
                $('div#today div.item').eq(i).animate({left: x + 3 * item_x + "px", top: y + "px", opacity: "0.5"});
                $('div#today div.item').eq(i + 1).animate({left: x - 3 * item_x + "px", top: y + "px", opacity: "0.5"});
                $('div#today div.item').eq(i + 2).animate({left: x + 0 * item_x + "px", top: y + "px",  opacity: "1"});
                i++;
        }
        else if(i==1) {
                //1 2 0 => 0 1 2
                $('div#today div.item').eq(i+1).animate({left: x + 3 * item_x + "px", top: y + "px", opacity: "0.5"});
                $('div#today div.item').eq(i-1).animate({left: x - 3 * item_x + "px", top: y + "px", opacity: "0.5"});
                $('div#today div.item').eq(i).animate({left: x + 0 * item_x + "px", top: y + "px",  opacity: "1"});
                i++;
        }
        else if(i==2) {
                //0 1 2 => 2 0 1 +초기화
                $('div#today div.item').eq(i-1).animate({left: x + 3 * item_x + "px", top: y + "px", opacity: "0.5"});
                $('div#today div.item').eq(i).animate({left: x - 3 * item_x + "px", top: y + "px", opacity: "0.5"});
                $('div#today div.item').eq(i-2).animate({left: x + 0 * item_x + "px", top: y + "px",  opacity: "1"});
                i=0;
        }
}
