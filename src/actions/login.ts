/**
 * @filename login.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/24
 * @Description: 登录模块
 */
import {createAction} from "../utils/redux";
import {UserController} from "../api/httpurl";

const INITIAL_STATE = {
  userInfo: {}
}

const UpdateUserData = 'UpdateUserData';

export default function login(state = INITIAL_STATE, action) {
  if (action.type) {
    switch (action.type) {
      case UpdateUserData:
        return {
          ...state,
          userInfo: action.payload
        };
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
  method: 'POST'
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
  method: 'GET',
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/8
 * @function: 根据用户id获取用户详细信息
 */
export const getUserInfoById = payload => createAction({
  url: UserController.getUserInfoById,
  payload,
  method: 'GET',
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/29
 * @function: 更新用户数据流
 */
export const updateUserInfo = payload => dispatch => {
  return dispatch({type: UpdateUserData, payload});
}


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 更新用户信息
 */
export const update = payload => createAction({
  url: UserController.update,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @function: 新增建议
 */
export const suggestionAdd = payload => createAction({
  url: UserController.suggestionAdd,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/9
 * @function: 获取小程序二维码的凭证
 */
export const getAccessToken = payload => createAction({
  url: UserController.getAccessToken,
  payload,
  method: 'GET',
});

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/9
 * @function: 获取小程序二维码
 */
export const getWXacode = payload => createAction({
  url: `${UserController.getWXacode}?access_token=${payload.access_token}`,
  payload,
  method: 'POST',
});
