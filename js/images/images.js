/**
 * Created by apple on 16/5/9.
 */
window.onload = function () {
    var preload = document.getElementsByClassName("preload")[0];
    preload.children[0].className = "finish";
    preload.remove();

    var eventBind = new EventBind("article");
    // eventBind.touchStart();
    // eventBind.touchMove();
};

var EventBind = function (tagTarget) {
    if (this instanceof EventBind) {
        this.domTarget = document.getElementsByTagName(tagTarget)[0];
        this.length = {start:0, end:0};
    } else {
        return new EventBind(tagTarget);
    }
};
EventBind.prototype = {
    touchStart: function () {
        var that = this;
        document.addEventListener("touchstart", function (e) {
            that.length.start = that.length.end = e.targetTouches[0].pageX;
        });
    },
    touchMove: function () {
        var that = this;
        document.addEventListener("touchmove", function (e) {
            that.length.end = e.targetTouches[0].pageX;
            if (that.length.end < that.length.start) {
                return ;
            }
            console.log(that.length.end, e.targetTouches[0].clientX);
            that.domTarget.style.marginLeft = (that.length.end - that.length.start) + "px";
        });
    }
};

// var getImages = function () {
//     var i, img, section;
//     section = document.getElementsByTagName("section")[0];
//     for (i = 0; i < 5; i ++) {
//         img = new Node({node: "IMG"}, section);
//         img.n.setAttribute("src", "http://lorempixel.com/100/100?id=" + i);
//     }
// };
//
// getImages();