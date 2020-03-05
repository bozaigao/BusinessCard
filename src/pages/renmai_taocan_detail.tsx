/**
 * @filename tequan.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 特权
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../utils/datatool";
import {
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  iphoneX,
  ml,
  mr,
  mt,
  w,
  wRatio
} from "../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../actions/tequan';
import {Image, ScrollView, Text, View} from "@tarojs/components";
import LinearGradientView from "./sub_pagecomponent/linear-gradient-view/index";
import {NetworkState} from "../api/httpurl";

interface Props {
  //购买套餐
  purchasePackage: any;
}

interface State {
  marginTop: number;
}

@connect(state => state.login, {...actions})
class RenmaiTaoCanDetail extends Component<Props, State> {

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
      marginTop: 0,
    }
  }

  componentWillMount() {
    //这里只要是针对微信小程序设置自定义tabBar后的iphoneX高度适配
    if (iphoneX()) {
      this.setState({marginTop: 43});
    } else {
      this.setState({marginTop: 15});
    }
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/1
   * @function: 购买套餐
   */
  purchasePackage = (packageId) => {
    this.viewRef && this.viewRef.showLoading();
    this.props.purchasePackage({packageId}).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        console.log('购买套餐', res);
        Taro.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success(res) {
            console.log('支付成功', res);
          },
          fail(res) {
            console.log('支付失败', res);
          }
        });
      }
      console.log('获取特权套餐', res);
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }

  render() {
    let {marginTop} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>

        <ScrollView
          style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.whiteColor)])}
          scrollY>
          <View style={styleAssign([wRatio(100), h(iphoneX() ? 287 : 247), mt(0)])}>
            <LinearGradientView style={styleAssign([wRatio(100), h(iphoneX() ? 222 : 182)])}/>
            {/*我的*/}
            <View
              style={styleAssign([styles.upa, absT(marginTop), wRatio(100), h(44), styles.ujb, styles.udr, styles.uac])}>
              <Image style={styleAssign([w(22), h(22), ml(20)])} src={require('../../assets/ico_back_white.png')}
                     onClick={() => {
                       Taro.eventCenter.trigger('refreshUserInfo');
                       Taro.navigateBack();
                     }}/>
              <Text style={styleAssign([fSize(19), color(commonStyles.whiteColor)])}>特权开通</Text>
              <View style={styleAssign([w(22), h(22), bgColor(commonStyles.transparent), mr(20)])}/>
            </View>
          </View>

        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default RenmaiTaoCanDetail;
