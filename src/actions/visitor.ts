/**
 * @filename visitor.ts
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 访客管理
 */
import {createAction} from "../utils/redux";
import {VisitorManage} from "../api/httpurl";

const INITIAL_STATE = {}

export default function Visitor(state = INITIAL_STATE, action) {
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
 * @function: 查询我的访客列表
 */
export const getVisitorList = payload => createAction({
  url: VisitorManage.getVisitorList,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 添加访客记录
 */
export const addVisitor = payload => createAction({
  url: VisitorManage.addVisitor,
  payload,
  method: 'POST'
});

