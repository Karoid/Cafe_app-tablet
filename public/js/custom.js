/****init start******/
setTimeout(function () {
  $("#section1").prepend($('<div>').append($('.slide').eq($(".slide").length-1).clone()).html())
  $("#section1").append($('<div>').append($('.slide').eq(1).clone()).html())
  init()
  Interval = setInterval(function(){
	$.fn.fullpage.moveSlideRight();
  },3000)
}, 100);//promise로 ajax call이후에 실행되도록 수정 요망


function init(){
var delay=1000; //1 second

setTimeout(function() {
  //your code to be executed after 1 second
}, delay);
var config = {
    // How long Waves effect duration
    // when it's clicked (in milliseconds)
    duration: 500,

    // Delay showing Waves effect on touch
    // and hide the effect if user scrolls
    // (0 to disable delay) (in milliseconds)
    delay: 200
};

// Initialise Waves with the config
Waves.attach('.price-ico-heart', [ 'waves-float', 'waves-light']);
Waves.init(config);

//Fullpage initialize
$(document).ready(function() {
    $('#fullpage').fullpage({
        //Navigation
        menu: '#menu',
        lockAnchors: false,
        anchors:['firstPage', 'secondPage'],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide'],
        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: true,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: false,
        verticalCentered: true,
        sectionsColor : ['#fff', '#fff'],
        paddingTop: '65px',
        paddingBottom: '10px',
        fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){},
        afterLoad: function(anchorLink, index){},
        afterRender: function(){
        	$(".fp-slidesNav li").eq(-1).css("display","none")
        	$(".fp-slidesNav li").eq(0).css("display","none")
        	$('.fp-slidesNav.bottom').css('margin-left','-'+$('.fp-slidesNav.bottom').width()/2+'px')
        },
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
        	slidenum = $(".fp-slidesNav li").length
        	if (index == 1 && slideIndex == slidenum-1) {
        		$(".fp-slidesContainer").attr("style","width: "+slidenum+"00%; transform: translate3d("+(-$(".fp-slides").width())+"px, 0px, 0px);")
        		$.fn.fullpage.moveTo(1, 1);
        	}
        	if (index == 1 && slideIndex == 0) {
        		$(".fp-slidesContainer").attr("style","width: "+slidenum+"00%; transform: translate3d("+(-$(".fp-slides").width())*(slidenum-2)+"px, 0px, 0px);")
        		$.fn.fullpage.moveTo(1, slidenum-2);
        	}
        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });
});

}
/************  data interaction end  ************/

/************Summery Popup************/
function summery_appear(){
    $(".zipper").css("z-index","0")
       $(".left").css({
            opacity: 1,
            left: '-48%'
            },500)
        $(".right").css({
            opacity: 1,
            left:'48%'
            },500) 
        off = setTimeout(function(){
            $(".left").css({
                opacity: 0,
                left: '-100%'
                },500)
            $(".right").css({
                opacity: 0,
                left: '100%'
                },500)
            setTimeout(function(){$(".zipper").css("z-index","-1")},500)
        },3000)
    }
$( document ).ready(function() {
    $('#fullpage').on("click",summery_appear)
    $('.left').draggable({axis: "x", stack: "html .zipper", containment: ".left_drag", scroll: false});
    $('.right').draggable({axis: "x", stack: "html .zipper", containment: ".right_drag", scroll: false});
    $('.left').mouseup(function(){
        if ($('.left').css('left') != '-491.516px' && $('.left').css('left') != '-48%' && $('.left').css('z-index') != '-1') {
            setTimeout(function(){window.location.replace("./best.html");},500)
        }
    })
    $('.right').mouseup(function(){
        if ($('.right').css('left') != '492px' && $('.right').css('left') != '48%' && $('.right').css('z-index') != '-1') {
            setTimeout(function(){window.location.replace("./best.html");},500)
        }
    })
});

/*developing guide*/
console.log("!!개발 가이드!!\n"+
            "옆으로 회전하는 효과 제거: clearInterval(Interval)\n"+
            "클릭시 summery 나타나는 효과 제거: $('#fullpage').off()\n"+
            "항상 summery가 나타나도록 하기 : summery_appear();clearTimeout(off)\n")