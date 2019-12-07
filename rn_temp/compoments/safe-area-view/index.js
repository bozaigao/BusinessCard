import React from 'react';
import { Component } from "@tarojs/taro-rn";
import { View } from "@tarojs/components-rn";
import { styleAssign } from "../../utils/datatool";
import { bgColor, commonStyles, hRatio, wRatio } from "../../utils/style";
import Loading from "../loading/index.rn";
let CustomSafeAreaView = class CustomSafeAreaView extends Component {
  constructor(props) {
    super(props);
    /**
     * @author 何晏波
     * @QQ 1054539528
     * @date 2019/9/25
     * @function: 显示进度条
     */

    this.showLoading = () => {
      this.setState({ showLoading: true });
    };

    this.hideLoading = () => {
      this.setState({ showLoading: false });
    };

    this.state = {
      showLoading: false
    };
  }
  render() {
    let { customStyle, children } = this.props;
    let { showLoading } = this.state;
    return <View style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.whiteColor), customStyle])}>
        {children}
        {showLoading && <Loading />}
      </View>;
  }
};
export { CustomSafeAreaView as default };