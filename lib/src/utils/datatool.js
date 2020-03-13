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
function debounce(idle, action) {
    let last;
    return (() => {
        clearTimeout(last);
        last = setTimeout(function () {
            action();
        }, idle);
    })();
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
        icon: 'none',
        duration: 1500
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
/**
 * 获取本周、本季度、本月、上月的开始日期、结束日期
 */
let now = new Date(); //当前日期
let nowDayOfWeek = now.getDay(); //今天本周的第几天
let nowDay = now.getDate(); //当前日
let nowMonth = now.getMonth(); //当前月
let nowYear = now.getFullYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
let lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
//格式化日期：yyyy-MM-dd
function formatDate(date) {
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}
//获得某月的天数
function getMonthDays(myMonth) {
    let monthStartDate = new Date(nowYear, myMonth, 1);
    let monthEndDate = new Date(nowYear, myMonth + 1, 1);
    let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}
//获得本周的开始日期
function getWeekStartDate() {
    let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
    return formatDate(weekStartDate);
}
exports.getWeekStartDate = getWeekStartDate;
//获得本周的结束日期
function getWeekEndDate() {
    let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
    return formatDate(weekEndDate);
}
exports.getWeekEndDate = getWeekEndDate;
//获得本月的开始日期
function getMonthStartDate() {
    let monthStartDate = new Date(nowYear, nowMonth, 1);
    return formatDate(monthStartDate);
}
exports.getMonthStartDate = getMonthStartDate;
//获得本月的结束日期
function getMonthEndDate() {
    let days = getMonthDays(nowMonth); //获取当月总共有多少天
    let monthEndDate = new Date(nowYear, nowMonth, days);
    return formatDate(monthEndDate); //返回当月结束时间
}
exports.getMonthEndDate = getMonthEndDate;
//获得半年的开始日期
function getHalfYearStartDate() {
    let quarterStartDate;
    if (nowMonth > 5) {
        quarterStartDate = new Date(nowYear, nowMonth - 5, 1);
    }
    else {
        quarterStartDate = new Date(nowYear - 1, 6 + nowMonth, 1);
    }
    return formatDate(quarterStartDate);
}
exports.getHalfYearStartDate = getHalfYearStartDate;
function formartSecond(seconds) {
    if (seconds < 60) {
        return `${seconds}`;
    }
    else if (seconds % 60 === 0) {
        return `${seconds / 60}分钟`;
    }
    else {
        return `${seconds / 60}分${seconds % 60}秒`;
    }
}
exports.formartSecond = formartSecond;
//# sourceMappingURL=datatool.js.map