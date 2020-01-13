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
        customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
        notNeedBottomPadding={true}>
        {/*雷达、访客切换*/}
        <View style={styleAssign([wRatio(100), h(44), styles.uac,mt(15)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <View style={styleAssign([styles.uac])}>
              <Text style={styleAssign([fSize(18)])}>雷达</Text>
              <View style={styleAssign([mt(5), w(25), h(2), bgColor(commonStyles.transparent)])}/>
            </View>
          </View>
        </View>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
              console.log(value);
              return (<RadarItem key={index}/>);
            })
          }
        </ScrollView>
      </CustomSafeAreaView>
    )
  }
}

export default Radarscan;
