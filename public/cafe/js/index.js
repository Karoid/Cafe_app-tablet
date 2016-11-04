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
    var Regexr = /(order\w+|[Qq]n[Aa]\w*|sign_up).html(\/\d*)*/g
    var change_boolean = Regexr.test(url)
    if (change_boolean) {
      $('#mid').addClass('expand')
    }else {
      $('#mid').removeClass('expand')
    }
  },500)
})
