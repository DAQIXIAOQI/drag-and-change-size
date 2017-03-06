//获取非行间样式
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr]
    } else {
        return getComputedStyle(obj, false)[attr]
    }
}

//通用运动框架
function move(obj, json, fn) {

    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
            var ifinish = true;
            for (var attr in json) {
                var cur = 0;
                if (attr == "opacity") {
                    cur = Math.round(parseFloat(getStyle(obj, attr)) * 100)
                } else {
                    cur = parseInt(getStyle(obj, attr))
                }
                var idistance = json[attr] - cur;
                var ispeed = idistance > 0 ? Math.ceil(idistance / 10) : Math.floor(idistance / 10);

                if (cur != json[attr]) {
                    ifinish = false;
                }
                if (attr == "opacity") {
                    obj.style.filter = "alpha(opacity:" + (cur + ispeed) + ")";
                    obj.style.opacity = (cur + ispeed) / 100;
                } else {
                    obj.style[attr] = cur + ispeed + "px";
                }
            }
            if (ifinish) {
                clearInterval(obj.timer);
                if (fn) fn();
            }
        }

        ,30);

}

//Ajax库函数
function ajax(url, fnsucc, fnde) {
    if (window.XMLHttpRequest) { //XMLHttpRequest 与 window.XMLHttpRequest 的区别 ：  当调用前者时，会报错，因为调用了一个不存在的变量。调用后者时等同调用window的属性，若无此属性也不会报错
        var oAjax = new XMLHttpRequest();
    } else {
        var oAjax = new ActiveXObject("Microsoft .XMLHTTP"); //兼容ie6 
    }

    oAjax.open("GET", url, true);
    oAjax.send();

    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {
            if (oAjax.status == 200) {
                fnsucc(oAjax.responseText);
            } else {
                if (fnde) {
                    fnde(oAjax.status);
                }
            }
        }
    }
}

//获取class集合
function getClassName(para,obj){
            obj = obj||document;
            if(obj.getElementsByClassName){
                return obj.getElementsByClassName(para);
            } else {
                var boxClass = obj.getElementsByTagName('*');
                var arrClass = [];
                for (var i = 0; i < boxClass.length; i++) {
                    var nameBox = boxClass[i].className.split(' ');
                    for (var j = 0; j < nameBox.length; j++) {
                        if (nameBox[j] == para) {
                            arrClass.push(boxClass[i]);
                        }
                    };
                };
            }
            return(arrClass);
        }

getOffset = {
    top: function (obj) {
        return obj.offsetTop + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0)
    },
    left: function (obj) {
        return obj.offsetLeft + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0)
    }
}
