"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename file.ts
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @Description: 多媒体文件上传
*/
const redux_1 = require("../utils/redux");
const httpurl_1 = require("../api/httpurl");
const INITIAL_STATE = {};
function File(state = INITIAL_STATE, action) {
    if (action.type) {
        switch (action.type) {
            default:
                return state;
        }
    }
    return state;
}
exports.default = File;
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 上传图片
 */
exports.uploadPicture = payload => redux_1.createAction({
    url: httpurl_1.FileController.uploadPicture,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 上传视频
 */
exports.uploadVideo = payload => redux_1.createAction({
    url: httpurl_1.FileController.uploadVideo,
    payload,
    method: 'POST'
});
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/25
 * @function: 上传声音
 */
exports.uploadVoice = payload => redux_1.createAction({
    url: httpurl_1.FileController.uploadVoice,
    payload,
    method: 'GET'
});
//# sourceMappingURL=file.js.map