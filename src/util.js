/**
 * $函数的依赖函数，选择器函数
 * @param   {string} selector CSS方式的选择器
 * @param   {object} root     可选参数，selector的父对象。不存在时，为document
 * @returns {Array}  返回获取到的节点数组，需要注意的是使用ID选择器返的也是数组
 */
function VQuery(selector, root) {
    //用来保存选择的元素
    var elements = []; //保存结果节点数组
    var allChildren = null; //用来保存获取到的临时节点数组
    root = root || document; //若没有给root，赋值document
    switch (selector.charAt(0)) {
    case "#": //id选择器
        elements.push(root.getElementById(selector.substring(1)));
        break;
    case ".": //class选择器
        if (root.getElementsByClassName) { //标准
            elements = root.getElementsByClassName(selector.substring(1));
        } else { //兼容低版本浏览器
            var reg = new RegExp("\\b" + selector.substring(1) + "\\b");
            allChildren = root.getElementsByTagName("*");
            for (var i = 0, len = allChildren.length; i < len; i++) {
                if (reg.test(allChildren[i].className)) {
                    elements.push(allChildren[i]);
                }
            }
        }
        break;
    case "[": //属性选择器
        if (selector.indexOf("=") === -1) {
        //只有属性没有值的情况
            allChildren = root.getElementsByTagName("*");
            for (var i = 0, len = allChildren.length; i < len; i++) {
                if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                    elements.push(allChildren[i]);
                }
            }
        } else {
        //既有属性又有值的情况
            var index = selector.indexOf("="); //缓存=出现的索引位置。
            allChildren = root.getElementsByTagName("*");
            for (var i = 0, len = allChildren.length; i < len; i++) {
                if (allChildren[i].getAttribute(selector.slice(1, index)) === selector.slice(index + 1, -1)) {
                    elements.push(allChildren[i]);
                }
            }
        }
        break;
    default: //tagName
        elements = root.getElementsByTagName(selector);
    }
    return elements;
}
/**
 * 模仿jQuery的迷你$选择符。
 * @param   {string} selector CSS方式的选择器，支持简单的后代选择器（只支持一级）
 * @returns {object} 返回获取到的第一个节点对象，后代选择器时，返回第一个对象中的第一个符合条件的对象
 */
function oo(selector) {
    if (selector == document) {
        return document;
    }
    selector = selector.trim();
    //存在空格时，使用后代选择器
    if (selector.indexOf(" ") !== -1) {
        var selectorArr = selector.split(/\s+/); //分割成数组，第一项为parent，第二项为chlid。
        return VQuery(selectorArr[1], VQuery(selectorArr[0])[0])[0];
    } else { //普通情况,只返回获取到的第一个对象
        return VQuery(selector,document)[0];
    }
}
