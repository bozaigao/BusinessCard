/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/25
 * @Description: 名片样式1
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../../utils/datatool";
import styles, {
  absB,
  absL,
  absR,
  absT,
  color,
  fSize,
  fWeight,
  h,
  mb,
  ml,
  mt,
  radiusA,
  w,
  wRatio
} from "../../../../utils/style";
import {User} from "../../../../const/global";


interface Props {
  userInfo: User;
  hidePhone?: boolean;
  hideWechat?: boolean;
  hideEmail?: boolean;
  hideAddress?: boolean;
}

interface State {
}

export default class CardStyle1 extends PureComponent<Props, State> {

  render() {
    let {userInfo, hidePhone, hideWechat, hideEmail, hideAddress} = this.props;

    return (
      <View style={styleAssign([w(347), h(216), radiusA(10),
        styles.udr, styles.uje, mt(50), mb(50)])}>
        <Image style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}
               src={require('../../../../assets/ico_business_card_bg1.png')}/>
        <View style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}>
          <View
            style={styleAssign([wRatio(100), h(204), radiusA(10), styles.upa, absL(0), absT(0)])}/>
          <View style={styleAssign([styles.upa, absL(20), absT(15)])}>
            <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                   src={userInfo.avatar}/>
            <View style={styleAssign([styles.uae, styles.udr, mt(6)])}>
              <Text style={styleAssign([fSize(16), fWeight('bold')])}>{userInfo.name}</Text>
              <Text style={styleAssign([fSize(11), ml(8)])}>{userInfo.position}</Text>
            </View>
            <Text style={styleAssign([fSize(11), color('#343434')])}>{userInfo.company}</Text>
          </View>
          <View style={styleAssign([styles.uae, styles.upa, absB(26), absR(24)])}>
            {/*电话号码*/}
            {
              !hidePhone && <View style={styleAssign([styles.uac, styles.udr])}>
                <Text
                  style={styleAssign([fSize(11), color('#343434')])}>{userInfo.phone}</Text>
                <Image style={styleAssign([w(11), h(9), ml(8)])}
                       src={require('../../../../assets/ico_card_mobile_gray.png')}/>
              </View>
            }
            {/*微信号*/}
            {
              !hideWechat && <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                <Text
                  style={styleAssign([fSize(11), color('#343434')])}>{userInfo.wechat}</Text>
                <Image style={styleAssign([w(12), h(10), ml(8)])}
                       src={require('../../../../assets/ico_card_wechat_gray.png')}/>
              </View>
            }
            {/*邮箱*/}
            {
              !hideEmail && <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                <Text
                  style={styleAssign([fSize(11), color('#343434')])}>{userInfo.email}</Text>
                <Image style={styleAssign([w(12), h(10), ml(8)])}
                       src={require('../../../../assets/ico_card_email_gray.png')}/>
              </View>
            }
            {/*地址*/}
            {
              !hideAddress && <View style={styleAssign([styles.udr, mt(8)])}>
                <Text
                  style={styleAssign([fSize(11), color('#343434')])}>{userInfo.detailAddress}</Text>
                <Image style={styleAssign([w(9), h(11), ml(8), mt(4)])}
                       src={require('../../../../assets/ico_card_location_gray.png')}/>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
}
