/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 客户指引页
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import {
  absB,
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
  mt,
  op,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";


interface Props {
  cancle: any;
}

interface State {
}

export default class CustomerGuide extends PureComponent<Props, State> {

  render() {

    let {cancle} = this.props;

    return (
      <View
        style={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.blackColor), op(0.5), styles.upa, absT(0), absR(0),])}/>
        <View
          style={styleAssign([wRatio(100), h(174), styles.uac, styles.upa, absB(0)])}>
          <View style={styleAssign([wRatio(100), styles.uac])}>
            <Text
              style={styleAssign([fSize(18), color(commonStyles.whiteColor)])}>点击这里可以随时查看所有客户</Text>
            <Text
              style={styleAssign([fSize(18), color(commonStyles.whiteColor)])}>的详细资料及数据分析，有利于</Text>
            <Text
              style={styleAssign([fSize(18), color(commonStyles.whiteColor)])}>高效跟进客户哦！</Text>
          </View>
          <View
            onClick={cancle}
            style={styleAssign([styles.uac, styles.ujc, w(120), h(44), radiusA(22), bo(1), bdColor(commonStyles.whiteColor), {borderStyle: 'solid'},
              bgColor('rgb(145,145,145)'), mt(20)])}>
            <Text style={styleAssign([color(commonStyles.whiteColor), fSize(18)])}>我知道了</Text>
          </View>
          <Image style={styleAssign([w(92), h(87), styles.upa, absR(60), absT(80)])}
                 src={require('../../../assets/guide_line5.png')}/>
        </View>
      </View>
    );
  }
}
