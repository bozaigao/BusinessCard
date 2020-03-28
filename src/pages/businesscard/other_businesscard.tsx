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
import {debounce, get, save, styleAssign, toast} from "../../utils/datatool";
import {
  absL,
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
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/task_center';
import * as loginActions from '../../actions/login';
import * as businessCardActtions from '../../actions/business_card';
import PersonalInfo from "../mine/component/personal-info/index";
import MyGoods from "../mine/component/my-goods/index";
import JiZhiCard from "./component/jizhi-card/index";
import MyBusiness from "../mine/component/my-business/index";
import TouchableButton from "../../compoments/touchable-button/index";
import ShareModal from "./component/share-modal/index";
import {User} from "../../const/global";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import NavigationBar from "../../compoments/navigation_bar/index";
import OtherBusinessCardGuide from "./component/other-business-card-guide/index";
import MyPhoto from "../../compoments/my-photo/index";
import './index.scss';
import CardStyle1 from "../../compoments/card-style1";
import CardStyle2 from "../../compoments/card-style2";
import CardStyle3 from "../../compoments/card-style3";
import CardStyle4 from "../../compoments/card-style4";
import CardStyle5 from "../../compoments/card-style5";

interface Props {
  //获取用户信息
  getUserInfoById: any;
  //收藏名片
  updateMyCollect: any;
  userSettingGet: any;
  getCardHolderVisitorRecord: any;
}

interface State {
  showShare: boolean;
  userInfo: User;
  showGuide: boolean;
  holderCount: number;
  visitorCount: number;
  visitorList: { avatar: string; userId: string; }[];
  cardStyle: string;
  hidePhone: number;
  hideWechat: number;
  hideEmail: number;
  hideAddress: number;

}

@connect(state => Object.assign(state.taskCenter, state.login), Object.assign(actions, loginActions, businessCardActtions))
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
      showShare: false,
      //@ts-ignore
      userInfo: null,
      showGuide: false,
      holderCount: 0,
      visitorCount: 0,
      cardStyle: '-1',
      hidePhone: 0,
      hideWechat: 0,
      hideEmail: 0,
      hideAddress: 0,
    }
  }

  componentDidShow() {
    console.log(this.viewRef);
    this.getUserInfoById();
    this.getCardHolderVisitorRecord();
    let showGuide = get('other_business_guide');

    this.setState({showGuide: !showGuide});
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/25
   * @function: 获取用户的设置信息
   */
  userSettingGet = () => {
    this.props.userSettingGet({userId:this.state.userInfo.id}).then((res) => {
      if (res !== NetworkState.FAIL) {
        this.setState({
          hidePhone: res.phone,
          hideWechat: res.wechat,
          hideEmail: res.email,
          hideAddress: res.address,
          cardStyle: res.cardStyle
        });
      }
      console.log('获取用户的设置信息', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/21
   * @function: 查询用户访客和收藏数
   */
  getCardHolderVisitorRecord = () => {
    this.props.getCardHolderVisitorRecord({userId: this.$router.params.userId}).then((res) => {
      if (res !== NetworkState.FAIL) {
        this.setState({
          holderCount: res.holderCount,
          visitorCount: res.visitorCount,
          visitorList: res.visitorList
        });
      }
      console.log('查询用户访客和收藏数', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/16
   * @function: 更新我收藏的名片
   */
  updateMyCollect = (type: number, collectedUserId: number) => {
    this.viewRef.showLoading();
    this.props.updateMyCollect({type, collectedUserId}).then((res) => {
      this.viewRef.hideLoading();
      console.log('更新我收藏的名片', res);
      if (res !== NetworkState.FAIL) {
        toast('收藏成功');
      }
    }).catch(e => {
      this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/29
   * @function: 获取用户信息
   */
  getUserInfoById = () => {
    console.log('获取用户信息');
    this.props.getUserInfoById({userId: this.$router.params.userId}).then((res) => {
      this.setState({userInfo: res},()=>{
        this.userSettingGet();
      });
      console.log('获取用户信息', res);
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
    debounce(500, () => {
      return {
        title: '名片分享',
        path: '/pages/businesscard/other_businesscard'
      }
    });
  }


  render() {

    let {showShare, userInfo, showGuide, holderCount, visitorCount, visitorList,cardStyle, hidePhone, hideWechat, hideEmail, hideAddress} = this.state, visitorListSub;

    if (visitorList.length > 5) {
      visitorListSub = visitorList.slice(0, 6);
    } else {
      visitorListSub = visitorList;
    }
    //@ts-ignore
    let cardChild = null;

    if (cardStyle === '0') {
      //@ts-ignore
      cardChild = <CardStyle1 userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0}
                              hideAddress={hideAddress === 0} hideEmail={hideEmail === 0}
                              hideWechat={hideWechat === 0}/>
    } else if (cardStyle === '1') {
      //@ts-ignore
      cardChild = <CardStyle2 userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0}
                              hideAddress={hideAddress === 0} hideEmail={hideEmail === 0}
                              hideWechat={hideWechat === 0}/>
    } else if (cardStyle === '2') {
      //@ts-ignore
      cardChild = <CardStyle3 userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0}
                              hideAddress={hideAddress === 0} hideEmail={hideEmail === 0}
                              hideWechat={hideWechat === 0}/>
    } else if (cardStyle === '3') {
      //@ts-ignore
      cardChild = <CardStyle4 userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0}
                              hideAddress={hideAddress === 0} hideEmail={hideEmail === 0}
                              hideWechat={hideWechat === 0}/>
    } else if (cardStyle === '4') {
      //@ts-ignore
      cardChild = <CardStyle5 userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0}
                              hideAddress={hideAddress === 0} hideEmail={hideEmail === 0}
                              hideWechat={hideWechat === 0}/>
    }else {
      //@ts-ignore
      cardChild = <CardStyle1 userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0}
                              hideAddress={hideAddress === 0} hideEmail={hideEmail === 0}
                              hideWechat={hideWechat === 0}/>
    }

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
              <Image style={styleAssign([w(27), h(27), radiusA(13.5), ma(2)])}
                     src={userInfo.avatar}/>
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
        {userInfo && <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          {/*个人名片*/}
          <View style={styleAssign([wRatio(100), styles.uac, mt(20)])}>
            {cardChild}
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
                      this.updateMyCollect(1, userInfo.id);
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
                      phoneNumber: userInfo.phone
                    })
                  }}>
                  <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>拨打电话</Text>
                  <Text style={styleAssign([color('#979797'), fSize(12)])}>{userInfo.phone}</Text>
                </View>
                <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                  bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15),
                  {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}
                      onClick={() => {
                        Taro.setClipboardData({
                          data: userInfo.wechat
                        });
                      }}>
                  <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>加微信</Text>
                  <Text
                    style={styleAssign([color('#979797'), fSize(12), w(70)])}
                    className={'.textStyle'}>{`${userInfo.wechat ? userInfo.wechat : '点击添加微信'}`}</Text>
                </View>
                <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                  bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15),
                  {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}
                      onClick={() => {
                        Taro.openLocation({
                          latitude: userInfo.latitude,
                          longitude: userInfo.longitude,
                          scale: 16
                        });
                      }}>
                  <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>联系地址</Text>
                  <Text
                    style={styleAssign([color('#979797'), fSize(12), w(72)])}
                    className={'.textStyle'}>{userInfo.detailAddress ? userInfo.detailAddress : '点击立即定位'}</Text>
                </View>
              </View>
              <View style={styleAssign([wRatio(100), h(61), styles.udr, styles.uac, styles.ujb, pl(20), pr(20)])}>
                <View style={styleAssign([styles.udr, styles.uac, w(180)])}>
                  {
                    visitorListSub.map((value, index) => {
                      console.log(value);
                      return <Image key={index} style={styleAssign([w(20), h(20), styles.upa, absL(15 * index)])}
                                    src={value.avatar}/>
                    })
                  }
                  {
                    visitorListSub.length === 0 && [1, 2, 3, 4, 5].map((value, index) => {
                      console.log(value);
                      return <Image key={index} style={styleAssign([w(20), h(20), styles.upa, absL(15 * index)])}
                                    src={`${cloudBaseUrl}ico_default.png`}/>
                    })
                  }
                  <Text
                    style={styleAssign([color('#343434'), fSize(12), styles.upa, absL(100)])}>{`${visitorCount}人浏览过`}</Text>
                </View>
                <View style={styleAssign([styles.udr, styles.uac])}>
                  <Text style={styleAssign([color('#343434'), fSize(12), ml(17)])}>{`收藏 ${holderCount}`}</Text>
                </View>
              </View>
            </View>
          </View>
          {/*我的个人简介*/}
          <PersonalInfo userInfo={userInfo}/>
          {/*我的商品*/}
          {
            userInfo && userInfo.goodsList && userInfo.goodsList.length !== 0 && <MyGoods goToMoreGoods={() => {
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
          {
            userInfo.enterpriseName.length !== 0 &&
            <MyBusiness userInfo={userInfo}/>
          }
          {/*我的照片*/}
          {
            userInfo.photoUrlArray && userInfo.photoUrlArray.length !== 0 && <MyPhoto photos={userInfo.photoUrlArray}/>
          }
          {/*极致名片*/}
          <JiZhiCard/>
          {/*关注公众号*/}
          <View
            style={styleAssign([wRatio(100), h(59), styles.uac, styles.ujb, styles.udr, mt(10), bgColor(commonStyles.whiteColor)])}>
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
        </ScrollView>}
        {
          showShare && <ShareModal cancle={() => {
            this.setState({showShare: false});
          }
          } wechatShare={() => {
            this.setState({showShare: false});
          }
          } haibao={() => {
            this.setState({showShare: false}, () => {
              Taro.navigateTo({
                url: `/pages/businesscard/mingpian_haibao`
              });
            });
          }
          }/>
        }
        {
          showGuide && <OtherBusinessCardGuide cancle={() => {
            save('other_business_guide', true);
            this.setState({showGuide: false});
          }
          } goToMyCard={() => {
            save('other_business_guide', true);
            this.setState({showGuide: false}, () => {
              Taro.reLaunch({
                url: `/pages/businesscard`
              });
            });
          }
          }/>
        }
      </CustomSafeAreaView>
    )
  }

}

export default OtherBusinesscard;
