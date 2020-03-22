"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename tequan.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 特权
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const index_1 = require("../../compoments/safe-area-view/index");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/tequan");
const components_1 = require("@tarojs/components");
const index_2 = require("../sub_pagecomponent/linear-gradient-view/index");
const index_3 = require("../sub_pagecomponent/level-item/index");
const index_4 = require("../sub_pagecomponent/taocan-item/index");
const httpurl_1 = require("../../api/httpurl");
const global_1 = require("../../const/global");
const navigation_bar_1 = require("../../compoments/navigation_bar");
let TeQuan = class TeQuan extends taro_1.Component {
    constructor(props) {
        super(props);
        /**
         * 指定config的类型声明为: Taro.Config
         *
         * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
         * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
         * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
         */
        this.config = {
            disableScroll: true
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/1
         * @function: 获取特权套餐
         */
        this.packageList = () => {
            let type = 'visitor';
            let { currentIndex } = this.state, packageList = [];
            if (currentIndex === 0) {
                type = 'visitor';
            }
            else if (currentIndex === 1) {
                type = 'connection';
            }
            this.props.packageList({ packageType: type }).then((res) => {
                if (res !== httpurl_1.NetworkState.FAIL) {
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].purchaseTime === 'seven_days') {
                            packageList.push({
                                packageId: res[i].id,
                                title: global_1.timeMap['seven_days'],
                                subTitle: '',
                                left: '到期￥198/季度续费，可取消',
                                price: res[i].price,
                                timeLimit: true
                            });
                        }
                        else if (res[i].purchaseTime === 'quarter') {
                            packageList.push({
                                packageId: res[i].id,
                                title: global_1.timeMap['quarter'],
                                subTitle: '（3个月）',
                                left: `￥${(res[i].price / 3).toFixed(0)}/月`,
                                price: res[i].price,
                            });
                        }
                        else if (res[i].purchaseTime === 'half_a_year') {
                            packageList.push({
                                packageId: res[i].id,
                                title: global_1.timeMap['half_a_year'],
                                subTitle: '（6个月）',
                                left: `￥${(res[i].price / 6).toFixed(0)}/月`,
                                price: res[i].price,
                            });
                        }
                        else if (res[i].purchaseTime === 'one_year') {
                            packageList.push({
                                packageId: res[i].id,
                                title: global_1.timeMap['one_year'],
                                subTitle: '（12个月）',
                                left: `￥${(res[i].price / 12).toFixed(0)}/月`,
                                price: res[i].price,
                            });
                        }
                    }
                    this.setState({ packageList, packageId: packageList.length !== 0 ? packageList[0].packageId : 0 });
                }
                console.log('获取特权套餐', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/1
         * @function: 购买套餐
         */
        this.purchasePackage = (packageId) => {
            this.viewRef && this.viewRef.showLoading();
            this.props.purchasePackage({ packageId }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    console.log('购买套餐', res);
                    taro_1.default.requestPayment({
                        timeStamp: res.timeStamp,
                        nonceStr: res.nonceStr,
                        package: res.package,
                        signType: res.signType,
                        paySign: res.paySign,
                        success(res) {
                            console.log('支付成功', res);
                        },
                        fail(res) {
                            console.log('支付失败', res);
                        }
                    });
                }
                console.log('获取特权套餐', res);
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log(this.viewRef);
        this.state = {
            packageId: 0,
            currentIndex: 0,
            title1: '获取人脉资源，增加客户来源',
            subtitle1: '开通人脉扩展功能，突破每日推送人脉名额限制 根据您的期望人脉选择及个人名片信息，精准推送人脉，提升获客率',
            title2: '特权介绍',
            subtitle2: '• 可查看更多人脉',
            packageList: [],
            scrollTop: 0
        };
    }
    componentDidShow() {
        this.packageList();
    }
    render() {
        let { packageId, scrollTop, title1, subtitle1, title2, subtitle2, packageList, currentIndex } = this.state;
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.upa, style_1.absT(0), style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor)])} scrollY onScroll={(e) => {
            this.setState({ scrollTop: e.detail.scrollTop });
            console.log(e.detail);
        }}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 287 : 267), style_1.mt(0)])}>
            <index_2.default style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 222 : 182)])}/>
            <components_1.Swiper style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(182), style_1.default.uac, style_1.default.upa, style_1.absB(0)])} onChange={(e) => {
            this.setState({ currentIndex: e.detail.current }, () => {
                this.packageList();
                if (this.state.currentIndex === 0) {
                    this.setState({
                        title1: '获取人脉资源，增加客户来源',
                        subtitle1: '开通人脉扩展功能，突破每日推送人脉名额限制 根据您的期望人脉选择及个人名片信息，精准推送人脉，提升获客率',
                        title2: '特权介绍',
                        subtitle2: '• 可查看更多人脉'
                    });
                }
                else if (this.state.currentIndex === 1) {
                    this.setState({
                        title1: '查看访客无限制',
                        subtitle1: '查看来访人员不再限制在7天内，开通此特权之后可查看所有访客信息，并获取专属个人访客分析',
                        title2: '特权介绍',
                        subtitle2: '• 可查看全部访客的信息'
                    });
                }
                else if (this.state.currentIndex === 2) {
                    this.setState({
                        title1: '开通店铺，展示更多产品',
                        subtitle1: '开通店铺之后您将拥有专属线上店铺，我们将为您免费装修店铺并上架您的产品',
                        title2: '特权介绍',
                        subtitle2: '• 可展示更多产品\n• 可进行线上产品购买交易'
                    });
                }
            });
        }}>
              {[
            {
                title: '结识更多人脉',
                subTitle: '会员每月增30个精准人脉推荐',
                bg: 'ico_tequan3.png',
                logo: 'ico_tequan3_logo.png',
                buttonTitle: '新用户1元试用',
                right: '最低￥198起'
            },
            {
                title: '查看全部访客',
                subTitle: '随时了解谁对你感兴趣',
                bg: 'ico_tequan1.png',
                logo: 'ico_tequan1_logo.png',
                buttonTitle: '新用户1元试用',
                right: '最低￥198起'
            }, {
                title: '开通店铺',
                subTitle: '提升你的产品线上推广效果',
                bg: 'ico_tequan2.png',
                logo: 'ico_tequan2_logo.png',
                buttonTitle: '联系客服联系客服',
                right: '免费装修店铺'
            }
        ].map((value, index) => {
            return <components_1.SwiperItem key={index}>
                    <index_3.default key={index} item={value}/>
                  </components_1.SwiperItem>;
        })}
            </components_1.Swiper>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.mt(16), style_1.default.udr])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(39), style_1.h(1), style_1.bgColor('#E4C28C')])}/>
            <components_1.Text style={datatool_1.styleAssign([style_1.ml(8), style_1.mr(8), style_1.color('#483311'), style_1.fSize(14)])}>功能详情</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.w(39), style_1.h(1), style_1.bgColor('#E4C28C')])}/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.pl(20), style_1.pr(20), style_1.mt(14)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(14)])}>{title1}</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(14), style_1.mt(6)])}>{subtitle1}</components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.pl(20), style_1.pr(20), style_1.mt(30),
            style_1.default.udr, style_1.default.ujb, style_1.default.uac])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(14)])}>{title2}</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/renmai_taocan_detail?type=${currentIndex === 0 ? 'renmai' : (currentIndex === 1 ? 'fangke' : 'shop')}&packageId=${packageList[0].packageId}`
            });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#E2BB7B'), style_1.fSize(14)])}>详情</components_1.Text>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(8)])} src={require('../../assets/ico_next_orange.png')}/>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(6), style_1.ml(20)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(14), style_1.ml(8)])}>{subtitle2}</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.mt(18), style_1.default.udr])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(39), style_1.h(1), style_1.bgColor('#E4C28C')])}/>
            <components_1.Text style={datatool_1.styleAssign([style_1.ml(8), style_1.mr(8), style_1.color('#483311'), style_1.fSize(14)])}>{`${currentIndex !== 2 ? '开通套餐推荐' : '开通优势介绍'}`}</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.w(39), style_1.h(1), style_1.bgColor('#E4C28C')])}/>
          </components_1.View>
          {currentIndex !== 2 && packageList.map((value, index) => {
            return <index_4.default key={index} item={value} onClick={() => {
                this.setState({ packageId: value.packageId });
            }} checked={value.packageId === packageId}/>;
        })}
          {currentIndex !== 2 && <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
              
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.uac, style_1.default.ujc, style_1.mt(20)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(44), style_1.radiusA(2), style_1.default.uac, style_1.default.ujc, style_1.bgColor('#E2BB7B')])} onClick={() => {
            this.purchasePackage(packageId);
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.whiteColor), style_1.fSize(16)])}>立即开通</components_1.Text>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.pl(20), style_1.pr(20), style_1.mt(17)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(13)])}>购买须知</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(13)])}>1.付款时向您的Apple ID账户收取费用
                  \n2.订阅到期或免费试用结束前24小时内，将按页面价格自动续订所选套餐时长；同一Apple ID仅能享有一次免费试用资格 \n3.如需取消自动续订在当前订阅周期结束至少24小时之前在iTunes
                  Store设置中关闭自动续订服务</components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.mb(46)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(13)])}>4.成为会员即表示同意</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#3476E0'), style_1.fSize(13)])}>《极致名片隐私政策》</components_1.Text>
                </components_1.View>
              </components_1.View>
            </components_1.View>}
          {currentIndex === 2 &&
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.pl(20), style_1.pr(20), style_1.mt(14)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(13)])}>1.用户只需通过填写基本信息提交申请，客服会主动联系用户为用户详细介绍开通店铺相关事项及收费标准；\n2.平台会根据不同用户的需求，定制专属店铺，便于商品上架和管理；\n3.用户同意开通店铺后，我们将为用户量身打造专属店铺，并根据商品相应风格免费为用户装修店铺；</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.uac, style_1.default.ujc, style_1.mt(20)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(44), style_1.radiusA(2), style_1.default.uac, style_1.default.ujc, style_1.bgColor('#E2BB7B')])} onClick={() => {
                this.purchasePackage(packageId);
            }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.whiteColor), style_1.fSize(16)])}>已申请</components_1.Text>
                </components_1.View>
              </components_1.View>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(13), style_1.mt(17)])}>• 申请提交成功之后，我们客服会在12小时内联系您</components_1.Text>
            </components_1.View>}
        </components_1.ScrollView>
        <navigation_bar_1.default style={datatool_1.styleAssign([style_1.default.upa, style_1.absT(0), style_1.op((300 - scrollTop) / 300)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.ujb, style_1.default.udr, style_1.default.uac])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={require('../../assets/ico_back_white.png')} onClick={() => {
            taro_1.default.navigateBack();
        }}/>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(19), style_1.color(style_1.commonStyles.whiteColor)])}>特权开通</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.bgColor(style_1.commonStyles.transparent), style_1.mr(20)])}/>
          </components_1.View>
        </navigation_bar_1.default>
      </index_1.default>);
    }
};
TeQuan = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], TeQuan);
exports.default = TeQuan;
//# sourceMappingURL=tequan.jsx.map