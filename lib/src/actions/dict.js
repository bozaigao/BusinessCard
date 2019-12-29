"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename dict.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @Description: 数据字典
*/
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {};
function Dict(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
exports.default = Dict;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 根据字典code查询字典数据列表 dictCode取值如下 education_background 查询学历 industry 查询行业
 */
exports.getDictItemList = payload => redux_1.createAction({
    url: httpurl_1.DictController.getDictItemList,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 查询省份和城市信息
 */
exports.getProvinceCity = payload => redux_1.createAction({
    url: httpurl_1.DictController.getProvinceCity,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/29
 * @function: 查询行业信息
*/
exports.getIndustryList = payload => redux_1.createAction({
    url: httpurl_1.DictController.getIndustryList,
    payload,
    method: 'GET'
});
//# sourceMappingURL=dict.js.map