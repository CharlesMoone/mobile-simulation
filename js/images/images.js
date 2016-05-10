/**
 * Created by apple on 16/5/9.
 */
window.onload = function () {
    var preload = document.getElementsByClassName("preload")[0];
    preload.children[0].className = "finish";
    preload.remove();
};

var getImages = function () {
    var i, img, section;
    section = document.getElementsByTagName("section")[0];
    for (i = 0; i < 5; i ++) {
        img = new Node({node: "IMG"}, section);
        img.n.setAttribute("src", "http://lorempixel.com/100/100?id=" + i);
    }
};

getImages();