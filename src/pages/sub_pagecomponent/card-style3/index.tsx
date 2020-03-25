/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/25
 * @Description: 名片样式3
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  absB,
  absL,
  absT,
  color,
  fSize,
  fWeight,
  h,
  mb,
  ml,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import {cloudBaseUrl} from "../../../api/httpurl";


interface Props {
  hidePhone?: boolean;
  hideWechat?: boolean;
  hideEmail?: boolean;
  hideAddress?: boolean;
}

interface State {
}

export default class CardStyle3 extends PureComponent<Props, State> {

  render() {
    let {hidePhone, hideWechat, hideEmail, hideAddress} = this.props;

    return (
      <View style={styleAssign([w(347), h(216), radiusA(10),
        styles.udr, styles.uje, mt(50), mb(50)])}>
        <Image style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}
               src={require('../../../assets/ico_business_card_bg3.png')}/>
        <View style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}>
          <View
            style={styleAssign([wRatio(100), h(204), radiusA(10), styles.upa, absL(0), absT(0)])}/>
          <View style={styleAssign([wRatio(100), styles.uac, mt(10)])}>
            <View style={styleAssign([styles.uac])}>
              <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                     src={'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1585103936&di=fbe020193d39f52abf5dcefeb43ae0dd&src=http://img8.zol.com.cn/bbs/upload/18816/18815745.jpg'}/>
              <View style={styleAssign([styles.uac, mt(5)])}>
                <Text style={styleAssign([fSize(16), fWeight('bold'), color('#343434')])}>王嘉怡</Text>
                <Text style={styleAssign([fSize(11), color('#343434')])}>销售经理</Text>
                <Text style={styleAssign([fSize(11), color('#343434')])}>美克美家家居有限公司</Text>
              </View>
            </View>
          </View>
          <View style={styleAssign([styles.upa, styles.udr, wRatio(100), absB(20), pl(40), pr(40)])}>
            <View style={styleAssign([styles.uf1])}>
              {/*电话号码*/}
              {
                !hidePhone && <View style={styleAssign([styles.uac, styles.udr])}>
                  <Image style={styleAssign([w(11), h(9)])}
                         src={`${cloudBaseUrl}ico_card_mobile_gray.png`}/>
                  <Text
                    style={styleAssign([fSize(11), color('#343434'), ml(5)])}>15982468866</Text>
                </View>
              }
              {/*微信号*/}
              {
                !hideWechat && <View style={styleAssign([styles.uac, styles.udr, mt(hidePhone ? 0 : 4)])}>
                  <Image style={styleAssign([w(12), h(10)])}
                         src={`${cloudBaseUrl}ico_card_wechat_gray.png`}/>
                  <Text
                    style={styleAssign([fSize(11), color('#343434'), ml(5)])}>98248866LSY</Text>
                </View>
              }
            </View>
            <View style={styleAssign([styles.uf1])}>
              {/*邮箱*/}
              {
                !hideEmail && <View style={styleAssign([styles.uac, styles.udr])}>
                  <Image style={styleAssign([w(12), h(10)])}
                         src={`${cloudBaseUrl}ico_card_email_gray.png`}/>
                  <Text
                    style={styleAssign([fSize(11), color('#343434'), ml(5)])}>982468866@168.com</Text>
                </View>
              }
              {/*地址*/}
              {
                !hideAddress && <View style={styleAssign([styles.udr, mt(hideEmail ? 0 : 4)])}>
                  <Image style={styleAssign([w(10), h(11), mt(4)])}
                         src={`${cloudBaseUrl}ico_card_location_gray.png`}/>
                  <Text
                    style={styleAssign([fSize(11), color('#343434'), ml(5)])}>地址信息未对外公开</Text>
                </View>
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
}
