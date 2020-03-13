"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename visitor.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 访客管理
 */
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {};
function Visitor(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
exports.default = Visitor;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @function: 查询我的访客列表
 */
exports.getVisitorList = payload => redux_1.createAction({
    url: httpurl_1.VisitorManage.getVisitorList,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @function: 添加访客记录
 */
exports.addVisitor = payload => redux_1.createAction({
    url: httpurl_1.VisitorManage.addVisitor,
    payload,
    method: 'POST'
});
//# sourceMappingURL=visitor.js.map