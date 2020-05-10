"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
let moment = require('moment');
moment.locale('zh-cn', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY/MM/DD',
        LL: 'YYYY年M月D日',
        LLL: 'YYYY年M月D日Ah点mm分',
        LLLL: 'YYYY年M月D日ddddAh点mm分',
        l: 'YYYY/M/D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
        let tmp = hour;
        if (tmp === 12) {
            tmp = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
            return tmp;
        }
        else if (meridiem === '下午' || meridiem === '晚上') {
            return tmp + 12;
        }
        // '中午'
        return tmp >= 11 ? tmp : tmp + 12;
    },
    meridiem: function (hour, minute, isLower) {
        let hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        }
        else if (hm < 900) {
            return '早上';
        }
        else if (hm < 1130) {
            return '上午';
        }
        else if (hm < 1230) {
            return '中午';
        }
        else if (hm < 1800) {
            return '下午';
        }
        return '晚上';
    },
    calendar: {
        sameDay: '[今天]LT',
        nextDay: '[明天]LT',
        nextWeek: '[下]ddddLT',
        lastDay: '[昨天]LT',
        lastWeek: '[上]ddddLT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年'
    },
    week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
});
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
    return moment(time).format('YYYY-MM-DD HH:mm');
}
exports.transformTime = transformTime;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/4
 * @function: 时间转换
 */
function transformBirthTime(time) {
    return moment(time).format('YYYY-MM-DD');
}
exports.transformBirthTime = transformBirthTime;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/28
 * @function: 从现在开始计算时间
 */
function transformNowTime(time) {
    console.log('从现在开始计算时间', time);
    if (typeof time === 'number') {
        return moment(time).fromNow();
    }
    return moment(time, 'YYYY-MM-DD HH:mm:ss').fromNow();
}
exports.transformNowTime = transformNowTime;
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
if (nowDayOfWeek === 0) {
    nowDayOfWeek = 7;
}
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
    console.log('获取本周', nowYear, nowMonth, nowDay, nowDayOfWeek);
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
        return `${seconds}秒`;
    }
    else if (seconds % 60 === 0) {
        return `${seconds / 60}分钟`;
    }
    return `${parseInt(`${seconds / 60}`, 10)}分${seconds % 60}秒`;
}
exports.formartSecond = formartSecond;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/21
 * @function: 判断是否为有效的邮箱
 */
function isLegalEmail(email) {
    //对电子邮件的验证
    let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    //@ts-ignore
    if (!myreg.test(email)) {
        toast('请输入有效的邮箱');
        return false;
    }
    return true;
}
exports.isLegalEmail = isLegalEmail;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/22
 * @function: 隐藏手机号
 */
function hidePhone(phone) {
    if (phone) {
        return phone.substr(0, 3) + '****' + phone.substr(7);
    }
    return '';
}
exports.hidePhone = hidePhone;
//# sourceMappingURL=datatool.js.map