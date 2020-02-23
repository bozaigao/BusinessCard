/**
 * @filename tequan.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 特权
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {
  absB,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  iphoneX,
  mb,
  ml,
  mr,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import {Image, ScrollView, Text, View} from "@tarojs/components";
import LinearGradientView from "../sub_pagecomponent/linear-gradient-view/index";
import LevelItem from "../sub_pagecomponent/level-item/index";
import TaoCanItem from "../sub_pagecomponent/taocan-item/index";

interface Props {
}

interface State {
  marginTop: number;
  taoCanIndex: number;
}

@connect(state => state.login, {...actions})
class TeQuan extends Component<Props, State> {

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
      taoCanIndex: 0,
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


  render() {
    let {marginTop, taoCanIndex} = this.state;

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
            <ScrollView
              style={styleAssign([wRatio(100), h(182), styles.uac, styles.upa, absB(0), {whiteSpace: 'nowrap'}])}
              scrollX>
              {
                [{
                  title: '查看全部访客',
                  subTitle: '随时了解谁对你感兴趣',
                  bg: 'ico_tequan1.png',
                  logo: 'ico_tequan1_logo.png',
                  buttonTitle: '新用户1元试用',
                  right: '最低￥198起'
                }, {
                  title: '开通商铺',
                  subTitle: '提升你的产品线上推广效果',
                  bg: 'ico_tequan2.png',
                  logo: 'ico_tequan2_logo.png',
                  buttonTitle: '联系客服',
                  right: '最低￥198起'
                },
                  {
                    title: '结识更多人脉',
                    subTitle: '会员每月增30个精准人脉推荐',
                    bg: 'ico_tequan3.png',
                    logo: 'ico_tequan3_logo.png',
                    buttonTitle: '新用户1元试用',
                    right: '最低￥198起'
                  }].map((value, index) => {
                  return <LevelItem key={index} item={value}/>
                })
              }
            </ScrollView>
          </View>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(16), styles.udr])}>
            <View style={styleAssign([w(39), h(1), bgColor('#E4C28C')])}/>
            <Text style={styleAssign([ml(8), mr(8), color('#483311'), fSize(14)])}>功能详情</Text>
            <View style={styleAssign([w(39), h(1), bgColor('#E4C28C')])}/>
          </View>
          <View style={styleAssign([wRatio(100), pl(20), pr(20), mt(14)])}>
            <Text style={styleAssign([color('#343434'), fSize(14)])}>查看访客无限制</Text>
            <Text
              style={styleAssign([color('#979797'), fSize(14), mt(6)])}>查看来访人员不再限制在7天内，开通此特权之后可查看所有访客信息，并获取专属个人访客分析</Text>
          </View>
          <View style={styleAssign([wRatio(100)])}>
            <View style={styleAssign([wRatio(100), pl(20), pr(20), mt(30),
              styles.udr, styles.ujb, styles.uac])}>
              <Text style={styleAssign([color('#343434'), fSize(14)])}>特权介绍</Text>
              <View style={styleAssign([styles.udr, styles.uac])}>
                <Text style={styleAssign([color('#E2BB7B'), fSize(14)])}>详情</Text>
                <Image style={styleAssign([w(7), h(12), ml(8)])} src={require('../../assets/ico_next_orange.png')}/>
              </View>
            </View>
            <View style={styleAssign([styles.uac, styles.udr, mt(6), ml(20)])}>
              <View style={styleAssign([w(4), h(4), radiusA(2), bgColor('#979797')])}/>
              <Text style={styleAssign([color('#979797'), fSize(14), ml(8)])}>可查看全部访客的信息</Text>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(18), styles.udr])}>
            <View style={styleAssign([w(39), h(1), bgColor('#E4C28C')])}/>
            <Text style={styleAssign([ml(8), mr(8), color('#483311'), fSize(14)])}>开通套餐推荐</Text>
            <View style={styleAssign([w(39), h(1), bgColor('#E4C28C')])}/>
          </View>
          {
            [{title: '7天试用', subTitle: '', left: '到期￥198/季度续费，可取消', price: '1', timeLimit: true},
              {title: '1季度', subTitle: '（3个月）', left: '￥66/月', price: '198', timeLimit: false},
              {title: '半年', subTitle: '（6个月）', left: '￥61/月', price: '368', timeLimit: false},
              {title: '1年', subTitle: '（12个月）', left: '￥57/月', price: '688', timeLimit: false}].map((value, index) => {
              return <TaoCanItem key={index} item={value}
                                 onClick={() => {
                                   this.setState({taoCanIndex: index});
                                 }
                                 }
                                 checked={index === taoCanIndex}/>;
            })
          }
          {/*开通*/}
          <View style={styleAssign([wRatio(100), h(44), styles.uac, styles.ujc, mt(20)])}>
            <View style={styleAssign([w(335), h(44), radiusA(2), styles.uac, styles.ujc, bgColor('#E2BB7B')])}
                  onClick={() => {
                    Taro.requestPayment({
                      timeStamp: '',
                      nonceStr: '',
                      package: '',
                      signType: 'MD5',
                      paySign: '',
                      success(res) {
                      },
                      fail(res) {
                      }
                    })
                  }}>
              <Text style={styleAssign([color(commonStyles.whiteColor), fSize(16)])}>立即开通</Text>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), pl(20), pr(20), mt(17)])}>
            <Text style={styleAssign([color('#979797'), fSize(13)])}>购买须知</Text>
            <Text style={styleAssign([color('#979797'), fSize(13)])}>1.付款时向您的Apple ID账户收取费用
              \n2.订阅到期或免费试用结束前24小时内，将按页面价格自动续订所选套餐时长；同一Apple ID仅能享有一次免费试用资格 \n3.如需取消自动续订在当前订阅周期结束至少24小时之前在iTunes
              Store设置中关闭自动续订服务</Text>
            <View style={styleAssign([styles.udr, styles.uac, mb(46)])}>
              <Text style={styleAssign([color('#979797'), fSize(13)])}>4.成为会员即表示同意</Text>
              <Text style={styleAssign([color('#3476E0'), fSize(13)])}>《极致名片隐私政策》</Text>
            </View>
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default TeQuan;
