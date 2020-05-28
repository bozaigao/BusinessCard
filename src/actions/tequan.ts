/**
 * @filename tequan.ts
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 特权
 */
import {createAction} from "../utils/redux";
import {TeQuanManage} from "../api/httpurl";

const INITIAL_STATE = {
  userInfo: {}
}

const UpdateUserData = 'UpdateUserData';

export default function teQuan(state = INITIAL_STATE, action) {
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
 * @function: 获取特权套餐
 */
export const packageList = payload => createAction({
  url: TeQuanManage.packageList,
  payload,
  method: 'GET',
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 购买套餐
*/
export const purchasePackage = payload => createAction({
  url: TeQuanManage.purchasePackage,
  payload,
  method: 'POST'
});

/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 查询特权购买状态
*/
export const packageStatus = payload => createAction({
  url: TeQuanManage.packageStatus,
  payload,
  method: 'GET',
});
