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
const UpdateUserData = 'UpdateUserData';
function login(state = INITIAL_STATE, action) {
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
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/8
 * @function: 根据用户id获取用户详细信息
 */
exports.getUserInfoById = payload => redux_1.createAction({
    url: httpurl_1.UserController.getUserInfoById,
    payload,
    method: 'GET',
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/29
 * @function: 更新用户数据流
 */
exports.updateUserInfo = payload => dispatch => {
    return dispatch({ type: UpdateUserData, payload });
};
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
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @function: 新增建议
 */
exports.suggestionAdd = payload => redux_1.createAction({
    url: httpurl_1.UserController.suggestionAdd,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/14
 * @function: 人脉推荐行业和兴趣设置
*/
exports.recommendSetting = payload => redux_1.createAction({
    url: httpurl_1.UserController.recommendSetting,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/14
 * @function: 人脉推荐行业和兴趣设置查询
*/
exports.getRecommendSetting = payload => redux_1.createAction({
    url: httpurl_1.UserController.getRecommendSetting,
    payload,
    method: 'GET',
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/14
 * @function: 人脉推荐是否设置
 */
exports.recommendSettingStatus = payload => redux_1.createAction({
    url: httpurl_1.UserController.recommendSettingStatus,
    payload,
    method: 'GET',
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/14
 * @function: 获取人脉推荐
 */
exports.getRecommend = payload => redux_1.createAction({
    url: httpurl_1.UserController.getRecommend,
    payload,
    method: 'GET',
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/14
 * @function: 解密微信小程序手机号
 */
exports.decryptPhone = payload => redux_1.createAction({
    url: httpurl_1.UserController.decryptPhone,
    payload,
    method: 'GET',
});
//# sourceMappingURL=login.js.map