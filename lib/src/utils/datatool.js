"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
let moment = require('moment');
exports.defaultPixel = 2; //iphone6的像素密度
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/9/18
 * @function: 尺寸适配
 */
function scaleSize(size) {
    return taro_1.pxTransform(size * exports.defaultPixel);
}
exports.scaleSize = scaleSize;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/9/21
 * @function: 字体大小适配
 */
function setSpText(size) {
    return taro_1.pxTransform(Math.round(size * exports.defaultPixel + 0.5));
}
exports.setSpText = setSpText;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/9/21
 * @function: 将样式数组进行合并
 */
function styleAssign(styles) {
    styles.unshift({ display: 'flex' });
    styles.unshift({ flexDirection: 'column' });
    styles.unshift({ position: 'relative' });
    //@ts-ignore
    return Object.assign(...styles);
}
exports.styleAssign = styleAssign;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2018/10/22
 * @function: 定时器任务
 */
function debounce(fn, wait) {
    let timer;
    return function () {
        let that = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fn.apply(that, args);
        }, wait);
    };
}
exports.debounce = debounce;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/28
 * @function: 缓存保存
 */
function save(key, value) {
    taro_1.default.setStorageSync(key, value);
}
exports.save = save;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/28
 * @function: 缓存保存
 */
function get(key) {
    return taro_1.default.getStorageSync(key);
}
exports.get = get;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/28
 * @function: json数据转化
 */
function parseData(jsonData) {
    return typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
}
exports.parseData = parseData;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/29
 * @function: 显示toast
 */
function toast(msg) {
    taro_1.default.showToast({
        title: msg,
        icon: 'none'
    });
}
exports.toast = toast;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/4
 * @function: 时间转换
 */
function transformTime(time) {
    return moment(time).format('YYYY-MM-DD');
}
exports.transformTime = transformTime;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/4
 * @function: 获取当前年月日
 */
function getToday() {
    return moment().format('YYYY-MM-DD');
}
exports.getToday = getToday;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/5
 * @function: 字符串做安全包裹处理
 */
function wrapSafe(source) {
    return source ? source : '';
}
exports.wrapSafe = wrapSafe;
//# sourceMappingURL=datatool.js.map