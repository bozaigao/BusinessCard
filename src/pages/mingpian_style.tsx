/**
 * @filename mingpian_style.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/24
 * @Description: 名片样式
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../compoments/safe-area-view/index";
import {hidePhone, styleAssign} from "../utils/datatool";
import {
  absB,
  absL,
  absR,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
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
} from "../utils/style";
import * as actions from '../actions/login';
import {connect} from "@tarojs/redux";
import TopHeader from "../compoments/top-header";
import {Image, Text, View} from "@tarojs/components";
import {cloudBaseUrl} from "../api/httpurl";
import {User} from "../const/global";
import BottomButon from "../compoments/bottom-buton";

interface Props {
  userInfo: User;
}

interface State {

}

@connect(state => Object.assign(state.taskCenter, state.login), {...actions})
class MingpianStyle extends Component<Props, State> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    disableScroll: true
  }

  constructor(props) {
    super(props);
    this.state = {
      //@ts-ignore
      userInfo: null,
    }
  }


  render() {
    let {userInfo} = this.props;

    return (
      <CustomSafeAreaView
        customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
        notNeedBottomPadding={true}>
        <TopHeader title={'名片样式'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor), styles.uac])}>
          <View
            style={styleAssign([wRatio(100), h(332), styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
            <View style={styleAssign([w(334), h(202), radiusA(10),
              styles.udr, styles.uje])}>
              <Image style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}
                     src={require('../assets/ico_business_card_bg1.png')}/>
              <View style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}>
                <View
                  style={styleAssign([wRatio(100), h(204), radiusA(10), styles.upa, absL(0), absT(0)])}/>
                <View style={styleAssign([styles.upa, absL(20), absT(15)])}>
                  <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                         src={userInfo.avatar}/>
                  <View style={styleAssign([styles.uae, styles.udr, mt(6)])}>
                    <Text style={styleAssign([fSize(18), fWeight('bold')])}>{userInfo.name}</Text>
                    <Text style={styleAssign([fSize(12), ml(8)])}>{userInfo.position}</Text>
                  </View>
                  <Text style={styleAssign([fSize(12), color('#343434')])}>{userInfo.company}</Text>
                </View>
                <View style={styleAssign([styles.uae, styles.upa, absB(26), absR(24)])}>
                  {/*电话号码*/}
                  <View style={styleAssign([styles.uac, styles.udr])}>
                    <Text
                      style={styleAssign([fSize(12), color('#343434')])}>{userInfo.showPhone ? userInfo.phone : hidePhone(userInfo.phone)}</Text>
                    <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_mobile.png`}/>
                  </View>
                  {/*微信号*/}
                  <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                    <Text
                      style={styleAssign([fSize(12), color('#343434')])}>{userInfo.wechat}</Text>
                    <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_wechat.png`}/>
                  </View>
                  {/*邮箱*/}
                  <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                    <Text
                      style={styleAssign([fSize(12), color('#343434')])}>{userInfo.email ? userInfo.email : '邮箱信息未对外公开'}</Text>
                    <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_email.png`}/>
                  </View>
                  {/*地址*/}
                  <View style={styleAssign([styles.udr, mt(8)])}>
                    <Text
                      style={styleAssign([fSize(12), color('#343434')])}>{userInfo.detailAddress}</Text>
                    <Image style={styleAssign([w(9), h(11), ml(8), mt(4)])}
                           src={`${cloudBaseUrl}ico_card_location.png`}/>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styleAssign([styles.uac, styles.udr, wRatio(100)])}>
            <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(20), mt(20)])}>对外公开信息</Text>
          </View>
          <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(10)])}>
            <View style={styleAssign([w(58), h(36), radiusA(2), styles.uac, styles.ujc, bgColor('red'), ml(20)])}>
              <Text style={styleAssign([fSize(14), color('#835E1B')])}>手机</Text>
            </View>
            <View style={styleAssign([w(58), h(36), radiusA(2), styles.uac, styles.ujc, ml(11), bgColor('red')])}>
              <Text style={styleAssign([fSize(14), color('#835E1B')])}>微信</Text>
            </View>
            <View style={styleAssign([w(58), h(36), radiusA(2), styles.uac, styles.ujc, ml(11), bgColor('red')])}>
              <Text style={styleAssign([fSize(14), color('#835E1B')])}>邮箱</Text>
            </View>
            <View style={styleAssign([w(58), h(36), radiusA(2), styles.uac, styles.ujc, ml(11), bgColor('red')])}>
              <Text style={styleAssign([fSize(14), color('#835E1B')])}>地址</Text>
            </View>
          </View>
          <View style={styleAssign([styles.uac, styles.udr, wRatio(100)])}>
            <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(20), mt(15)])}>选择版式</Text>
          </View>
          <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(15), pl(10), pr(10)])}>
            {
              [{icon: require('../assets/ico_mingpian_style_1.png'), title: '商务版'},
                {icon: require('../assets/ico_mingpian_style_2.png'), title: '黑金版'},
                {icon: require('../assets/ico_mingpian_style_3.png'), title: '简约版'},
                {icon: require('../assets/ico_mingpian_style_4.png'), title: '极简版'},
                {icon: require('../assets/ico_mingpian_style_5.png'), title: '实景版'}].map((value, index) => {
                return <View style={styleAssign([styles.uac])}
                             key={index}>
                  <Image style={styleAssign([w(68), h(41)])} src={value.icon}/>
                  <Text style={styleAssign([fSize(12), color('#ACACAC')])}>{value.title}</Text>
                </View>;
              })
            }
          </View>
          <View style={styleAssign([styles.uac, styles.udr, wRatio(100)])}>
            <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(20), mt(15)])}>名片图</Text>
          </View>
          <View style={styleAssign([wRatio(100), styles.uac, styles.udr])}>
            <View
              style={styleAssign([w(65), h(65), bgColor(commonStyles.pageDefaultBackgroundColor), styles.uac, styles.ujc, mt(15), ml(20)])}>
              <Image style={styleAssign([w(40), h(40)])} src={require('../assets/ico_mingpian_style_add.png')}/>
            </View>
          </View>
        </View>
        <BottomButon title={'完成'} onClick={() => {

        }}/>
      </CustomSafeAreaView>
    )
  }
}

export default MingpianStyle;
