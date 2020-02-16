/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 提现item
 */
import Taro, {Component} from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mt,
  pb,
  pl,
  pr,
  pt,
  w,
  wRatio
} from "../../../utils/style";
import {styleAssign} from "../../../utils/datatool";

interface Props {

}

export default class TiXianRecorderItem extends Component<Props> {

  render() {

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View
          style={styleAssign([wRatio(100), h(67), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
            pl(20), pr(20), pt(15), pb(15)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <Image style={styleAssign([w(21), h(21)])} src={require('../../../assets/ico_coin.png')}/>
            <View style={styleAssign([ml(16)])}>
              <Text style={styleAssign([fSize(14), color('#343434')])}>
                收入提现
              </Text>
              <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>
                单号：123456789012345678
              </Text>
            </View>
          </View>
          <View style={styleAssign([styles.uae])}>
            <Text style={styleAssign([fSize(14), color('#E2BB7B')])}>
              - 100.00
            </Text>
            <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>
              2019-07-15 13:36
            </Text>
          </View>
        </View>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
      </View>
    )
  }
}
