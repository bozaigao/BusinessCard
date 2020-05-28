/**
 * @filename goods.ts
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 用户商品
*/
import {createAction} from "../utils/redux";
import {GoodsController} from "../api/httpurl";

const INITIAL_STATE = {}

export default function Goods(state = INITIAL_STATE, action) {
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
 * @function: 添加商品
 */
export const addGoods = payload => createAction({
  url: GoodsController.addGoods,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 查询单个商品信息[最好使用本地商品列表数据不单独走查询接口]
 */
export const getGoods = payload => createAction({
  url: GoodsController.getGoods,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 分页查询商品列表
 */
export const getGoodsList = payload => createAction({
  url: GoodsController.getGoodsList,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 更新商品
 */
export const updateGoods = payload => createAction({
  url: GoodsController.updateGoods,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 批量修改商品
*/
export const updateBatch = payload => createAction({
  url: GoodsController.updateBatch,
  payload,
  method: 'POST'
});
