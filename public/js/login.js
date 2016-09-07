$(document).ready(function(){
  console.log("js loaded");
  $("#login-button").click(function(event){
    $.ajax({
      url: "login",
      method:"post",
      data: {'username':$("#username").val(),'password':$("#password").val() },
      success: function(data){
        console.log("login server accessed");
        var login = eval("("+data+")")
        if (login.username) {
          $(".notification").html(login.username+"님이 로그인하셨습니다")
          empty_form()
        }else {
          $(".notification").html(login.err)
        }
      }
    })
  });
  $("#signup-button").click(function(event){
    $.ajax({
      url: "sign_up",
      method:"post",
      data: {'username':$("#username").val(),'password':$("#password").val() },
      success: function(data){
        console.log("sign_up server accessed");
        var login = eval("("+data+")")
        if (data) {
          $(".notification").html(login.err)
        }else {
          $(".notification").html("sign_up successful")
          empty_form()
        }
      }
    })
  });
})
function empty_form(){
  $('input').val("")
}
