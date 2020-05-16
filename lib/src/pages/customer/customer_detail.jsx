"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename customer_ziliao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/11
 * @Description: 客户详情界面
 */
const taro_1 = require("@tarojs/taro");
const index_1 = require("../../compoments/safe-area-view/index");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/customer");
const loginActions = require("../../actions/login");
const radarActions = require("../../actions/radar");
const index_2 = require("../../compoments/top-header/index");
const components_1 = require("@tarojs/components");
const index_3 = require("../../compoments/bottom-buton/index");
const httpurl_1 = require("../../api/httpurl");
const delete_notice_1 = require("../../compoments/delete-notice");
const share_invite_1 = require("../../pages/component/share-invite");
const index_4 = require("../../compoments/trace-item/index");
let CustomerDetail = class CustomerDetail extends taro_1.Component {
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    constructor(props) {
        super(props);
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/4/12
         * @function: 雷达AI分析 兴趣和行为占比
         */
        this.interestBehaviorActive = () => {
            this.viewRef && this.viewRef.showLoading();
            this.props.interestBehaviorActive({
                traceUserId: this.state.customer.customerUserId,
                startDate: datatool_1.getToday(),
                endDate: datatool_1.getToday()
            }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('雷达AI分析 兴趣和行为占比', res);
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({ active: res.active, behaviorTrace: res.behaviorTrace, interest: res.interest });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/14
         * @function: 获取客户详细资料
         */
        this.getCustomerDetail = () => {
            this.viewRef && this.viewRef.showLoading();
            this.props.getCustomerDetail({ id: this.$router.params.id }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('获取客户详细资料', res);
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({ customer: res }, () => {
                        this.followUpList();
                        if (res.customerUserId) {
                            this.interestBehaviorActive();
                            this.traceList();
                        }
                    });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/28
         * @function:
         */
        this.followUpList = () => {
            console.log('查询客户跟进信息记录');
            this.props.followUpList({ id: this.state.customer.id }).then((res) => {
                console.log('查询客户跟进信息记录', res);
                if (res && res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({ flowUpList: res });
                }
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/28
         * @function:雷达详情访问轨迹
         */
        this.traceList = () => {
            console.log('雷达详情访问轨迹');
            this.props.traceList({ traceUserId: this.state.customer.customerUserId }).then((res) => {
                console.log('雷达详情访问轨迹', res);
                if (res && res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({ traceList: res.list });
                }
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/14
         * @function: 删除客户
         */
        this.deleteCustomer = (id) => {
            this.viewRef && this.viewRef.showLoading();
            this.props.deleteCustomer({ id }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('删除成功');
                }
                taro_1.default.eventCenter.trigger('refreshCustomerList');
                taro_1.default.navigateBack();
                console.log('删除信息', res);
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        this.state = {
            //@ts-ignore
            customer: null,
            showOperate: false,
            currentIndex: 0,
            flowUpList: [],
            traceList: [],
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
        };
    }
    componentDidShow() {
        this.getCustomerDetail();
    }
    componentWillUnmount() {
    }
    //@ts-ignore
    onShareAppMessage(res) {
        return {
            title: `快来使用极易推小程序吧`,
            path: `/pages/businesscard`
        };
    }
    render() {
        let { showOperate, customer, currentIndex, flowUpList, showDeleteNotice, showShareInvite, behaviorTrace, traceList } = this.state;
        let childView;
        if (currentIndex === 0) {
            childView = <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10)])}>
        {traceList.map((value, index) => {
                return <index_4.default item={value} key={index} name={customer.name}/>;
            })}
      </components_1.View>;
        }
        else if (currentIndex === 1) {
            childView = <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10)])}>
        {flowUpList.map((value, index) => {
                return <components_1.View key={index} style={datatool_1.styleAssign([style_1.wRatio(95), { marginLeft: '2.5%' }, style_1.hRatio(60)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.pl(16), style_1.pr(16), style_1.pt(10), style_1.pb(10)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(27), style_1.h(27)])} src={`${httpurl_1.cloudBaseUrl}ico_default.png`}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>{datatool_1.transformTime(value.createTime)}</components_1.Text>
                </components_1.View>
                <components_1.Text style={datatool_1.styleAssign([style_1.mt(10), style_1.fSize(12), style_1.color('#343434')])} className={'.textStyle'}>{value.followUpContent}</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor('#F7F7F7')])}/>
            </components_1.View>;
            })}
      </components_1.View>;
        }
        else if (currentIndex === 2) {
            childView = <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac])}>
        {(customer.label.length !== 0 || customer.intentionGrade.length !== 0) &&
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4), style_1.mt(8), style_1.pl(16), style_1.pt(13)])}>
            {customer.label.length !== 0 && <components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>
                    对Ta的标签
                  </components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20)])}>
                    (最多添加10个标签)
                  </components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.mt(8), style_1.default.uWrap])}>
                  {datatool_1.parseData(customer.label).map((value, index) => {
                    return (<components_1.View key={index} style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.padding([6, 15, 6, 15]), style_1.radiusA(14)])}>
                        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.radiusA(14),
                        style_1.padding([6, 15, 6, 15]), style_1.bgColor('#E7E7E7')])}>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{value}</components_1.Text>
                        </components_1.View>
                      </components_1.View>);
                })}
                </components_1.View>
              </components_1.View>}
            {customer.intentionGrade.length !== 0 && <components_1.View style={datatool_1.styleAssign([style_1.mt(30)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>
                    等级标签
                  </components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.mt(8), style_1.default.uWrap, style_1.mb(20)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.padding([6, 15, 6, 15]), style_1.radiusA(14)])}>
                    <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.radiusA(14),
                    style_1.padding([6, 15, 6, 15]), style_1.bgColor('#E7E7E7')])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{customer.intentionGrade}</components_1.Text>
                    </components_1.View>
                  </components_1.View>
                </components_1.View>
              </components_1.View>}
          </components_1.View>}
      </components_1.View>;
        }
        else if (currentIndex === 3) {
            childView = <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4), style_1.mt(8), style_1.default.uac])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.wRatio(100), style_1.h(48), style_1.radiusA(4)])} onClick={() => {
                if (!this.state.active || !this.state.interest) {
                    datatool_1.toast('暂无该用户AI分析');
                    return;
                }
                taro_1.default.navigateTo({
                    url: `/pages/customer/ai_analysis?userId=${customer.id}&active=${JSON.stringify(this.state.active)}&interest=${JSON.stringify(this.state.interest)}`
                });
            }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434'), style_1.ml(16)])}>
              图表展示
            </components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mr(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797')])}>
                前往查看
              </components_1.Text>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
            </components_1.View>

          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4), style_1.mt(8), style_1.mb(20)])}>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434'), style_1.ml(16), style_1.mt(16)])}>
            客户行为轨迹
          </components_1.Text>
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
                return <components_1.View key={index} style={datatool_1.styleAssign([style_1.mt(index === 0 ? 30 : 20), style_1.mb(index === 5 ? 20 : 0)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.ml(16)])}>
                  {value.title}
                </components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(16)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(246), style_1.h(6), style_1.bgColor('#E5E5E5'), style_1.radiusA(8), style_1.default.udr, style_1.default.uac])}>
                    <components_1.View style={datatool_1.styleAssign([style_1.wRatio(value.progress), style_1.hRatio(100), style_1.radiusA(8), style_1.bgColor('#E2BB7B')])}/>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.ml(20)])}>
                    {`${value.count}次`}
                  </components_1.Text>
                </components_1.View>
              </components_1.View>;
            })}
        </components_1.View>
      </components_1.View>;
        }
        return (<index_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <index_2.default title={''}/>
        {customer && <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.wRatio(100), style_1.default.ujb, style_1.pl(20), style_1.pr(20),
            style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.w(40), style_1.h(40)])} onClick={() => {
            this.setState({ showOperate: true });
        }}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(19), style_1.h(4)])} src={`${httpurl_1.cloudBaseUrl}ico_dot.png`}/>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(98), style_1.h(98)])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(98), style_1.h(98), style_1.radiusA(49)])} src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.default.upa, style_1.absB(0), style_1.absR(0)])} src={customer.sex === 1 ? `${httpurl_1.cloudBaseUrl}ico_nan.png` : `${httpurl_1.cloudBaseUrl}ico_nv.png`}/>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(22), style_1.color('#343434'), style_1.mt(11)])}>{customer.name}</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>{customer.company}</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>来自</components_1.Text>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#E2BB7B')])}>{customer.source}</components_1.Text>
                  </components_1.View>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.h(25), style_1.mt(15)])} onClick={() => {
            console.log(customer);
            taro_1.default.navigateTo({
                url: `/pages/customer/customer_ziliao?id=${customer.id}`
            });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434')])}>资料</components_1.Text>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
                </components_1.View>
              </components_1.View>
              
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(95), style_1.default.uac, style_1.default.udr, style_1.h(100), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4),
            { boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5' }])} onClick={() => {
            taro_1.default.makePhoneCall({
                phoneNumber: customer.phone
            });
        }}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(24), style_1.h(22)])} src={require('../../assets/ico_mibile_gray.png')}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12), style_1.default.utxc])}>拨打电话</components_1.Text>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12)])}>{customer.phone}</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4), style_1.ml(15),
            { boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5' }])} onClick={() => {
            taro_1.default.setClipboardData({
                data: customer.wechat
            });
            // Taro.getClipboardData({
            //   success(res) {
            //     console.log('拷贝文件', res.data) // data
            //   }
            // })
        }}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(24), style_1.h(22)])} src={require('../../assets/ico_wechat_gray.png')}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>加微信</components_1.Text>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12), style_1.default.utxc])}>{`${customer.wechat ? customer.wechat : '点击添加微信'}`}</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4), style_1.ml(15),
            { boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5' }])} onClick={() => {
            taro_1.default.openLocation({
                latitude: customer.latitude,
                longitude: customer.longitude,
                scale: 18
            });
        }}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(24), style_1.h(22)])} src={require('../../assets/ico_location_gray.png')}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>联系地址</components_1.Text>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(10), style_1.default.utxc])}>{customer.detailAddress ? `${customer.detailAddress}` : '点击立即定位'}</components_1.Text>
                </components_1.View>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.default.ujb,
            style_1.wRatio(100), style_1.h(44), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(12)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.h(44)])} onClick={() => {
            this.setState({ currentIndex: 0 });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color(currentIndex !== 0 ? '#343434' : '#E2BB7B')])}>轨迹</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.h(44)])} onClick={() => {
            this.setState({ currentIndex: 1 });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color(currentIndex !== 1 ? '#343434' : '#E2BB7B')])}>跟进</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.h(44)])} onClick={() => {
            this.setState({ currentIndex: 2 });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color(currentIndex !== 2 ? '#343434' : '#E2BB7B')])}>标签</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.h(44)])} onClick={() => {
            this.setState({ currentIndex: 3 });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color(currentIndex !== 3 ? '#343434' : '#E2BB7B')])}>AI分析</components_1.Text>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.wRatio(100)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(44), style_1.h(1), style_1.bgColor(currentIndex !== 0 ? style_1.commonStyles.whiteColor : '#E2BB7B')])}/>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(44), style_1.h(1), style_1.bgColor(currentIndex !== 1 ? style_1.commonStyles.whiteColor : '#E2BB7B')])}/>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(44), style_1.h(1), style_1.bgColor(currentIndex !== 2 ? style_1.commonStyles.whiteColor : '#E2BB7B')])}/>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(44), style_1.h(1), style_1.bgColor(currentIndex !== 3 ? style_1.commonStyles.whiteColor : '#E2BB7B')])}/>
                </components_1.View>
              </components_1.View>
            </components_1.View>
            {childView}
          </components_1.ScrollView>}
        
        {currentIndex === 1 && <index_3.default title={'添加跟进'} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/customer/add_genjin?itemData=${JSON.stringify(customer)}`
            });
        }}/>}
        
        {currentIndex === 2 &&
            <index_3.default title={(customer.label.length !== 0 || customer.intentionGrade.length !== 0) ? '修改标签' : '添加标签'} onClick={() => {
                taro_1.default.navigateTo({
                    url: `/pages/customer/add_tags?itemData=${JSON.stringify(customer)}&label=${customer.label}&intentionGrade=${customer.intentionGrade}`
                });
            }}/>}
        
        {currentIndex === 3 &&
            <index_3.default title={'拨打电话'} onClick={() => {
                taro_1.default.makePhoneCall({
                    phoneNumber: customer.phone
                });
            }}/>}
        {showDeleteNotice && <delete_notice_1.default title={'删除提醒'} subTitle={'确认将客户移除？'} cancelCallback={() => {
            this.setState({ showDeleteNotice: false });
        }} confirmCallback={() => {
            this.deleteCustomer(customer.id);
        }}/>}
        {showShareInvite && <share_invite_1.default cancelCallback={() => {
            this.setState({ showShareInvite: false });
        }} confirmCallback={() => {
            this.setState({ showShareInvite: false });
        }}/>}
        {showOperate && <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), { position: 'fixed' }, style_1.absT(0)])} onClick={() => {
            this.setState({ showOperate: false });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.op(0.3), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.bgColor(style_1.commonStyles.colorTheme)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(185), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusTL(10), style_1.radiusTR(10),
            style_1.default.upa, style_1.absB(0)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.setState({ showOperate: false }, () => {
                if (customer.type === 1) {
                    taro_1.default.navigateTo({
                        url: `/pages/businesscard/other_businesscard?userId=${this.$router.params.userId}`
                    });
                }
                else {
                    this.setState({ showShareInvite: true });
                }
            });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#E2BB7B'), style_1.fSize(18)])}>查看名片</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.setState({ showDeleteNotice: true });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#29292E'), style_1.fSize(18)])}>移除客户</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(5), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#29292E'), style_1.fSize(18)])}>取消</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>}
      </index_1.default>);
    }
};
CustomerDetail = __decorate([
    redux_1.connect(state => state.login, Object.assign(actions, loginActions, radarActions))
], CustomerDetail);
exports.default = CustomerDetail;
//# sourceMappingURL=customer_detail.jsx.map