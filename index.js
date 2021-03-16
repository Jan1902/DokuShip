const debounce = (fn) => {
    let frame;
    return (...params) => {
        if (frame) {
            cancelAnimationFrame(frame);
        }
        frame = requestAnimationFrame(() => {

            fn(...params);
        });
    }
};

const onScroll = () => {
    updateNavBarColor();
    updateNavPoints();
}

const updateNavBarColor = () => {
    var head = document.getElementsByClassName("head")[0];
    head.style.backgroundColor = "rgba(255, 255, 255, " + (window.scrollY / 300) + ")";
    head.style.color = "rgb(" + (255 - ((window.scrollY / 300) * 255)) + ", " + (255 - ((window.scrollY / 300) * 255)) + ", " + (255 - ((window.scrollY / 300) * 255)) + ")";
    if (window.scrollY > 200) {
        head.style.boxShadow = "0px 5px 0.5rem rgba(0, 0, 0, 0.5)";
    } else {
        head.style.boxShadow = null;
    }
}

const updateNavPoints = () => {
    var list = $(".nav-point").toArray().filter(p => $($(p).attr("href")).position().top + $(".head").height() > window.scrollY);
    var last = list[list.length - 1];
    $(".nav-point").not(last).removeClass("selected");
    $(last).addClass("selected");
    console.log($(window).scrollTop());
}

document.addEventListener('scroll', debounce(onScroll), { passive: true });

const setupSmoothScrolling = () => {
    $('a[href*=\\#]:not([href=\\#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - $(".head").height()
                }, 700);
                return false;
            }
        }
    });
}

const setupEmail = () => {
    $("#contact-send-button").click(function() {
        var data = $("#email-form").serializeArray();
        var tmp = window.open("mailto:anfrage@dokuship.de?subject=Anfrage - " +
            encodeURIComponent(data[1].value) + ", " +
            encodeURIComponent(data[0].value) + " - " +
            encodeURIComponent(data[2].value) + "&body=" +
            encodeURIComponent(data[4].value) + encodeURIComponent("\r\n\r\n") +
            encodeURIComponent(data[2].value) + encodeURIComponent("\r\nTel.: ") +
            encodeURIComponent(data[3].value));
        tmp.close();
    });
}

$(function() {
    setupSmoothScrolling();
    updateNavBarColor();
    updateNavPoints();
    setupEmail();

    $(".nav-point").each(function() {
        console.log($($(this).attr("href")).position().top);
    });
});