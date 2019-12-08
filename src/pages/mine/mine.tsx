/**
 * @filename mine.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 我的
*/
import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {bgColor, commonStyles, h, iphoneX, wRatio} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";


interface Props {
}

interface State {
  centerBarList: any;
  dataList: any;
}

class Mine extends Component<Props, State> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
    disableScroll: true
  }

  state = {
    centerBarList: [],
    dataList: []
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  render() {

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor)])}>
        <ScrollView
          style={styleAssign([wRatio(100), h(iphoneX() ? 600 : 500), bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default Mine;
