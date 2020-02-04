/**
 * @filename perform_info.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 我的
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
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
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import {User} from "../../const/global";
import TouchableButton from "../../compoments/touchable-button";
import ListItem from "../../compoments/list-item";


interface Props {
  //获取用户信息
  getUserInfo: any;
  userInfo: User;
}

interface State {
  marginTop: any;
}

@connect(state => state.login, {...actions})
class Mine extends Component<Props, State> {

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
    }
  }

  componentDidMount() {
    //这里只要是针对微信小程序设置自定义tabBar后的iphoneX高度适配
    if (iphoneX()) {
      this.setState({marginTop: 43});
    } else {
      this.setState({marginTop: 15});
    }
    Taro.eventCenter.on('refreshUserInfo', () => {
      console.log('刷新用户信息');
      this.getUserInfo();
    });
    this.getUserInfo();
  }

  componentWillUnmount() {
    Taro.eventCenter.off('refreshUserInfo');
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

    let {marginTop} = this.state;
    let {userInfo} = this.props;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor)])}
                          notNeedBottomPadding={true} notNeedTopPadding={true}>
        <ScrollView
          style={styleAssign([wRatio(100), hRatio(100)])}
          scrollY>
          <View style={styleAssign([wRatio(100)])}>
            <View style={styleAssign([wRatio(100), h(242), bgColor(commonStyles.colorTheme)])}>
              {/*我的*/}
              <View
                style={styleAssign([mt(marginTop), wRatio(100), h(44), styles.ujb, styles.udr, styles.uac])}>
                <View style={styleAssign([w(22), h(14), ml(20)])}/>
                <Text style={styleAssign([fSize(19), color(commonStyles.whiteColor)])}>我的</Text>
                <View style={styleAssign([w(22), h(22), bgColor(commonStyles.transparent), mr(20)])}/>
              </View>
            </View>
            <View style={styleAssign([wRatio(100), h(150), bgColor(commonStyles.whiteColor)])}/>
            {/*用户头像信息*/}
            <View style={styleAssign([styles.upa, absT(100), wRatio(100)])}>
              <View style={styleAssign([styles.udr, wRatio(100), styles.ujb])}>
                <View style={styleAssign([styles.udr, styles.uac])}>
                  <Image style={styleAssign([w(66), h(66), ml(20), radiusA(33)])}
                         src={userInfo.avatar ? userInfo.avatar : require('../../assets/ico_default.png')}/>
                  <View style={styleAssign([ml(14)])}>
                    <Text
                      style={styleAssign([fSize(18), color(commonStyles.whiteColor)])}>{userInfo.name ? userInfo.name : '无名氏'}</Text>
                    <View
                      style={styleAssign([w(140), h(6), radiusA(3), mt(13), styles.udr, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
                      <View style={styleAssign([w(113), h(6), radiusA(3), styles.uac, bgColor('#E2BB7B')])}/>
                    </View>
                    <Text style={styleAssign([fSize(10), color(commonStyles.whiteColor), mt(8)])}>完善度88%</Text>
                  </View>
                </View>
                {/*完善名片*/}
                <View style={styleAssign([mr(20)])}>
                  <View>
                    <TouchableButton customStyle={styleAssign([styles.udr, styles.uac])}
                                     onClick={() => {
                                       Taro.navigateTo({
                                         url: `/pages/mine/perform_info`
                                       });
                                     }}>
                      <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor)])}>完善名片</Text>
                      <Image style={styleAssign([w(7), h(12), ml(8)])}
                             src={require('../../assets/ico_next_white.png')}/>
                    </TouchableButton>
                    <TouchableButton
                      customStyle={styleAssign([mt(25), w(66), h(28), radiusA(4), bgColor('#E2BB7B'), styles.uac, styles.ujc])}>
                      <Text style={styleAssign([fSize(12), color('#825D22')])}>开通特权</Text>
                    </TouchableButton>
                  </View>
                </View>
              </View>
              {/*分销*/}
              <View style={styleAssign([wRatio(100), h(100), styles.uac, mt(24)])}>
                <Image style={styleAssign([w(335), h(100)])} src={require('../../assets/ico_fenxiao.png')}/>
              </View>
              {/*工具模块*/}
              <View style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.uja, mt(27)])}>
                {
                  [{
                    title: '商城',
                    icon: require('../../assets/ico_haibao.png')
                  }, {
                    title: '海报',
                    icon: require('../../assets/ico_haibao.png')
                  }, {
                    title: '工具箱',
                    icon: require('../../assets/ico_toolkit.png')
                  }, {
                    title: '任务中心',
                    icon: require('../../assets/ico_task.png')
                  }].map((value, index) => {
                    return (
                      <TouchableButton customStyle={styleAssign([styles.uac])} key={index}
                                       onClick={() => {
                                         if (value.title === '商城') {
                                           Taro.navigateTo({
                                             url: `/pages/businesscard/goods_manage`
                                           });
                                         } else if (value.title === '海报') {
                                           Taro.navigateTo({
                                             url: `/pages/businesscard/haibao`
                                           });
                                         } else if (value.title === '工具箱') {
                                           Taro.navigateTo({
                                             url: `/pages/businesscard/tool_box`
                                           });
                                         } else if (value.title === '任务中心') {
                                           Taro.navigateTo({
                                             url: `/pages/businesscard/task_center`
                                           });
                                         } else if (value.title === '名片夹') {
                                           Taro.navigateTo({
                                             url: `/pages/businesscard/mingpianjia`
                                           });
                                         }
                                       }}>
                        <Image style={styleAssign([w(28), h(28)])}
                               src={value.icon}/>
                        <Text style={styleAssign([fSize(10), color('#343434'), mt(7)])}>{value.title}</Text>
                      </TouchableButton>
                    );
                  })
                }
              </View>
            </View>
            <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([wRatio(100)])}>
              {
                [{title: '使用小技巧'},
                  {title: '投诉与建议'},
                  {title: '关于极致名片'}].map((value, index) => {
                  return (<ListItem title={value.title} key={index}
                                    onCLick={(title) => {
                                      if (title === '投诉与建议') {
                                        Taro.navigateTo({
                                          url: `/pages/mine/feedback`
                                        });
                                      } else if (title === '关于极致名片') {
                                      }
                                    }
                                    }/>);
                })
              }
            </View>
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default Mine;
