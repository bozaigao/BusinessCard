"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 名片首页
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
//@ts-ignore
const index_1 = require("../compoments/safe-area-view/index");
//@ts-ignore
const datatool_1 = require("../utils/datatool");
const style_1 = require("../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../actions/task_center");
const loginActions = require("../actions/login");
const businessCardActions = require("../actions/business_card");
const index_2 = require("./component/business-card/index");
const index_3 = require("./component/my-person/index");
const index_4 = require("./component/share-modal/index");
const index_5 = require("../compoments/navigation_bar/index");
const httpurl_1 = require("../api/httpurl");
const business_card_guide1_1 = require("./component/business-card-guide1");
const business_card_guide2_1 = require("./component/business-card-guide2");
const business_card_guide3_1 = require("./component/business-card-guide3");
let Businesscard = class Businesscard extends taro_1.Component {
    constructor(props) {
        super(props);
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/21
         * @function: 查询用户访客和收藏数
         */
        this.getCardHolderVisitorCount = () => {
            this.props.getCardHolderVisitorCount().then((res) => {
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({
                        holderCount: res.holderCount,
                        visitorCount: res.visitorCount
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
         * @date 2020/3/14
         * @function: 获取人脉推荐
         */
        this.getRecommend = () => {
            this.props.getRecommend({ recommendType: this.recommendType }).then((res) => {
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({ recommendList: res });
                }
                console.log('获取人脉推荐', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/14
         * @function: 人脉推荐是否设置
         */
        this.recommendSettingStatus = () => {
            this.props.recommendSettingStatus().then((res) => {
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({ recommendIsSet: res === 1 });
                }
                console.log('人脉推荐是否设置', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/14
         * @function: 人脉推荐行业和兴趣设置查询
         */
        this.getRecommendSetting = () => {
            this.props.getRecommendSetting().then((res) => {
                console.log('人脉推荐行业和兴趣设置查询', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/2/29
         * @function: 更新用户基本资料
         */
        this.updateUserInfo = (res) => {
            let { userInfo } = this.props;
            userInfo.avatar = res.userInfo.avatarUrl;
            userInfo.city = res.userInfo.city;
            userInfo.province = res.userInfo.province;
            userInfo.name = res.userInfo.nickName;
            userInfo.sex = res.gender;
            this.props.updateUserInfo(userInfo);
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/29
         * @function: 获取用户信息
         */
        this.getUserInfo = () => {
            this.props.getUserInfo().then((res) => {
                this.props.updateUserInfo(res);
                this.userSettingGet(res);
                this.getCardHolderVisitorCount();
                this.getRecommendSetting();
                this.recommendSettingStatus();
                this.getRecommend();
                console.log('重新更新用户信息', res);
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
                    this.getCardHolderVisitorCount();
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
         * @date 2020/3/25
         * @function: 获取用户的设置信息
         */
        this.userSettingGet = (userInfo) => {
            this.props.userSettingGet({
                userId: userInfo.id
            }).then((res) => {
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
        this.recommendType = 'recommend';
        this.state = {
            showShare: false,
            recommendIsSet: false,
            recommendList: [],
            showGuide1: false,
            showGuide2: false,
            showGuide3: false,
            holderCount: 0,
            visitorCount: 0,
            currentIndex: 0,
            cardStyle: '-1',
            hidePhone: 0,
            hideWechat: 0,
            hideEmail: 0,
            hideAddress: 0,
        };
    }
    componentDidShow() {
        this.getUserInfo();
        let showGuide1 = datatool_1.get('business_guide1');
        this.setState({ showGuide1: !showGuide1 });
        let showGuide2 = datatool_1.get('business_guide2');
        this.setState({ showGuide2: !showGuide2 && !!showGuide1 });
        let showGuide3 = datatool_1.get('business_guide3');
        this.setState({ showGuide3: !showGuide3 && !!showGuide2 && !!showGuide1 });
    }
    componentWillUnmount() {
        taro_1.default.eventCenter.off('recommend');
    }
    //@ts-ignore
    onShareAppMessage(res) {
        return {
            title: `${this.props.userInfo.name}的名片分享`,
            path: `/pages/businesscard/other_businesscard?userId=${this.props.userInfo.id}`
        };
    }
    render() {
        let { showShare, recommendIsSet, recommendList, showGuide1, showGuide2, showGuide3, holderCount, visitorCount, currentIndex, hidePhone, hideWechat, hideEmail, hideAddress, cardStyle } = this.state;
        let { userInfo } = this.props;
        return (<index_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true} ref={(ref) => {
            this.viewRef = ref;
        }}>
        
        <index_5.default>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujc])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#343434')])}>名片</components_1.Text>
          </components_1.View>
        </index_5.default>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.screenHeight()), style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          <index_2.default hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail} hideAddress={hideAddress} cardStyle={cardStyle} holderCount={holderCount} visitorCount={visitorCount} userInfo={this.props.userInfo} shareClick={() => {
            this.setState({ showShare: true });
        }} collectCallback={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/my_collect?currentIndex=1`
            });
        }} visitorCallback={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/my_collect?currentIndex=0`
            });
        }} viewMyCardCallback={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/other_businesscard?userId=${this.props.userInfo.id}`
            });
        }} gotoCardCallback={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/ming_pian_ma`
            });
        }}/>
          
          <index_3.default userInfo={userInfo} currentIndex={currentIndex} chooseCallback={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/choose_renmai_tag`
            });
        }} hasSelected={recommendIsSet} recommendList={recommendList} collectCard={(userId) => {
            this.updateMyCollect(1, userId);
        }} indexChangeCallback={(index) => {
            if (index === 0) {
                this.recommendType = 'recommend';
                this.setState({ currentIndex: index }, () => {
                    this.getRecommend();
                });
            }
            else if (index === 1) {
                this.recommendType = 'interest';
                this.setState({ currentIndex: index }, () => {
                    this.getRecommend();
                });
            }
            else if (index === 2) {
                this.recommendType = 'villager';
                this.setState({ currentIndex: index }, () => {
                    this.getRecommend();
                });
            }
            else if (index === 3) {
                this.recommendType = 'schoolfellow';
                this.setState({ currentIndex: index }, () => {
                    this.getRecommend();
                });
            }
        }} performCard={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/perform_info`
            });
        }}/>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(66), style_1.default.ujc, style_1.default.uac])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#D2D2D2')])}>极易推 给您极致服务</components_1.Text>
          </components_1.View>
        </components_1.ScrollView>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.default.uac])}>
          <components_1.Button lang={'zh_CN'} openType={'getUserInfo'} onGetUserInfo={(data) => {
            userInfo.cardPercent = 0;
            if (userInfo.cardPercent) {
                taro_1.default.navigateTo({
                    url: `/pages/mine/perform_info`
                });
            }
            else {
                if (!userInfo.avatar) {
                    this.updateUserInfo(data.detail);
                }
                taro_1.default.navigateTo({
                    url: `/pages/businesscard/add_businesscard`
                });
            }
        }} style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(41), style_1.default.uac, style_1.default.ujc, style_1.bgColor('#FAF1E5'), style_1.radiusA(30)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#825D22')])}>{userInfo.cardPercent ? `名片完善度${userInfo.cardPercent}%，点击完善` : '创建您的专属名片'}</components_1.Text>
            </components_1.View>
          </components_1.Button>
        </components_1.View>
        {showShare && <index_4.default cancle={() => {
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
        {showGuide1 && <business_card_guide1_1.default cancle={() => {
            datatool_1.save('business_guide1', true);
            this.setState({ showGuide1: false, showGuide2: true });
        }} createCard={() => {
            datatool_1.save('business_guide1', true);
            this.setState({ showGuide1: false, showGuide2: true }, () => {
                taro_1.default.navigateTo({
                    url: `/pages/businesscard/add_businesscard`
                });
            });
        }}/>}
        {showGuide2 && <business_card_guide2_1.default cancle={() => {
            datatool_1.save('business_guide2', true);
            this.setState({ showGuide2: false, showGuide3: true });
        }} viewCard={() => {
            datatool_1.save('business_guide2', true);
            this.setState({ showGuide2: false, showGuide3: true }, () => {
                taro_1.default.navigateTo({
                    url: `/pages/businesscard/other_businesscard?userId=${this.props.userInfo.id}`
                });
            });
        }}/>}
        {showGuide3 && <business_card_guide3_1.default cancle={() => {
            datatool_1.save('business_guide3', true);
            this.setState({ showGuide3: false });
        }} shareCard={() => {
            datatool_1.save('business_guide3', true);
            this.setState({ showGuide3: false, showShare: true });
        }}/>}
      </index_1.default>);
    }
};
Businesscard = __decorate([
    redux_1.connect(state => Object.assign(state.taskCenter, state.login), Object.assign(actions, loginActions, businessCardActions))
], Businesscard);
exports.default = Businesscard;
//# sourceMappingURL=businesscard.jsx.map