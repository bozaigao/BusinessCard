/**
 * @filename radarscan.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 雷达
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView, Text, View} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {styleAssign} from "../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, ml, mr, mt, w, wRatio} from "../../utils/style";
import RadarItem from "./radar-item";
import TopHeader from "../../compoments/top-header";
// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion


interface Props {
}

interface State {
}

class Radarscan extends Component<Props, State> {

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

  constructor(props) {
    super(props);
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
      <CustomSafeAreaView
        customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          {/*雷达、访客切换*/}
          <View style={styleAssign([wRatio(100), h(85), styles.uac, bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac])}>
                <Text style={styleAssign([fSize(18)])}>雷达</Text>
                <View style={styleAssign([mt(5), w(25), h(2), bgColor(commonStyles.transparent)])}/>
              </View>
              <View style={styleAssign([styles.uac, ml(23)])}>
                <Text style={styleAssign([fSize(18), color('#0F56C5')])}>访客</Text>
                <View style={styleAssign([mt(5), w(25), h(2), bgColor('#0F56C5')])}/>
              </View>
            </View>
            {/*雷达、访客条件筛选*/}
            <View style={styleAssign([wRatio(100), styles.uac, styles.ujb, styles.udr, mt(10)])}>
              <Text style={styleAssign([fSize(14), color('#787878'), ml(20)])}>共3位访客</Text>
              <Text style={styleAssign([fSize(14), color('#787878')])}>新增访客（2）</Text>
              <Text style={styleAssign([fSize(14), color('#787878'), mr(20)])}>筛选</Text>
            </View>
          </View>
          <ScrollView
            style={styleAssign([wRatio(100), h(536), styles.uac])}
            scrollY>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
                console.log(value);
                return (<RadarItem key={index}/>);
              })
            }
          </ScrollView>
        </View>
      </CustomSafeAreaView>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Radarscan;
