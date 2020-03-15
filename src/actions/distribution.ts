/**
 * @filename distribution.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 分销中心
 */
import {createAction} from "../utils/redux";
import {DistributionManage} from "../api/httpurl";

const INITIAL_STATE = {}

export default function Distribution(state = INITIAL_STATE, action) {
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
 * @date 2020/2/16
 * @function: 我的客户列表
*/
export const myCustomerList = payload => createAction({
  url: DistributionManage.myCustomerList,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @function: 数据中心
*/
export const settlementRecord = payload => createAction({
  url: DistributionManage.settlementRecord,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @function: 分销中心主页-我的收益
*/
export const userIncome = payload => createAction({
  url: DistributionManage.userIncome,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @function: 申请提现
*/
export const withdraw = payload => createAction({
  url: DistributionManage.withdraw,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @function: 提现记录
*/
export const withdrawList = payload => createAction({
  url: DistributionManage.withdrawList,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/15
 * @function: 我的新增客户数量
*/
export const myCustomerCount = payload => createAction({
  url: DistributionManage.myCustomerCount,
  payload,
  method: 'POST'
});
