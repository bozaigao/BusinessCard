"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enum;
(function (Enum) {
    Enum["TOKEN"] = "token";
})(Enum = exports.Enum || (exports.Enum = {}));
var ShopStatus;
(function (ShopStatus) {
    //未提交申请
    ShopStatus[ShopStatus["NO_APPLY"] = -1] = "NO_APPLY";
    //申请已经提交，等待开通店铺
    ShopStatus[ShopStatus["UPLOAD_AND_WAIT"] = 0] = "UPLOAD_AND_WAIT";
    //店铺已经开通
    ShopStatus[ShopStatus["HAS_OPEN"] = 1] = "HAS_OPEN";
    //店铺已经到期被关闭
    ShopStatus[ShopStatus["SHOP_OUT_OF_TIME"] = 2] = "SHOP_OUT_OF_TIME";
    //店铺被注销
    ShopStatus[ShopStatus["SHOP_CANCELLATION"] = 3] = "SHOP_CANCELLATION";
})(ShopStatus = exports.ShopStatus || (exports.ShopStatus = {}));
exports.BaseCoin = 100;
var Orientation;
(function (Orientation) {
    Orientation[Orientation["up"] = 0] = "up";
    Orientation[Orientation["down"] = 1] = "down";
    Orientation[Orientation["left"] = 2] = "left";
    Orientation[Orientation["right"] = 3] = "right";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
exports.operateMap = {};
exports.operateMap['view_card'] = '查看名片';
exports.operateMap['share_card'] = '分享名片';
exports.operateMap['collect_card'] = '收藏名片';
exports.operateMap['put_in_address_book'] = '存入通讯录';
exports.operateMap['call_up'] = '打电话';
exports.operateMap['copy_wechat'] = '复制微信号';
exports.operateMap['copy_email'] = '复制邮箱号';
exports.operateMap['navigation_company'] = '导航到公司地址';
exports.operateMap['play_your_voice'] = '播放你的语音';
exports.operateMap['villager'] = '同乡';
exports.operateMap['schoolfellow'] = '校友';
exports.operateMap['play_company_video'] = '播放企业宣传视频';
exports.operateMap['view_your_photos'] = '浏览你的照片';
exports.operateMap['play_your_video'] = '播放你的视频';
exports.operateMap['view_goods'] = '浏览商品';
exports.operateMap['view_enterprise_website'] = '浏览企业官网';
exports.timeMap = {};
exports.timeMap['seven_days'] = '7天试用';
exports.timeMap['quarter'] = '1季度';
exports.timeMap['half_a_year'] = '半年';
exports.timeMap['one_year'] = '1年';
//# sourceMappingURL=global.js.map