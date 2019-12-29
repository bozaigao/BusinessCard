/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 雷达item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  hRatio,
  ml,
  mr,
  mt,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";


interface Props {
  // navigation: Navigation;
}

interface State {
}

export default class RadarItem extends PureComponent<Props, State> {

  render() {

    return (
      <TouchableButton
        customStyle={styleAssign([radiusA(4), {width: '95%'}, {marginLeft: '2.5%'}, h(154), bgColor(commonStyles.whiteColor), mt(8)])}>
        <View style={styleAssign([styles.uac, styles.udr, styles.ujb])}>
          <View style={styleAssign([styles.uac, styles.udr, mt(20)])}>
            <Image style={styleAssign([w(43), h(43), radiusA(21.5), ml(16)])}
                   src={require('../../../assets/ico_default.png')}/>
            <View style={styleAssign([ml(16)])}>
              <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme)])}>刘思雨</Text>
              <Text style={styleAssign([fSize(10), color('#979797')])}>来自名片扫码2019-11-20</Text>
            </View>
          </View>
          <View style={styleAssign([bgColor('#0F56C5'), radiusA(4), styles.uac, styles.ujc,
            w(72), h(28), radiusA(4), mr(16)])}>
            <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>置为客户</Text>
          </View>
        </View>
        <Text
          style={styleAssign([fSize(12), mt(3), ml(16), color(commonStyles.colorTheme)])}>她于2019-11-20访问过您的名片以及商品</Text>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(15)])}/>
        <View style={styleAssign([styles.uf1, styles.ujb, styles.udr])}>
          <View style={styleAssign([w(80), hRatio(100), styles.uac, styles.ujc])}>
            <Text style={styleAssign([color('#0F56C5'), fSize(12)])}>添加标签</Text>
          </View>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <View style={styleAssign([w(80), hRatio(100), styles.uac, styles.ujc])}>
              <Text style={styleAssign([color('#0F56C5'), fSize(12)])}>拨打电话</Text>
            </View>
            <View style={styleAssign([w(80), hRatio(100), styles.uac, styles.ujc])}>
              <Text style={styleAssign([color('#0F56C5'), fSize(12)])}>加微信</Text>
            </View>
          </View>
        </View>
      </TouchableButton>
    );
  }
}
