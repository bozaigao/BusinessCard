/**
 * @filename business_card.ts
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 名片管理
 */
import {createAction} from "../utils/redux";
import {BusinessCardManage} from "../api/httpurl";

const INITIAL_STATE = {}

export default function BusinessCard(state = INITIAL_STATE, action) {
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
 * @function: 获取我收藏的名片列表
*/
export const myCollectList = payload => createAction({
  url: BusinessCardManage.myCollectList,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 更新我收藏的名片
*/
export const updateMyCollect = payload => createAction({
  url: BusinessCardManage.updateMyCollect,
  payload,
  method:'POST'
});

