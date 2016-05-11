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
        } else if (length.end > length.start && window.scrollY == 0) {
            length.canRefresh = true;
        }
        if (length.canRefresh) {
            e.preventDefault();
            article.style.marginTop = (length.end - length.start) + "px";
        }
    });

    document.addEventListener('touchend', function (e) {
        if(length.canRefresh) {
            if (length.end - length.start > 50) {
                loading.innerHTML = "哼,说加载就加载";
                article.style.marginTop = "50px";
                setTimeout(function () {
                    article.style.marginTop = null;
                    var i, section, h4, p, button;
                    for (i = 0; i < 4; i ++) {
                        section = new Node({node: "SECTION", before: true, beforeNumber: 1}, article);
                        h4 = new Node({node: "H4"}, section.n, "this is title " + i);
                        p = new Node({node: "P"}, section.n, "this is a description about the title.");
                        button = new Node({node: "BUTTON", class: "share"}, section.n);
                    }
                    loading.innerHTML = "在拉就加载给你看";
                }, 2000);
            } else {
                article.style.marginTop = null;
            }
        }
        length.canRefresh = true;
    });
};