/**
 * @filename task_center.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @Description: 任务中心
 */
import {createAction} from "../utils/redux";
import {TaskController} from "../api/httpurl";

const INITIAL_STATE = {}

export default function taskCenter(state = INITIAL_STATE, action) {
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
 * @date 2019/12/25
 * @function: 添加任务
 */
export const addTask = payload => createAction({
  url: TaskController.addTask,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 查询单个任务信息
 */
export const getTask = payload => createAction({
  url: TaskController.getTask,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 分页查询任务列表
 */
export const getTaskList = payload => createAction({
  url: TaskController.getTaskList,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 更新任务
 */
export const updateTask = payload => createAction({
  url: TaskController.updateTask,
  payload,
  method: 'POST'
});

