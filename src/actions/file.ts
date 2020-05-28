/**
 * @filename file.ts
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 多媒体文件上传
*/
import {createAction} from "../utils/redux";
import {FileController} from "../api/httpurl";

const INITIAL_STATE = {}

export default function File(state = INITIAL_STATE, action) {
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
 * @function: 上传图片
 */
export const uploadPicture = payload => createAction({
  url: FileController.uploadPicture,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 上传视频
 */
export const uploadVideo = payload => createAction({
  url: FileController.uploadVideo,
  payload,
  method: 'POST'
});


/**
 * @author 何晏波
 * @QQ 1054539528
 * @function: 上传声音
 */
export const uploadVoice = payload => createAction({
  url: FileController.uploadVoice,
  payload,
  method: 'GET'
});


