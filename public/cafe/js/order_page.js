var serverip = "http://52.78.68.136"
var selected_menu = new Array()
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
function addMenuData(item_el){
  addobj = new Object()
  img_url = item_el.children('.item_frame').children('.item_img').attr('src');
  addobj.img_dir = img_url.split(serverip)[1];
  addobj.item_name = item_el.children('.item_name').text();
  addobj.item_price = item_el.children('.item_price').text().split("원")[0];
  addobj._id = item_el.children('input').val();
  selected_menu.push(addobj)
}
function removeMenuData(item_el){
  index = selected_menu.findIndex(x => x._id==item_el.children('input').val())
  console.log(index);
  selected_menu.splice(index, 1);
}
function loadMenuData(objs){
  html = ""
  objs.forEach(obj => {
  html +='<div class="item">'+
          '<div class="item_frame">'+
            '<img src="'+ serverip + obj.img_dir + '" class="item_img">'+
          '</div>'+
          '<div class="item_name">'+
            obj.item_name +
          '</div>'+
          '<div class="item_price">'+
            obj.item_price +
          '원</div>'+
          '<input type="hidden" value="'+obj._id+'">' +
        '</div>'
  });
  return html
}
$(document).ready(function() {
  $(".mat-input").focus(function(){
    $(this).parent().addClass("is-active is-completed");
  });

  $(".mat-input").focusout(function(){
    if($(this).val() === "")
      $(this).parent().removeClass("is-completed");
    $(this).parent().removeClass("is-active");
  })
  $('.container').on("mouseover",function(){
    boolean = $('.col-md-4').eq(0).is(":hover")
    || $('.col-md-4').eq(1).is(":hover")
    || $('.col-md-4').eq(2).is(":hover")
    if (!boolean) {
      $('.col-md-4').eq(2).addClass("hover");
    }else{
      $('.col-md-4').eq(2).removeClass("hover");
    }
  })
  /*ajax call*/
  $.ajax({
    url: '/get_item_data',
    type: 'POST'
  })
  .done(function(data) {
    objs = eval(data);
    console.log(objs);
    $('.menu-image').html(loadMenuData(objs));
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    $('.item').on('click', function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active')
        removeMenuData($(this))
      }else {
        $(this).addClass('active')
        addMenuData($(this))
      }
      $('.selected_menu').html(loadMenuData(selected_menu));
    });
  });

  $('#finish').click(function() {
    submit_action($('#telephone'))
  });

});
