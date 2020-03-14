/**
 * @filename dict.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @Description: 数据字典
*/
import {createAction} from "../utils/redux";
import {DictController, DistributionManage} from "../api/httpurl";

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
 * @date 2019/12/29
 * @function: 查询行业信息
*/
export const getIndustryList = payload => createAction({
  url: DictController.getIndustryList,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/14
 * @function: 人脉推荐查询二级行业信息
*/
export const getIndustryTags = payload => createAction({
  url: DictController.getIndustryTags,
  payload,
  method: 'GET'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/11
 * @function: 创建小程序码
*/
export const wxacode = payload => createAction({
  url: DictController.wxacode,
  payload,
  method: 'POST'
});

