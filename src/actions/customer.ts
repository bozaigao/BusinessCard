/**
 * @filename customer.ts
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 客户管理模块
*/
import {createAction} from "../utils/redux";
import {CustomerController} from "../api/httpurl";

const INITIAL_STATE = {}

export default function Customer(state = INITIAL_STATE, action) {
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
 * @function: 添加客户
 */
export const addCustomer = payload => createAction({
  url: CustomerController.addCustomer,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 添加客户跟进信息
 */
export const addFollowUp = payload => createAction({
  url: CustomerController.addFollowUp,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 手动录入客户
 */
export const addPrivateCustomer = payload => createAction({
  url: CustomerController.addPrivateCustomer,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 为系统客户添加详情备注
 */
export const addRemark = payload => createAction({
  url: CustomerController.addRemark,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 删除客户
 */
export const deleteCustomer = payload => createAction({
  url: CustomerController.deleteCustomer,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 查询客户跟进信息记录
 */
export const followUpList = payload => createAction({
  url: CustomerController.followUpList,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 查询客户列表
 */
export const getCustomerList = payload => createAction({
  url: CustomerController.getCustomerList,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 更新手动录入客户的资料
 */
export const updatePrivateCustomer = payload => createAction({
  url: CustomerController.updatePrivateCustomer,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 获取客户详细资料
*/
export const getCustomerDetail = payload => createAction({
  url: CustomerController.getCustomerDetail,
  payload,
  method: 'GET'
});


