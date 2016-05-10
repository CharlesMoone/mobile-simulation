/**
 * Created by apple-charlesMoon on 16/5/8.
 */
/**
 * 创建一个节点对象
 * @param node 节点名称
 * @param parent 父节点
 * @param textOrChild 文本/子节点
 */
var Node = function (node, parent, textOrChild) {
    if (this instanceof Node) {
        this.n = document.createElement(node.node);
        if ("class" in node) this.n.className = node.class;
        if (textOrChild != undefined) typeof textOrChild == "string" ? this.n.appendChild(document.createTextNode(textOrChild)) : this.n.appendChild(textOrChild);
        parent = parent == "" ? document.getElementsByTagName("html")[0] : parent || document.getElementsByTagName("html")[0];
        node.before == true ? ('beforeNumber' in node ? parent.insertBefore(this.n, parent.children[node.beforeNumber]) : parent.insertBefore(this.n, parent.children[0])) : parent.appendChild(this.n);
    } else {
        return new Node(node, parent, textOrChild);
    }
};

(function () {
    var preload = new Node({node: "DIV", class: "preload"});
    var fill = new Node({node: "DIV"}, preload.n);
})();