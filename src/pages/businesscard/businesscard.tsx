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
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {SignInPage} from "../../../global";
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
  ml,
  mr,
  mt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import Card from "./business-card";
import PersonalInfo from "./personal-info";
import MyPerson from "./my-person";
import MyGoods from "./my-goods";
import JiZhiCard from "./jizhi-card";
import MyBusiness from "./my-business";
import MyPhoto from "./my-photo";
import TouchableButton from "../../compoments/touchable-button";
import ShareModal from "./share-modal";
import BianJieTool from "./bianjie-tool";

interface Props {
  dispatchLogin?: any;
  //用户登录
  userLogin?: any;
}

interface State {
  signInPageDetail: SignInPage;
  showShare: boolean;
}

@connect(state => state.login, {...actions})
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
      signInPageDetail: {dateIntegrals: [], signInCount: 0},
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
    this.userLogin();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/24
   * @function: 用户登录
   */
  userLogin = () => {
    let that = this;

    Taro.login({
      success(res) {
        if (res.code) {
          console.log(that.props);
          this.viewRef && this.viewRef.showLoading();
          that.props.userLogin({code: res.code}).then((res) => {
            this.viewRef && this.viewRef.hideLoading();
            console.log('用户登录', res);
          }).catch(e => {
            this.viewRef && this.viewRef.hideLoading();
            console.log('报错啦', e);
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }, fail() {
        Taro.showToast({title: '请允许微信授权，不然无法正常使用小程序功能'});
      }
    }).then(

    );

  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/10/8
   * @function: 获取banner数据
   */
  // getBannerData = () => {
  //   this.viewRef.showLoading();
  //   this.props.dispatchBannerInfo().then((res) => {
  //     this.viewRef.hideLoading();
  //     this.setState({bannerList: res.urls});
  //
  //   }).catch(e => {
  //     this.viewRef.hideLoading();
  //     //android模拟器无法访问mock的本地服务所以这里处理下，在真实网络请求中不存在该问题
  //     this.setState({
  //       bannerList: ["https://gzol.oss-cn-qingdao.aliyuncs.com/20190906161007.png",
  //         "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926100637.png",
  //         "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926103054.png",
  //         "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926115113.png"
  //       ]
  //     });
  //     console.log('报错啦', e);
  //   });
  // }


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
    console.log(this.viewRef);

    let {signInPageDetail, showShare} = this.state;

    if (typeof signInPageDetail.signInCount === 'undefined') {
      signInPageDetail.signInCount = 0
    }

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          notNeedBottomPadding={true}
      >
        {/*切换名片*/}
        <View
          style={styleAssign([wRatio(100), h(44), styles.ujb, styles.udr, styles.uac, bgColor(commonStyles.whiteColor)])}>
          <Image style={styleAssign([w(22), h(22), ml(20)])} src={require('../../assets/ico_switch.png')}/>
          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr])}
                           onClick={() => {
                             console.log('点击了哦');
                             Taro.navigateTo({
                               url: `/pages/businesscard/qiehuan_businesscard`
                             });
                           }}>
            <Text style={styleAssign([fSize(19)])}>名片</Text>
            <Image style={styleAssign([w(18), h(18), ml(5)])} src={require('../../assets/ico_down.png')}/>
          </TouchableButton>
          <View style={styleAssign([w(22), h(22), bgColor(commonStyles.transparent), mr(20)])}/>
        </View>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          {/*个人名片*/}
          <Card shareClick={() => {
            this.setState({showShare: true});
          }}/>
          {/*我的个人简介*/}
          <PersonalInfo/>
          {/*我的人脉*/}
          <MyPerson/>
          {/*便捷功能*/}
          <BianJieTool itemClick={(value) => {
            if (value === '任务中心') {
              Taro.navigateTo({
                url: `/pages/businesscard/task_center`
              });
            } else if (value === '工具箱') {
              Taro.navigateTo({
                url: `/pages/businesscard/tool_box`
              });

            } else if (value === '海报') {
              Taro.navigateTo({
                url: `/pages/businesscard/haibao`
              });
            } else if (value === '名片夹') {
              Taro.navigateTo({
                url: `/pages/businesscard/mingpianjia`
              });
            } else if (value === '商城') {
              Taro.navigateTo({
                url: `/pages/businesscard/goods_manage`
              });
            }
          }}/>
          {/*我的商品*/}
          <MyGoods goToMoreGoods={() => {
            Taro.navigateTo({
              url: `/pages/businesscard/more_goods`
            });
          }} goToGoodsDetail={() => {
            Taro.navigateTo({
              url: `/pages/businesscard/goods_detail`
            });
          }}/>
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
        {/*创建名片*/}
        <TouchableButton
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/businesscard/add_businesscard`
            });
          }}
          customStyle={styleAssign([w(70), h(70), styles.uac, styles.ujc, styles.upa, absR(10), absB(5)])}>
          <Image style={styleAssign([styles.uac, w(70), h(70), styles.upa, absT(0), absR(0)])}
                 src={require('../../assets/ico_add_card_bg.png')}/>
          <View style={styleAssign([styles.uac])}>
            <Image style={styleAssign([w(26), h(19)])} src={require('../../assets/ico_add_card_img.png')}/>
            <Text style={styleAssign([color(commonStyles.colorTheme), fSize(10), mt(2)])}>创建</Text>
          </View>
        </TouchableButton>
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
