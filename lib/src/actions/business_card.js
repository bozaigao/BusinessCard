"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename business_card.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 名片管理
 */
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {};
function BusinessCard(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
exports.default = BusinessCard;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @function: 获取我收藏的名片列表
*/
exports.myCollectList = payload => redux_1.createAction({
    url: httpurl_1.BusinessCardManage.myCollectList,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @function: 更新我收藏的名片
*/
exports.updateMyCollect = payload => redux_1.createAction({
    url: httpurl_1.BusinessCardManage.updateMyCollect,
    payload,
    method: 'POST'
});
//# sourceMappingURL=business_card.js.map