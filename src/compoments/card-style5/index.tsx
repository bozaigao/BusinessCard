/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/25
 * @Description: 名片样式5
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import styles, {
  absB,
  absL,
  absT,
  color,
  commonStyles,
  fSize,
  fWeight,
  h,
  ml,
  mt,
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

export default class CardStyle5 extends PureComponent<Props, State> {

  render() {
    let {userInfo, hidePhone, hideWechat, hideEmail, hideAddress,width,height} = this.props;

    return (
      <View style={styleAssign([w(width ? width : 334), h(height ? height : 216), radiusA(10),
        styles.udr, styles.uje])}>
        <Image style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}
               src={require('../../assets/ico_business_card_bg5.png')}/>
        <View style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}>
          <View
            style={styleAssign([wRatio(100), h(204), radiusA(10), styles.upa, absL(0), absT(0)])}/>
          <View style={styleAssign([styles.upa, absL(30), absT(39)])}>
            <View style={styleAssign([styles.udr, mt(6), styles.uae])}>
              <Text
                style={styleAssign([fSize(16), fWeight('bold'), color(commonStyles.whiteColor)])}>{userInfo.name}</Text>
              <Text style={styleAssign([fSize(11), ml(8), color(commonStyles.whiteColor)])}>{userInfo.position}</Text>
            </View>
            <Text style={styleAssign([fSize(11), color(commonStyles.whiteColor), mt(2)])}>{userInfo.company}</Text>
          </View>
          <View style={styleAssign([styles.upa, absB(26), absL(30)])}>
            {/*电话号码*/}
            {
              !hidePhone && <View style={styleAssign([styles.uac, styles.udr])}>
                <Image style={styleAssign([w(11), h(9)])}
                       src={require('../../assets/ico_card_mobile_white.png')}/>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor), ml(5)])}>{userInfo.phone}</Text>
              </View>
            }
            {/*微信号*/}
            {
              !hideWechat && <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                <Image style={styleAssign([w(12), h(10)])}
                       src={require('../../assets/ico_card_wechat_white.png')}/>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor), ml(5)])}>{userInfo.wechat}</Text>
              </View>
            }
            {/*邮箱*/}
            {
              !hideEmail && <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                <Image style={styleAssign([w(12), h(10)])}
                       src={require('../../assets/ico_card_email_white.png')}/>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor), ml(5)])}>{userInfo.email}</Text>
              </View>
            }
            {/*地址*/}
            {
              !hideAddress && <View style={styleAssign([styles.udr, styles.uac, mt(8)])}>
                <Image style={styleAssign([w(9), h(11)])}
                       src={require('../../assets/ico_card_location_white.png')}/>
                <Text
                  style={styleAssign([fSize(11), color(commonStyles.whiteColor), ml(5)])}>{userInfo.detailAddress}</Text>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
}
