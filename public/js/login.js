var serverip = ""
var loginLocation = "/cafe/"
$(document).ready(function(){
  console.log("js loaded");
  $("#login-button").click(function(event){
    $.ajax({
      url: serverip+loginLocation+"login",
      method:"post",
      data: {'username':$("#username").val(),'password':$("#password").val() },
      success: function(data){
        console.log("login server accessed");
        var login = eval("("+data+")")
        if (login.username) {
          $(".notification").html(login.username+"님이 로그인하셨습니다")
          window.location = "/cafe/main.html"
        }else {
          $(".notification").html(login.err)
        }
      }
    })
  });
  $("#signup-button").click(function(event){
    $.ajax({
      url: serverip+loginLocation+"sign_up",
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
  $("#logout-button").click(function(){
    $.ajax({
      url: serverip+loginLocation+"logout",
      method:"get",
      data: null,
      success: function(data){
        console.log("logged out");
        var login = eval("("+data+")")
        if (data) {
          $(".notification").html(login.err)
        }else {
          $(".notification").html("logout successful")
        }
      }
    })
    window.location = "/cafe/main.html"
  })
})
function empty_form(){
  $('input').val("")
}
