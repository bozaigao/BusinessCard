/**
 * @filename more_goods.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 更多商品
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import styles, {
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  hRatio,
  ma,
  ml,
  mt,
  pa, pl, pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, ScrollView, Text, View} from "@tarojs/components";

interface Props {
}

interface State {

}

@connect(state => state.home, {...actions})
class MoreGoods extends Component<Props, State> {

  private viewRef;


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
    console.log(this.viewRef);
  }


  render() {


    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'更多商品'}/>
        <ScrollView
          style={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor), wRatio(100), hRatio(100), mt(16)])}
          scrollY>
          <View style={styleAssign([styles.uWrap, styles.udr, pl(14), pr(14)])}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
                console.log(value);
                return (
                  <View style={styleAssign([ma(5), w(163), h(233), pa(8), bgColor(commonStyles.whiteColor),
                    radiusA(4)])}
                        key={index}>
                    <Image style={styleAssign([w(147), h(152), radiusA(4)])}
                           src={require('../../assets/ico_default.jpeg')}/>
                    <Text
                      style={styleAssign([fSize(12), color(commonStyles.colorTheme), ml(8), mt(12)])}>现代简约双人木床</Text>
                    <Text style={styleAssign([fSize(10), color('#FA6B57'), ml(8), mt(12), mt(8)])}>￥688</Text>
                  </View>);
              })
            }
          </View>
        </ScrollView>
      </CustomSafeAreaView>);
  }
}

export default MoreGoods;
