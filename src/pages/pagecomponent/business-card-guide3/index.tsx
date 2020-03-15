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
  ml,
  mt,
  op,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";


interface Props {
  cancle: any;
  shareCard: any;
}

interface State {
}

export default class BusinessCardGuide3 extends PureComponent<Props, State> {

  render() {

    let {cancle, shareCard} = this.props;

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
            style={styleAssign([w(216), h(50), fSize(18), color(commonStyles.whiteColor)])}>点击这里可以将自己的名片分享出去让更多人看到哦！</Text>
          <View
            onClick={cancle}
            style={styleAssign([styles.uac, styles.ujc, w(120), h(44), radiusA(22), bo(1), bdColor(commonStyles.whiteColor), {borderStyle: 'solid'},
              bgColor('rgb(145,145,145)'), mt(40)])}>
            <Text style={styleAssign([color(commonStyles.whiteColor), fSize(18)])}>我知道了</Text>
          </View>
          <Image style={styleAssign([w(178), h(62), mt(30), ml(175)])} src={require('../../../assets/share_card.png')}
                 onClick={shareCard}/>
          <Image style={styleAssign([w(92), h(87), styles.upa, absR(40), absT(60)])}
                 src={require('../../../assets/guide_line3.png')}/>
        </View>
      </View>
    );
  }
}
