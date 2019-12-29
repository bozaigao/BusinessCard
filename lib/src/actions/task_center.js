"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename task_center.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @Description: 任务中心
 */
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {};
function taskCenter(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
exports.default = taskCenter;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 添加任务
 */
exports.addTask = payload => redux_1.createAction({
    url: httpurl_1.TaskController.addTask,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 查询单个任务信息
 */
exports.getTask = payload => redux_1.createAction({
    url: httpurl_1.TaskController.getTask,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 分页查询任务列表
 */
exports.getTaskList = payload => redux_1.createAction({
    url: httpurl_1.TaskController.getTaskList,
    payload,
    method: 'GET'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 更新任务
 */
exports.updateTask = payload => redux_1.createAction({
    url: httpurl_1.TaskController.updateTask,
    payload,
    method: 'POST'
});
//# sourceMappingURL=task_center.js.map