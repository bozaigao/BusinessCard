/**
 * @filename customer_ziliao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/11
 * @Description: 客户详情界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
import {
  absB,
  absR,
  absT,
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
  ml, mr,
  mt,
  op,
  padding,
  pb,
  pl,
  pr,
  pt,
  radiusA,
  radiusTL,
  radiusTR,
  w,
  wRatio
} from "../../utils/style";
import {getToday, parseData, styleAssign, toast, transformTime} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import * as loginActions from "../../actions/login";
import * as radarActions from "../../actions/radar";
import TopHeader from "../../compoments/top-header/index";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import {CustomerModel, FlowUpListModel} from "../../const/global";
import BottomButon from "../../compoments/bottom-buton/index";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import DeleteNoticeModal from "../../compoments/delete-notice";
import ShareInvite from "../../pages/component/share-invite";

interface Props {
  deleteCustomer?: any;
  followUpList?: any;
  //获取用户信息
  getCustomerDetail: any;
  interestBehaviorActive: any;
}

interface State {
  showOperate: boolean;
  showDeleteNotice: boolean;
  showShareInvite: boolean;
  customer: CustomerModel
  currentIndex: number;
  flowUpList: FlowUpListModel[];
  active: any;
  behaviorTrace: any;
  interest: any;
}

@connect(state => state.login, Object.assign(actions, loginActions, radarActions))
class CustomerDetail extends Component<Props, State> {
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
      showOperate: false,
      currentIndex: 0,
      flowUpList: [],
      showDeleteNotice: false,
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

  componentDidShow() {
    this.getCustomerDetail();
  }


  componentWillUnmount() {
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/4/12
   * @function: 雷达AI分析 兴趣和行为占比
   */
  interestBehaviorActive = () => {
    this.viewRef && this.viewRef.showLoading();
    this.props.interestBehaviorActive({
      traceUserId: this.state.customer.id,
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

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/14
   * @function: 获取客户详细资料
   */
  getCustomerDetail = () => {
    this.viewRef && this.viewRef.showLoading();
    this.props.getCustomerDetail({id: this.$router.params.id}).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('获取客户详细资料', res);
      if (res !== NetworkState.FAIL) {
        this.setState({customer: res}, () => {
          this.interestBehaviorActive();
          this.followUpList();
        });
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }

  //@ts-ignore
  onShareAppMessage(res) {
    return {
      title: `快来使用极致推小程序吧`,
      path: `/pages/businesscard`
    }
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/28
   * @function:
   */
  followUpList = () => {
    console.log('查询客户跟进信息记录');
    this.props.followUpList({id: this.state.customer.id}).then((res) => {
      console.log('查询客户跟进信息记录', res);
      if (res && res !== NetworkState.FAIL) {
        this.setState({flowUpList: res});
      }

    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/14
   * @function: 删除客户
   */
  deleteCustomer = (id) => {
    this.viewRef && this.viewRef.showLoading();
    this.props.deleteCustomer({id}).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('删除成功');
      }
      Taro.eventCenter.trigger('refreshCustomerList');
      Taro.navigateBack();
      console.log('删除信息', res);
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {showOperate, customer, currentIndex, flowUpList, showDeleteNotice, showShareInvite, behaviorTrace} = this.state;
    let childView;

    if (currentIndex === 0) {
      childView = <View/>;
    } else if (currentIndex === 1) {
      childView = <View style={styleAssign([wRatio(100), mt(10)])}>
        {
          flowUpList.map((value: FlowUpListModel, index) => {
            return <View key={index}
                         style={styleAssign([wRatio(95), {marginLeft: '2.5%'}, hRatio(60)])}>
              <View
                style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), pl(16), pr(16), pt(10), pb(10)])}>
                <View style={styleAssign([styles.udr, styles.uac, styles.ujb])}>
                  <Image style={styleAssign([w(27), h(27)])} src={`${cloudBaseUrl}ico_default.png`}/>
                  <Text style={styleAssign([fSize(12), color('#979797')])}>{transformTime(value.createTime)}</Text>
                </View>
                <Text style={styleAssign([mt(10), fSize(12), color('#343434')])}
                      className={'.textStyle'}>{value.followUpContent}</Text>
              </View>
              <View style={styleAssign([wRatio(100), h(1), bgColor('#F7F7F7')])}/>
            </View>;
          })
        }
      </View>;
    } else if (currentIndex === 2) {
      childView = <View style={styleAssign([styles.uf1, styles.uac])}>
        {
          (customer.label.length !== 0 || customer.intentionGrade.length !== 0) &&
          <View style={styleAssign([wRatio(90), bgColor(commonStyles.whiteColor), radiusA(4), mt(8), pl(16), pt(13)])}>
            {
              customer.label.length !== 0 && <View>
                <View style={styleAssign([styles.uac, styles.udr])}>
                  <Text style={styleAssign([fSize(16), color('#343434')])}>
                    对Ta的标签
                  </Text>
                  <Text style={styleAssign([fSize(12), color('#979797'), ml(20)])}>
                    (最多添加10个标签)
                  </Text>
                </View>
                <View style={styleAssign([wRatio(100), styles.udr, mt(8), styles.uWrap])}>
                  {
                    parseData(customer.label).map((value, index) => {
                      return (<View
                        key={index}
                        style={styleAssign([styles.uac, styles.ujc, padding([6, 15, 6, 15]), radiusA(14)])}>
                        <View style={styleAssign([styles.uac, styles.ujc, radiusA(14),
                          padding([6, 15, 6, 15]), bgColor('#E7E7E7')])}>
                          <Text style={styleAssign([fSize(12), color('#343434')])}>{value}</Text>
                        </View>
                      </View>);
                    })
                  }
                </View>
              </View>
            }
            {
              customer.intentionGrade.length !== 0 && <View style={styleAssign([mt(30)])}>
                <View style={styleAssign([styles.uac, styles.udr])}>
                  <Text style={styleAssign([fSize(16), color('#343434')])}>
                    等级标签
                  </Text>
                </View>
                <View style={styleAssign([wRatio(100), styles.udr, mt(8), styles.uWrap, mb(20)])}>
                  <View
                    style={styleAssign([styles.uac, styles.ujc, padding([6, 15, 6, 15]), radiusA(14)])}>
                    <View style={styleAssign([styles.uac, styles.ujc, radiusA(14),
                      padding([6, 15, 6, 15]), bgColor('#E7E7E7')])}>
                      <Text style={styleAssign([fSize(12), color('#343434')])}>{customer.intentionGrade}</Text>
                    </View>
                  </View>
                </View>
              </View>
            }
          </View>
        }
      </View>;
    } else if (currentIndex === 3) {
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
          {
            [{
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
              <View style={styleAssign([styles.udr, wRatio(100), styles.ujb, pl(20), pr(20),
                bgColor(commonStyles.whiteColor)])}>
                <View style={styleAssign([styles.uac, styles.ujc, w(40), h(40)])}
                      onClick={() => {
                        this.setState({showOperate: true});
                      }}>
                  <Image style={styleAssign([w(19), h(4)])} src={`${cloudBaseUrl}ico_dot.png`}/>
                </View>
                <View style={styleAssign([styles.uac])}>
                  <View style={styleAssign([w(98), h(98)])}>
                    <Image style={styleAssign([w(98), h(98), radiusA(49)])}
                           src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${cloudBaseUrl}ico_default.png`}/>
                    <Image style={styleAssign([w(20), h(20), styles.upa, absB(0), absR(0)])}
                           src={customer.sex === 1 ? `${cloudBaseUrl}ico_nan.png` : `${cloudBaseUrl}ico_nv.png`}/>
                  </View>
                  <Text style={styleAssign([fSize(22), color('#343434'), mt(11)])}>{customer.name}</Text>
                  <Text style={styleAssign([fSize(14), color('#727272')])}>{customer.company}</Text>
                  <View style={styleAssign([styles.uac, styles.udr])}>
                    <Text style={styleAssign([fSize(12), color('#979797')])}>来自</Text>
                    <Text style={styleAssign([fSize(12), color('#E2BB7B')])}>{customer.source}</Text>
                  </View>
                </View>
                <View style={styleAssign([styles.udr, styles.uac, h(25), mt(15)])}
                      onClick={() => {
                        console.log(customer)
                        Taro.navigateTo({
                          url: `/pages/customer/customer_ziliao?id=${customer.id}`
                        });
                      }}>
                  <Text style={styleAssign([fSize(15), color('#343434')])}>资料</Text>
                  <Image style={styleAssign([w(7), h(12), ml(8)])}
                         src={`${cloudBaseUrl}ico_next.png`}/>
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
                    <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12),styles.utxc])}>拨打电话</Text>
                  </View>
                  <Text style={styleAssign([color('#979797'), fSize(12)])}>{customer.phone}</Text>
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
                    style={styleAssign([fSize(15), color(currentIndex !== 1 ? '#343434' : '#E2BB7B')])}>跟进</Text>
                </View>
                <View style={styleAssign([styles.uf1, styles.uac, styles.ujc, h(44)])}
                      onClick={() => {
                        this.setState({currentIndex: 2});
                      }}>
                  <Text
                    style={styleAssign([fSize(15), color(currentIndex !== 2 ? '#343434' : '#E2BB7B')])}>标签</Text>
                </View>
                <View style={styleAssign([styles.uf1, styles.uac, styles.ujc, h(44)])}
                      onClick={() => {
                        this.setState({currentIndex: 3});
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
                <View style={styleAssign([styles.uac, styles.ujc, styles.uf1])}>
                  <View
                    style={styleAssign([w(44), h(1), bgColor(currentIndex !== 2 ? commonStyles.whiteColor : '#E2BB7B')])}/>
                </View>
                <View style={styleAssign([styles.uac, styles.ujc, styles.uf1])}>
                  <View
                    style={styleAssign([w(44), h(1), bgColor(currentIndex !== 3 ? commonStyles.whiteColor : '#E2BB7B')])}/>
                </View>
              </View>
            </View>
            {childView}
          </ScrollView>
        }
        {/*添加跟进*/}
        {
          currentIndex === 1 && <BottomButon title={'添加跟进'} onClick={() => {
            Taro.navigateTo({
              url: `/pages/customer/add_genjin?itemData=${JSON.stringify(customer)}`
            });
          }}/>
        }
        {/*添加标签*/}
        {
          currentIndex === 2 &&
          <BottomButon title={(customer.label.length !== 0 || customer.intentionGrade.length !== 0) ? '修改标签' : '添加标签'}
                       onClick={() => {
                         Taro.navigateTo({
                           url: `/pages/customer/add_tags?itemData=${JSON.stringify(customer)}&label=${customer.label}&intentionGrade=${customer.intentionGrade}`
                         });
                       }}/>
        }
        {/*拨打电话*/}
        {
          currentIndex === 3 &&
          <BottomButon title={'拨打电话'}
                       onClick={() => {
                         Taro.makePhoneCall({
                           phoneNumber: customer.phone
                         })
                       }}/>
        }
        {
          showDeleteNotice && <DeleteNoticeModal
            title={'删除提醒'}
            subTitle={'确认将客户移除？'}
            cancelCallback={() => {
              this.setState({showDeleteNotice: false});
            }
            } confirmCallback={() => {
            this.deleteCustomer(customer.id);
          }
          }/>
        }
        {
          showShareInvite && <ShareInvite cancelCallback={() => {
            this.setState({showShareInvite: false});
          }} confirmCallback={() => {
            this.setState({showShareInvite: false});
          }}/>
        }
        {
          showOperate && <View style={styleAssign([wRatio(100), hRatio(100), {position: 'fixed'}, absT(0)])}
                               onClick={() => {
                                 this.setState({showOperate: false});
                               }}>
            <View
              style={styleAssign([wRatio(100), hRatio(100), op(0.3), bgColor(commonStyles.whiteColor), bgColor(commonStyles.colorTheme)])}/>
            <View
              style={styleAssign([wRatio(100), h(185), bgColor(commonStyles.whiteColor), radiusTL(10), radiusTR(10),
                styles.upa, absB(0)])}>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}
                    onClick={() => {
                      this.setState({showOperate: false}, () => {
                        if (customer.type === 1) {
                          Taro.navigateTo({
                            url: `/pages/businesscard/other_businesscard?userId=${this.$router.params.userId}`
                          });
                        } else {
                          this.setState({showShareInvite: true});
                        }
                      });
                    }}>
                <Text style={styleAssign([color('#E2BB7B'), fSize(18)])}>查看名片</Text>
              </View>
              <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}
                    onClick={() => {
                      this.setState({showDeleteNotice: true});
                    }}>
                <Text style={styleAssign([color('#29292E'), fSize(18)])}>移除客户</Text>
              </View>
              <View style={styleAssign([wRatio(100), h(5), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}>
                <Text style={styleAssign([color('#29292E'), fSize(18)])}>取消</Text>
              </View>
            </View>
          </View>
        }
      </CustomSafeAreaView>
    )
  }
}


export default CustomerDetail
