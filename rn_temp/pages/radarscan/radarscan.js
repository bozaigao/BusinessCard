var _class, _temp;

import React from 'react';
import { Component } from "@tarojs/taro-rn";
import { ScrollView, View } from "@tarojs/components-rn";
import CustomSafeAreaView from "../../compoments/safe-area-view/index.rn";
import { styleAssign } from "../../utils/datatool";
import styles, { h, iphoneX, wRatio } from "../../utils/style";
let Radarscan = (_temp = _class = class Radarscan extends Component {
  constructor(props) {
    super(props);
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  render() {
    return <CustomSafeAreaView>
        <ScrollView style={styleAssign([wRatio(100), h(iphoneX() ? 640 : 560)])} scrollY>
          <View style={styleAssign([styles.uf1])}>

          </View>
        </ScrollView>
      </CustomSafeAreaView>;
  }
}, _class.config = {
  navigationBarTitleText: '首页',
  disableScroll: true
}, _temp);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Radarscan;