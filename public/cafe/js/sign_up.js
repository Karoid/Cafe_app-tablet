function submit_action(obj) {
  var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  // 01로 시작하는 핸드폰 및 지역번호와 050, 070 검증
  // 원래 050은 0505 평생번호인가 그런데 보편적으로 050-5xxx-xxxx 로 인식함
  // 0505-xxx-xxxx 라는 식으로 넣으면 통과할 수 없음. 그래서 경고창 띄울때 예시 넣는것이 좋음.
  // -(하이픈)은 넣어도 되고 생략해도 되나 넣을 때에는 정확한 위치에 넣어야 함.
  if(!obj.val()) {
    obj.focus();
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
  },500)
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
