"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename login.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/24
 * @Description: 登录模块
 */
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {
    userInfo: {}
};
function login(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            case 'getUserInfo':
                return Object.assign({}, state, { userInfo: action.payload });
            default:
                return state;
        }
    }
    return state;
}
exports.default = login;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 接口请求登录
 */
exports.userLogin = payload => redux_1.createAction({
    url: httpurl_1.UserController.login,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 获取用户详细信息
*/
exports.getUserInfo = payload => redux_1.createAction({
    url: httpurl_1.UserController.getUserInfo,
    payload,
    method: 'GET',
    type: 'getUserInfo'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 更新用户信息
 */
exports.update = payload => redux_1.createAction({
    url: httpurl_1.UserController.update,
    payload,
    method: 'POST'
});
//# sourceMappingURL=login.js.map