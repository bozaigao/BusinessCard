/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 极致名片
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  absB,
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  ml,
  mt,
  pl,
  pr,
  pt,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import {cloudBaseUrl} from "../../../api/httpurl";


interface Props {
  // navigation_bar: NavigationBar;
}

interface State {
}

export default class JiZhiCard extends PureComponent<Props, State> {

  render() {

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>极致名片</Text>
        </View>
        <ScrollView
          style={styleAssign([wRatio(100), styles.uac, {whiteSpace: 'nowrap'}])}
          scrollX>
          {
            [1, 2].map((value, index) => {
              console.log(value);
              return (<View style={styleAssign([wRatio(90), {display: 'inline-block'}])} key={index}>
                <View
                  style={styleAssign([{width: '95%'}, {marginLeft: '2.5%'}, mt(16), h(177), bgColor(commonStyles.whiteColor)])}>
                  <View style={styleAssign([styles.udr, styles.ujb, pl(16), pt(16), pr(16)])}>
                    <View style={styleAssign([])}>
                      <Text style={styleAssign([fSize(18), color(commonStyles.colorTheme)])}>尹龙海</Text>
                      <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme), mt(4)])}>极致信息·项目经理</Text>
                    </View>
                    <Image style={styleAssign([w(66), h(66), radiusA(33)])}
                           src={`${cloudBaseUrl}ico_default.png`}/>
                  </View>
                  <View style={styleAssign([ml(16), styles.udr, styles.uac])}>
                    <Image style={styleAssign([w(12), h(10)])} src={`${cloudBaseUrl}ico_wechat_gray.png`}/>
                    <Text
                      style={styleAssign([fSize(12), color('#979797'), ml(4)])}>18980668468</Text>
                  </View>
                  <View style={styleAssign([ml(16), styles.udr, styles.uac])}>
                    <Image style={styleAssign([w(12), h(10)])} src={`${cloudBaseUrl}ico_phone_gray.png`}/>
                    <Text
                      style={styleAssign([fSize(12), color('#979797'), ml(4)])}>LY8866321</Text>
                  </View>
                  <View style={styleAssign([wRatio(100), styles.upa, absB(0)])}>
                    <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                    <View
                      style={styleAssign([wRatio(100), h(44), styles.udr, styles.uac])}>
                      <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
                        <View style={styleAssign([styles.udr, styles.uac])}>
                          <Image style={styleAssign([w(18), h(18)])} src={`${cloudBaseUrl}ico_call.png`}/>
                          <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme), ml(11)])}>拨打电话</Text>
                        </View>
                      </View>
                      <View style={styleAssign([w(1), h(19), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                      <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
                        <View style={styleAssign([styles.udr, styles.uac])}>
                          <Image style={styleAssign([w(18), h(18)])} src={`${cloudBaseUrl}ico_share.png`}/>
                          <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme), ml(11)])}>分享名片</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>);
            })
          }
        </ScrollView>
      </View>
    );
  }
}
