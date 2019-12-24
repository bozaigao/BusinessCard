/**
 * @filename login.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/24
 * @Description: 登录模块
 */
import {createAction} from "../utils/redux";
import {UserController} from "../api/httpurl";

const INITIAL_STATE = {}

export default function login(state = INITIAL_STATE, action) {
  if (action.type) {
    switch (action.type) {
      default:
        return state;
    }
  }
  return state;
}

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 接口请求登录
 */
export const userLogin = payload => createAction({
  url: UserController.login,
  payload,
  method:'post'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 获取用户详细信息
*/
export const getUserInfo = payload => createAction({
  url: UserController.getUserInfo,
  payload,
  method:'get'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 更新用户信息
 */
export const updateUserInfo = payload => createAction({
  url: UserController.updateUserInfo,
  payload,
  method:'post'
});

