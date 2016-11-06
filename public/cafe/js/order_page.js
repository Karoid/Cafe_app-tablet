
var serverip = "http://52.78.68.136"
var selected_menu = new Array()
/*class menu start*/
function Menu(){}
Menu.prototype.addMenuData = function(item_el){
  addobj = new Object()
  img_url = item_el.children('.item_frame').children('.item_img').attr('src');
  addobj.eq = parseInt(item_el.attr("value"))
  addobj.img_dir = img_url.split(serverip)[1];
  addobj.item_name = item_el.children('.item_name').text();
  addobj.item_price = item_el.children('.item_price').text().split("원")[0];
  addobj._id = item_el.children('input').val();
  addobj.option = 0
  selected_menu.push(addobj)
  subselect = '<div class="submenu">'+
                '<div class="sub_title">'+
                  '<hr>옵션 선택<hr>'+
                '</div>'+
                '<div class="round noadd">no <br>휘핑'+
                '</div>'+
                '<div class="round noadd">no <br>시럽'+
                '</div>'+
                '<div class="round oneline icehot">ice'+
                '</div>'+
                '<div class="round noadd">no <br>샷'+
                '</div>'+
              '</div>'
  $('.selected_menu').append(this.loadMenuData([addobj])).children('.item').last()
  .children('.item_frame').children('.after').before(subselect)
  .parent('.item').children('.item_price').remove().end()
  $('.selected_menu .item').last().on('click',".after",this.xclickevent)
  .children('.item_frame').children('.submenu').on('click', '.round',this.optionclickevent)
}
Menu.prototype.removeMenuData = function(item_el){
  id_string_sort = selected_menu.map(function(obj){ return obj._id}).slice().sort();
  id_string = selected_menu.map(function(obj){ return obj._id})
  index = id_string.lastIndexOf(item_el.children('input').val())
  last_index = id_string_sort.lastIndexOf(item_el.children('input').val())
  first_index = id_string_sort.indexOf(item_el.children('input').val())
  $(".menu-image .item").eq(selected_menu[index].eq).children('.item_frame').children('.number').html((last_index-first_index))
  if ((last_index-first_index)<=0) {
    $(".menu-image .item").eq(selected_menu[index].eq).removeClass('active')
  }
  selected_menu.splice(index, 1);
  if (item_el.parents('.selected_menu').length) {
    item_el.remove()
  }else {
    $('.selected_menu .item').eq(index).remove()
  }
}
Menu.prototype.loadMenuData = function(objs){
  html = ""
  objs.forEach(function(obj,index) {
  html +='<div class="item" value="'+index+'">'+
          '<div class="item_frame">'+
            '<img src="'+ serverip + obj.img_dir + '" class="item_img">'+
            '<div class="after">X</div>'+
            '<div class="number">0</div>'+
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
Menu.prototype.xclickevent = function (){
  menu = new Menu;
  thisitem = $(this).parent('.item_frame').parent('.item')
  menu.removeMenuData(thisitem)
}
Menu.prototype.optionclickevent = function (){
  item_el = $(this).parent('.submenu').parent('.item_frame').parent('.item');
  item_index = item_el.index()
  option_index = $(this).index() -1;
    if ($(this).hasClass('active')) {
      $(this).removeClass('active')
      if ($(this).hasClass('noadd')) {
        $(this).html($(this).html().split("yes")[1])
        $(this).html("no"+$(this).html())
      }else if($(this).hasClass('icehot')){
        $(this).html("ice")
      }
      selected_menu[item_index].option -= Math.pow(2,option_index)
    }else {
      $(this).addClass('active')
      if ($(this).hasClass('noadd')) {
        $(this).html($(this).html().split("no")[1])
        $(this).html("yes"+$(this).html())
      }else if($(this).hasClass('icehot')){
        $(this).html("hot")
      }
      selected_menu[item_index].option += Math.pow(2,option_index)
    }
}
/*class menu end*/
/*class submit start*/
function Submit(){
  userdata = new Object();
  submit_phone = function (obj) {
    var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
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
  get_userdata = function(){
    userdata.name = $('#first-name').val()
    userdata.address = $('#last-name').val()
    userdata.telephone = $('#telephone').val()
    userdata.agreement = $('.checkbox').val()
  }
  this.submit_action = function(){
    done = submit_phone($('#telephone'))
    nonuser = $('.pw').val()
    get_userdata()
    if (done && nonuser == "") {
      var redirect = '/cafe/order_check.html';
      $.redirectPost(redirect, {userdata: JSON.stringify(userdata), orderdata: JSON.stringify(selected_menu)});
      /*$.ajax({
        url: '/cafe/user_order',
        type: 'POST',
            dataType: 'application/json',
        data: {userdata: userdata, orderdata: selected_menu}
      })
      .done(function(data) {
        console.log("success");
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
      })
    }else if (done) {
      $.ajax({
        url: '/cafe/nonuser_order',
        type: 'POST',
        dataType: 'application/json',
        data: {userdata: userdata, orderdata: selected_menu, pw:nonuser}
      })
      .done(function(data) {
        console.log("success");
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
      })
      */
    }
  }
}
/*class submit end*/
/*on browser start, call*/
$(document).ready(function() {

  var menu = new Menu();
  var submit = new Submit();
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
    url: serverip+'/get_item_data',
    type: 'POST'
  })
  .done(function(data) {
    objs = eval(data);
    $('.menu-image').html(menu.loadMenuData(objs));
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    $('.item_frame .item_img').on('click', function() {
      this_item = $(this).parent('.item_frame').parent('.item')
        this_item.addClass('active')
        menu.addMenuData(this_item)
        old_count = this_item.children('.item_frame').children('.number').html()
        this_item.children('.item_frame').children('.number').html(parseInt(old_count)+1)
    })
    $.ajax({
      url: '/cafe/recent_order',
      type: 'GET'
    })
    .done(function(data) {
      console.log(data);
      $('.past').html(data)
    })

    $('.item_frame .after').click(function(){
      this_item = $(this).parent('.item_frame').parent('.item')
      menu.removeMenuData(this_item)
    })
  });
  /*send data to server*/
  $('#finish').click(function() {
    submit.submit_action()
  });
});
