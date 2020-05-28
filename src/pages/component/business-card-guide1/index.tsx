/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 名片指引页
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import {
  absB, absL,
  absR,
  absT, bdColor,
  bgColor, bo, color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio, mt,
  op, radiusA, w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";


interface Props {
  cancle: any;
  createCard: any;
}

interface State {
}

export default class BusinessCardGuide1 extends PureComponent<Props, State> {

  render() {

    let {cancle, createCard} = this.props;

    return (
      <View
        style={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.blackColor), op(0.5), styles.upa, absT(0), absR(0),])}/>
        <View style={styleAssign([wRatio(100), h(224), styles.uac, styles.upa, absB(0)])}>
          <Text style={styleAssign([w(216), h(50), fSize(18), color(commonStyles.whiteColor)])}>点击这里创建您的个人名片
            业内精英们都在使用哦！</Text>
          <View
            onClick={cancle}
            style={styleAssign([styles.uac, styles.ujc, w(120), h(44), radiusA(22), bo(1), bdColor(commonStyles.whiteColor), {borderStyle: 'solid'},
              bgColor('rgb(145,145,145)'), mt(40)])}>
            <Text style={styleAssign([color(commonStyles.whiteColor), fSize(18)])}>我知道了</Text>
          </View>
          <Image style={styleAssign([w(335), h(41), mt(30)])} src={require('../../../assets/create_your_card.png')}
                 onClick={createCard}/>
          <Image style={styleAssign([w(69), h(85), styles.upa, absL(40), absT(60)])}
                 src={require('../../../assets/guide_line1.png')}/>
        </View>
      </View>
    );
  }
}
