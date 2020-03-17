"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename distribution.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 分销中心
 */
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {};
function Distribution(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
exports.default = Distribution;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @function: 我的客户列表
*/
exports.myCustomerList = payload => redux_1.createAction({
    url: httpurl_1.DistributionManage.myCustomerList,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @function: 数据中心
*/
exports.settlementRecord = payload => redux_1.createAction({
    url: httpurl_1.DistributionManage.settlementRecord,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @function: 分销中心主页-我的收益
*/
exports.userIncome = payload => redux_1.createAction({
    url: httpurl_1.DistributionManage.userIncome,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @function: 申请提现
*/
exports.withdraw = payload => redux_1.createAction({
    url: httpurl_1.DistributionManage.withdraw,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @function: 提现记录
*/
exports.withdrawList = payload => redux_1.createAction({
    url: httpurl_1.DistributionManage.withdrawList,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/15
 * @function: 我的新增客户数量
*/
exports.myCustomerCount = payload => redux_1.createAction({
    url: httpurl_1.DistributionManage.myCustomerCount,
    payload,
    method: 'POST'
});
//# sourceMappingURL=distribution.js.map