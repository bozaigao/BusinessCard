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
        <TopHeader title={'雷达'}/>
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
            style={styleAssign([wRatio(100), h(541), styles.uac])}
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

export default Radarscan;
