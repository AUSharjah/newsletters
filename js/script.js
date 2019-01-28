jQuery.fn.animateAuto = function(prop, speed, callback) {
    var elem, height, width;
    return this.each(function(i, el) {
        el = jQuery(el), elem = el.clone().css({
            "height": "auto",
            "width": "auto",
        }).appendTo("body");
        height = elem.css("height"),
            width = elem.css("width"),
            elem.remove();

        if (prop === "height")
            el.animate({
                "height": height
            }, speed, callback);
        else if (prop === "width")
            el.animate({
                "width": width
            }, speed, callback);
        else if (prop === "both")
            el.animate({
                "width": width,
                "height": height
            }, speed, callback);
    });
}

function ScrollTo(target) {
    $('html, body').animate({
        scrollTop: $(target.replace('detail', 'news')).offset().top
    }, 300);
}
$('.click3').click(function() {
    const target = $(this).attr('href');
    if ($(target).hasClass('active')) {

        ScrollTo(target);
        $(target + ' > .body').slideUp('fast', function() {
            $(target).removeClass('active');
        });
    } else {
        $(target).addClass('active');
        ScrollTo(target);
        $(target + ' > .body').slideDown();
    }
    return false;
});
$('.click').click(function() {
    const target = $(this).attr('href');
    console.log(target);
    if ($(target).hasClass('active')) {
        $(target).removeClass('active');

        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 300, function() {
            const height = $(target + " > .body").attr('data-height');
            $(target + " > .body").css('height', height);
            $(target + " > .body").css('height', '');
        });

    } else {
        $(target).addClass('active');

        $(target + " > .body").animateAuto("height", 500, () => {
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 300, () => {
                const height = $(target + " > .body").css('height');
                $(target + " > .body").css('height', 'auto');
                $(target + " > .body").attr('data-height', height);
            });
        });
    }
    return false;
});
$('.click2').click(function() {
    const target = $(this).attr('href');
    if ($(target).hasClass('active')) {
        $('.news-2-item').removeClass('wide');
        $('.news-2-item').removeClass('active');

        $('html, body').animate({
            scrollTop: $("#news2").offset().top
        }, 300, function() {
            let height = $("#news2 > .body").attr('data-height');
            $("#news2 > .body").css('height', height);
            $("#news2 > .body").css('height', '');

            height = $("#news2 > .body").attr('data-height');
            $("#news3 > .body").css('height', height);
            $("#news3 > .body").css('height', '');
        });
    } else {
        $('.news-2-item').addClass('wide');
        $(target).addClass('active');

        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 300, () => {

            $(target + " > .body").animateAuto("height", 500, () => {
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 300, () => {
                    const height = $(target + " > .body").css('height');
                    $(target + " > .body").css('height', 'auto');
                    $(target + " > .body").attr('data-height', height);
                });
            });
        });
    }
    return false;
});

//TODO : Fix News & Details Replace
$(document).ready(function() {

    let target = window.location.href.substr(window.location.href.length - 6, 5);
    console.log(target);
    if (target.substr(0, 4) === "news") {
        $('[href="#' + target + '"]').trigger("click");
    }
});