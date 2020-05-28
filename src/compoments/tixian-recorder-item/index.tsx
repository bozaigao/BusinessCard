/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
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
} from "../../utils/style";
import {styleAssign, transformTime} from "../../utils/datatool";
import {BaseCoin, TiXianRecord} from "../../const/global";

interface Props {
  item: TiXianRecord;
}

export default class TiXianRecorderItem extends Component<Props> {

  render() {
    let {item} = this.props;

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View
          style={styleAssign([wRatio(100), h(67), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
            pl(20), pr(20), pt(15), pb(15)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <Image style={styleAssign([w(21), h(21)])} src={require('../../assets/ico_coin.png')}/>
            <View style={styleAssign([ml(16)])}>
              <Text style={styleAssign([fSize(14), color('#343434')])}>
                {item.remark}
              </Text>
              <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>
                {`单号：${item.transactionId}`}
              </Text>
            </View>
          </View>
          <View style={styleAssign([styles.uae])}>
            <Text style={styleAssign([fSize(14), color('#E2BB7B')])}>
              {`- ${(item.money / BaseCoin).toFixed(2)}`}
            </Text>
            <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>
              {transformTime(item.createTime)}
            </Text>
          </View>
        </View>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
      </View>
    )
  }
}
