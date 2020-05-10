"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename shop.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/2
 * @Description: 店铺
 */
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {};
function Shop(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
exports.default = Shop;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/2
 * @function: 开通店铺申请
 */
exports.shopApply = payload => redux_1.createAction({
    url: httpurl_1.ShopManage.apply,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/2
 * @function: 查询我的店铺信息
*/
exports.getShop = payload => redux_1.createAction({
    url: httpurl_1.ShopManage.getShop,
    payload,
    method: 'GET'
});
//# sourceMappingURL=shop.js.map