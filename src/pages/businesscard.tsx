/**
 * @filename businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 名片首页
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Button, ScrollView, Text, View} from "@tarojs/components";
//@ts-ignore
import CustomSafeAreaView from "../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, radiusA, w, wRatio} from "../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../actions/task_center';
import * as loginActions from '../actions/login';
import Card from "./pagecomponent/business-card/index";
import MyPerson from "./pagecomponent/my-person/index";
import ShareModal from "./pagecomponent/share-modal/index";
import {User} from "../const/global";
import NavigationBar from "../compoments/navigation_bar/index";
import {NetworkState} from "../api/httpurl";
import {recommendSetting} from "../actions/login";

interface Props {
  //获取用户信息
  getUserInfo: any;
  updateUserInfo: any;
  getRecommendSetting: any;
  recommendSettingStatus: any;
  userInfo: User;
}

interface State {
  showShare: boolean;
  recommendIsSet: boolean;
}

@connect(state => Object.assign(state.taskCenter, state.login), Object.assign(actions, loginActions))
class Businesscard extends Component<Props, State> {

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
    this.state = {
      showShare: false,
      recommendIsSet: false,
    }
  }

  componentDidShow() {
    this.getUserInfo();
    this.getRecommendSetting();
    this.recommendSettingStatus();
  }

  componentWillUnmount() {
    Taro.eventCenter.off('showJiFenModal');
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/14
   * @function: 人脉推荐是否设置
   */
  recommendSettingStatus = () => {
    this.props.recommendSettingStatus().then((res) => {
      if (res !== NetworkState.FAIL) {
        this.setState({recommendIsSet: res === 1});
      }
      console.log('人脉推荐是否设置', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/14
   * @function: 人脉推荐行业和兴趣设置查询
   */
  getRecommendSetting = () => {
    this.props.getRecommendSetting().then((res) => {
      console.log('人脉推荐行业和兴趣设置查询', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/29
   * @function: 更新用户基本资料
   */
  updateUserInfo = (res) => {
    let {userInfo} = this.props;

    userInfo.avatar = res.userInfo.avatarUrl;
    userInfo.city = res.userInfo.city;
    userInfo.province = res.userInfo.province;
    userInfo.name = res.userInfo.nickName;
    userInfo.sex = res.gender;
    this.props.updateUserInfo(userInfo);
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/29
   * @function: 获取用户信息
   */
  getUserInfo = () => {
    this.props.getUserInfo().then((res) => {
      this.props.updateUserInfo(res);
      console.log('重新更新用户信息', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  //@ts-ignore
  onShareAppMessage(res) {
    return {
      title: `${this.props.userInfo.name}的名片分享`,
      path: `/pages/businesscard/other_businesscard?userId=${this.props.userInfo.id}`
    }
  }


  render() {

    let {showShare,recommendIsSet} = this.state;
    let {userInfo} = this.props;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          notNeedBottomPadding={true}
      >
        {/*切换名片*/}
        <NavigationBar>
          <View
            style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujc])}>
            <Text style={styleAssign([fSize(18), color('#343434')])}>名片</Text>
          </View>
        </NavigationBar>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          {/*个人名片*/}
          <Card
            userInfo={this.props.userInfo}
            shareClick={() => {
              this.setState({showShare: true});
            }} collectCallback={() => {
            Taro.navigateTo({
              url: `/pages/businesscard/my_collect?currentIndex=1`
            });
          }}
            visitorCallback={() => {
              Taro.navigateTo({
                url: `/pages/businesscard/my_collect?currentIndex=0`
              });
            }}
            viewMyCardCallback={() => {
              Taro.navigateTo({
                url: `/pages/businesscard/other_businesscard?userId=${this.props.userInfo.id}`
              });
            }}
            gotoCardCallback={() => {
              Taro.navigateTo({
                url: `/pages/businesscard/ming_pian_ma`
              });
            }}/>
          {/*我的人脉*/}
          <MyPerson chooseCallback={() => {
            Taro.navigateTo({
              url: `/pages/businesscard/choose_renmai_tag`
            });
          }} hasSelected={recommendIsSet}/>
          {/*slogan*/}
          <View style={styleAssign([wRatio(100), h(66), styles.ujc, styles.uac])}>
            <Text style={styleAssign([fSize(18), color('#D2D2D2')])}>极易推 给您极致服务</Text>
          </View>
        </ScrollView>
        {/*创建名片*/}
        <Button lang={'zh_CN'} openType={'getUserInfo'} onGetUserInfo={(data) => {
          // console.log('更新用户信息', token);
          if (!userInfo.avatar) {
            this.updateUserInfo(data.detail);
          }
          Taro.navigateTo({
            url: `/pages/businesscard/add_businesscard`
          });
        }} style={styleAssign([wRatio(100), h(55), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([w(335), h(41), styles.uac, styles.ujc, bgColor('#FAF1E5'), radiusA(30)])}>
            <Text
              style={styleAssign([fSize(14), color('#825D22')])}>{userInfo.cardPercent ? `名片完善度${userInfo.cardPercent}，点击完善` : '创建您的专属名片'}</Text>
          </View>
        </Button>
        {
          showShare && <ShareModal cancle={() => {
            this.setState({showShare: false});
          }
          } wechatShare={() => {
          }
          } haibao={() => {
            Taro.navigateTo({
              url: `/pages/businesscard/mingpian_haibao`
            });
          }
          }/>
        }
      </CustomSafeAreaView>
    )
  }
}

export default Businesscard;
