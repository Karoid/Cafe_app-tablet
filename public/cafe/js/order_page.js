
$('.menu-list').attr('src','/img/like_2.png');
$('img').on({ 
    'click': function() { 
         var src = ($(this).attr('src') === '/img/like_1.png') 
            ?'/img/like_2.png'
            : '/img/like_1.png'; 
          $(this).attr('src',src);
    } 
});
