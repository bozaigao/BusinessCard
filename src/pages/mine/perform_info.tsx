/**
 * @filename perform_info.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 完善名片
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Image, ScrollView, Text, Video, View} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  absB,
  absR,
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
import {parseData, styleAssign, wrapSafe} from "../../utils/datatool";
import TouchableButton from "../../compoments/touchable-button";
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import {User} from "../../const/global";
import {cloudBaseUrl} from "../../api/httpurl";
import LinearGradientView from "../sub_pagecomponent/linear-gradient-view";


interface Props {
  //获取用户信息
  getUserInfo: any;
  userInfo: User;
}

interface State {
  marginTop: number;
  showPersonalInfo: boolean;
  photoUrl: string[];
  videoUrl: string;
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
      photoUrl: [],
      videoUrl: '',
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
    console.log('用户信息', this.props.userInfo);
    Taro.eventCenter.on('refreshUserInfo', () => {
      console.log('刷新用户信息');
      this.getUserInfo();
    });
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
      if (res) {
        this.setState({photoUrl: parseData(res.photoUrl), videoUrl: res.videoUrl});
      }
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  render() {

    let {marginTop, showPersonalInfo, photoUrl, videoUrl} = this.state;
    let {userInfo} = this.props;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          notNeedBottomPadding={true}>
        <ScrollView
          style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.whiteColor)])}
          scrollY>
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([wRatio(100)])}>
              <LinearGradientView style={styleAssign([wRatio(100), h(182)])}/>
              {/*我的*/}
              <View
                style={styleAssign([styles.upa, absT(marginTop), wRatio(100), h(44), styles.ujb, styles.udr, styles.uac])}>
                <Image style={styleAssign([w(22), h(22), ml(20)])} src={require('../../assets/ico_back_white.png')}
                       onClick={() => {
                         Taro.eventCenter.trigger('refreshUserInfo');
                         Taro.navigateBack();
                       }}/>
                <Text style={styleAssign([fSize(19), color(commonStyles.whiteColor)])}>完善名片</Text>
                <View style={styleAssign([w(22), h(22), bgColor(commonStyles.transparent), mr(20)])}/>
              </View>
            </View>
            <View style={styleAssign([wRatio(100), h(190), bgColor(commonStyles.whiteColor)])}/>
            {/*个人信息展示*/}
            <View style={styleAssign([wRatio(100), styles.uac, styles.upa, absT(125)])}>
              <View style={styleAssign([w(120), h(120)])}>
                <Image
                  style={styleAssign([w(120), h(120), radiusA(60)])}
                  src={userInfo.avatar ? userInfo.avatar : `${cloudBaseUrl}ico_default.png`}/>
                <Image
                  style={styleAssign([w(23), h(23), radiusA(11.5), styles.upa, absB(2), absR(2)])}
                  src={userInfo.sex === 1 ? `${cloudBaseUrl}ico_nan.png` : `${cloudBaseUrl}ico_nv.png`}/>
              </View>
              <Text
                style={styleAssign([fSize(20), color('#343434'), mt(15)])}>{userInfo.name ? userInfo.name : '无名氏'}</Text>
              <Text
                style={styleAssign([fSize(16), color('#727272'), mt(4)])}>{userInfo.company ? userInfo.company : ''}</Text>
              <Text
                style={styleAssign([fSize(14), color('#727272'), mt(4)])}>{wrapSafe(userInfo.educationBackground)}</Text>
              <Text
                style={styleAssign([fSize(14), color('#727272'), mt(4)])}>{userInfo.province ? userInfo.province + userInfo.city : ''}</Text>
              <Text
                style={styleAssign([fSize(14), color('#727272'), mt(4)])}>{wrapSafe(userInfo.selfDescription)}</Text>
            </View>
            {/*编辑*/}
            <View style={styleAssign([styles.uac, styles.upa, absR(10), absB(150)])}>
              <Image style={styleAssign([w(21), h(19), mt(70)])} src={`${cloudBaseUrl}ico_edit.png`}
                     onClick={() => {
                       Taro.navigateTo({
                         url: `/pages/mine/personal_info`
                       });
                     }}/>
            </View>
          </View>
          {/*名片竞争力*/}
          <View style={styleAssign([wRatio(100), h(101), bgColor(commonStyles.whiteColor), mt(10),])}>
            <View
              style={styleAssign([wRatio(100), styles.ujb, styles.udr, bgColor(commonStyles.whiteColor)])}>
              <View style={styleAssign([styles.uac, styles.udr, h(20), ml(20), mt(17)])}>
                <Text style={styleAssign([fSize(16), color('#343434')])}>名片竞争力：</Text>
                <Text style={styleAssign([fSize(16), color('#343434')])}>中级</Text>
              </View>
              <Image style={styleAssign([w(12), h(5), mr(20), mt(20)])} src={`${cloudBaseUrl}ico_down2.png`}/>
            </View>
            <View style={styleAssign([wRatio(100), h(50), styles.ujc])}>
              <LinearGradientView style={styleAssign([wRatio(90), h(20), {marginLeft: '5%'}])}/>
              <View style={styleAssign([styles.upa, wRatio(94), h(50), absT(0), {left: '3%'},
                styles.udr, styles.uac, styles.ujb])}>
                <Image style={styleAssign([w(40), h(40)])} src={`${cloudBaseUrl}progress_1.png`}/>
                {
                  [1, 2, 3].map((value, index) => {
                    console.log(value);
                    return <View key={index} style={styleAssign([w(2), h(10), bgColor(commonStyles.whiteColor)])}/>;
                  })
                }
                <Image style={styleAssign([w(40), h(40)])} src={`${cloudBaseUrl}progress_2.png`}/>
                <View style={styleAssign([w(2), h(10), bgColor(commonStyles.whiteColor)])}/>
                <Image style={styleAssign([w(40), h(40)])} src={`${cloudBaseUrl}progress_3.png`}/>
              </View>
            </View>
          </View>
          {/*个人简介*/}
          <View style={styleAssign([wRatio(100)])}>
            <TouchableButton
              customStyle={styleAssign([wRatio(100), h(40), mt(10), styles.ujb, styles.uac, styles.udr, bgColor(commonStyles.whiteColor)])}
              onClick={() => {
                this.setState({showPersonalInfo: !this.state.showPersonalInfo});
              }}>
              <Text style={styleAssign([fSize(16), color('#343434'), ml(20)])}>个人简介</Text>
              <Image style={styleAssign([w(12), h(5), mr(20)])}
                     src={showPersonalInfo ? `${cloudBaseUrl}ico_down2.png` : require('../../assets/ico_up2.png')}/>
            </TouchableButton>
            {
              showPersonalInfo &&
              <View style={styleAssign([wRatio(100)])}>
                {/*我的语音*/}
                <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), styles.uac])}
                      onClick={() => {
                        Taro.navigateTo({
                          url: `/pages/mine/audio_recorder`
                        });
                      }}>
                  <View style={styleAssign([wRatio(100), h(38), styles.udr, styles.uac, styles.ujb])}>
                    <Text style={styleAssign([fSize(14), color('#343434'), ml(20)])}>我的语音</Text>
                    <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, mr(20)])}>
                      <Text style={styleAssign([fSize(12), color('#A9A9A9')])}>编辑</Text>
                      <Image style={styleAssign([w(7), h(12), ml(6)])} src={`${cloudBaseUrl}ico_next.png`}/>
                    </TouchableButton>
                  </View>
                  <View style={styleAssign([styles.uac, styles.udr, wRatio(100), mb(10)])}>
                    <Image style={styleAssign([w(40), h(40), ml(19)])} src={`${cloudBaseUrl}ico_default.png`}/>
                    <Image style={styleAssign([w(186), h(41), ml(10)])} src={require('../../assets/ico_voice_bg.png')}/>
                  </View>
                  <View style={styleAssign([w(335), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                </View>
                {/*自我描述*/}
                <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), styles.uac])}
                      onClick={() => {
                        Taro.navigateTo({
                          url: `/pages/mine/self_intro`
                        });
                      }}>
                  <View style={styleAssign([wRatio(100), h(38), styles.udr, styles.uac, styles.ujb])}>
                    <Text style={styleAssign([fSize(14), color('#343434'), ml(20)])}>自我描述</Text>
                    <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, mr(20)])}>
                      <Text style={styleAssign([fSize(12), color('#A9A9A9')])}>编辑</Text>
                      <Image style={styleAssign([w(7), h(12), ml(6)])} src={`${cloudBaseUrl}ico_next.png`}/>
                    </TouchableButton>
                  </View>
                  <View style={styleAssign([wRatio(100), mb(10)])}>
                    <Text
                      style={styleAssign([fSize(12), color('#0C0C0C'), ml(20), mr(20)])}>Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！</Text>
                  </View>
                  <View style={styleAssign([w(335), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                </View>
                {/*我的家乡*/}
                <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), styles.uac])}
                      onClick={() => {
                        Taro.navigateTo({
                          url: `/pages/mine/self_intro`
                        });
                      }}>
                  <View style={styleAssign([wRatio(100), h(38), styles.udr, styles.uac, styles.ujb])}>
                    <Text style={styleAssign([fSize(14), color('#343434'), ml(20)])}>我的家乡</Text>
                    <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, mr(20)])}>
                      <Text style={styleAssign([fSize(12), color('#A9A9A9')])}>编辑</Text>
                      <Image style={styleAssign([w(7), h(12), ml(6)])} src={`${cloudBaseUrl}ico_next.png`}/>
                    </TouchableButton>
                  </View>
                  <View style={styleAssign([wRatio(100), mb(10)])}>
                    <Text
                      style={styleAssign([fSize(12), color('#0C0C0C'), ml(20), mr(20)])}>四川省 成都市</Text>
                  </View>
                  <View style={styleAssign([w(335), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                </View>
                {/*教育经历*/}
                <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), styles.uac])}
                      onClick={() => {
                        Taro.navigateTo({
                          url: `/pages/mine/my_edu`
                        });
                      }}>
                  <View style={styleAssign([wRatio(100), h(38), styles.udr, styles.uac, styles.ujb])}>
                    <Text style={styleAssign([fSize(14), color('#343434'), ml(20)])}>教育经历</Text>
                    <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, mr(20)])}>
                      <Text style={styleAssign([fSize(12), color('#A9A9A9')])}>编辑</Text>
                      <Image style={styleAssign([w(7), h(12), ml(6)])} src={`${cloudBaseUrl}ico_next.png`}/>
                    </TouchableButton>
                  </View>
                  <View style={styleAssign([wRatio(100), mb(10)])}>
                    <Text
                      style={styleAssign([fSize(12), color('#0C0C0C'), ml(20), mr(20)])}>四川美术学院</Text>
                    <Text
                      style={styleAssign([fSize(12), color('#979797'), ml(20), mr(20)])}>产品设计 2015-2019 本科</Text>
                  </View>
                  <View style={styleAssign([w(335), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                </View>
              </View>
            }
          </View>

          {/*我的照片和视频*/}
          <TouchableButton
            customStyle={styleAssign([wRatio(100), mt(10), styles.uac, bgColor(commonStyles.whiteColor)])}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/mine/my_photo?myPhotoUrl=${JSON.stringify(photoUrl)}`
              });
            }}>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Text style={styleAssign([fSize(16), color('#0C0C0C'), ml(20)])}>我的照片</Text>
              {
                photoUrl.length !== 0 ?
                  <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, mr(20)])}>
                    <Text style={styleAssign([fSize(12), color('#A9A9A9')])}>编辑</Text>
                    <Image style={styleAssign([w(7), h(12), ml(6)])}
                           src={`${cloudBaseUrl}ico_next.png`}/>
                  </TouchableButton> :
                  <View/>
              }
            </View>
            <View style={styleAssign([w(335), h(1), mt(12), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            {
              photoUrl.length !== 0 ?
                <View style={styleAssign([wRatio(100), styles.udr, styles.uWrap])}>
                  {
                    photoUrl.map((value, index) => {
                      return <Image key={index} style={styleAssign([w(105), h(105), radiusA(2), ml(15), mb(10)])}
                                    src={value}/>;
                    })
                  }
                </View> :
                <View
                  style={styleAssign([w(335), h(176), mt(16), mb(10), radiusA(4), styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
                  <View
                    style={styleAssign([w(40), h(40), radiusA(20), bgColor(commonStyles.whiteColor),
                      styles.uac, styles.ujc])}>
                    <Image style={styleAssign([w(21), h(19)])} src={`${cloudBaseUrl}ico_camera.png`}/>
                  </View>
                  <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>添加照片</Text>
                  <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(4)])}>让客户更全面了解你</Text>
                </View>
            }
          </TouchableButton>
          {/*我的视频*/}
          <TouchableButton
            customStyle={styleAssign([wRatio(100), h(264), mt(10), styles.uac, bgColor(commonStyles.whiteColor)])}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/mine/my_video?videoUrl=${videoUrl}`
              });
            }}>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Text style={styleAssign([fSize(16), color('#0C0C0C'), ml(20)])}>我的视频</Text>
              {
                videoUrl.length !== 0 ?
                  <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, mr(20)])}>
                    <Text style={styleAssign([fSize(12), color('#A9A9A9')])}>编辑</Text>
                    <Image style={styleAssign([w(7), h(12), ml(6)])}
                           src={`${cloudBaseUrl}ico_next.png`}/>
                  </TouchableButton> :
                  <View/>
              }
            </View>
            <View style={styleAssign([w(335), h(1), mt(12), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            {
              videoUrl.length !== 0 ?
                <Video
                  style={styleAssign([w(335), h(203), bgColor(commonStyles.whiteColor)])}
                  src={videoUrl}
                  controls={true}
                  autoplay={false}
                  objectFit={'fill'}
                  initialTime={1}
                  id='video'
                  loop={false}
                  muted={false}
                  onClick={(e) => {
                    e.stopPropagation();
                  }
                  }/> :
                <View
                  style={styleAssign([w(335), h(176), mt(16), radiusA(4), styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
                  <View
                    style={styleAssign([w(40), h(40), radiusA(20), bgColor(commonStyles.whiteColor),
                      styles.uac, styles.ujc])}>
                    <Image style={styleAssign([w(16), h(18)])} src={`${cloudBaseUrl}ico_play.png`}/>
                  </View>
                  <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>添加视频</Text>
                  <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(4)])}>让客户更全面了解你</Text>
                </View>
            }
          </TouchableButton>
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
                <Image style={styleAssign([w(7), h(12), ml(6)])} src={`${cloudBaseUrl}ico_next.png`}/>
              </TouchableButton>
            </View>
          </TouchableButton>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default PerformInfo;
