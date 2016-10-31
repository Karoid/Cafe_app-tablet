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
    $("iframe").css("display","")
  })
  $.ajax({
    url: serverip+loginLocation+"sign_up",
    method:"post",
    data: {'username':$("#username").val(),'password':$("#password").val() },
    success: function(data){
      console.log("sign_up server accessed");
      var login = eval("("+data+")")
      if (data) {
        $(".notification").html(login.err)
      } else {
        $(".notification").html("sign_up successful")
        empty_form()
      }
    }
  })
})
