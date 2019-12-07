/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 个人介绍
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  fSize,
  h,
  ml,
  mr,
  mt,
  pa,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";


interface Props {
  // navigation: Navigation;
}

interface State {
}

export default class PersonalInfo extends PureComponent<Props, State> {

  render() {

    return (
      <View style={styleAssign([wRatio(100), styles.uac])}>
        <View style={styleAssign([wRatio(100)])}>
          <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
            <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
            <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>我的个人简介</Text>
          </View>
        </View>
        <View
          style={styleAssign([wRatio(95), h(307), bgColor(commonStyles.whiteColor), radiusA(4),
            {marginLeft: '2.5%'}, mt(16), pa(16)])}>
          <Image style={styleAssign([w(40), h(40), radiusA(20)])} src={require('../../../assets/ico_default.jpeg')}/>
          <Text
            style={styleAssign([fSize(14), color('#343434'), mt(16)])}>Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！</Text>
          {/*家乡*/}
          <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(24)])}>
            <View style={styleAssign([])}>
              <Text style={styleAssign([fSize(14)])}>家乡</Text>
              <Text style={styleAssign([fSize(12)])}>四川省 成都市</Text>
            </View>
            <View style={styleAssign([w(52), h(28), radiusA(4), styles.uac, styles.ujc,
              bo(1), radiusA(4), {borderStyle: 'solid'}, bdColor(commonStyles.colorTheme), mr(16)])}>
              <Text style={styleAssign([fSize(12)])}>同乡</Text>
            </View>
          </View>
          {/*教育*/}
          <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(24)])}>
            <View style={styleAssign([])}>
              <Text style={styleAssign([fSize(14)])}>教育</Text>
              <Text style={styleAssign([fSize(12)])}>四川美术学院</Text>
              <Text style={styleAssign([fSize(10)])}>产品设计 2015-2019 本科</Text>
            </View>
            <View style={styleAssign([w(52), h(28), radiusA(4), styles.uac, styles.ujc,
              bo(1), radiusA(4), {borderStyle: 'solid'}, bdColor(commonStyles.colorTheme), mr(16)])}>
              <Text style={styleAssign([fSize(12)])}>校友</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
