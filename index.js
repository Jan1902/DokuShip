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

const setupSystemDetails = () => {
    if ($(window).width() <= 600) {
        $(".system-details-item").click(function(e) {
            if ($(this).attr("class").includes("selected")) {
                $(this).removeClass("selected");
            } else {

                $(this).addClass("selected");
            }
        })

        $(".system-details-item").each(function() {
            $("#system-details-" + $(this).attr("data-fold")).detach().appendTo($(this));
        })
        $("#system-details").remove();
    } else {
        $(".system-details-item").click(function(e) {
            if ($(this).attr("class").includes("selected")) {
                return;
            }

            if ($(".selected").length > 0) {
                $("#system-details").css("max-height", "0");
                $("#system-details").css("opacity", "0");
                $("#system-details").css("margin-top", "0");
            }

            setTimeout(() => {
                $("#system-details").css("max-height", "75vh");
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

        $("#system-details").css("max-height", "75vh");
        $("#system-details").css("opacity", "100");
        $("#system-details").css("margin-top", "2rem");
        $("[id^=system-details-]").first().css("display", "grid");
        $(".system-details-item").first().addClass("selected");
    }
}

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
    setupSystemDetails();
    setupEmail();

    $(".nav-point").each(function() {
        console.log($($(this).attr("href")).position().top);
    });
});