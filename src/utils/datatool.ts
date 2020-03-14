import Taro, {pxTransform} from "@tarojs/taro";

let moment = require('moment');

export let defaultPixel = 2;//iphone6的像素密度

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/9/18
 * @function: 尺寸适配
 */
export function scaleSize(size: number) {

  return pxTransform(size * defaultPixel);
}


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/9/21
 * @function: 字体大小适配
 */
export function setSpText(size: number) {

  return pxTransform(Math.round(size * defaultPixel + 0.5));
}

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/9/21
 * @function: 将样式数组进行合并
 */
export function styleAssign(styles: any[]) {
  styles.unshift({display: 'flex'});
  styles.unshift({flexDirection: 'column'});
  styles.unshift({position: 'relative'});
  //@ts-ignore
  return Object.assign(...styles);
}

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2018/10/22
 * @function: 定时器任务
 */
export function debounce(idle, action) {
  let last

  return (() => {
    clearTimeout(last)
    last = setTimeout(function () {
      action()
    }, idle)
  })()
}


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/28
 * @function: 缓存保存
 */
export function save(key, value) {
  Taro.setStorageSync(key, value);
}


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/28
 * @function: 缓存保存
 */
export function get(key) {
  return Taro.getStorageSync(key);
}


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/28
 * @function: json数据转化
 */
export function parseData(jsonData) {
  return typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
}

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/29
 * @function: 显示toast
 */
export function toast(msg) {
  Taro.showToast({
    title: msg,
    icon: 'none',
    duration: 1500
  });
}


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/4
 * @function: 时间转换
 */
export function transformTime(time: string) {
  return moment(time).format('YYYY-MM-DD');
}


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/4
 * @function: 获取当前年月日
 */
export function getToday() {
  return moment().format('YYYY-MM-DD');
}

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/5
 * @function: 字符串做安全包裹处理
 */
export function wrapSafe(source) {
  return source ? source : '';
}


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
export function getWeekStartDate() {
  let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);

  return formatDate(weekStartDate);
}

//获得本周的结束日期
export function getWeekEndDate() {
  let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));

  return formatDate(weekEndDate);
}

//获得本月的开始日期
export function getMonthStartDate() {
  let monthStartDate = new Date(nowYear, nowMonth, 1);

  return formatDate(monthStartDate);
}

//获得本月的结束日期
export function getMonthEndDate() {

  let days = getMonthDays(nowMonth);//获取当月总共有多少天
  let monthEndDate = new Date(nowYear, nowMonth, days);

  return formatDate(monthEndDate); //返回当月结束时间
}


//获得半年的开始日期
export function getHalfYearStartDate() {
  let quarterStartDate;

  if (nowMonth > 5) {
    quarterStartDate = new Date(nowYear, nowMonth - 5, 1);
  } else {
    quarterStartDate = new Date(nowYear - 1, 6 + nowMonth, 1);
  }

  return formatDate(quarterStartDate);
}

export function formartSecond(seconds: number) {
  if (seconds < 60) {
    return `${seconds}`;
  }
  else if (seconds % 60 === 0) {
    return `${seconds / 60}分钟`;
  }
    return `${seconds / 60}分${seconds % 60}秒`;

}

