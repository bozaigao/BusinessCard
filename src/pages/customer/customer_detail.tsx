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
  ml,
  mt,
  op,
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
import {parseData, styleAssign, toast, transformTime} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import * as loginActions from "../../actions/login";
import TopHeader from "../../compoments/top-header/index";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import {CustomerModel, FlowUpListModel} from "../../const/global";
import BottomButon from "../../compoments/bottom-buton/index";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import './index.scss';
import DeleteNoticeModal from "../../compoments/delete-notice";
import ShareInvite from "../../pages/component/share-invite";

interface Props {
  deleteCustomer?: any;
  followUpList?: any;
  //获取用户信息
  getCustomerDetail: any;
}

interface State {
  showOperate: boolean;
  showDeleteNotice: boolean;
  showShareInvite: boolean;
  customer: CustomerModel
  currentIndex: number;
  flowUpList: FlowUpListModel[];
}

@connect(state => state.login, Object.assign(actions, loginActions))
class CustomerDetail extends Component<Props, State> {
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
    console.log('呵呵', parseData(this.$router.params.itemData));

    this.state = {
      //@ts-ignore
      customer: parseData(this.$router.params.itemData),
      showOperate: false,
      currentIndex: 0,
      flowUpList: [],
      showDeleteNotice: false,
      showShareInvite: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.followUpList();
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
    let {showOperate, customer, currentIndex, flowUpList, showDeleteNotice, showShareInvite} = this.state;
    let childView;

    if (currentIndex === 0) {
      childView = <View/>;
    } else if (currentIndex === 1) {
      childView = <View style={styleAssign([wRatio(100), mt(10)])}>
        {
          flowUpList.map((value: FlowUpListModel, index) => {
            return <View key={index}
                         style={styleAssign([wRatio(95), {marginLeft: '2.5%'}, hRatio(60), bgColor('red')])}>
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
      childView = <View/>;
    } else if (currentIndex === 3) {
      childView = <View/>;
    } else {
      childView = <View/>
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
                    <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>拨打电话</Text>
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
                    style={styleAssign([color('#979797'), fSize(12)])}>{`${customer.wechat ? customer.wechat : '点击添加微信'}`}</Text>
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
                    style={styleAssign([color('#979797'), fSize(10)])}>{customer.detailAddress  ? `${customer.detailAddress}` : '点击立即定位'}</Text>
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
        {
          showDeleteNotice && <DeleteNoticeModal
            title={'删除提醒'}
            subTitle={'删除后，客户数据将无法恢复，确定删除？'}
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
