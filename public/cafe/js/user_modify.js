serverip = "http://52.78.68.136/"
loginLocation = "cafe/"
function submit_action(obj) {
  var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  if(!obj.val()) {
    return false;
  }
  else if (!regExp.test(obj.val())) {
    return false
  }
  return true;
}
$(document).ready(function(){
  setInterval(function(){
    if ($("input#name").val() != "") {
      $('input#name_check').addClass("checked").attr("checked",true)
    }else{
      $('input#name_check').removeClass("checked").attr("checked",false)
    }
    if ($("input#address").val() != "") {
      $('input#address_check').addClass("checked").attr("checked",true)
    }else{
      $('input#address_check').removeClass("checked").attr("checked",false)
    }
    if (submit_action($("input#tel"))) {
      $('input#tel_check').addClass("checked").attr("checked",true)
    }else{
      $('input#tel_check').removeClass("checked").attr("checked",false)
    }
    if ($('input#password').val() == $('input#password_check').val() && $('input#password_check').val() != "") {
      $('input#pass_check').addClass("checked").attr("checked",true)
      $('input#pass2_check').addClass("checked").attr("checked",true)
    }else{
      $('input#pass_check').removeClass("checked").attr("checked",false)
      $('input#pass2_check').removeClass("checked").attr("checked",false)
    }
  },500)
  $('.show_info').click(function(){
    $(".iframe").css("display","")
  })

  $("#signout-button").click(function(){
   if(confirm("정말 탈퇴하시겠습니까?"))
    {
        $.ajax({
            url: serverip+"cafe/sign_out",
            method:"POST",
            data: null,
             success: function(data){
              window.location = "/cafe/main.html"
            }

     })
    }
     else
     {
            return ;
     }

      })
  $('#submit').click(function(event) {
    var x = 0
    for (var i = 0; i < 4; i++) {
      check = $(':checkbox').eq(i).hasClass("checked")
      if (!check) {
        x++;
        $(':checkbox').eq(i).addClass('red')
        $('.input-box input').eq(i).addClass('red')
      }
    }
    if (!$('.agreement input').is(":checked")) {
      x++;
      $('.agreement input').addClass('red')
    }
    setTimeout(function(){$(':checkbox').removeClass('red');$('.input-box input').removeClass('red');$('.agreement input').removeClass('red')},1000)

      $.ajax({
        url: "/cafe/user_modify",
        method:"post",
        data: {'username':null,'password':$("#password").val(),'realname':$('#name').val(),'address':$('#address').val()},
        success: function(data){
          console.log("modify server accessed");
          window.location = "/cafe/main.html"
          }
      })

  });
})
