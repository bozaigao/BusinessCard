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
const businessCardActtions = require("../../actions/business_card");
const index_2 = require("../pagecomponent/personal-info/index");
const index_3 = require("../pagecomponent/my-goods/index");
const index_4 = require("../pagecomponent/jizhi-card/index");
const index_5 = require("../pagecomponent/my-business/index");
const index_6 = require("../../compoments/touchable-button/index");
const index_7 = require("../pagecomponent/share-modal/index");
const httpurl_1 = require("../../api/httpurl");
const index_8 = require("../../compoments/navigation_bar/index");
const other_business_card_guide_1 = require("../pagecomponent/other-business-card-guide");
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
        this.config = {
            disableScroll: true
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
                this.setState({ userInfo: res });
                console.log('获取用户信息', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        this.state = {
            showShare: false,
            //@ts-ignore
            userInfo: null,
            showGuide: false
        };
    }
    componentDidShow() {
        console.log(this.viewRef);
        this.getUserInfoById();
        let showGuide = datatool_1.get('other_business_guide');
        this.setState({ showGuide: !showGuide });
    }
    componentWillUnmount() {
        taro_1.default.eventCenter.off('showJiFenModal');
        console.log('componentWillUnmount');
    }
    //@ts-ignore
    onShareAppMessage(res) {
        console.log('名片分享');
        return {
            title: '名片分享',
            path: '/pages/businesscard/other_businesscard'
        };
    }
    render() {
        let { showShare, userInfo, showGuide } = this.state;
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true}>
        
        <index_8.default>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.ujb, style_1.default.uac, style_1.default.udr])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(23), style_1.w(95), style_1.h(32), style_1.radiusA(16), style_1.bdColor('#E5E5E5'), style_1.bo(1), { borderStyle: 'solid' }])} onClick={() => {
            taro_1.default.reLaunch({
                url: `/pages/businesscard`
            });
        }}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(27), style_1.h(27), style_1.radiusA(13.5), style_1.ma(2)])} src={userInfo && userInfo.avatar ? userInfo.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
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
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.mt(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.bgColor('rgb(211,199,195)'), style_1.radiusA(10),
            style_1.default.udr, style_1.default.uje])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.default.upa, style_1.absT(0)])} src={require('../../assets/ico_business_card_bg.png')}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.default.upa, style_1.absT(0)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.radiusA(10), style_1.default.upa, style_1.absL(0), style_1.absT(0)])}/>
                <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.absL(20), style_1.absT(15)])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(60), style_1.h(60), style_1.radiusA(30)])} src={userInfo.avatar}/>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uae, style_1.default.udr, style_1.mt(6)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.fWeight('bold')])}>{userInfo.name}</components_1.Text>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.ml(8)])}>{userInfo.position}</components_1.Text>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{userInfo.company}</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uae, style_1.default.upa, style_1.absB(26), style_1.absR(24)])}>
                  
                  {userInfo.showPhone === 1 && <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{userInfo.phone}</components_1.Text>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_card_mobile.png`}/>
                    </components_1.View>}
                  
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(8)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{userInfo.wechat}</components_1.Text>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_card_wechat.png`}/>
                  </components_1.View>
                  
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(8)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{userInfo.email ? userInfo.email : '邮箱信息未对外公开'}</components_1.Text>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_card_email.png`}/>
                  </components_1.View>
                  
                  <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.mt(8)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{userInfo.detailAddress}</components_1.Text>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(9), style_1.h(11), style_1.ml(8), style_1.mt(4)])} src={`${httpurl_1.cloudBaseUrl}ico_card_location.png`}/>
                  </components_1.View>
                </components_1.View>
              </components_1.View>
            </components_1.View>
            
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
            taro_1.default.makePhoneCall({
                phoneNumber: userInfo.phone
            });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>拨打电话</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12)])}>{userInfo.phone}</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4), style_1.ml(15),
            { boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5' }])} onClick={() => {
            taro_1.default.setClipboardData({
                data: userInfo.wechat
            });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>加微信</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12)])}>点击添加微信</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4), style_1.ml(15),
            { boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5' }])} onClick={() => {
            taro_1.default.openLocation({
                latitude: userInfo.latitude,
                longitude: userInfo.longitude,
                scale: 18
            });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>联系地址</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12)])}>点击立即定位</components_1.Text>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.pl(20), style_1.pr(20)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.bgColor('red'), style_1.w(180)])}>
                  {[1, 2, 3, 4, 5].map((value, index) => {
            console.log(value);
            return <components_1.Image key={index} style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.default.upa, style_1.absL(15 * index)])} src={`${httpurl_1.cloudBaseUrl}ico_viewer.png`}/>;
        })}
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(12), style_1.default.upa, style_1.absL(100)])}>150人浏览过</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(12), style_1.ml(17)])}>收藏 143</components_1.Text>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          
          <index_2.default userInfo={userInfo}/>
          
          {userInfo && userInfo.goodsList && userInfo.goodsList.length !== 0 && <index_3.default goToMoreGoods={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/more_goods?goodsList=${JSON.stringify(userInfo.goodsList)}`
            });
        }} goToGoodsDetail={(itemData) => {
            taro_1.default.navigateTo({
                url: `/pages/mine/goods_detail?itemData=${JSON.stringify(itemData)}`
            });
        }} goodsList={userInfo.goodsList}/>}
          
          <index_5.default userInfo={userInfo}/>
          
          <index_4.default />
          
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
        }} haibao={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/mingpian_haibao`
            });
        }}/>}
        {showGuide && <other_business_card_guide_1.default cancle={() => {
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
      </index_1.default>);
    }
};
OtherBusinesscard = __decorate([
    redux_1.connect(state => Object.assign(state.taskCenter, state.login), Object.assign(actions, loginActions, businessCardActtions))
], OtherBusinesscard);
exports.default = OtherBusinesscard;
//# sourceMappingURL=other_businesscard.jsx.map