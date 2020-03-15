/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/15
 * @Description: 名片指引页
 */
import Taro, {PureComponent, pxTransform} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import {
  absL,
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
  mr,
  mt,
  op,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";


interface Props {
  cancle: any;
  viewCard: any;
}

interface State {
}

export default class BusinessCardGuide2 extends PureComponent<Props, State> {

  render() {

    let {cancle, viewCard} = this.props;

    return (
      <View
        style={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.blackColor), op(0.5), styles.upa, absT(0), absR(0),])}/>
        <View
          style={styleAssign([wRatio(100), h(224), styles.uac, styles.upa, {top: iphoneX() ? pxTransform(563) : pxTransform(516)}])}>
          <Text
            style={styleAssign([w(216), h(50), fSize(18), color(commonStyles.whiteColor)])}>点击这里可以以浏览者身份查看自己的名片哦！</Text>
          <View
            onClick={cancle}
            style={styleAssign([styles.uac, styles.ujc, w(120), h(44), radiusA(22), bo(1), bdColor(commonStyles.whiteColor), {borderStyle: 'solid'},
              bgColor('rgb(145,145,145)'), mt(40)])}>
            <Text style={styleAssign([color(commonStyles.whiteColor), fSize(18)])}>我知道了</Text>
          </View>
          <Image style={styleAssign([w(162), h(46), mt(30), mr(175)])} src={require('../../../assets/view_card.png')}
                 onClick={viewCard}/>
          <Image style={styleAssign([w(69), h(85), styles.upa, absL(40), absT(60)])}
                 src={require('../../../assets/guide_line1.png')}/>
        </View>
      </View>
    );
  }
}
