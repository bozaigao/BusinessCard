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
 * @date 2019/12/29
 * @function: 查询行业信息
*/
exports.getIndustryList = payload => redux_1.createAction({
    url: httpurl_1.DictController.getIndustryList,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/14
 * @function: 人脉推荐查询二级行业信息
*/
exports.getIndustryTags = payload => redux_1.createAction({
    url: httpurl_1.DictController.getIndustryTags,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/11
 * @function: 创建小程序码
*/
exports.wxacode = payload => redux_1.createAction({
    url: httpurl_1.DictController.wxacode,
    payload,
    method: 'POST'
});
//# sourceMappingURL=dict.js.map