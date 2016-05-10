/**
 * Created by apple on 16/5/9.
 */
window.onload = function () {
    var preload = document.getElementsByClassName("preload")[0];
    preload.children[0].className = "finish";
    preload.remove();

    var length = {start: 0, end: 0, canRefresh: true};
    eventListener(length);
};

var eventListener = function (length) {

    var article = document.getElementsByTagName("article")[0];
    var loading = document.getElementsByClassName("loading")[0];

    var count = 0;
    window.addEventListener("scroll", function(e) {
        e.preventDefault();
        count ++;
        console.log(count);
    });

    document.addEventListener('touchstart', function (e) {
        if (window.scrollY != 0) {
            length.canRefresh = false;
        }
        if (length.canRefresh) {
            length.start = length.end = e.targetTouches[0].pageY;
        }
    });

    document.addEventListener('touchmove', function (e) {
        length.end = e.targetTouches[0].pageY;
        if (length.end <= length.start) {
            length.canRefresh = false;
        }
        if (length.canRefresh) {
            e.preventDefault();
            article.style.marginTop = (length.end - length.start) + "px";
        }
    });

    document.addEventListener('touchend', function (e) {
        if(length.canRefresh) {
            if (length.end - length.start > 50) {
                article.style.marginTop = "50px";
                setTimeout(function () {
                    article.style.marginTop = null;
                }, 2000);
            } else {
                article.style.marginTop = null;
            }
        }
        length.canRefresh = true;
    });
};