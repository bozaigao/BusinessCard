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


interface Props {
  hidePhone?: boolean;
  hideWechat?: boolean;
  hideEmail?: boolean;
  hideAddress?: boolean;
}

interface State {
}

export default class CardStyle1 extends PureComponent<Props, State> {

  render() {
    let {hidePhone, hideWechat, hideEmail, hideAddress} = this.props;

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
                   src={'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1585103936&di=fbe020193d39f52abf5dcefeb43ae0dd&src=http://img8.zol.com.cn/bbs/upload/18816/18815745.jpg'}/>
            <View style={styleAssign([styles.uae, styles.udr, mt(6)])}>
              <Text style={styleAssign([fSize(16), fWeight('bold')])}>王嘉怡</Text>
              <Text style={styleAssign([fSize(11), ml(8)])}>销售经理</Text>
            </View>
            <Text style={styleAssign([fSize(11), color('#343434')])}>美克美家家居有限公司</Text>
          </View>
          <View style={styleAssign([styles.uae, styles.upa, absB(26), absR(24)])}>
            {/*电话号码*/}
            {
              !hidePhone && <View style={styleAssign([styles.uac, styles.udr])}>
                <Text
                  style={styleAssign([fSize(11), color('#343434')])}>15982468866</Text>
                <Image style={styleAssign([w(11), h(9), ml(8)])}
                       src={require('../../../../assets/ico_card_mobile_gray.png')}/>
              </View>
            }
            {/*微信号*/}
            {
              !hideWechat && <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                <Text
                  style={styleAssign([fSize(11), color('#343434')])}>98248866LSY</Text>
                <Image style={styleAssign([w(12), h(10), ml(8)])}
                       src={require('../../../../assets/ico_card_wechat_gray.png')}/>
              </View>
            }
            {/*邮箱*/}
            {
              !hideEmail && <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                <Text
                  style={styleAssign([fSize(11), color('#343434')])}>982468866@168.com</Text>
                <Image style={styleAssign([w(12), h(10), ml(8)])}
                       src={require('../../../../assets/ico_card_email_gray.png')}/>
              </View>
            }
            {/*地址*/}
            {
              !hideAddress && <View style={styleAssign([styles.udr, mt(8)])}>
                <Text
                  style={styleAssign([fSize(11), color('#343434')])}>地址信息未对外公开</Text>
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
