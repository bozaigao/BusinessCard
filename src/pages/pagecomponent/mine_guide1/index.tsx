/**
 * @filename index.tsx
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
  viewFenXiao: any;
}

interface State {
}

export default class MyGuide1 extends PureComponent<Props, State> {

  render() {

    let {cancle, viewFenXiao} = this.props;

    return (
      <View
        style={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.blackColor), op(0.5), styles.upa, absT(0), absR(0),])}/>
        <View
          style={styleAssign([wRatio(100), styles.uac, styles.upa, {top: iphoneX() ? pxTransform(412) : pxTransform(362)}])}>
          <Image style={styleAssign([w(345), h(102)])}
                 src={require('../../../assets/my_guide1_icon.png')}
          onClick={viewFenXiao}/>
          <View style={styleAssign([wRatio(100),styles.uac])}>
            <Image style={styleAssign([w(92), h(87), styles.upa, absR(10), absT(10)])}
                   src={require('../../../assets/guide_line_6.png')}/>
            <Text
              style={styleAssign([w(237), h(50), fSize(18), color(commonStyles.whiteColor), mt(65)])}>点击这里进入分销中心，随时查看自己的客户和收益哦！</Text>
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
