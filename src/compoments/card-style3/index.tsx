/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/25
 * @Description: 名片样式3
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import styles, {
  absB,
  absL,
  absT,
  color,
  fSize,
  fWeight,
  h,
  ml,
  mt,
  pl,
  pr,
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

export default class CardStyle3 extends PureComponent<Props, State> {

  render() {
    let {userInfo,hidePhone, hideWechat, hideEmail, hideAddress,width,height} = this.props;

    return (
      <View style={styleAssign([w(width ? width : 334), h(height ? height : 216), radiusA(10),
        styles.udr, styles.uje])}>
        <Image style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}
               src={require('../../assets/ico_business_card_bg3.png')}/>
        <View style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}>
          <View
            style={styleAssign([wRatio(100), h(204), radiusA(10), styles.upa, absL(0), absT(0)])}/>
          <View style={styleAssign([wRatio(100), styles.uac, mt(10)])}>
            <View style={styleAssign([styles.uac])}>
              <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                     src={userInfo.avatar}/>
              <View style={styleAssign([styles.uac, mt(5)])}>
                <Text style={styleAssign([fSize(16), fWeight('bold'), color('#343434')])}>{userInfo.name}</Text>
                <Text style={styleAssign([fSize(11), color('#343434')])}>{userInfo.position}</Text>
                <Text style={styleAssign([fSize(11), color('#343434')])}>{userInfo.enterpriseName}</Text>
              </View>
            </View>
          </View>
          <View style={styleAssign([styles.upa, styles.udr, wRatio(100), absB(20), pl(40), pr(40)])}>
            <View style={styleAssign([styles.uf1])}>
              {/*电话号码*/}
              {
                !hidePhone && <View style={styleAssign([styles.uac, styles.udr])}>
                  <Image style={styleAssign([w(11), h(9)])}
                         src={require('../../assets/ico_card_mobile_gray.png')}/>
                  <Text
                    style={styleAssign([fSize(11), color('#343434'), ml(5)])}>{userInfo.phone}</Text>
                </View>
              }
              {/*微信号*/}
              {
                !hideWechat && <View style={styleAssign([styles.uac, styles.udr, mt(hidePhone ? 0 : 4)])}>
                  <Image style={styleAssign([w(12), h(10)])}
                         src={require('../../assets/ico_card_wechat_gray.png')}/>
                  <Text
                    style={styleAssign([fSize(11), color('#343434'), ml(5)])}>{userInfo.wechat}</Text>
                </View>
              }
            </View>
            <View style={styleAssign([styles.uf1])}>
              {/*邮箱*/}
              {
                !hideEmail && <View style={styleAssign([styles.uac, styles.udr])}>
                  <Image style={styleAssign([w(12), h(10)])}
                         src={require('../../assets/ico_card_email_gray.png')}/>
                  <Text
                    style={styleAssign([fSize(11), color('#343434'), ml(5)])}>{userInfo.email}</Text>
                </View>
              }
              {/*地址*/}
              {
                !hideAddress && <View style={styleAssign([styles.udr, mt(hideEmail ? 0 : 4)])}>
                  <Image style={styleAssign([w(10), h(11), mt(4)])}
                         src={require('../../assets/ico_card_location_gray.png')}/>
                  <Text
                    style={styleAssign([fSize(11), color('#343434'), ml(5)])}>{userInfo.detailAddress}</Text>
                </View>
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
}
