/**
 * @filename mingpian_haibao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 名片海报
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
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
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header/index";
import {Image, Text, View} from "@tarojs/components";
import {cloudBaseUrl} from "../../api/httpurl";
import BottomButon from "../../compoments/bottom-buton";
import {User} from "../../const/global";

interface Props {
  userInfo: User;
}

interface State {

}

@connect(state => state.login, {...actions})
class MingpianHaibao extends Component<Props, State> {

  private viewRef;


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
    console.log(this.viewRef);
  }


  render() {
    let {userInfo} = this.props;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'名片海报'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor), styles.uac])}>
          <View
            style={styleAssign([wRatio(90), h(434), bgColor(commonStyles.whiteColor), mt(20), radiusA(4), styles.uac])}>
            {/*名片*/}
            <View style={styleAssign([wRatio(100), h(204), bgColor('rgb(211,199,195)'), radiusA(10),
              styles.udr, styles.uje])}>
              <Image style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}
                     src={require('../../assets/ico_business_card_bg.png')}/>
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
                      style={styleAssign([fSize(12), color('#343434')])}>{userInfo.phone}</Text>
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
                    <Image style={styleAssign([w(9), h(11), ml(8), mt(4)])} src={`${cloudBaseUrl}ico_card_location.png`}/>
                  </View>
                </View>
              </View>
            </View>
            {/*简介*/}
            <Text
              style={styleAssign([w(294), mt(23), fSize(14), color('#343434')])}>{`您好，\n 我是${userInfo.company}的 ${userInfo.position}${userInfo.name}
              这是我的名片，请惠存。\n谢谢！`}</Text>
            <View style={styleAssign([mt(20), wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([wRatio(100), styles.uae, styles.udr])}>
              <Image style={styleAssign([w(44), h(44), ml(16), mt(40)])}
                     src={userInfo.wxacode}/>
              <Text style={styleAssign([fSize(12), color('#E2BB7B'), ml(11)])}>长按识别二维码 收下名片</Text>
            </View>
          </View>
        </View>
        <BottomButon title={'保存名片海报后分享'} onClick={() => {

        }}/>
      </CustomSafeAreaView>);
  }
}

export default MingpianHaibao;
