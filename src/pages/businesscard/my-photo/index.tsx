/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @function: 我的照片
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, hRatio, ml, mt, radiusA, w, wRatio} from "../../../utils/style";


interface Props {
  // navigation: Navigation;
}

interface State {
}

export default class MyPhoto extends PureComponent<Props, State> {

  render() {

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>我的照片</Text>
        </View>
        <View
          style={styleAssign([{width: '95%'}, {marginLeft: '2.5%'}, mt(16), h(720), bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
            <Image
              style={styleAssign([radiusA(4), wRatio(95), hRatio(90), bgColor(commonStyles.whiteColor)])}
              src={require('../../../assets/ico_default.jpeg')}/>
          </View>
          <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
            <Image
              style={styleAssign([radiusA(4), wRatio(95), hRatio(90), bgColor(commonStyles.whiteColor)])}
              src={require('../../../assets/ico_default.jpeg')}/>
          </View>
          <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
            <Image
              style={styleAssign([radiusA(4), wRatio(95), hRatio(90), bgColor(commonStyles.whiteColor)])}
              src={require('../../../assets/ico_default.jpeg')}/>
          </View>
        </View>
      </View>
    );
  }
}
