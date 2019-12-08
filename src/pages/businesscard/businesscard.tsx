import Taro, {Component, Config} from '@tarojs/taro'
import {Image, ScrollView, Text, View} from "@tarojs/components";
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {SignInPage} from "../../../global";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h, ml, mr,
  mt, radiusA,
  screenHeight,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/home';
import Card from "./business-card";
import PersonalInfo from "./personal-info";
import MyPerson from "./my-person";
import MyGoods from "./my-goods";
import JiZhiCard from "./jizhi-card";
import MyBusiness from "./my-business";
import MyPhoto from "./my-photo";

//@ts-ignore

interface Props {
  dispatchLogin?: any;
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
  signInPageDetail: SignInPage;
  bannerList: string[];
}

@connect(state => state.home, {...actions})
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
    navigationBarTitleText: '首页',
    disableScroll: true
  }

  constructor(props) {
    super(props);
    this.state = {
      signInPageDetail: {dateIntegrals: [], signInCount: 0},
      bannerList: []
    }
  }

  componentDidMount() {
    console.log('componentDidMount');
    // 监听一个事件，接受参数
    Taro.eventCenter.on('showJiFenModal', () => {
      console.log('显示对话框');
      this.viewRef && this.viewRef.showSignAlert()
    });
    this.getBannerData();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/10/8
   * @function: 获取banner数据
   */
  getBannerData = () => {
    this.viewRef.showLoading();
    this.props.dispatchBannerInfo().then((res) => {
      this.viewRef.hideLoading();
      this.setState({bannerList: res.urls});

    }).catch(e => {
      this.viewRef.hideLoading();
      //android模拟器无法访问mock的本地服务所以这里处理下，在真实网络请求中不存在该问题
      this.setState({
        bannerList: ["https://gzol.oss-cn-qingdao.aliyuncs.com/20190906161007.png",
          "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926100637.png",
          "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926103054.png",
          "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926115113.png"
        ]
      });
      console.log('报错啦', e);
    });
  }


  componentWillUnmount() {
    Taro.eventCenter.off('showJiFenModal');
    console.log('componentWillUnmount');
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/9/18
   * @function: 获取签到数据
   */
  getSignInPage = async () => {
    // let res = (await this.props.getSignInPage()).data;
    //
    // if (res.code === api.NetworkState.SUCCESS) {
    //   this.setState({
    //     signInPageDetail: res.data
    //   });
    // }
  };


  render() {
    console.log(screenHeight());

    let {signInPageDetail} = this.state;

    if (typeof signInPageDetail.signInCount === 'undefined') {
      signInPageDetail.signInCount = 0
    }

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor)])}>
        <ScrollView
          style={styleAssign([wRatio(100), h(635), styles.uac])}
          scrollY>
          {/*个人名片*/}
          <Card/>
          {/*我的个人简介*/}
          <PersonalInfo/>
          {/*我的人脉*/}
          <MyPerson/>
          {/*我的商品*/}
          <MyGoods/>
          {/*我的企业*/}
          <MyBusiness/>
          {/*我的照片*/}
          <MyPhoto/>
          {/*极致名片*/}
          <JiZhiCard/>
          {/*slogan*/}
          <View style={styleAssign([wRatio(100), styles.ujc, styles.uac, mt(74)])}>
            <Text style={styleAssign([fSize(18), color('#D2D2D2')])}>极致名片 给您极致服务</Text>
          </View>
          {/*关注公众号*/}
          <View
            style={styleAssign([wRatio(100), h(59), styles.uac, styles.ujb, styles.udr, mt(57), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <Image style={styleAssign([w(32), h(32), radiusA(4), ml(21)])}
                     src={require('../../assets/ico_default.jpeg')}/>
              <View style={styleAssign([ml(5)])}>
                <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>关注极致信息公众号</Text>
                <Text style={styleAssign([fSize(12), color('#D2D2D2')])}>最新资讯、升级更新早知道！</Text>
              </View>
            </View>
            <View style={styleAssign([styles.uac, styles.ujc, bgColor('#FAF1E5'), w(76), h(27), radiusA(30), mr(11)])}>
              <Text style={styleAssign([color('#825D22'), fSize(14)])}>马上关注</Text>
            </View>
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Businesscard;
