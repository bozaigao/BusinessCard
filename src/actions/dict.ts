/**
 * @filename dict.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @Description: 数据字典
*/
import {createAction} from "../utils/redux";
import {DictController} from "../api/httpurl";

const INITIAL_STATE = {}

export default function Dict(state = INITIAL_STATE, action) {
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
 * @function: 根据字典code查询字典数据列表 dictCode取值如下 education_background 查询学历 industry 查询行业
 */
export const getDictItemList = payload => createAction({
  url: DictController.getDictItemList,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 查询省份和城市信息
 */
export const getProvinceCity = payload => createAction({
  url: DictController.getProvinceCity,
  payload,
  method: 'GET'
});

