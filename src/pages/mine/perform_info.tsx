/**
 * @filename perform_info.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 完善名片
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  absB,
  absR,
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
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
import TouchableButton from "../../compoments/touchable-button";
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import {User} from "../../const/global";


interface Props {
  //获取用户信息
  getUserInfo: any;
  userInfo: User;
}

interface State {
  marginTop: any;
  showPersonalInfo: boolean;
}

@connect(state => state.login, {...actions})
class PerformInfo extends Component<Props, State> {

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
      marginTop: 0,
      showPersonalInfo: true
    }
  }

  componentWillMount() {
    //这里只要是针对微信小程序设置自定义tabBar后的iphoneX高度适配
    if (iphoneX()) {
      this.setState({marginTop: 43});
    } else {
      this.setState({marginTop: 15});
    }
    this.getUserInfo();
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/29
   * @function: 获取用户信息
   */
  getUserInfo = () => {
    this.props.getUserInfo().then((res) => {
      console.log('获取用户信息', res);
      console.log('属性', this.props.userInfo);
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  render() {

    let {marginTop, showPersonalInfo} = this.state;
    let {userInfo} = this.props;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor)])}
                          notNeedBottomPadding={true} notNeedTopPadding={true}>
        <ScrollView
          style={styleAssign([wRatio(100), hRatio(100)])}
          scrollY>
          <View style={styleAssign([wRatio(100)])}>
            <View style={styleAssign([wRatio(100), h(182), bgColor(commonStyles.colorTheme)])}>
              {/*我的*/}
              <View
                style={styleAssign([mt(marginTop), wRatio(100), h(44), styles.ujb, styles.udr, styles.uac])}>
                <Image style={styleAssign([w(22), h(22), ml(20)])} src={require('../../assets/ico_back_white.png')}
                       onClick={() => {
                         Taro.navigateBack();
                       }}/>
                <Text style={styleAssign([fSize(19), color(commonStyles.whiteColor)])}>完善名片</Text>
                <View style={styleAssign([w(22), h(22), bgColor(commonStyles.transparent), mr(20)])}/>
              </View>
            </View>
            <View style={styleAssign([wRatio(100), h(190), bgColor(commonStyles.whiteColor)])}/>
            {/*个人信息展示*/}
            <View style={styleAssign([wRatio(100), styles.uac, styles.upa, absB(15)])}>
              <View style={styleAssign([w(120), h(120)])}>
                <Image
                  style={styleAssign([w(120), h(120), radiusA(60)])}
                  src={userInfo.avatar}/>
                <Image
                  style={styleAssign([w(23), h(23), radiusA(11.5), styles.upa, absB(2), absR(2)])}
                  src={userInfo.sex === 1 ? require('../../assets/ico_nan.png') : require('../../assets/ico_nv.png')}/>
              </View>
              <Text style={styleAssign([fSize(20), color('#343434'), mt(15)])}>{userInfo.name}</Text>
              <Text
                style={styleAssign([fSize(16), color('#727272'), mt(4)])}>{userInfo.company ? userInfo.company : ''}</Text>
              <Text style={styleAssign([fSize(14), color('#727272'), mt(4)])}>四川美术学院</Text>
              <Text style={styleAssign([fSize(14), color('#727272'), mt(4)])}>四川 成都</Text>
              <Text style={styleAssign([fSize(14), color('#727272'), mt(4)])}>耐用消耗品</Text>
            </View>
            {/*编辑*/}
            <View style={styleAssign([styles.uac, styles.upa, absR(10), absB(150)])}>
              <Image style={styleAssign([w(21), h(19), mt(70)])} src={require('../../assets/ico_edit.png')}
                     onClick={() => {
                       Taro.navigateTo({
                         url: `/pages/mine/personal_info`
                       });
                     }}/>
            </View>
          </View>
          {/*名片竞争力*/}
          <View
            style={styleAssign([wRatio(100), h(101), mt(10), styles.ujb, styles.udr, bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([styles.uac, styles.udr, h(20), ml(20), mt(17)])}>
              <Text style={styleAssign([fSize(16), color('#343434')])}>名片竞争力：</Text>
              <Text style={styleAssign([fSize(16), color('#343434')])}>中级</Text>
            </View>
            <Image style={styleAssign([w(12), h(5), mr(20), mt(20)])} src={require('../../assets/ico_down2.png')}/>
          </View>
          {/*个人简介*/}
          <View style={styleAssign([wRatio(100)])}>
            <TouchableButton
              customStyle={styleAssign([wRatio(100), h(80), mt(10), styles.ujb, styles.udr, bgColor(commonStyles.whiteColor)])}
              onClick={() => {
                this.setState({showPersonalInfo: !this.state.showPersonalInfo});
              }}>
              <View style={styleAssign([ml(20), mt(17)])}>
                <Text style={styleAssign([fSize(16), color('#343434')])}>个人简介</Text>
                <Text style={styleAssign([fSize(14), color('#979797')])}>完善个人简介，拥有精美名片</Text>
              </View>
              <Image style={styleAssign([w(12), h(5), mr(20), mt(40)])} src={require('../../assets/ico_down2.png')}/>
            </TouchableButton>
            {
              showPersonalInfo && [{
                title: '我的家乡',
                subTitle: '完善家乡信息，增加更多人脉',
                chooseTitle: '选择'
              },
                {
                  title: '教育经历',
                  subTitle: '完善教育经历，寻找校友',
                  chooseTitle: '添加'
                },
                {
                  title: '我的语音',
                  subTitle: '留下语音介绍，让客户更快认识你',
                  chooseTitle: '添加'
                },
                {
                  title: '自我描述',
                  subTitle: '让客户进一步深入了解你',
                  chooseTitle: '添加'
                }].map((value, index) => {
                return (
                  <TouchableButton key={index}
                                   customStyle={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), styles.uac])}
                                   onClick={() => {
                                     if (value.title === '教育经历') {
                                       Taro.navigateTo({
                                         url: `/pages/mine/my_edu`
                                       });
                                     } else if (value.title === '自我描述') {
                                       Taro.navigateTo({
                                         url: `/pages/mine/self_intro`
                                       });
                                     } else if (value.title === '我的语音') {
                                       Taro.navigateTo({
                                         url: `/pages/mine/audio_recorder`
                                       });
                                     }
                                   }}>
                    <View style={styleAssign([wRatio(100), h(68), styles.udr, styles.uac, styles.ujb])}>
                      <View style={styleAssign([ml(20)])}>
                        <Text style={styleAssign([fSize(16), color('#343434')])}>{value.title}</Text>
                        <Text style={styleAssign([fSize(14), color('#979797')])}>{value.subTitle}</Text>
                      </View>
                      <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, mr(20)])}>
                        <Text style={styleAssign([fSize(12), color('#A9A9A9')])}>{value.chooseTitle}</Text>
                        <Image style={styleAssign([w(7), h(12), ml(6)])} src={require('../../assets/ico_next.png')}/>
                      </TouchableButton>
                    </View>
                    <View style={styleAssign([w(335), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                  </TouchableButton>);
              })
            }
          </View>
          {/*我的照片和视频*/}
          {
            [{
              title: '我的照片',
              subtitle1: '添加照片',
              subtitle2: '让客户更全面了解你',
              ico: require('../../assets/ico_camera.png')
            },
              {
                title: '我的视频',
                subtitle1: '添加视频',
                subtitle2: '让客户更全面了解你',
                ico: require('../../assets/ico_play.png')
              }].map((value, index) => {
              return (<TouchableButton key={index}
                                       customStyle={styleAssign([wRatio(100), h(264), mt(10), styles.uac, bgColor(commonStyles.whiteColor)])}
                                       onClick={() => {
                                         if (index === 0) {
                                           Taro.chooseImage({count: 9}).then(() => {

                                           });
                                         } else {
                                           Taro.chooseVideo({compressed: true}).then(() => {

                                           });
                                         }
                                       }}>
                <View style={styleAssign([wRatio(100)])}>
                  <Text style={styleAssign([fSize(16), color('#0C0C0C'), ml(20), mt(17)])}>{value.title}</Text>
                </View>
                <View style={styleAssign([w(335), h(1), mt(12), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                <View
                  style={styleAssign([w(335), h(176), mt(16), radiusA(4), styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
                  <View
                    style={styleAssign([w(40), h(40), radiusA(20), bgColor(commonStyles.whiteColor),
                      styles.uac, styles.ujc])}>
                    <Image style={styleAssign([w(21), h(19)])} src={require('../../assets/ico_camera.png')}/>
                  </View>
                  <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>{value.subtitle1}</Text>
                  <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(4)])}>{value.subtitle2}</Text>
                </View>
              </TouchableButton>);
            })
          }
          {/*企业信息*/}
          <TouchableButton
            customStyle={styleAssign([wRatio(100), h(80), mt(10), bgColor(commonStyles.whiteColor), styles.uac, styles.ujc,
              pl(20), pr(20)])} onClick={() => {
            Taro.navigateTo({
              url: `/pages/mine/company_info`
            });
          }}>
            <View style={styleAssign([wRatio(100), styles.uac, styles.ujb, styles.udr])}>
              <View>
                <Text style={styleAssign([fSize(16), color('#0C0C0C'), mt(4)])}>企业信息</Text>
                <Text style={styleAssign([fSize(14), color('#979797'), mt(4)])}>完善企业信息，提升你的信赖度</Text>
              </View>
              <TouchableButton customStyle={styleAssign([styles.uac, styles.udr])}>
                <Text style={styleAssign([fSize(12), color('#A9A9A9')])}>编辑</Text>
                <Image style={styleAssign([w(7), h(12), ml(6)])} src={require('../../assets/ico_next.png')}/>
              </TouchableButton>
            </View>
          </TouchableButton>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default PerformInfo;
