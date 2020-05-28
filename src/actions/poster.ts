/**
 * @filename poster.ts
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 名片海报
 */
import {createAction} from "../utils/redux";
import {PosterManage} from "../api/httpurl";

const INITIAL_STATE = {}

export default function Poster(state = INITIAL_STATE, action) {
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
 * @function: 获取名片海报
*/
export const postList = payload => createAction({
  url: PosterManage.postList,
  payload,
  method: 'GET'
});
