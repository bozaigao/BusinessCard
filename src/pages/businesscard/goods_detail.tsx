/**
 * @filename goods_detail.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 商品详情
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {
  absB,
  absR,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  ml,
  mt,
  pa,
  pl,
  pr,
  pt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";

interface Props {
}

interface State {

}

@connect(state => state.home, {...actions})
class GoodsDetail extends Component<Props, State> {

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
        <TopHeader title={'商品详情'}/>
        <View style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.pageDefaultBackgroundColor),
          pt(5)])}>
          <ScrollView scrollY style={styleAssign([styles.uf1])}>
            {/*商品大图轮播*/}
            <View style={styleAssign([wRatio(100), h(366)])}>
              <View style={styleAssign([wRatio(100), h(313)])}>
                <Image style={styleAssign([wRatio(100), hRatio(100), styles.upa, absT(0)])}
                       src={require('../../assets/ico_default.jpeg')}/>
                <View style={styleAssign([bgColor('rgba(84,84,84,0.6)'), w(48), h(22), radiusA(10),
                  styles.uac, styles.ujc, styles.upa, absR(19), absB(8)])}>
                  <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>1/5</Text>
                </View>
              </View>
              {/*价格描述*/}
              <View style={styleAssign([wRatio(100), h(54), styles.udr, styles.uac, styles.ujb, pl(20), pr(20),
                bgColor(commonStyles.whiteColor)])}>
                <Text style={styleAssign([fSize(21), color('#FA541C')])}>¥600.00</Text>
                <Text style={styleAssign([fSize(14), color('#242424')])}>现代简约双人木床</Text>
              </View>
            </View>
            {/*商品详情*/}
            <View style={styleAssign([wRatio(100), mt(10), bgColor(commonStyles.whiteColor), styles.uac])}>
              <View style={styleAssign([wRatio(100)])}>
                <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(20), mt(20)])}>商品详情</Text>
              </View>
              <View style={styleAssign([wRatio(100), pa(30), styles.uac, styles.ujc])}>
                <Text
                  style={styleAssign([fSize(14), color('#787878')])}>现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床</Text>
              </View>
              {/*图片列表*/}
              {
                [1, 2, 3, 4, 5].map((value, index) => {
                  console.log(value)
                  return (<Image
                    key={index}
                    style={styleAssign([w(336), h(245), mt(8)])}
                    src={require('../../assets/ico_default.jpeg')}/>);
                })
              }
            </View>
          </ScrollView>
          {/*分享按钮*/}
          <View style={styleAssign([wRatio(100), h(64), bgColor(commonStyles.whiteColor), styles.uac, styles.ujc])}>
            <TouchableButton
              customStyle={styleAssign([w(335), h(48), styles.uac, styles.ujc, bgColor(commonStyles.colorTheme), radiusA(2)])}>
              <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>立即分享</Text>
            </TouchableButton>
          </View>
        </View>
      </CustomSafeAreaView>);
  }
}

export default GoodsDetail;
