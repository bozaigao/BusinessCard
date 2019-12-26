/**
 * @filename mingpian_haibao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 名片海报
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {
  absB, absL, absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h, ma, ml,
  mt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";

interface Props {
}

interface State {

}

@connect(state => state.home, {...actions})
class MingpianHaibao extends Component<Props, State> {

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
        <TopHeader title={'名片海报'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor), styles.uac])}>
          <View
            style={styleAssign([wRatio(90), h(434), bgColor(commonStyles.whiteColor), mt(20), radiusA(4), styles.uac])}>
            {/*名片*/}
            <View style={styleAssign([mt(20), wRatio(95), h(204), bgColor('rgb(211,199,195)'), radiusA(10),
              styles.udr, styles.uje])}>
              <Image style={styleAssign([wRatio(100), h(204), radiusA(10), styles.upa, absL(0), absT(0)])}
                     src={require('../../assets/ico_default.jpeg')}/>
              <View style={styleAssign([ma(20)])}>
                <View style={styleAssign([styles.uac, styles.udr])}>
                  <Text style={styleAssign([fSize(18)])}>王嘉怡</Text>
                  <Text style={styleAssign([fSize(12)])}>销售经理</Text>
                </View>
                <Text
                  style={styleAssign([fSize(12), mt(30), mt(5)])}>15982468866@qq.com</Text>
                <Text
                  style={styleAssign([fSize(12), mt(5)])}>{`四川省成都市武侯区盛和\n二路18号富森美家居`}</Text>
              </View>
            </View>
            {/*简介*/}
            <Text style={styleAssign([w(294), mt(23), fSize(14), color('#343434')])}>您好， 我是美克美家家居集团股份有限公司成都分部的 销售经理王嘉怡
              这是我的名片，请惠存。
              谢谢！</Text>
            <View style={styleAssign([mt(20), wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([wRatio(100), styles.uae, styles.udr])}>
              <Image style={styleAssign([w(44), h(44), ml(16), mt(40)])}
                     src={require('../../assets/ico_miniprogram.png')}/>
              <Text style={styleAssign([fSize(12), color('#E2BB7B'), ml(11)])}>长按识别二维码 收下名片</Text>
            </View>
          </View>
          {/*保存名片*/}
          <View style={styleAssign([wRatio(100), h(56), styles.upa, absB(0), styles.uac, styles.ujc])}>
            <TouchableButton customStyle={styleAssign([styles.uac, styles.ujc,
              w(335), h(56), radiusA(4), bgColor(commonStyles.colorTheme)])}>
              <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>保存名片海报后分享</Text>
            </TouchableButton>
          </View>
        </View>
      </CustomSafeAreaView>);
  }
}

export default MingpianHaibao;
