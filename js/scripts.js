var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        //return navigator.userAgent.match(/Mozilla/i);
         return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

jQuery(document).ready(function ($) {




    if( !isMobile.any() || (isMobile.any() && window.screen.width>600) ){
        $(window).stellar();
     }

    var links = $('.navigation').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');


    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        if (direction === 'down') {
            $('.navigation li').removeClass('active');
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active');
        }
        else {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }

    });
 
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li').removeClass('active');
            $('.navigation li[data-slide="1"]').addClass('active');
        }else if( 100 * $(this).scrollTop() / ($(document).height() - $(this).height()) >= 99){
            $('.navigation li').removeClass('active');
            $('.navigation li[data-slide="6"]').addClass('active');
        }
    });

    function goToByScroll(dataslide) {
        var add= 5;
        if(window.scrollY>$('.slide[data-slide="' + dataslide + '"]').offset().top){
            add=add*(-1);
        }
        
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top + add
        }, 2000, 'easeInOutQuint');
    }



    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });


});