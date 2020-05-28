/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 名片样式2
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
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
  ml,
  mr,
  mt,
  op,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {User} from "../../const/global";


interface Props {
  userInfo: User;
  hidePhone?: boolean;
  hideWechat?: boolean;
  hideEmail?: boolean;
  hideAddress?: boolean;
  width?: number;
  height?: number;
}

interface State {
}

export default class CardStyle2 extends PureComponent<Props, State> {

  render() {
    let {userInfo, hidePhone, hideWechat, hideEmail, hideAddress, width, height} = this.props;

    return (
      <View style={styleAssign([w(width ? width : 334), h(height ? height : 216), radiusA(10),
        styles.udr, styles.uje])}>
        <Image style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}
               src={require('../../assets/ico_business_card_bg2.png')}/>
        <View style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}>
          <View
            style={styleAssign([wRatio(100), h(204), radiusA(10), styles.upa, absL(0), absT(0)])}/>
          <View style={styleAssign([styles.upa, styles.udr, styles.uac, absL(42), absT(28)])}>
            <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                   src={userInfo.avatar}/>
            <View style={styleAssign([ml(16)])}>
              <Text style={styleAssign([fSize(16), fWeight('bold'), color('#E2BB7B')])}>{userInfo.name}</Text>
              <Text style={styleAssign([fSize(11), color(commonStyles.whiteColor)])}>{userInfo.position}</Text>
            </View>
          </View>
          <Text
            style={styleAssign([fSize(11), color(commonStyles.whiteColor), styles.upa, absT(24), absR(26)])}>{userInfo.enterpriseName}</Text>
          <View style={styleAssign([styles.upa, absB(30), absL(42)])}>
            {/*电话号码*/}
            {
              !hidePhone && <View style={styleAssign([styles.uac, styles.udr])}>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor)])}>{userInfo.phone}</Text>
              </View>
            }
            {/*微信号*/}
            {
              !hideWechat && <View style={styleAssign([styles.uac, styles.udr, mt(4)])}>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor)])}>{userInfo.wechat}</Text>
              </View>
            }
            {/*邮箱*/}
            {
              !hideEmail && <View style={styleAssign([styles.uac, styles.udr, mt(4)])}>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor)])}>{userInfo.email}</Text>
              </View>
            }
            {/*地址*/}
            {
              !hideAddress && <View style={styleAssign([styles.udr, mt(4)])}>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor)])}>{userInfo.detailAddress}</Text>
              </View>
            }
          </View>
          <View
            style={styleAssign([styles.upa, styles.udr, absR(25), absB(17), w(75), h(15), styles.uac])}>
            <View style={styleAssign([styles.uf1, styles.uac, styles.ujc, op(hidePhone ? 0 : 1),mr(5)])}>
              <Image style={styleAssign([w(11), h(9)])}
                     src={require('../../assets/ico_card_mobile_white.png')}/>
            </View>
            <View style={styleAssign([styles.uf1, styles.uac, styles.ujc, op(hideWechat ? 0 : 1),mr(5)])}>
              <Image style={styleAssign([w(12), h(10)])}
                     src={require('../../assets/ico_card_wechat_white.png')}/>
            </View>
            <View style={styleAssign([styles.uf1, styles.uac, styles.ujc, op(hideEmail ? 0 : 1),mr(5)])}>
              <Image style={styleAssign([w(12), h(10)])}
                     src={require('../../assets/ico_card_email_white.png')}/>
            </View>
            <View style={styleAssign([styles.uf1, styles.uac, styles.ujc, op(hideAddress ? 0 : 1)])}>
              <Image style={styleAssign([w(10), h(11)])}
                     src={require('../../assets/ico_card_location_white.png')}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
