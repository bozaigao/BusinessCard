/**
 * @filename ming_pian_ma.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/7
 * @Description: 名片码
 */
import {Component, Config} from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
import {styleAssign} from "../../utils/datatool";
import styles, {
  absT,
  bgColor,
  color,
  commonStyles,
  fSize,
  fWeight,
  h,
  mb,
  ml,
  mt,
  pl,
  pr, radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header/index";
import {cloudBaseUrl} from "../../api/httpurl";
import {User} from "../../const/global";

interface Props {
  suggestionAdd: any;
  getAccessToken: any;
  getWXacode: any;
  userInfo: User;
}

interface State {
}

@connect(state => state.login, {...actions})
class MingPianMa extends Component<Props, State> {

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
    this.state = {
      content: ''
    }
  }


  render() {
    let {userInfo} = this.props;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'名片码'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(20)])}>
            <View style={styleAssign([w(335), h(189)])}>
              <Image style={styleAssign([w(335), h(189), styles.upa, absT(0)])}
                     src={require('../../assets/ico_mingpianma_bg.png')}/>
              <View style={styleAssign([wRatio(100), styles.upa, pl(17), pr(17), absT(17)])}>
                <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb])}>
                  <View>
                    <Text
                      style={styleAssign([fSize(18), fWeight('bold'), color(commonStyles.whiteColor)])}>{userInfo.name}</Text>
                    <Text
                      style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>{`${userInfo.company}·${userInfo.position}`}</Text>
                  </View>
                  <Image style={styleAssign([w(50), h(50), radiusA(25)])}
                         src={userInfo.avatar ? userInfo.avatar : `${cloudBaseUrl}ico_default.png`}/>
                </View>
                {/*电话号码*/}
                <View style={styleAssign([styles.uac, styles.udr, mt(28)])}>
                  <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_mobile.png`}/>
                  <Text
                    style={styleAssign([fSize(12), color('#343434'), color(commonStyles.whiteColor), ml(6)])}>{userInfo.phone}</Text>
                </View>
                {/*邮箱*/}
                <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                  <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_email.png`}/>
                  <Text
                    style={styleAssign([fSize(12), color('#343434'), color(commonStyles.whiteColor), ml(6)])}>{userInfo.email ? userInfo.email : '邮箱信息未对外公开'}</Text>
                </View>
                {/*地址*/}
                <View style={styleAssign([styles.udr, mt(8)])}>
                  <Image style={styleAssign([w(9), h(11), ml(8), mt(4)])}
                         src={`${cloudBaseUrl}ico_card_location.png`}/>
                  <Text
                    style={styleAssign([fSize(12), color('#343434'), color(commonStyles.whiteColor), ml(6)])}>{userInfo.detailAddress}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), styles.uac])}>
            <View
              style={styleAssign([w(335), styles.uac, bgColor(commonStyles.whiteColor), {boxShadow: '0px 2px 4px 0px rgba(230,230,230,0.5)'}])}>
              <Text style={styleAssign([fSize(14), color('#29292E'), mt(18)])}>
                请用微信扫码，收下我的名片
              </Text>
              <Image style={styleAssign([w(236), h(236), mb(20)])} src={`${cloudBaseUrl}ico_erweima.png`}/>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(32)])}>
            <Text style={styleAssign([fSize(18), color('#D2D2D2')])}>
              极易推 给你极致服务
            </Text>
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default MingPianMa;
