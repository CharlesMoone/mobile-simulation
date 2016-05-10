/**
 * Created by apple on 16/5/9.
 */
window.onload = function () {
    var preload = document.getElementsByClassName("preload")[0];
    preload.children[0].className = "finish";
    preload.remove();

    var length = {start: 0, end: 0, canRefresh: true, canNode: true};
    eventListener(length);
};

var eventListener = function (length) {

    var article = document.getElementsByTagName("article")[0];

    document.addEventListener('touchstart', function (e) {
        if (!length.canRefresh) {
            return ;
        }
        length.start = length.end = e.targetTouches[0].pageY;

    });

    document.addEventListener('touchmove', function (e) {
        length.end = e.targetTouches[0].pageY;
        var realLength = length.end - length.start;
        if (!length.canRefresh || realLength <= 0 || window.scrollY != 0) {
            return ;
        }
        if (length.canNode && realLength > 5 && window.scrollY == 0) {
            var loading = new Node({node: "DIV", class: "loading"}, document.getElementsByTagName("section")[0], "松开就加载给你看!");
            length.canNode = false;
        }
        e.preventDefault();
        article.style.marginTop = realLength + "px";
    });

    document.addEventListener('touchend', function (e) {
        var realLength = length.end - length.start;
        var loading = document.getElementsByClassName("loading")[0];
        // if (!length.canRefresh || realLength <= 0) {
        //     if (loading != undefined) loading.remove();
        //     article.style.marginTop = null;
        // } else {
        //     if (realLength > 50) {
        //         loading.innerHTML = "好吧,那就加载给你看!";
        //         length.end = length.start + 50;
        //         article.style.marginTop = (length.end - length.start) + "px";
        //         length.canRefresh = false;
        //         refresh(length, article, loading);
        //     } else if ((length.end - length.start) > 0) {
        //         if (loading != undefined) loading.remove();
        //         article.style.marginTop = null;
        //     }
        // }

        if (length.canRefresh && realLength > 50 && window.scrollY == 0) {
            loading.innerHTML = "好吧,那就加载给你看!";
            // length.end = length.start + 50;
            article.style.marginTop = "50px";
            length.canRefresh = false;
            refresh(length, article, loading);
            return ;
        }
        if (loading != undefined) loading.remove();
        article.style.marginTop = null;
    });
};

var refresh = function (length, target, loading) {
    setTimeout(function () {
        loading.remove();
        var article = document.getElementById("article");
        target.style.marginTop = null;
        length.canRefresh = true;
        length.canNode = true;

        var i, section, h4, p, button;
        for (i = 0; i < 4; i ++) {
            section = new Node({node: "SECTION", before: true, beforeNumber: 1}, article);
            h4 = new Node({node: "H4"}, section.n, "this is title " + i);
            p = new Node({node: "P"}, section.n, "this is a description about the title.");
            button = new Node({node: "BUTTON", class: "share"}, section.n);
        }
    }, 3000);
};