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

const storeScroll = () => {
    var head = document.getElementsByClassName("head")[0];
    head.style.backgroundColor = "rgba(255, 255, 255, " + (window.scrollY / 300) + ")";
    head.style.color = "rgb(" + (255 - ((window.scrollY / 300) * 255)) + ", " + (255 - ((window.scrollY / 300) * 255)) + ", " + (255 - ((window.scrollY / 300) * 255)) + ")";
    if (window.scrollY > 200) {
        head.style.boxShadow = "0px 5px 0.5rem rgba(0, 0, 0, 0.5)";
    } else {
        head.style.boxShadow = null;
    }
}

document.addEventListener('scroll', debounce(storeScroll), { passive: true });

$(function() {
    $('a[href*=\\#]:not([href=\\#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 100
                }, 700);
                return false;
            }
        }
    });
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

    $(".system-details-item").click(function(e) {
        if ($(".selected").length > 0) {
            $("#system-details").css("height", "0");
            $("#system-details").css("opacity", "0");
            $("#system-details").css("margin-top", "0");
        }

        setTimeout(() => {
            $("#system-details").css("height", "45vh");
            $("#system-details").css("opacity", "100");
            $("#system-details").css("margin-top", "2rem");
            $("[id^=system-details-]").css("display", "none");
            $("#system-details-" + this.getAttribute("data-fold")).css("display", "grid");
        }, $(".selected").length > 0 ? 500 : 0);

        $(".system-details-item").removeClass("selected");
        $(this).addClass("selected");

        $('html,body').animate({
            scrollTop: $(".system-details-item").offset().top - 150
        }, 700);
    });

    $("#system-details").css("height", "45vh");
    $("#system-details").css("opacity", "100");
    $("#system-details").css("margin-top", "2rem");
    $("[id^=system-details-]").first().css("display", "grid");
    $(".system-details-item").first().addClass("selected");
});