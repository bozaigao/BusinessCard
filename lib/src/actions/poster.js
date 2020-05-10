"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename poster.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/3
 * @Description: 名片海报
 */
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {};
function Poster(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
exports.default = Poster;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/3
 * @function: 获取名片海报
*/
exports.postList = payload => redux_1.createAction({
    url: httpurl_1.PosterManage.postList,
    payload,
    method: 'GET'
});
//# sourceMappingURL=poster.js.map