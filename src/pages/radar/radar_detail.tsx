/**
 * @filename radar_detail.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 雷达详情
 */
import Taro, {Component} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
import {
  absB,
  absR,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
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
import {getToday, styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import * as radarActions from "../../actions/radar";
import * as loginActions from "../../actions/login";
import TopHeader from "../../compoments/top-header/index";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import {BehaviorTrace, CustomerModel} from "../../const/global";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import ShareInvite from "../../pages/component/share-invite";
import SingleLineText from "../../compoments/singleline-text";
import TraceItem from "../../compoments/trace-item";

interface Props {
  traceList?: any;
  //获取用户信息
  getBehaviorTrace: any;
  interestBehaviorActive: any;
}

interface State {
  showShareInvite: boolean;
  customer: CustomerModel
  currentIndex: number;
  traceList: BehaviorTrace[];
  active: any;
  behaviorTrace: any;
  interest: any;
}

@connect(state => state.login, Object.assign(actions, loginActions, radarActions))
class RadarDetail extends Component<Props, State> {
  private viewRef;
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  constructor(props) {
    super(props);
    this.state = {
      //@ts-ignore
      customer: null,
      currentIndex: 0,
      traceList: [],
      showShareInvite: false,
      behaviorTrace: {
        behaviorTraceMax: 100,
        callUp: 0,
        playVideo: 0,
        shareCard: 0,
        viewCard: 0,
        viewEnterpriseWebsite: 0,
        viewGoods: 0,
      }
    }
  }

  componentDidMount() {
    this.getBehaviorTrace();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 获取客户详细资料
   */
  getBehaviorTrace = () => {
    this.viewRef && this.viewRef.showLoading();
    this.props.getBehaviorTrace({userId: `${this.$router.params.userId}`}).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('获取客户详细资料', res);
      if (res !== NetworkState.FAIL) {
        this.setState({customer: res}, () => {
          this.interestBehaviorActive();
          this.traceList();
        });
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 雷达AI分析 兴趣和行为占比
   */
  interestBehaviorActive = () => {
    this.viewRef && this.viewRef.showLoading();
    this.props.interestBehaviorActive({
      traceUserId: this.state.customer.userId,
      startDate: getToday(),
      endDate: getToday()
    }).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('雷达AI分析 兴趣和行为占比', res);
      if (res !== NetworkState.FAIL) {
        this.setState({active: res.active, behaviorTrace: res.behaviorTrace, interest: res.interest});
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }

  //@ts-ignore
  onShareAppMessage(res) {
    return {
      title: `快来使用极易推小程序吧`,
      path: `/pages/businesscard`
    }
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function:雷达详情访问轨迹
   */
  traceList = () => {
    console.log('雷达详情访问轨迹');
    this.props.traceList({traceUserId: this.state.customer.userId}).then((res) => {
      console.log('雷达详情访问轨迹', res);
      if (res && res !== NetworkState.FAIL) {
        this.setState({traceList: res.list});
      }

    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  render() {
    let {customer, currentIndex, traceList, showShareInvite, behaviorTrace} = this.state;
    let childView;

    if (currentIndex === 0) {
      childView = <View style={styleAssign([wRatio(100), mt(10)])}>
        {
          traceList.map((value: any, index) => {
            return <TraceItem item={value} key={index} name={customer.name}/>;
          })
        }
      </View>;
    } else if (currentIndex === 1) {
      childView = <View style={styleAssign([styles.uf1, styles.uac])}>
        <View style={styleAssign([wRatio(90), bgColor(commonStyles.whiteColor), radiusA(4), mt(8), styles.uac])}>
          <View
            style={styleAssign([styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor), wRatio(100), h(48), radiusA(4)])}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/customer/ai_analysis?userId=${customer.id}&active=${JSON.stringify(this.state.active)}&interest=${JSON.stringify(this.state.interest)}`
              });
            }}>
            <Text style={styleAssign([fSize(16), color('#343434'), ml(16)])}>
              图表展示
            </Text>
            <View style={styleAssign([styles.uac, styles.udr, mr(16)])}>
              <Text style={styleAssign([fSize(14), color('#979797')])}>
                前往查看
              </Text>
              <Image style={styleAssign([w(7), h(12), ml(8)])}
                     src={`${cloudBaseUrl}ico_next.png`}/>
            </View>

          </View>
        </View>
        <View style={styleAssign([wRatio(90), bgColor(commonStyles.whiteColor), radiusA(4), mt(8), mb(20)])}>
          <Text style={styleAssign([fSize(16), color('#343434'), ml(16), mt(16)])}>
            客户行为轨迹
          </Text>
          {[{
            title: '查看名片',
            progress: parseInt(`${(behaviorTrace.viewCard / behaviorTrace.behaviorTraceMax) * 100}`, 10),
            count: behaviorTrace.viewCard
          },
            {
              title: '分享名片',
              progress: parseInt(`${(behaviorTrace.shareCard / behaviorTrace.behaviorTraceMax) * 100}`, 10),
              count: behaviorTrace.shareCard
            },
            {
              title: '拨打电话',
              progress: parseInt(`${(behaviorTrace.callUp / behaviorTrace.behaviorTraceMax) * 100}`, 10),
              count: behaviorTrace.callUp
            },
            {
              title: '浏览商城',
              progress: parseInt(`${(behaviorTrace.viewGoods / behaviorTrace.behaviorTraceMax) * 100}`, 10),
              count: behaviorTrace.viewGoods
            },
            {
              title: '浏览企业',
              progress: parseInt(`${(behaviorTrace.viewEnterpriseWebsite / behaviorTrace.behaviorTraceMax) * 100}`, 10),
              count: behaviorTrace.viewEnterpriseWebsite
            },
            {
              title: '播放视频',
              progress: parseInt(`${(behaviorTrace.playVideo / behaviorTrace.behaviorTraceMax) * 100}`, 10),
              count: behaviorTrace.playVideo
            }].map((value, index) => {
            return <View key={index} style={styleAssign([mt(index === 0 ? 30 : 20), mb(index === 5 ? 20 : 0)])}>
              <Text style={styleAssign([fSize(15), color('#343434'), ml(16)])}>
                {value.title}
              </Text>
              <View style={styleAssign([styles.uac, styles.udr, ml(16)])}>
                <View style={styleAssign([w(246), h(6), bgColor('#E5E5E5'), radiusA(8), styles.udr, styles.uac])}>
                  <View style={styleAssign([wRatio(value.progress), hRatio(100), radiusA(8), bgColor('#E2BB7B')])}/>
                </View>
                <Text style={styleAssign([fSize(15), color('#343434'), ml(20)])}>
                  {`${value.count}次`}
                </Text>
              </View>
            </View>;
          })
          }
        </View>
      </View>;
    }
    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={''}/>
        {
          customer && <ScrollView
            style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
            scrollY>
            <View style={styleAssign([styles.uac, wRatio(100), bgColor(commonStyles.whiteColor)])}>
              <View style={styleAssign([styles.udr, wRatio(100), styles.ujc, pl(20), pr(20),
                bgColor(commonStyles.whiteColor)])}>
                <View style={styleAssign([styles.uac])}>
                  <View style={styleAssign([w(98), h(98)])}>
                    <Image style={styleAssign([w(98), h(98), radiusA(49)])}
                           src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${cloudBaseUrl}ico_default.png`}/>
                    <Image style={styleAssign([w(20), h(20), styles.upa, absB(0), absR(0)])}
                           src={customer.sex === 1 ? `${cloudBaseUrl}ico_nan.png` : `${cloudBaseUrl}ico_nv.png`}/>
                  </View>
                  <SingleLineText text={customer.name} style={styleAssign([fSize(22), color('#343434'), mt(11)])}/>
                  <Text style={styleAssign([fSize(14), color('#727272')])}>{customer.company}</Text>
                  <View style={styleAssign([styles.uac, styles.udr])}>
                    <Text style={styleAssign([fSize(12), color('#979797')])}>来自</Text>
                    <Text style={styleAssign([fSize(12), color('#E2BB7B')])}>{customer.source}</Text>
                  </View>
                </View>
              </View>
              {/*加微信、联系地址*/}
              <View
                style={styleAssign([wRatio(95), styles.uac, styles.udr, h(100), bgColor(commonStyles.whiteColor)])}>
                <View
                  style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                    bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4),
                    {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}
                  onClick={() => {
                    Taro.makePhoneCall({
                      phoneNumber: customer.phone
                    })
                  }}>
                  <View style={styleAssign([styles.uac, styles.udr])}>
                    <Image style={styleAssign([w(24), h(22)])} src={require('../../assets/ico_mibile_gray.png')}/>
                    <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>拨打电话</Text>
                  </View>
                  <Text style={styleAssign([color('#979797'), fSize(12),styles.utxc])}>{customer.phone}</Text>
                </View>
                <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                  bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15),
                  {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}
                      onClick={() => {
                        Taro.setClipboardData({
                          data: customer.wechat
                        });
                        // Taro.getClipboardData({
                        //   success(res) {
                        //     console.log('拷贝文件', res.data) // data
                        //   }
                        // })
                      }}>
                  <View style={styleAssign([styles.uac, styles.udr])}>
                    <Image style={styleAssign([w(24), h(22)])} src={require('../../assets/ico_wechat_gray.png')}/>
                    <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>加微信</Text>
                  </View>
                  <Text
                    style={styleAssign([color('#979797'), fSize(12),styles.utxc])}>{`${customer.wechat ? customer.wechat : '点击添加微信'}`}</Text>
                </View>
                <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                  bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15),
                  {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}
                      onClick={() => {
                        Taro.openLocation({
                          latitude: customer.latitude,
                          longitude: customer.longitude,
                          scale: 18
                        });
                      }}>
                  <View style={styleAssign([styles.uac, styles.udr])}>
                    <Image style={styleAssign([w(24), h(22)])} src={require('../../assets/ico_location_gray.png')}/>
                    <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>联系地址</Text>
                  </View>
                  <Text
                    style={styleAssign([color('#979797'), fSize(10),styles.utxc])}>{customer.detailAddress ? `${customer.detailAddress}` : '点击立即定位'}</Text>
                </View>
              </View>
            </View>
            <View style={styleAssign([wRatio(100)])}>
              <View style={styleAssign([styles.udr, styles.uac, styles.ujb,
                wRatio(100), h(44), bgColor(commonStyles.whiteColor), mt(12)])}>
                <View style={styleAssign([styles.uf1, styles.uac, styles.ujc, h(44)])}
                      onClick={() => {
                        console.log('点击了');
                        this.setState({currentIndex: 0});
                      }}>
                  <Text
                    style={styleAssign([fSize(15), color(currentIndex !== 0 ? '#343434' : '#E2BB7B')])}>轨迹</Text>
                </View>
                <View style={styleAssign([styles.uf1, styles.uac, styles.ujc, h(44)])}
                      onClick={() => {
                        this.setState({currentIndex: 1});
                      }}>
                  <Text
                    style={styleAssign([fSize(15), color(currentIndex !== 3 ? '#343434' : '#E2BB7B')])}>AI分析</Text>
                </View>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, styles.ujb, wRatio(100)])}>
                <View style={styleAssign([styles.uac, styles.ujc, styles.uf1])}>
                  <View
                    style={styleAssign([w(44), h(1), bgColor(currentIndex !== 0 ? commonStyles.whiteColor : '#E2BB7B')])}/>
                </View>
                <View style={styleAssign([styles.uac, styles.ujc, styles.uf1])}>
                  <View
                    style={styleAssign([w(44), h(1), bgColor(currentIndex !== 1 ? commonStyles.whiteColor : '#E2BB7B')])}/>
                </View>
              </View>
            </View>
            {childView}
          </ScrollView>
        }
        {
          showShareInvite && <ShareInvite cancelCallback={() => {
            this.setState({showShareInvite: false});
          }} confirmCallback={() => {
            this.setState({showShareInvite: false});
          }}/>
        }
      </CustomSafeAreaView>
    )
  }
}


export default RadarDetail
