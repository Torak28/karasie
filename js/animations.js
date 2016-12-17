//--------------------------------------------------------fadeIn animation

$(window).on("load",function() {
    $(window).scroll(function() {
        $(".fadein").each(function() {
            /* Check the location of each desired element */
            var objectBottom = $(this).offset().top + $(this).outerHeight();
            var windowBottom = $(window).scrollTop() + $(window).innerHeight();

            /* If the element is completely within bounds of the window, fade it in */
            if (objectBottom < windowBottom) { //object comes into view (scrolling down)
                if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
            }
        });
    }); $(window).scroll(); //invoke scroll-handler on page-load
});

///--------------------------------------------------------menu scroll onclick
$(document).ready(function (){
    $("#buttonIntro").click(function (){
        $('html, body').animate({
            scrollTop: $("#intro").offset().top
        }, 1000);
    });
});

$(document).ready(function (){
    $("#buttonFisz2").click(function (){
        $('html, body').animate({
            scrollTop: $("#fisz2").offset().top
        }, 1000);
    });
});

$(document).ready(function (){
    $("#buttonSim").click(function (){
        $('html, body').animate({
            scrollTop: $("#sim").offset().top
        }, 1000);
    });
});