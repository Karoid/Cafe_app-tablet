var serverip = "http://52.78.68.136"
var selected_menu = new Array()



/*class menu start*/
function Menu(){}


Menu.prototype.loadMenuData = function(objs){
  html = ""
  objs.forEach(function(obj,index) {
    if (obj) {
      html += '<div class="item"><div class="item_frame">'+
      '<img src="'+ serverip + obj.img_dir + '" class="item_img">'+
      '</div>'+
      '<div class="item_name">'+
      obj.item_name +
      '</div>'+
      '<div class="item_price">'+
      obj.item_price +
      '원</div>'+
        '<div class="like">'+
        obj.like +
        '</div><div class="like_text">likes</div>'+
      '</div>'
    }

  });
  return html
}



$(document).ready(function() {

  var menu = new Menu();

  /*ajax call*/
 $.ajax({
    url: serverip+'/get_item_data_sorted_by_liked',
    type: 'POST'
  })
  .done(function(data) {
    objs = eval(data);
    console.log(objs);
    $('.best-menu').html(menu.loadMenuData(objs));
    $('#best3 .item').click(function(event) {
      this_item = $(this)
      $.ajax({
        url: '/liked',
        type: 'POST',
        dataType: 'application/json',
        data: {asd: this_item.children('.item_name').text()}
      })
      .always(function(data) {
        this_item.children('.like').html(data.responseText)
      });
    });
  })
  .fail(function() {
    console.log("error");
  })

   /*ajax call*/
 $.ajax({
    url: serverip+'/get_item_data',
    type: 'POST'
  })
  .done(function(data) {
    objs = eval(data);
    $('.all-menu').html(menu.loadMenuData(objs));
  })
  .fail(function() {
    console.log("error");
  })
});
