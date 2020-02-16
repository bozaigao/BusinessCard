/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 我的客户item
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
import {cloudBaseUrl} from "../../../api/httpurl";

interface Props {

}

export default class MyCustomerItem extends Component<Props> {

  render() {

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View
          style={styleAssign([wRatio(100), h(84), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
            pl(20), pr(20), pt(15), pb(15)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <Image style={styleAssign([w(52), h(52)])} src={`${cloudBaseUrl}ico_default.png`}/>
            <View style={styleAssign([ml(16)])}>
              <Text style={styleAssign([fSize(14), color('#343434')])}>
                卢志刚
              </Text>
              <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>
                ID：12345678
              </Text>
            </View>
          </View>
          <View style={styleAssign([styles.uae])}>
            <Text style={styleAssign([fSize(12), color('#E2BB7B')])}>
              分享绑定
            </Text>
            <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>
              绑定时间：2019.12.12
            </Text>
          </View>
        </View>
        <View style={styleAssign([wRatio(100),h(1),bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
      </View>
    )
  }
}
