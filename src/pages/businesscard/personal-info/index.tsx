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
import {cloudBaseUrl} from "../../../api/httpurl";


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
          style={styleAssign([wRatio(95), h(355), bgColor(commonStyles.whiteColor), radiusA(4),
            {marginLeft: '2.5%'}, mt(16), pa(16)])}>
          <View style={styleAssign([styles.udr, styles.uac])}>
            <Image style={styleAssign([w(40), h(40), radiusA(20)])} src={`${cloudBaseUrl}ico_default.png`}/>
            <Image style={styleAssign([w(85), h(41), ml(10)])} src={`${cloudBaseUrl}ico_msg_bg.png`}/>
            <View>
              <View style={styleAssign([w(7), h(7), radiusA(3.6), bgColor('red'), ml(5)])}/>
              <Text style={styleAssign([fSize(11), color('#979797'), ml(8), mt(5)])}>9″</Text>
            </View>
          </View>
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
          <View style={styleAssign([wRatio(100), h(68), mt(10), styles.udr, styles.uac, styles.uja])}>
            {
              ['90后', '夜跑', '旅行', '摄影'].map((value, index) => {
                return <View key={index}
                             style={styleAssign([w(58), h(28), styles.uac, styles.ujc, radiusA(14), bgColor('#E7E7E7')])}>
                  <Text style={styleAssign([color('#343434'), fSize(12)])}>{value}</Text>
                </View>
              })
            }
          </View>
        </View>
      </View>
    );
  }
}
