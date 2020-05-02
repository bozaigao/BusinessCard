/**
 * @filename shop.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/2
 * @Description: 店铺
 */
import {createAction} from "../utils/redux";
import {ShopManage} from "../api/httpurl";

const INITIAL_STATE = {}

export default function Shop(state = INITIAL_STATE, action) {
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
 * @date 2020/5/2
 * @function: 开通店铺申请
 */
export const addRadarTrace = payload => createAction({
  url: ShopManage.apply,
  payload,
  method: 'POST'
});

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/2
 * @function: 查询我的店铺信息
*/
export const getShop = payload => createAction({
  url: ShopManage.getShop,
  payload,
  method: 'GET'
});
