/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/25
 * @Description: 名片样式2
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  absB,
  absL,
  absR,
  absT,
  color,
  commonStyles,
  fSize,
  fWeight,
  h,
  mb,
  ml,
  mt,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";


interface Props {
  hidePhone?: boolean;
  hideWechat?: boolean;
  hideEmail?: boolean;
  hideAddress?: boolean;
}

interface State {
}

export default class CardStyle2 extends PureComponent<Props, State> {

  render() {
    let {hidePhone, hideWechat, hideEmail, hideAddress} = this.props;

    return (
      <View style={styleAssign([w(347), h(216), radiusA(10),
        styles.udr, styles.uje, mt(50), mb(50)])}>
        <Image style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}
               src={require('../../../assets/ico_business_card_bg2.png')}/>
        <View style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}>
          <View
            style={styleAssign([wRatio(100), h(204), radiusA(10), styles.upa, absL(0), absT(0)])}/>
          <View style={styleAssign([styles.upa, styles.udr, styles.uac, absL(42), absT(28)])}>
            <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                   src={'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1585103936&di=fbe020193d39f52abf5dcefeb43ae0dd&src=http://img8.zol.com.cn/bbs/upload/18816/18815745.jpg'}/>
            <View style={styleAssign([styles.uae, ml(16)])}>
              <Text style={styleAssign([fSize(16), fWeight('bold'), color('#E2BB7B')])}>王嘉怡</Text>
              <Text style={styleAssign([fSize(11), color(commonStyles.whiteColor)])}>销售经理</Text>
            </View>
          </View>
          <Text
            style={styleAssign([fSize(11), color(commonStyles.whiteColor), styles.upa, absT(24), absR(26)])}>美克美家家居有限公司</Text>
          <View style={styleAssign([styles.upa, absB(30), absL(42)])}>
            {/*电话号码*/}
            {
              !hidePhone && <View style={styleAssign([styles.uac, styles.udr])}>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor)])}>15982468866</Text>
              </View>
            }
            {/*微信号*/}
            {
              !hideWechat && <View style={styleAssign([styles.uac, styles.udr, mt(4)])}>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor)])}>98248866LSY</Text>
              </View>
            }
            {/*邮箱*/}
            {
              !hideEmail && <View style={styleAssign([styles.uac, styles.udr, mt(4)])}>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor)])}>982468866@168.com</Text>
              </View>
            }
            {/*地址*/}
            {
              !hideAddress && <View style={styleAssign([styles.udr, mt(4)])}>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor)])}>地址信息未对外公开</Text>
              </View>
            }
          </View>
          <View
            style={styleAssign([styles.upa, styles.udr, absR(25), absB(17), w(82), h(15), styles.uac])}>
            {
              !hidePhone &&
              <View style={styleAssign([w(20.5), styles.uac, styles.ujc])}>
                <Image style={styleAssign([w(11), h(9)])}
                       src={require('../../../assets/ico_card_mobile_white.png')}/>
              </View>
            }
            {
              !hideWechat &&
              <View style={styleAssign([w(20.5), styles.uac, styles.ujc])}>
                <Image style={styleAssign([w(12), h(10)])}
                       src={require('../../../assets/ico_card_wechat_white.png')}/>
              </View>
            }
            {
              !hideEmail &&
              <View style={styleAssign([w(21), styles.uac, styles.ujc])}>
                <Image style={styleAssign([w(12), h(10)])}
                       src={require('../../../assets/ico_card_email_white.png')}/>
              </View>
            }
            {
              !hideAddress &&
              <View style={styleAssign([w(21), styles.uac, styles.ujc])}>
                <Image style={styleAssign([w(10), h(11)])}
                       src={require('../../../assets/ico_card_location_white.png')}/>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
}
