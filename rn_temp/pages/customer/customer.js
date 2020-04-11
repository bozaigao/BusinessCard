var _class, _temp;

import React from 'react';
import { __decorate } from "tslib";
import { Component } from "@tarojs/taro-rn";
import { ScrollView } from "@tarojs/components-rn";
import CustomSafeAreaView from "../../compoments/safe-area-view/index.rn";
import { bgColor, h, iphoneX, wRatio } from "../../utils/style";
import { styleAssign } from "../../utils/datatool";
//@ts-ignore
import { connect } from "@tarojs/taro-redux-rn";
import * as actions from "../../actions/home";
let Customer = (_temp = _class = class Customer extends Component {
  constructor(props) {
    super(props);
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */

    this.state = {
      bannerList: []
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentWillUnmount() {}
  componentDidMount() {}
  componentDidHide() {}
  render() {
    return <CustomSafeAreaView>


        <ScrollView style={styleAssign([wRatio(100), h(iphoneX() ? 600 : 500), bgColor('blue')])} scrollY>
        </ScrollView>
      </CustomSafeAreaView>;
  }
}, _class.config = {
  navigationBarTitleText: '首页',
  
}, _temp);
Customer = __decorate([connect(state => state.login, { ...actions })], Customer);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
export default Customer;
