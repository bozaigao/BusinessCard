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
import {get, styleAssign} from "../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, radiusA, w, wRatio} from "../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../actions/task_center';
import * as loginActions from '../actions/login';
import Card from "./pagecomponent/business-card/index";
import MyPerson from "./pagecomponent/my-person/index";
import ShareModal from "./pagecomponent/share-modal/index";
import {Enum, User} from "../const/global";
import NavigationBar from "../compoments/navigation_bar/index";

interface Props {
  //获取用户信息
  getUserInfo: any;
  updateUserInfo: any;
  userInfo: User;
}

interface State {
  showShare: boolean;
}

@connect(state => Object.assign(state.taskCenter, state.login), {...actions, ...loginActions})
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
      showShare: false
    }
  }

  componentDidShow() {
    Taro.eventCenter.on('refreshUserInfo', () => {
      console.log('刷新用户信息');
      this.getUserInfo();
    });
    this.getUserInfo();
  }

  componentWillUnmount() {
    Taro.eventCenter.off('showJiFenModal');
    Taro.eventCenter.off('refreshUserInfo');
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/29
   * @function: 更新用户基本资料
   */
  updateUserInfo = (res) => {
    let {userInfo} = this.props, that = this;

    userInfo.avatar = res.userInfo.avatarUrl;
    userInfo.city = res.userInfo.city;
    userInfo.province = res.userInfo.province;
    userInfo.name = res.userInfo.nickName;
    userInfo.sex = res.gender;
    that.props.updateUserInfo(userInfo);
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
      console.log('获取用户信息', res);
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  //@ts-ignore
  onShareAppMessage(res) {
    return {
      title: `${this.props.userInfo.name}的名片分享`,
      path: '/pages/businesscard/other_businesscard'
    }
  }


  render() {

    let {showShare} = this.state;
    let {userInfo} = this.props;

    console.log('呵呵', this.viewRef);

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
          <Card shareClick={() => {
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
                    url: `/pages/businesscard/other_businesscard`
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
          }}/>
          {/*slogan*/}
          <View style={styleAssign([wRatio(100), h(66), styles.ujc, styles.uac])}>
            <Text style={styleAssign([fSize(18), color('#D2D2D2')])}>极易推 给您极致服务</Text>
          </View>
        </ScrollView>
        {/*创建名片*/}
        <Button lang={'zh_CN'} openType={'getUserInfo'} onGetUserInfo={(data) => {
          let token = get(Enum.TOKEN);

          console.log('更新用户信息', token);
          if (!token) {
            this.updateUserInfo(data.detail);
          }
          Taro.navigateTo({
            url: `/pages/businesscard/add_businesscard`
          });
        }} style={styleAssign([wRatio(100), h(55), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([w(335), h(41), styles.uac, styles.ujc, bgColor('#FAF1E5'), radiusA(30)])}>
            <Text style={styleAssign([fSize(14), color('#825D22')])}>创建您的专属名片</Text>
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
