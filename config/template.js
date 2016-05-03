/**
 * Created by Yuan on 2016/1/30.
 */
"use strict";
var swig = require("swig");

module.exports = function () {
    //改变swig模板的取值方式 {!{url}} 默认{{url}}和angular值绑定冲突
    swig.setDefaults({varControls: ['{!{', '}}']});
    return swig;
};