"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename customer.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/8
 * @Description: 客户管理模块
*/
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {};
function Customer(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
exports.default = Customer;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/8
 * @function: 添加客户
 */
exports.addCustomer = payload => redux_1.createAction({
    url: httpurl_1.CustomerController.addCustomer,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/8
 * @function: 添加客户跟进信息
 */
exports.addFollowUp = payload => redux_1.createAction({
    url: httpurl_1.CustomerController.addFollowUp,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/8
 * @function: 手动录入客户
 */
exports.addPrivateCustomer = payload => redux_1.createAction({
    url: httpurl_1.CustomerController.addPrivateCustomer,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/8
 * @function: 为系统客户添加详情备注
 */
exports.addRemark = payload => redux_1.createAction({
    url: httpurl_1.CustomerController.addRemark,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/8
 * @function: 删除客户
 */
exports.deleteCustomer = payload => redux_1.createAction({
    url: httpurl_1.CustomerController.deleteCustomer,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/8
 * @function: 查询客户跟进信息记录
 */
exports.followUpList = payload => redux_1.createAction({
    url: httpurl_1.CustomerController.followUpList,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/8
 * @function: 查询客户列表
 */
exports.getCustomerList = payload => redux_1.createAction({
    url: httpurl_1.CustomerController.getCustomerList,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/8
 * @function: 更新手动录入客户的资料
 */
exports.updatePrivateCustomer = payload => redux_1.createAction({
    url: httpurl_1.CustomerController.updatePrivateCustomer,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/14
 * @function: 获取客户详细资料
*/
exports.getCustomerDetail = payload => redux_1.createAction({
    url: httpurl_1.CustomerController.getCustomerDetail,
    payload,
    method: 'GET'
});
//# sourceMappingURL=customer.js.map