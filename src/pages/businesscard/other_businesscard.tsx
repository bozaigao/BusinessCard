/**
 * @filename other_businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/23
 * @Description: 别人的名片
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Image, ScrollView, Text, View} from "@tarojs/components";
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {
  absB,
  absL,
  absR,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  fWeight,
  h,
  ma,
  ml,
  mr,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/task_center';
import * as loginActions from '../../actions/login';
import PersonalInfo from "../pagecomponent/personal-info/index";
import MyGoods from "../pagecomponent/my-goods/index";
import JiZhiCard from "../pagecomponent/jizhi-card/index";
import MyBusiness from "../pagecomponent/my-business/index";
import TouchableButton from "../../compoments/touchable-button/index";
import ShareModal from "../pagecomponent/share-modal/index";
import {User} from "../../const/global";
import {cloudBaseUrl} from "../../api/httpurl";
import NavigationBar from "../../compoments/navigation_bar/index";

interface Props {
  //获取用户信息
  getUserInfo: any;
  userInfo: User;
}

interface State {
  showShare: boolean;
}

@connect(state => Object.assign(state.taskCenter, state.login), {...actions, ...loginActions})
class OtherBusinesscard extends Component<Props, State> {

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
      path: '/pages/businesscard/other_businesscard'
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
              style={styleAssign([styles.uac, styles.udr, ml(23), w(95), h(32), radiusA(16), bdColor('#E5E5E5'), bo(1), {borderStyle: 'solid'}])}
              onClick={() => {
                Taro.reLaunch({
                  url: `/pages/businesscard`
                });
              }}>
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
          <View style={styleAssign([wRatio(100), styles.uac, mt(10)])}>
            <View style={styleAssign([wRatio(95), h(204), bgColor('rgb(211,199,195)'), radiusA(10),
              styles.udr, styles.uje])}>
              <View
                style={styleAssign([wRatio(100), h(204), radiusA(10), styles.upa, absL(0), absT(0), bgColor(commonStyles.whiteColor)])}/>
              <View style={styleAssign([styles.uae, styles.udr, styles.upa, absR(83), absT(15)])}>
                <Text style={styleAssign([fSize(18), fWeight('bold')])}>王嘉怡</Text>
                <Text style={styleAssign([fSize(12), ml(8)])}>销售经理</Text>
              </View>
              <View style={styleAssign([styles.uae, styles.upa, absB(26), absR(24)])}>
                {/*电话号码*/}
                <View style={styleAssign([styles.uac, styles.udr])}>
                  <Text
                    style={styleAssign([fSize(12), color('#343434')])}>17311239269</Text>
                  <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_mobile.png`}/>
                </View>
                {/*微信号*/}
                <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                  <Text
                    style={styleAssign([fSize(12), color('#343434')])}>bozaigao</Text>
                  <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_wechat.png`}/>
                </View>
                {/*邮箱*/}
                <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                  <Text
                    style={styleAssign([fSize(12), color('#343434')])}>邮箱信息未对外公开</Text>
                  <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_email.png`}/>
                </View>
                {/*地址*/}
                <View style={styleAssign([styles.udr, mt(8)])}>
                  <Text
                    style={styleAssign([fSize(12), color('#343434')])}>{`四川省成都市武侯区盛和\n二路18号富森美家居`}</Text>
                  <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_location.png`}/>
                </View>
              </View>
            </View>
            {/*拨打电话等操作*/}
            <View style={styleAssign([wRatio(100), h(184), bgColor(commonStyles.whiteColor), styles.uac, mt(20)])}>
              {/*完善分享名片*/}
              <View
                style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujc, h(44), bgColor(commonStyles.whiteColor), mt(20)])}>
                <View style={styleAssign([styles.udr, styles.uac])}>
                  <TouchableButton
                    customStyle={styleAssign([w(160), radiusA(4), styles.uac, styles.ujc, bo(1), {borderStyle: 'solid'}, bdColor(commonStyles.colorTheme),
                      bgColor(commonStyles.whiteColor), h(44)])}
                    onClick={() => {
                      this.setState({showShare: true});
                    }}>
                    <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>分享名片</Text>
                  </TouchableButton>
                  <TouchableButton
                    customStyle={styleAssign([w(160), radiusA(4), ml(15), styles.uac, styles.ujc, bo(1), h(44),
                      bdColor(commonStyles.colorTheme), bgColor(commonStyles.colorTheme)])}
                    onClick={() => {
                    }}>
                    <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor)])}>收藏名片</Text>
                  </TouchableButton>
                </View>
              </View>
              {/*加微信、联系地址*/}
              <View
                style={styleAssign([wRatio(95), styles.uac, styles.udr, h(100), mt(20), bgColor(commonStyles.whiteColor)])}>
                <View
                  style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                    bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4),
                    {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}
                  onClick={() => {
                    Taro.makePhoneCall({
                      phoneNumber: '15982468866' //仅为示例，并非真实的电话号码
                    })
                  }}>
                  <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>拨打电话</Text>
                  <Text style={styleAssign([color('#979797'), fSize(12)])}>15982468866</Text>
                </View>
                <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                  bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15),
                  {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}
                      onClick={() => {
                        Taro.setClipboardData({
                          data: 'bozaigao98'
                        });
                      }}>
                  <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>加微信</Text>
                  <Text style={styleAssign([color('#979797'), fSize(12)])}>点击添加微信</Text>
                </View>
                <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                  bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15),
                  {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}>
                  <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>联系地址</Text>
                  <Text style={styleAssign([color('#979797'), fSize(12)])}>点击立即定位</Text>
                </View>
              </View>
              <View style={styleAssign([wRatio(100), h(61), styles.udr, styles.uac, styles.ujb, pl(20), pr(20)])}>
                <View style={styleAssign([styles.udr, styles.uac, bgColor('red'), w(170)])}>
                  {
                    [1, 2, 3, 4, 5].map((value, index) => {
                      console.log(value);
                      return <Image key={index} style={styleAssign([w(20), h(20), styles.upa, absL(15 * index)])}
                                    src={`${cloudBaseUrl}ico_viewer.png`}/>
                    })
                  }
                  <Text style={styleAssign([color('#343434'), fSize(12), styles.upa, absL(100)])}>150人浏览过</Text>
                </View>
                <View style={styleAssign([styles.udr, styles.uac])}>
                  <Text style={styleAssign([color('#343434'), fSize(12), ml(17)])}>收藏 143</Text>
                  <Image style={styleAssign([w(15), h(15), ml(7)])}
                         src={`${cloudBaseUrl}ico_star.png`}/>
                </View>
              </View>
            </View>
          </View>
          {/*我的个人简介*/}
          <PersonalInfo/>
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

export default OtherBusinesscard;
