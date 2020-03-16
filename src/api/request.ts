import Taro from '@tarojs/taro'
import {NetworkState, UserController} from "./httpurl";
import {Enum} from "../const/global";
import {get, save, toast} from "../utils/datatool";

const CODE_SUCCESS = '200';
let isRefreshing = true;

let subscribers: any = [];

function onAccessTokenFetched() {
  subscribers.forEach((callback) => {
    callback();
  })
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const {url, payload, method = 'GET', showToast = true} = options;
  const header = {};

  header['Content-type'] = 'application/x-www-form-urlencoded';
  header['Accept'] = 'application/json';
  // header['Connection'] = 'close';

  console.log(`😁😁😁😁😁😁请求接口:${url} 方式:${method} 参数:`, payload)
  let token = get(Enum.TOKEN);

  console.log('token', token);

  if (token) {
    header['token'] = token;
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {
    const {code, data, msg} = res.data;

    console.log('接口请求返回的数据', res, code);

    if (code === NetworkState.SUCCESS) {
      return data;
    } else if (url.includes('api.weixin.qq.com')) {
      return res.data.access_token;
    }
    //token过期
    else if (code === NetworkState.NEED_LOGIN) {
      if (isRefreshing) {
        wxLogin();
      }

      isRefreshing = false;
      // 这个Promise函数很关键
      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber(() => {
          resolve(fetch(options))
        })
      });

      return retryOriginalRequest;
    }
    //服务接口报错
    else if (showToast) {
      toast(msg);
      return NetworkState.FAIL;
    }
  }).catch((err) => {

    let defaultMsg = '';

    if (err.code !== CODE_SUCCESS) {
      defaultMsg = '请求异常';
    }

    return Promise.reject({message: defaultMsg, ...err});
  })
}

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/29
 * @function: 自动登录接口
 */
async function wxLogin() {
  const header = {};

  header['Content-type'] = 'application/x-www-form-urlencoded';
  header['Accept'] = 'application/json';

  console.log(`自动登录请求接口:${UserController.login} 方式:POST`)

  Taro.login({
    success(res) {
      if (res.code) {
        console.log('微信登录令牌', res.code);
        Taro.request({
          url: UserController.login,
          method: 'POST',
          data: {code: res.code},
          header
        }).then(async (res) => {
          const {code, data, msg} = res.data;

          console.log('自动登录返回数据', res);

          //token过期
          if (code === NetworkState.SUCCESS) {
            save(Enum.TOKEN, data.token);
            onAccessTokenFetched();
            isRefreshing = true;
          }
          //服务接口报错
          else {
            toast(msg);
          }
        }).catch((err) => {
          console.log('爆错了', err)
          let defaultMsg = '';

          if (err.code !== CODE_SUCCESS) {
            defaultMsg = '请求异常';
          }

          return Promise.reject({message: defaultMsg, ...err});
        });
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }, fail() {
      toast('请允许微信授权，不然无法正常使用小程序功能');
    }
  });
}

