"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename goods.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @Description: 用户商品
*/
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {};
function Goods(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
exports.default = Goods;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/9/27
 * @function: 添加商品
 */
exports.addGoods = payload => redux_1.createAction({
    url: httpurl_1.GoodsController.addGoods,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 查询单个商品信息[最好使用本地商品列表数据不单独走查询接口]
 */
exports.getGoods = payload => redux_1.createAction({
    url: httpurl_1.GoodsController.getGoods,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 分页查询商品列表
 */
exports.getGoodsList = payload => redux_1.createAction({
    url: httpurl_1.GoodsController.getGoodsList,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 更新商品
 */
exports.updateGoods = payload => redux_1.createAction({
    url: httpurl_1.GoodsController.updateGoods,
    payload,
    method: 'POST'
});
//# sourceMappingURL=goods.js.map