/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/15
 * @Description: 我的模块指引页
 */
import Taro, {PureComponent, pxTransform} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import {
  absR,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  iphoneX,
  mt,
  op,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";


interface Props {
  cancle: any;
  openTeQuan: any;
}

interface State {
}

export default class MyGuide2 extends PureComponent<Props, State> {

  render() {

    let {cancle, openTeQuan} = this.props;

    return (
      <View
        style={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.blackColor), op(0.5), styles.upa, absT(0), absR(0),])}/>
        <View
          style={styleAssign([wRatio(100), styles.uac, styles.upa, {top: iphoneX() ? pxTransform(320) : pxTransform(265)}])}>
          <Image style={styleAssign([w(66), h(28), styles.upa, absR(25)])}
                 src={require('../../../assets/open_tequan.png')}
                 onClick={openTeQuan}/>
          <View style={styleAssign([wRatio(100), styles.uac, mt(30)])}>
            <Image style={styleAssign([w(92), h(87), styles.upa, absR(10), absT(10)])}
                   src={require('../../../assets/guide_line_7.png')}/>
            <View style={styleAssign([styles.uac,mt(45)])}>
              <Text
                style={styleAssign([fSize(18), color(commonStyles.whiteColor)])}>点击这里开通特权，解锁小</Text>
              <Text
                style={styleAssign([fSize(18), color(commonStyles.whiteColor)])}>程序更多实用功能哦！</Text>
            </View>
            <View
              onClick={cancle}
              style={styleAssign([styles.uac, styles.ujc, w(120), h(44), radiusA(22), bo(1), bdColor(commonStyles.whiteColor), {borderStyle: 'solid'},
                bgColor('rgb(145,145,145)'), mt(40)])}>
              <Text style={styleAssign([color(commonStyles.whiteColor), fSize(18)])}>我知道了</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
