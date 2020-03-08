/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/19
 * @Description: 问候语显示Modal
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
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
  op, radiusA,
  radiusBL,
  radiusBR,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";
import {cloudBaseUrl} from "../../../api/httpurl";
import {User} from "../../../const/global";


interface Props {
  cancle: any;
  wenHouYu: string;
  userInfo: User;
}

interface State {
}

export default class WenHouModal extends PureComponent<Props, State> {

  render() {

    let {cancle, wenHouYu,userInfo} = this.props;

    return (
      <View
        style={styleAssign([{
          position: 'absolute',
        }, absT(0), absR(0), wRatio(100), hRatio(100)])}>
        <TouchableButton
          onClick={cancle}
          customStyle={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.blackColor), op(0.5), styles.upa, absT(0), absR(0)])}/>
        <View style={styleAssign([wRatio(100), hRatio(100), styles.uac, styles.ujc, styles.upa, absB(0)])}>
          <View style={styleAssign([w(302), h(284)])}>
            <Image style={styleAssign([wRatio(100), h(185)])} src={require('../../../assets/ico_wenhou_bg.png')}/>
            <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor), radiusBL(8), radiusBR(8),
              styles.uac, styles.ujc])}>
              <View style={styleAssign([styles.udr])}>
                <Image style={styleAssign([w(40), h(40), radiusA(20)])}
                       src={userInfo.avatar?userInfo.avatar:`${cloudBaseUrl}ico_default.png`}/>
                <View style={styleAssign([ml(10)])}>
                  <Image style={styleAssign([w(221), h(59)])}
                         src={require('../../../assets/ico_wenhouyu_bg2.png')}/>
                  <View
                    style={styleAssign([wRatio(90), hRatio(90), {marginLeft: '7%'}, styles.ujc, styles.upa, absT(0)])}>
                    <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>{wenHouYu.substr(0, 25)}</Text>
                    <Text
                      style={styleAssign([fSize(14), color('#0C0C0C')])}>{wenHouYu.substr(25, wenHouYu.length)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Image style={styleAssign([w(33), h(33), mt(30)])} src={require('../../../assets/ico_close_white.png')}
                 onClick={cancle}/>
        </View>
      </View>
    );
  }
}
