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
import {Image, ScrollView, Text, View} from "@tarojs/components";
import {User} from "../../const/global";
import BottomButon from "../../compoments/bottom-buton/index";
import CardStyle1 from "./page-component/card-style1/index";
import CardStyle2 from "./page-component/card-style2/index";
import CardStyle4 from "./page-component/card-style4/index";
import CardStyle5 from "./page-component/card-style5/index";
import CardStyle3 from "./page-component/card-style3/index";

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
    disableScroll: true
  }

  constructor(props) {
    super(props);
    this.state = {
      //@ts-ignore
      userInfo: null,
      publicInfoArr: ['手机', '微信', '邮箱', '地址'],
      style: 0,
      hidePhone: false,
      hideWechat: false,
      hideEmail: false,
      hideAddress: false,
    }
  }


  render() {
    let {userInfo} = this.props;
    let {publicInfoArr, style, hidePhone, hideWechat, hideEmail, hideAddress} = this.state;
    let cardChild = null;

    if (style === 0) {
      //@ts-ignore
      cardChild =
        <CardStyle1 hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail} hideAddress={hideAddress}/>;
    } else if (style === 1) {
      //@ts-ignore
      cardChild = <CardStyle2 hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail} hideAddress={hideAddress}/>;
    }
    else if (style === 2) {
      //@ts-ignore
      cardChild = <CardStyle3 hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail} hideAddress={hideAddress}/>;
    }
    else if (style === 3) {
      //@ts-ignore
      cardChild = <CardStyle4 hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail} hideAddress={hideAddress}/>;
    }
    else if (style === 4) {
      //@ts-ignore
      cardChild = <CardStyle5 hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail} hideAddress={hideAddress}/>;
    }

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
              style={styleAssign([wRatio(100), styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
              {cardChild}
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
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(15), pl(20), pr(20)])}>
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
            <View style={styleAssign([styles.uac, styles.udr, wRatio(100)])}>
              <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(20), mt(15)])}>名片图</Text>
            </View>
            <View style={styleAssign([wRatio(100), styles.uac, styles.udr, mb(20)])}>
              <View
                style={styleAssign([w(65), h(65), bgColor(commonStyles.pageDefaultBackgroundColor), styles.uac, styles.ujc, mt(15), ml(20)])}>
                <Image style={styleAssign([w(40), h(40)])}
                       src={require('../../assets/ico_mingpian_style_add.png')}/>
              </View>
            </View>
          </View>
        </ScrollView>
        <BottomButon title={'完成'} onClick={() => {

        }}/>
      </CustomSafeAreaView>
    )
  }
}

export default MingpianStyle;
