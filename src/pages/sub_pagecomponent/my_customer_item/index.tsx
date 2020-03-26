/**
 * @filename add_task.tsx
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
  pt, radiusA,
  w,
  wRatio
} from "../../../utils/style";
import {styleAssign, transformTime} from "../../../utils/datatool";
import {cloudBaseUrl} from "../../../api/httpurl";
import {CustomerRecord} from "../../../const/global";

interface Props {
  item: CustomerRecord;
}

export default class MyCustomerItem extends Component<Props> {

  render() {
    let {item} = this.props;

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View
          style={styleAssign([wRatio(100), h(84), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
            pl(20), pr(20), pt(15), pb(15)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <Image style={styleAssign([w(52), h(52), radiusA(26)])}
                   src={item.avatar ? item.avatar : `${cloudBaseUrl}ico_default.png`}/>
            <View style={styleAssign([ml(16)])}>
              <Text style={styleAssign([fSize(14), color('#343434')])}>
                {item.name}
              </Text>
              <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>
                {`ID：${item.customerUserId}`}
              </Text>
            </View>
          </View>
          <View style={styleAssign([styles.uae])}>
            <Text style={styleAssign([fSize(12), color('#E2BB7B')])}>
              {item.type === 'share' ? '分享绑定' : '购买绑定'}
            </Text>
            <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>
              {`绑定时间：${transformTime(item.bindTime)}`}
            </Text>
          </View>
        </View>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
      </View>
    )
  }
}
