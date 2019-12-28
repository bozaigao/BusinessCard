import Taro from '@tarojs/taro'
import {NetworkState} from "./httpurl";
import {Enum} from "../const/global";
import {get} from "../utils/datatool";

const CODE_SUCCESS = '200';

// function getStorage(key) {
//   return Taro.getStorage({key}).then(res => res.data).catch(() => '');
// }
//
// function updateStorage(data = {}) {
//   return Promise.all([
//     Taro.setStorage({key: 'token', data: data['3rdSession'] || ''}),
//     Taro.setStorage({key: 'uid', data: data['uid'] || ''})
//   ]);
// }

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const {url, payload, method = 'GET', showToast = true, autoLogin = true} = options;
  const token = null;

  const header = token ? {'WX-PIN-SESSION': token, 'X-WX-3RD-Session': token} : {};

  header['Content-type'] = 'application/x-www-form-urlencoded';
  header['Accept'] = 'application/json';
  header['Connection'] = 'close';

  console.log(`😁😁😁😁😁😁请求接口:${url} 方式:${method} 参数:`, payload)

  get(Enum.USERINFO,(res)=>{
    console.log('获取用户数据', res.token);
    header['token'] = res.token;

    return Taro.request({
      url,
      method,
      data: payload,
      header
    }).then(async (res) => {
      console.log('返回的数据', res);
      const {code, data, msg} = res.data;

      if (code === NetworkState.NEDD_LOGIN && autoLogin) {
        console.log(('自动登录'));
        return Promise.reject(data);
        // Taro.navigateTo({
        //   url: '/pages/user-login/user-login'
        // });
      } else if (showToast && code !== NetworkState.SUCCESS) {
        Taro.showToast({
          title: msg,
          icon: 'none'
        });
      }

      return data
    }).catch((err) => {
      let defaultMsg = '';

      if (err.code !== CODE_SUCCESS) {
        defaultMsg = '请求异常';
      }

      return Promise.reject({message: defaultMsg, ...err});
    })
  });
}

