"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename tequan.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @Description: 特权
 */
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {
    userInfo: {}
};
const UpdateUserData = 'UpdateUserData';
function teQuan(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            case UpdateUserData:
                return Object.assign({}, state, { userInfo: action.payload });
            default:
                return state;
        }
    }
    return state;
}
exports.default = teQuan;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @function: 获取特权套餐
 */
exports.packageList = payload => redux_1.createAction({
    url: httpurl_1.TeQuanManage.packageList,
    payload,
    method: 'GET',
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @function: 购买套餐
*/
exports.purchasePackage = payload => redux_1.createAction({
    url: httpurl_1.TeQuanManage.purchasePackage,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/3
 * @function: 查询特权购买状态
*/
exports.packageStatus = payload => redux_1.createAction({
    url: httpurl_1.TeQuanManage.packageStatus,
    payload,
    method: 'GET',
});
//# sourceMappingURL=tequan.js.map