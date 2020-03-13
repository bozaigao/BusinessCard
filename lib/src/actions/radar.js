"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename radar.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/10
 * @Description: 雷达
 */
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {};
function Radar(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
exports.default = Radar;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/10
 * @function: 新增行为轨迹
*/
exports.addRadarTrace = payload => redux_1.createAction({
    url: httpurl_1.RadarManage.addRadarTrace,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/10
 * @function: 雷达AI分析 兴趣和行为占比
*/
exports.interestBehaviorRate = payload => redux_1.createAction({
    url: httpurl_1.RadarManage.interestBehaviorRate,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/10
 * @function: 查询我的雷达数据列表
 */
exports.getTraceList = payload => redux_1.createAction({
    url: httpurl_1.RadarManage.getTraceList,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/10
 * @function: 雷达AI分析-客户活跃度
 */
exports.traceActive = payload => redux_1.createAction({
    url: httpurl_1.RadarManage.traceActive,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/10
 * @function: 雷达详情访问轨迹
 */
exports.traceList = payload => redux_1.createAction({
    url: httpurl_1.RadarManage.traceList,
    payload,
    method: 'GET'
});
//# sourceMappingURL=radar.js.map