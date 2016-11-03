
function submit_action(obj) {
  var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  // 01로 시작하는 핸드폰 및 지역번호와 050, 070 검증
  // 원래 050은 0505 평생번호인가 그런데 보편적으로 050-5xxx-xxxx 로 인식함
  // 0505-xxx-xxxx 라는 식으로 넣으면 통과할 수 없음. 그래서 경고창 띄울때 예시 넣는것이 좋음.
  // -(하이픈)은 넣어도 되고 생략해도 되나 넣을 때에는 정확한 위치에 넣어야 함.
  if(!obj.val()) {
    alert("전화번호를 입력하세요.");
    obj.focus();
    return false;
  }
  else if (!regExp.test(obj.val())) {
    alert("잘못된 전화번호입니다. 숫자, - 를 포함한 숫자만 입력하세요. 예) 050-XXXX-XXXX");
    obj.focus();
    obj.select();
    return false
  }
  return true;
}

$(document).ready(function() {
    $('img').on({ 
    'click': function() { 
         var src = ($(this).attr('src') === '/img/like_1.png') 
            ?'/img/like_2.png'
            : '/img/like_1.png'; 
          $(this).attr('src',src);
    }
    });
$(".mat-input").focus(function(){
  $(this).parent().addClass("is-active is-completed");
});

$(".mat-input").focusout(function(){
  if($(this).val() === "")
    $(this).parent().removeClass("is-completed");
  $(this).parent().removeClass("is-active");
})

/*ajax call*/
$('#finish').click(function() {
  submit_action($('#telephone'))
});


});
