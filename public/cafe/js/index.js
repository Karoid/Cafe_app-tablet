function popup(txt){
  html= '<div class="popup">' +
        '<div class="back"><span class="xbutton">✖</span></div>'+
          txt +'<button type="submit" class="couponin-button">쿠폰 적립</button>'+ '<button type="submit" id="couponout-button">쿠폰 사용</button>'+
        '</div>'
  $('body').append(html)
  $('.popup .back').click(function(){
    $('.popup').remove()
  })

 $('.popup .couponin-button').click(function(event) {
$.ajax({
  url: '/cafe/coupon_in.html',
     type: 'GET'
})
  window.location="/cafe/coupon_in.html"
});


$('#couponout-button').click(function(event) {
    
    window.location="/cafe/coupon_out.html"
});
}
function fillcoupon(coupon_frame, count){
  frame_top = coupon_frame.position().top
  frame_left = coupon_frame.position().left
  frame_width = coupon_frame.width()
  frame_height = coupon_frame.height()
  stamp_width = frame_width*39/260
  stamp_top = frame_top + frame_height*14/129
  stamp_delta_left = frame_width*262.5/1440
  stamp_delta_top = frame_height*87/179
  if (frame_width>=500) {
    stamp_left = $(document).width()*0.4 -stamp_width/2 -stamp_delta_left*2
  }else {
    stamp_left = frame_left + frame_width*14/260

  }
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 5; j++) {
      $('.popup').append('<img src="/cafe/img/coffee_empty.png" style="position:absolute;top:'+(stamp_top + stamp_delta_top*i) +'px;left:'+(stamp_left + stamp_delta_left*j) +'px;width:'+stamp_width+'px;" class="stamp">')
    }
  }
  for (var i = 0; i < count; i++) {
    $('.stamp').eq(i).attr('src', '/cafe/img/coffee_fill.png');
  }
}
$(document).ready(function(){
  $('.cafe_title').click(function(){
    window.location = "/cafe/index"
    var body = document.documentElement;
    if (body.requestFullscreen) {
      body.requestFullscreen();
    } else if (body.webkitrequestFullscreen) {
      body.webkitrequestFullscreen();
    } else if (body.mozrequestFullscreen) {
      body.mozrequestFullscreen();
    } else if (body.msrequestFullscreen) {
      body.msrequestFullscreen();
    }
  })
  $('.go_to_order').on(function(){
    console.log('move');
    window.location="/cafe/order_page.html"
  })
  var css = setInterval(function(){
    var url = $('#mid_frame').contents().get(0).location.pathname
    var Regexr = /main.html/g
    var change_boolean = Regexr.test(url)
    if (!change_boolean) {
      $('#mid').addClass('expand')
    }else {
      $('#mid').removeClass('expand')
    }
  },500)

  $('.agreement').click(function(){
    popup("<iframe src='/cafe/agreement.txt' style='width:100%;'>")
  })
  $('.coupon').click(function(event) {
    popup("<img src='/cafe/img/coupon_frame.png' class='coupon_frame'>")
    $.ajax({
      url: '/cafe/get_coupon_data',
    })
    .done(function(count) {
      fillcoupon($('.coupon_frame'),parseInt(count)%10)
      if (count>=10) {
        $('.popup').append('<div class="coupon_left">'+parseInt(parseInt(count)/10)+'</div>')
      }else {
        $('.popup').append('<div class="stamp_left">'+(10-parseInt(count))+'</div>')
      }
    })
    .fail(function() {
      console.log("error");
    })

  });
    
 


})
