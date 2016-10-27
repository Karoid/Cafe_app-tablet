$(document).ready(function(){
  $('.go_to_order').on(function(){
    console.log('move');
    window.location="/cafe/order_page.html"
  })
  var css = setInterval(function(){
    var url = $('#mid_frame').contents().get(0).location.pathname
    var Regexr = /(order\w+|[Qq]n[Aa]).html(\/\d*)*/g
    var whether_qna = (url == '/cafe/QnA.html')
    var whether_order = (url == '/cafe/order_page.html')
    var change_boolean = Regexr.test(url)
    if (change_boolean) {
      $('#mid').addClass('expand')
    }else {
      $('#mid').removeClass('expand')
    }
  },500)
})
