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
          location.reload();
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
  $("#nonuser-button").click(function(event){
    $.ajax({
      url: serverip+loginLocation+"nonusersign_up",
      method:"post",
      data: {'password':$("#nonuser_password").val() },
      success: function(data){
        console.log("nonuser logging");
        var login = eval("("+data+")")
        try {
          $(".notification").html(login.err)
          empty_form()
        } catch (e) {
          $(".notification").html(login.err)
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
    location.reload();
  })
  /*모바일 UX*/
  $('.nonuserlogin-change').click(function() {
    $('.userbox').addClass('inactive')
    $('.nonuserbox').addClass('active')
  });
  $('.userlogin-change').click(function() {
    $('.userbox').removeClass('inactive')
    $('.nonuserbox').removeClass('active')
  });
})
