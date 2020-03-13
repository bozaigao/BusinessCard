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
const index_2 = require("./pagecomponent/business-card/index");
const index_3 = require("./pagecomponent/my-person/index");
const index_4 = require("./pagecomponent/share-modal/index");
const index_5 = require("../compoments/navigation_bar/index");
let Businesscard = class Businesscard extends taro_1.Component {
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
            this.viewRef && this.viewRef.showLoading();
            this.props.getUserInfo().then((res) => {
                this.props.updateUserInfo(res);
                this.viewRef && this.viewRef.hideLoading();
                console.log('重新更新用户信息', res);
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        this.state = {
            showShare: false
        };
    }
    componentDidShow() {
        this.getUserInfo();
    }
    componentWillUnmount() {
        taro_1.default.eventCenter.off('showJiFenModal');
    }
    //@ts-ignore
    onShareAppMessage(res) {
        return {
            title: `${this.props.userInfo.name}的名片分享`,
            path: `/pages/businesscard/other_businesscard?userId=${this.props.userInfo.id}`
        };
    }
    render() {
        let { showShare } = this.state;
        let { userInfo } = this.props;
        console.log('呵呵', this.viewRef);
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true}>
        
        <index_5.default>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujc])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#343434')])}>名片</components_1.Text>
          </components_1.View>
        </index_5.default>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          <index_2.default userInfo={this.props.userInfo} shareClick={() => {
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
          
          <index_3.default chooseCallback={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/choose_renmai_tag`
            });
        }}/>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(66), style_1.default.ujc, style_1.default.uac])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#D2D2D2')])}>极易推 给您极致服务</components_1.Text>
          </components_1.View>
        </components_1.ScrollView>
        
        <components_1.Button lang={'zh_CN'} openType={'getUserInfo'} onGetUserInfo={(data) => {
            // console.log('更新用户信息', token);
            if (!userInfo.avatar) {
                this.updateUserInfo(data.detail);
            }
            taro_1.default.navigateTo({
                url: `/pages/businesscard/add_businesscard`
            });
        }} style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(41), style_1.default.uac, style_1.default.ujc, style_1.bgColor('#FAF1E5'), style_1.radiusA(30)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#825D22')])}>创建您的专属名片</components_1.Text>
          </components_1.View>
        </components_1.Button>
        {showShare && <index_4.default cancle={() => {
            this.setState({ showShare: false });
        }} wechatShare={() => {
        }} haibao={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/mingpian_haibao`
            });
        }}/>}
      </index_1.default>);
    }
};
Businesscard = __decorate([
    redux_1.connect(state => Object.assign(state.taskCenter, state.login), Object.assign(actions, loginActions))
], Businesscard);
exports.default = Businesscard;
//# sourceMappingURL=businesscard.jsx.map