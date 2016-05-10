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

    document.addEventListener('touchstart', function (e) {
        if (window.scrollY != 0) {
            length.start = 0;
            length.end = 0;
            return ;
        }
        if (length.canRefresh) {
            length.start = e.targetTouches[0].pageY;
        }
    });

    document.addEventListener('touchmove', function (e) {
        if (window.scrollY != 0) {
            length.start = 0;
            length.end = 0;
            return ;
        }
        length.end = e.targetTouches[0].pageY;
        if (length.end < length.start) {
            length.start = 0;
            length.end = 0;
            return ;
        }
        if (length.canRefresh) {
            console.log(length.start, length.end);
            e.preventDefault();
            article.style.marginTop = (length.end - length.start) + "px";
        }
    });

    document.addEventListener('touchend', function (e) {
        if (window.scrollY != 0) {
            length.start = 0;
            length.end = 0;
            return ;
        }
        if (length.end < length.start) {
            length.start = 0;
            length.end = 0;
            return ;
        }
        if (length.canRefresh) {
            length.canRefresh = false;
            if (length.end - length.start >= 50) {
                article.style.marginTop = "50px";
                refresh(length, article);
            } else {
                article.style.marginTop = null;
                length.canRefresh = true;
                length.start = 0;
                length.end = 0;
            }
        }
    });
};

var refresh = function (length, target) {
    setTimeout(function () {
        length.canRefresh = true;
        length.start = 0;
        length.end = 0;
        target.style.marginTop = null;
    }, 3000);
};