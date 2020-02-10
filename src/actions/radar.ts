/**
 * @filename radar.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/10
 * @Description: 雷达
 */
import {createAction} from "../utils/redux";
import {RadarManage} from "../api/httpurl";

const INITIAL_STATE = {}

export default function Radar(state = INITIAL_STATE, action) {
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
 * @date 2020/2/10
 * @function: 新增行为轨迹
*/
export const addRadarTrace = payload => createAction({
  url: RadarManage.addRadarTrace,
  payload,
  method:'POST'
});

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/10
 * @function: 雷达AI分析 兴趣和行为占比
*/
export const interestBehaviorRate = payload => createAction({
  url: RadarManage.interestBehaviorRate,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/10
 * @function: 查询我的雷达数据列表
 */
export const getTraceList = payload => createAction({
  url: RadarManage.getTraceList,
  payload,
  method: 'GET'
});

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/10
 * @function: 雷达AI分析-客户活跃度
 */
export const traceActive = payload => createAction({
  url: RadarManage.traceActive,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/10
 * @function: 雷达详情访问轨迹
 */
export const traceList = payload => createAction({
  url: RadarManage.traceList,
  payload,
  method: 'GET'
});
