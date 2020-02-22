/**
 * @filename businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 名片首页
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Image, ScrollView, Text, View} from "@tarojs/components";
//@ts-ignore
import CustomSafeAreaView from "../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../utils/datatool";
import {
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ma,
  ml,
  mr,
  mt,
  radiusA,
  w,
  wRatio
} from "../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../actions/task_center';
import * as loginActions from '../actions/login';
import Card from "./pagecomponent/business-card/index";
import PersonalInfo from "./pagecomponent/personal-info/index";
import MyPerson from "./pagecomponent/my-person/index";
import MyGoods from "./pagecomponent/my-goods/index";
import JiZhiCard from "./pagecomponent/jizhi-card/index";
import MyBusiness from "./pagecomponent/my-business/index";
import TouchableButton from "../compoments/touchable-button/index";
import ShareModal from "./pagecomponent/share-modal/index";
import {User} from "../const/global";
import {cloudBaseUrl} from "../api/httpurl";
import NavigationBar from "../compoments/navigation_bar/index";

interface Props {
  //获取用户信息
  getUserInfo: any;
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

  componentDidMount() {
    // console.log('componentDidMount');
    // // 监听一个事件，接受参数
    // Taro.eventCenter.on('showJiFenModal', () => {
    //   console.log('显示对话框');
    //   this.viewRef && this.viewRef.showSignAlert()
    // });
    this.getUserInfo();
    console.log('胶囊按钮', Taro.getMenuButtonBoundingClientRect());
    console.log(this.viewRef)
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/29
   * @function: 获取用户信息
   */
  getUserInfo = () => {
    console.log('获取用户信息');
    this.props.getUserInfo().then((res) => {
      console.log('获取用户信息', res);
      console.log('属性', this.props.userInfo);
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  componentWillUnmount() {
    Taro.eventCenter.off('showJiFenModal');
    console.log('componentWillUnmount');
  }

  //@ts-ignore
  onShareAppMessage(res) {
    console.log('名片分享');
    return {
      title: '名片分享',
      path: '/pages/businesscard/add_businesscard'
    }
  }


  render() {

    let {showShare} = this.state;
    let {userInfo} = this.props;

    console.log('呵呵', userInfo.goodsList);

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          notNeedBottomPadding={true}
      >
        {/*切换名片*/}
        <NavigationBar>
          <View
            style={styleAssign([wRatio(100), styles.ujb, styles.uac, styles.udr])}>
            <View
              style={styleAssign([styles.uac, styles.udr, ml(23), w(95), h(32), radiusA(16), bdColor('#E5E5E5'), bo(1), {borderStyle: 'solid'}])}>
              <Image style={styleAssign([w(27), h(27), ma(2)])} src={`${cloudBaseUrl}ico_default.png`}/>
              <Text style={styleAssign([fSize(12), color('#343434'), ml(5)])}>我的名片</Text>
            </View>
            <TouchableButton customStyle={styleAssign([styles.uac, styles.udr])}
                             onClick={() => {
                               Taro.navigateTo({
                                 url: `/pages/businesscard/qiehuan_businesscard`
                               });
                             }}>
              <Text style={styleAssign([fSize(18), color('#343434')])}>名片</Text>
            </TouchableButton>
            <View style={styleAssign([mr(23), w(95), h(32), bgColor(commonStyles.transparent)])}/>
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
              url: `/pages/businesscard/my_collect`
            });
          }}/>
          {/*我的个人简介*/}
          <PersonalInfo/>
          {/*我的人脉*/}
          <MyPerson/>
          {/*我的商品*/}
          {
            userInfo.goodsList && userInfo.goodsList.length !== 0 && <MyGoods goToMoreGoods={() => {
              Taro.navigateTo({
                url: `/pages/businesscard/more_goods?goodsList=${JSON.stringify(userInfo.goodsList)}`
              });
            }} goToGoodsDetail={(itemData) => {
              Taro.navigateTo({
                url: `/pages/mine/goods_detail?itemData=${JSON.stringify(itemData)}`
              });
            }} goodsList={userInfo.goodsList}/>
          }
          {/*我的企业*/}
          <MyBusiness/>
          {/*极致名片*/}
          <JiZhiCard/>
          {/*关注公众号*/}
          <View
            style={styleAssign([wRatio(100), styles.uac, styles.ujb, styles.udr, mt(10), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <Image style={styleAssign([w(32), h(32), radiusA(4), ml(21)])}
                     src={`${cloudBaseUrl}ico_logo.png`}/>
              <View style={styleAssign([ml(5)])}>
                <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>关注极致信息公众号</Text>
                <Text style={styleAssign([fSize(12), color('#D2D2D2')])}>最新资讯、升级更新早知道！</Text>
              </View>
            </View>
            <View style={styleAssign([styles.uac, styles.ujc, bgColor('#FAF1E5'), w(76), h(27), radiusA(30), mr(11)])}>
              <Text style={styleAssign([color('#825D22'), fSize(14)])}>马上关注</Text>
            </View>
          </View>
          {/*slogan*/}
          <View style={styleAssign([wRatio(100), h(86), styles.ujc, styles.uac])}>
            <Text style={styleAssign([fSize(18), color('#D2D2D2')])}>极易推 给您极致服务</Text>
          </View>
        </ScrollView>
        {/*创建名片*/}
        <View style={styleAssign([wRatio(100), h(55), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/businesscard/add_businesscard`
                });
              }}>
          <View style={styleAssign([w(335), h(41), styles.uac, styles.ujc, bgColor('#FAF1E5'), radiusA(30)])}>
            <Text style={styleAssign([fSize(14), color('#825D22')])}>创建您的专属名片</Text>
          </View>
        </View>
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
