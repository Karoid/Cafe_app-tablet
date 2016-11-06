var serverip = "http://52.78.68.136"
var selected_menu = new Array()



/*class menu start*/
function Menu(){}


Menu.prototype.loadMenuData = function(objs){
  html = ""
  objs.forEach(function(obj,index) {
  html += '<div class="item_frame">'+
            '<img src="'+ serverip + obj.img_dir + '" class="item_img">'+
          '</div>'+
          '<div class="item_name">'+
            obj.item_name +
          '</div>'+
          '<div class="item_price">'+
            obj.item_price +
          '원</div>'       
        
  });
  return html
}



$(document).ready(function() {

  var menu = new Menu();
    
  /*ajax call*/
 $.ajax({
    url: serverip+'/cafe/all_menu',
    type: 'POST'
  })
  .done(function(data) {
    objs = eval(data);
    $('.all-menu').html(menu.loadMenuData(objs));
  })
  .fail(function() {
    console.log("error");
  })

   /*ajax call*/
 $.ajax({
    url: serverip+'/get_item_data_sorted_by_liked',
    type: 'POST'
  })
  .done(function(data) {
    objs = eval(data);
    $('.best-menu').html(menu.loadMenuData(objs));
  })
  .fail(function() {
    console.log("error");
  })
});
