/**
 * Created by apple on 16/5/9.
 */
window.onload = function () {
    var preload = document.getElementsByClassName("preload")[0];
    preload.children[0].className = "finish";
    preload.remove();

    var length = {start: 0, end: 0, canRefresh: true, isRefresh: false};
    eventListener(length);
};

var eventListener = function (length) {

    var article = document.getElementsByTagName("article")[0];
    var loading = document.getElementsByClassName("loading")[0];

    document.addEventListener('touchstart', function (e) {
        if (e.target == document.getElementsByTagName('h3')[0] || e.target == document.getElementsByTagName('footer')[0]) {
            return ;
        }
        if (window.scrollY != 0) {
            length.canRefresh = false;
        }
        if (length.canRefresh) {
            length.start = length.end = e.targetTouches[0].pageY;
        }
    });

    document.addEventListener('touchmove', function (e) {
        if (e.target == document.getElementsByTagName('h3')[0] || e.target == document.getElementsByTagName('footer')[0]) {
            return ;
        }
        length.end = e.targetTouches[0].pageY;
        if (length.end <= length.start) {
            length.canRefresh = false;
            article.style.marginTop = null;
        } else if (window.scrollY == 0) {
            length.canRefresh = true;
        }
        if (length.canRefresh) {
            e.preventDefault();
            article.style.marginTop = (length.end - length.start) + "px";
        }
    });

    document.addEventListener('touchend', function (e) {
        if (e.target == document.getElementsByTagName('h3')[0] || e.target == document.getElementsByTagName('footer')[0]) {
            return ;
        }
        if(length.canRefresh) {
            if (length.end - length.start > 50) {
                if (length.isRefresh) {
                    article.style.marginTop = "50px";
                    return ;
                }
                length.isRefresh = true;
                loading.innerHTML = "哼,说加载就加载";
                article.style.marginTop = "50px";
                setTimeout(function () {
                    article.style.marginTop = null;
                    var i, section, div, h4, p, button;
                    for (i = 0; i < 4; i ++) {
                        section = new Node({node: "SECTION", before: true, beforeNumber: 1}, article);
                        div = new Node({node: "DIV"}, section.n);
                        div.n.setAttribute("onclick", "panel()");
                        h4 = new Node({node: "H4"}, div.n, "this is title " + i);
                        p = new Node({node: "P"}, div.n, "this is a description about the title.");
                        button = new Node({node: "BUTTON", class: "share"}, section.n);
                        length.isRefresh = false;
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

var panel = function () {
    var div, iframe;
    div = new Node({node: "DIV", class: "panel", before: true}, document.getElementsByTagName("body")[0]);
    iframe = new Node({node: "IFRAME"}, div.n);
    iframe.n.setAttribute("frameborder", 0);
    iframe.n.setAttribute("src", "html/images.html");
    document.getElementsByTagName("footer")[0].style.display = "none";
    div.n.style.width = window.innerWidth + "px";
    div.n.style.display = "block";
};