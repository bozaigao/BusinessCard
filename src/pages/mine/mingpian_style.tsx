/**
 * @filename mingpian_style.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/24
 * @Description: 名片样式
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
import {styleAssign} from "../../utils/datatool";
import {
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  mb,
  ml,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import * as actions from '../../actions/login';
import {connect} from "@tarojs/redux";
import TopHeader from "../../compoments/top-header/index";
import {Image, ScrollView, Swiper, SwiperItem, Text, View} from "@tarojs/components";
import {User} from "../../const/global";
import BottomButon from "../../compoments/bottom-buton/index";
import CardStyle1 from "../../compoments/card-style1/index";
import CardStyle2 from "../../compoments/card-style2/index";
import CardStyle4 from "../../compoments/card-style4/index";
import CardStyle5 from "../../compoments/card-style5/index";
import CardStyle3 from "../../compoments/card-style3/index";

interface Props {
  userInfo: User;
}

interface State {
  publicInfoArr: string[];
  style: number;
  hidePhone: boolean;
  hideWechat: boolean;
  hideEmail: boolean;
  hideAddress: boolean;
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

  }

  constructor(props) {
    super(props);
    console.log('参数', this.$router.params)
    let publicInfoArr: any = [];

    if (this.$router.params.hidePhone === '1') {
      publicInfoArr.push('手机');
    }
    if (this.$router.params.hideWechat === '1') {
      publicInfoArr.push('微信');
    }
    if (this.$router.params.hideEmail === '1') {
      publicInfoArr.push('邮箱');
    }
    if (this.$router.params.hideAddress === '1') {
      publicInfoArr.push('地址');
    }
    this.state = {
      //@ts-ignore
      userInfo: null,
      publicInfoArr,
      style: parseInt(this.$router.params.style, 10),
      hidePhone: this.$router.params.hidePhone === '0',
      hideWechat: this.$router.params.hideWechat === '0',
      hideEmail: this.$router.params.hideEmail === '0',
      hideAddress: this.$router.params.hideAddress === '0',
    }
  }


  render() {
    let {userInfo} = this.props;
    let {publicInfoArr, style, hidePhone, hideWechat, hideEmail, hideAddress} = this.state;

    return (
      <CustomSafeAreaView
        customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
        notNeedBottomPadding={true}>
        <TopHeader title={'名片样式'}/>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor), styles.uac])}>
            <View
              style={styleAssign([wRatio(100), h(346), styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
              <Swiper
                current={style}
                style={styleAssign([wRatio(100), styles.uac, styles.ujc, h(246)])}
                onChange={(e) => {
                  this.setState({style: e.detail.current}, () => {

                  });
                }}>
                <SwiperItem style={styleAssign([wRatio(100), styles.uac, styles.ujc])}>
                  <CardStyle1 hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail}
                              hideAddress={hideAddress}
                              userInfo={userInfo}/>
                </SwiperItem>
                <SwiperItem style={styleAssign([wRatio(100), styles.uac, styles.ujc])}>
                  <CardStyle2 hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail}
                              hideAddress={hideAddress}
                              userInfo={userInfo}/>
                </SwiperItem>
                <SwiperItem style={styleAssign([wRatio(100), styles.uac, styles.ujc])}>
                  <CardStyle3 hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail}
                              hideAddress={hideAddress}
                              userInfo={userInfo}/>
                </SwiperItem>
                <SwiperItem style={styleAssign([wRatio(100), styles.uac, styles.ujc])}>
                  <CardStyle4 hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail}
                              hideAddress={hideAddress}
                              userInfo={userInfo}/>
                </SwiperItem>
                <SwiperItem style={styleAssign([wRatio(100), styles.uac, styles.ujc])}>
                  <CardStyle5 hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail}
                              hideAddress={hideAddress}
                              userInfo={userInfo}/>
                </SwiperItem>
              </Swiper>
            </View>
            <View style={styleAssign([styles.uac, styles.udr, wRatio(100)])}>
              <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(20), mt(15)])}>对外公开信息</Text>
            </View>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(10)])}>
              {
                ['手机', '微信', '邮箱', '地址'].map((value, index) => {
                  return <View
                    onClick={() => {
                      if (this.state.publicInfoArr.includes(value)) {
                        this.state.publicInfoArr.splice(publicInfoArr.indexOf(value), 1);
                        if (value === '手机') {
                          this.setState({hidePhone: true});
                        } else if (value === '微信') {
                          this.setState({hideWechat: true});
                        } else if (value === '邮箱') {
                          this.setState({hideEmail: true});
                        } else if (value === '地址') {
                          this.setState({hideAddress: true});
                        }
                      } else {
                        this.state.publicInfoArr.push(value);
                        if (value === '手机') {
                          this.setState({hidePhone: false});
                        } else if (value === '微信') {
                          this.setState({hideWechat: false});
                        } else if (value === '邮箱') {
                          this.setState({hideEmail: false});
                        } else if (value === '地址') {
                          this.setState({hideAddress: false});
                        }
                      }
                      this.setState({publicInfoArr: this.state.publicInfoArr});
                    }}
                    key={index}
                    style={styleAssign([w(58), h(36), radiusA(2), styles.uac, styles.ujc, ml(index === 0 ? 20 : 10)])}>
                    <Image style={styleAssign([wRatio(100), hRatio(100), styles.upa, absT(0)])}
                           src={publicInfoArr.includes(value) ? require('../../assets/ico_setting_choosed.png') : require('../../assets/ico_setting_nochoos.png')}/>
                    <Text
                      style={styleAssign([fSize(14), color(publicInfoArr.includes(value) ? '#835E1B' : commonStyles.colorTheme)])}>{value}</Text>
                  </View>;
                })
              }
            </View>
            <
              View
              style={styleAssign([styles.uac, styles.udr, wRatio(100)])}>
              < Text
                style={styleAssign([fSize(14), color('#0C0C0C'), ml(20), mt(15)])}>选择版式</Text>
            </View>
            <View
              style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(15), mb(20), pl(20), pr(20)])}>
              {
                [{icon: require('../../assets/ico_mingpian_style_1.png'), title: '商务版'},
                  {icon: require('../../assets/ico_mingpian_style_2.png'), title: '黑金版'},
                  {icon: require('../../assets/ico_mingpian_style_3.png'), title: '简约版'},
                  {icon: require('../../assets/ico_mingpian_style_4.png'), title: '极简版'},
                  {icon: require('../../assets/ico_mingpian_style_5.png'), title: '实景版'}].map((value, index) => {
                  return <View style={styleAssign([styles.uac])}
                               key={index}
                               onClick={() => {
                                 this.setState({style: index});
                               }}>
                    <View
                      style={styleAssign([w(69), h(42), styles.uac, styles.ujc, bo(1), bdColor(style === index ? 'rgb(116,87,42)' : 'rgb(229,229,229)'), {borderStyle: style === index ? 'solid' : 'dashed'}])}>
                      <Image style={styleAssign([w(67), h(41)])} src={value.icon}/>
                    </View>
                    <Text style={styleAssign([fSize(12), color('#ACACAC')])}>{value.title}</Text>
                  </View>;
                })
              }
            </View>
          </View>
        </ScrollView>
        <BottomButon title={'完成'} onClick={() => {
          Taro.eventCenter.trigger('updateCardStyle', {
            cardStyle: `${style}`,
            hidePhone: hidePhone ? 0 : 1,
            hideWechat: hideWechat ? 0 : 1,
            hideEmail: hideEmail ? 0 : 1,
            hideAddress: hideAddress ? 0 : 1,
          });
          Taro.navigateBack();
        }}/>
      </CustomSafeAreaView>
    )
  }
}

export default MingpianStyle;
