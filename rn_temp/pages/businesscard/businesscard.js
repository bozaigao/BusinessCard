var _class, _temp;

import Taro from '@tarojs/taro-rn';
import React from 'react';
import { __decorate } from "tslib";
import { Component } from "@tarojs/taro-rn";
import { ScrollView } from "@tarojs/components-rn";
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index.rn";
//@ts-ignore
import { styleAssign } from "../../utils/datatool";
import { bgColor, commonStyles, default as styles, h, iphoneX, wRatio } from "../../utils/style";
import { connect } from "@tarojs/taro-redux-rn";
import * as actions from "../../actions/home";
import Card from "./business-card/index";
let Businesscard = (_temp = _class = class Businesscard extends Component {
  constructor(props) {
    super(props);
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */

    this.getBannerData = () => {
      this.viewRef.showLoading();
      this.props.dispatchBannerInfo().then(res => {
        this.viewRef.hideLoading();
        this.setState({ bannerList: res.urls });
      }).catch(e => {
        this.viewRef.hideLoading();
        //android模拟器无法访问mock的本地服务所以这里处理下，在真实网络请求中不存在该问题
        this.setState({
          bannerList: ["https://gzol.oss-cn-qingdao.aliyuncs.com/20190906161007.png", "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926100637.png", "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926103054.png", "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926115113.png"]
        });
        console.log('报错啦', e);
      });
    };

    this.getSignInPage = async () => {
      // let res = (await this.props.getSignInPage()).data;
      //
      // if (res.code === api.NetworkState.SUCCESS) {
      //   this.setState({
      //     signInPageDetail: res.data
      //   });
      // }
    };

    this.state = {
      signInPageDetail: { dateIntegrals: [], signInCount: 0 },
      bannerList: []
    };
  }
  componentDidMount() {
    console.log('componentDidMount');
    // 监听一个事件，接受参数
    Taro.eventCenter.on('showJiFenModal', () => {
      console.log('显示对话框');
      this.viewRef && this.viewRef.showSignAlert();
    });
    this.getBannerData();
  }
  componentWillUnmount() {
    Taro.eventCenter.off('showJiFenModal');
    console.log('componentWillUnmount');
  }
  render() {
    let { signInPageDetail } = this.state;
    if (typeof signInPageDetail.signInCount === 'undefined') {
      signInPageDetail.signInCount = 0;
    }
    return <CustomSafeAreaView ref={ref => {
      this.viewRef = ref;
    }} customStyle={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor)])}>
        <ScrollView style={styleAssign([wRatio(100), h(iphoneX() ? 600 : 500), styles.uac])} scrollY>
          
          <Card />
        </ScrollView>
      </CustomSafeAreaView>;
  }
}, _class.config = {
  navigationBarTitleText: '首页',
  disableScroll: true
}, _temp);
Businesscard = __decorate([connect(state => state.home, { ...actions })], Businesscard);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
export default Businesscard;