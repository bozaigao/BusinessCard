"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename other_businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/23
 * @Description: 别人的名片
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
//@ts-ignore
const index_1 = require("../../compoments/safe-area-view/index");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/task_center");
const loginActions = require("../../actions/login");
const businessCardActions = require("../../actions/business_card");
const radarActions = require("../../actions/radar");
const visitorActions = require("../../actions/visitor");
const index_2 = require("./component/personal-info/index");
const index_3 = require("./component/my-goods/index");
const index_4 = require("./component/jizhi-card/index");
const index_5 = require("./component/my-business/index");
const index_6 = require("../../compoments/touchable-button/index");
const index_7 = require("../component/share-modal/index");
const httpurl_1 = require("../../api/httpurl");
const index_8 = require("../../compoments/navigation_bar/index");
const index_9 = require("./component/other-business-card-guide/index");
const index_10 = require("../../compoments/my-photo/index");
const card_style1_1 = require("../../compoments/card-style1");
const card_style2_1 = require("../../compoments/card-style2");
const card_style3_1 = require("../../compoments/card-style3");
const card_style4_1 = require("../../compoments/card-style4");
const card_style5_1 = require("../../compoments/card-style5");
const wenhou_modal_1 = require("../../compoments/wenhou-modal");
const multi_line_text_1 = require("../../compoments/multi_line_text");
let OtherBusinesscard = class OtherBusinesscard extends taro_1.Component {
    constructor(props) {
        super(props);
        /**
         * 指定config的类型声明为: Taro.Config
         *
         * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
         * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
         * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
         */
        this.config = {};
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/5/4
         * @function: 获取公司推荐名片
         */
        this.getCompanyCard = () => {
            this.props.getCompanyCard().then((res) => {
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({ companyCardList: res });
                }
                console.log('获取公司推荐名片', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/4/18
         * @function: 新增访客记录
         */
        this.addVisitor = (type) => {
            this.props.addVisitor({ visitorUserId: this.$router.params.userId, visitContent: type }).then((res) => {
                console.log('新增访客记录', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/4/6
         * @function: 新增行为轨迹
         */
        this.addRadarTrace = (behaviorType, goodsId) => {
            let params = {
                userId: this.state.userInfo.id,
                behaviorType,
            }, duration = this.duration;
            if (goodsId) {
                Object.assign(params, { goodsId });
            }
            if (duration) {
                Object.assign(params, { duration });
            }
            console.log('新增行为轨迹参数', params);
            this.props.addRadarTrace(params).then((res) => {
                if (res !== httpurl_1.NetworkState.FAIL) {
                }
                console.log('新增行为轨迹', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/25
         * @function: 获取用户的设置信息
         */
        this.userSettingGet = () => {
            this.props.userSettingGet({ userId: this.state.userInfo.id }).then((res) => {
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({
                        hidePhone: res.phone,
                        hideWechat: res.wechat,
                        hideEmail: res.email,
                        hideAddress: res.address,
                        cardStyle: res.cardStyle
                    });
                }
                console.log('获取用户的设置信息', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/21
         * @function: 查询用户访客和收藏数
         */
        this.getCardHolderVisitorRecord = () => {
            this.props.getCardHolderVisitorRecord({ userId: this.$router.params.userId }).then((res) => {
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({
                        holderCount: res.holderCount,
                        visitorCount: res.visitorCount,
                        visitorList: res.visitorList
                    });
                }
                console.log('查询用户访客和收藏数', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/16
         * @function: 更新我收藏的名片
         */
        this.updateMyCollect = (type, collectedUserId) => {
            this.viewRef.showLoading();
            this.props.updateMyCollect({ type, collectedUserId }).then((res) => {
                this.viewRef.hideLoading();
                console.log('更新我收藏的名片', res);
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('收藏成功');
                }
            }).catch(e => {
                this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/29
         * @function: 获取用户信息
         */
        this.getUserInfoById = () => {
            console.log('获取用户信息');
            this.props.getUserInfoById({ userId: this.$router.params.userId }).then((res) => {
                this.setState({ userInfo: res }, () => {
                    this.userSettingGet();
                });
                console.log('获取用户信息', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        this.avatar = props.userInfo.avatar;
        this.duration = 0;
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
            showHomeWenHouYu: false,
            showSchoolWenHouYu: false,
        };
    }
    componentDidMount() {
        console.log('自己的数据', this.props.userInfo);
        console.log(this.viewRef);
        this.getUserInfoById();
        this.getCardHolderVisitorRecord();
        let showGuide = datatool_1.get('other_business_guide');
        this.setState({ showGuide: !showGuide });
        this.timer = setInterval(() => {
            this.duration++;
            console.log('读秒', this.duration);
        }, 1000);
    }
    componentWillMount() {
        this.timer && clearInterval(this.timer);
        this.addVisitor('card');
        this.getCompanyCard();
    }
    componentWillUnmount() {
        taro_1.default.eventCenter.off('showJiFenModal');
        console.log('componentWillUnmount');
    }
    //@ts-ignore
    onShareAppMessage(res) {
        console.log('名片分享');
        this.addRadarTrace('share_card');
        return {
            title: `${this.state.userInfo.name}的名片分享`,
            path: `/pages/businesscard/other_businesscard?userId=${this.state.userInfo.id}`
        };
    }
    render() {
        let { showShare, userInfo, showGuide, holderCount, visitorCount, visitorList, cardStyle, hidePhone, hideWechat, hideEmail, hideAddress, showHomeWenHouYu, showSchoolWenHouYu, companyCardList } = this.state, visitorListSub;
        if (visitorList.length > 5) {
            visitorListSub = visitorList.slice(0, 6);
        }
        else {
            visitorListSub = visitorList;
        }
        //@ts-ignore
        let cardChild = null;
        if (cardStyle === '0') {
            //@ts-ignore
            cardChild = <card_style1_1.default userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0} hideAddress={hideAddress === 0} hideEmail={hideEmail === 0} hideWechat={hideWechat === 0}/>;
        }
        else if (cardStyle === '1') {
            //@ts-ignore
            cardChild = <card_style2_1.default userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0} hideAddress={hideAddress === 0} hideEmail={hideEmail === 0} hideWechat={hideWechat === 0}/>;
        }
        else if (cardStyle === '2') {
            //@ts-ignore
            cardChild = <card_style3_1.default userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0} hideAddress={hideAddress === 0} hideEmail={hideEmail === 0} hideWechat={hideWechat === 0}/>;
        }
        else if (cardStyle === '3') {
            //@ts-ignore
            cardChild = <card_style4_1.default userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0} hideAddress={hideAddress === 0} hideEmail={hideEmail === 0} hideWechat={hideWechat === 0}/>;
        }
        else if (cardStyle === '4') {
            //@ts-ignore
            cardChild = <card_style5_1.default userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0} hideAddress={hideAddress === 0} hideEmail={hideEmail === 0} hideWechat={hideWechat === 0}/>;
        }
        else {
            //@ts-ignore
            cardChild = <card_style1_1.default userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0} hideAddress={hideAddress === 0} hideEmail={hideEmail === 0} hideWechat={hideWechat === 0}/>;
        }
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true}>
        
        <index_8.default>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.ujb, style_1.default.uac, style_1.default.udr])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(23), style_1.w(95), style_1.h(32), style_1.radiusA(16), style_1.bdColor('#E5E5E5'), style_1.bo(1), { borderStyle: 'solid' }])} onClick={() => {
            this.timer && clearInterval(this.timer);
            this.addRadarTrace('view_card');
            taro_1.default.reLaunch({
                url: `/pages/businesscard`
            });
        }}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(27), style_1.h(27), style_1.radiusA(13.5), style_1.ma(2)])} src={this.avatar}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434'), style_1.ml(5)])}>我的名片</components_1.Text>
            </components_1.View>
            <index_6.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/qiehuan_businesscard`
            });
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#343434')])}>名片</components_1.Text>
            </index_6.default>
            <components_1.View style={datatool_1.styleAssign([style_1.mr(23), style_1.w(95), style_1.h(32), style_1.bgColor(style_1.commonStyles.transparent)])}/>
          </components_1.View>
        </index_8.default>
        {userInfo && <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.mt(20)])}>
            {cardChild}
            
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(184), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac, style_1.mt(20)])}>
              
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujc, style_1.h(44), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(20)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                  <index_6.default customStyle={datatool_1.styleAssign([style_1.w(160), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc, style_1.bo(1), { borderStyle: 'solid' }, style_1.bdColor(style_1.commonStyles.colorTheme),
            style_1.bgColor(style_1.commonStyles.whiteColor), style_1.h(44)])} onClick={() => {
            this.setState({ showShare: true });
        }}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>分享名片</components_1.Text>
                  </index_6.default>
                  <index_6.default customStyle={datatool_1.styleAssign([style_1.w(160), style_1.radiusA(4), style_1.ml(15), style_1.default.uac, style_1.default.ujc, style_1.bo(1), style_1.h(44),
            style_1.bdColor(style_1.commonStyles.colorTheme), style_1.bgColor(style_1.commonStyles.colorTheme)])} onClick={() => {
            this.addRadarTrace('collect_card');
            this.updateMyCollect(1, userInfo.id);
        }}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.whiteColor)])}>收藏名片</components_1.Text>
                  </index_6.default>
                </components_1.View>
              </components_1.View>
              
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(95), style_1.default.uac, style_1.default.udr, style_1.h(100), style_1.mt(20), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4),
            { boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5' }])} onClick={() => {
            this.addRadarTrace('call_up');
            taro_1.default.makePhoneCall({
                phoneNumber: userInfo.phone
            });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>拨打电话</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12), style_1.default.utxc])}>{userInfo.phone}</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4), style_1.ml(15),
            { boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5' }])} onClick={() => {
            this.addRadarTrace('copy_wechat');
            taro_1.default.setClipboardData({
                data: userInfo.wechat
            });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>加微信</components_1.Text>
                  <multi_line_text_1.default center={true} style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12), style_1.w(80)])} text={`${userInfo.wechat ? userInfo.wechat : '点击添加微信'}`}/>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4), style_1.ml(15),
            { boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5' }])} onClick={() => {
            this.addRadarTrace('navigation_company');
            taro_1.default.openLocation({
                latitude: userInfo.latitude,
                longitude: userInfo.longitude,
                scale: 16
            });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>联系地址</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(10), style_1.default.utxc])}>{userInfo.detailAddress ? `${userInfo.detailAddress}` : '点击立即定位'}</components_1.Text>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.pl(20), style_1.pr(20)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.w(180)])}>
                  {visitorListSub.map((value, index) => {
            console.log(value);
            return <components_1.Image key={index} style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.radiusA(10), style_1.default.upa, style_1.absL(15 * index)])} src={value.avatar}/>;
        })}
                  {visitorListSub.length === 0 && [1, 2, 3, 4, 5].map((value, index) => {
            console.log(value);
            return <components_1.Image key={index} style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.radiusA(10), style_1.default.upa, style_1.absL(15 * index)])} src={`${httpurl_1.cloudBaseUrl}ico_default.png`}/>;
        })}
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(12), style_1.default.upa, style_1.absL(100)])}>{`${visitorCount}人浏览过`}</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(12), style_1.ml(17)])}>{`收藏 ${holderCount}`}</components_1.Text>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          
          <index_2.default addRadarTrace={(behaviorType) => {
            this.addRadarTrace(behaviorType);
        }} userInfo={userInfo} homeClick={() => {
            this.setState({ showHomeWenHouYu: true });
        }} schoolClick={() => {
            this.setState({ showSchoolWenHouYu: true });
        }}/>
          
          {userInfo && userInfo.goodsList && userInfo.goodsList.length !== 0 && <index_3.default goToMoreGoods={() => {
            this.addVisitor('goods');
            taro_1.default.navigateTo({
                url: `/pages/businesscard/more_goods?goodsList=${JSON.stringify(userInfo.goodsList)}`
            });
        }} goToGoodsDetail={(itemData) => {
            this.addVisitor('goods');
            this.addRadarTrace('view_goods', itemData.id);
            taro_1.default.navigateTo({
                url: `/pages/mine/goods_detail?id=${itemData.id}`
            });
        }} goodsList={userInfo.goodsList}/>}
          
          {userInfo.enterpriseName.length !== 0 &&
            <index_5.default addRadarTrace={(behaviorType) => {
                this.addVisitor('company');
                this.addRadarTrace(behaviorType);
            }} userInfo={userInfo}/>}
          
          {userInfo.photoUrlArray && userInfo.photoUrlArray.length !== 0 && <index_10.default addRadarTrace={(behaviorType) => {
            this.addRadarTrace(behaviorType);
        }} photos={userInfo.photoUrlArray}/>}
          
          {userInfo.videoUrl && userInfo.videoUrl.length !== 0 &&
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(264), style_1.mt(10)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(32)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(22), style_1.bgColor('#E2BB7B')])}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(8)])}>我的视频</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.wRatio(100), style_1.mt(16)])}>
                <components_1.Video style={datatool_1.styleAssign([style_1.w(335), style_1.h(203), style_1.bgColor(style_1.commonStyles.whiteColor)])} onPlay={() => {
                this.addRadarTrace('play_your_video');
            }} src={userInfo.videoUrl} controls={true} autoplay={false} objectFit={'fill'} initialTime={1} id='video' loop={false} muted={false}/>
              </components_1.View>
            </components_1.View>}
          
          <index_4.default companyCardList={companyCardList}/>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(59), style_1.default.uac, style_1.default.ujb, style_1.default.udr, style_1.mt(10), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(32), style_1.h(32), style_1.radiusA(4), style_1.ml(21)])} src={`${httpurl_1.cloudBaseUrl}ico_logo.png`}/>
              <components_1.View style={datatool_1.styleAssign([style_1.ml(5)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>关注极致信息公众号</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#D2D2D2')])}>最新资讯、升级更新早知道！</components_1.Text>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.bgColor('#FAF1E5'), style_1.w(76), style_1.h(27), style_1.radiusA(30), style_1.mr(11)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#825D22'), style_1.fSize(14)])}>马上关注</components_1.Text>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(86), style_1.default.ujc, style_1.default.uac])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#D2D2D2')])}>极易推 给您极致服务</components_1.Text>
          </components_1.View>
        </components_1.ScrollView>}
        {showShare && <index_7.default cancle={() => {
            this.setState({ showShare: false });
        }} wechatShare={() => {
            this.setState({ showShare: false });
        }} haibao={() => {
            this.setState({ showShare: false }, () => {
                taro_1.default.navigateTo({
                    url: `/pages/businesscard/mingpian_haibao?userId=${userInfo.id}`
                });
            });
        }}/>}
        {showGuide && <index_9.default cancle={() => {
            datatool_1.save('other_business_guide', true);
            this.setState({ showGuide: false });
        }} goToMyCard={() => {
            datatool_1.save('other_business_guide', true);
            this.setState({ showGuide: false }, () => {
                taro_1.default.reLaunch({
                    url: `/pages/businesscard`
                });
            });
        }}/>}
        {showHomeWenHouYu && <wenhou_modal_1.default type={wenhou_modal_1.WenHouType.HOME} cancle={() => {
            this.setState({ showHomeWenHouYu: false });
        }} wenHouYu={userInfo.villagerGreeting} userInfo={userInfo}/>}
        {showSchoolWenHouYu && <wenhou_modal_1.default type={wenhou_modal_1.WenHouType.EDUCATION} cancle={() => {
            this.setState({ showSchoolWenHouYu: false });
        }} wenHouYu={userInfo.schoolfellowGreeting} userInfo={userInfo}/>}
      </index_1.default>);
    }
};
OtherBusinesscard = __decorate([
    redux_1.connect(state => Object.assign(state.taskCenter, state.login), Object.assign(actions, loginActions, businessCardActions, radarActions, visitorActions))
], OtherBusinesscard);
exports.default = OtherBusinesscard;
//# sourceMappingURL=other_businesscard.jsx.map