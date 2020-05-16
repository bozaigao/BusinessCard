"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename ming_pian_ma.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/7
 * @Description: 名片码
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const index_1 = require("../../compoments/safe-area-view/index");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/dict");
const loginActions = require("../../actions/login");
const index_2 = require("../../compoments/top-header/index");
const httpurl_1 = require("../../api/httpurl");
let MingPianMa = class MingPianMa extends taro_1.Component {
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
         * @date 2020/3/11
         * @function: 创建小程序码
         */
        this.wxacode = () => {
            this.viewRef && this.viewRef.showLoading();
            console.log('创建小程序码');
            this.props.wxacode({
                scene: 'mingpianma',
                path: `/pages/businesscard/other_businesscard?userId=${this.props.userInfo.id}`,
                width: 320
            }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.getUserInfo();
                }
                console.log('创建小程序码', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
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
                console.log('重新更新用户信息', res);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        console.log(this.viewRef);
        this.state = {
            content: ''
        };
    }
    componentDidShow() {
        if (this.props.userInfo.wxacode.length === 0) {
            this.wxacode();
        }
    }
    render() {
        let { userInfo } = this.props;
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_2.default title={'名片码'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.mt(20)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(189)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(335), style_1.h(189), style_1.default.upa, style_1.absT(0)])} src={require('../../assets/ico_mingpianma_bg.png')}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.upa, style_1.pl(17), style_1.pr(17), style_1.absT(17)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
                  <components_1.View>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.fWeight('bold'), style_1.color(style_1.commonStyles.whiteColor)])}>{userInfo.name}</components_1.Text>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>{`${userInfo.enterpriseName}·${userInfo.position}`}</components_1.Text>
                  </components_1.View>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(50), style_1.h(50), style_1.radiusA(25)])} src={userInfo.avatar ? userInfo.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
                </components_1.View>
                
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(28)])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_card_mobile.png`}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434'), style_1.color(style_1.commonStyles.whiteColor), style_1.ml(6)])}>{userInfo.phone}</components_1.Text>
                </components_1.View>
                
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(8)])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_card_email.png`}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434'), style_1.color(style_1.commonStyles.whiteColor), style_1.ml(6)])}>{userInfo.email ? userInfo.email : '邮箱信息未对外公开'}</components_1.Text>
                </components_1.View>
                
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.mt(8)])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(9), style_1.h(11), style_1.ml(8), style_1.mt(4)])} src={`${httpurl_1.cloudBaseUrl}ico_card_location.png`}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434'), style_1.color(style_1.commonStyles.whiteColor), style_1.ml(6)])}>{userInfo.detailAddress}</components_1.Text>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor), { boxShadow: '0px 2px 4px 0px rgba(230,230,230,0.5)' }])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#29292E'), style_1.mt(18)])}>
                请用微信扫码，收下我的名片
              </components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(236), style_1.h(236), style_1.mb(20), style_1.default.uac, style_1.default.ujc])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100)])} src={userInfo.wxacode}/>
                <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.absT(0), style_1.wRatio(100), style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(104), style_1.h(104), style_1.radiusA(52)])} src={userInfo.avatar}/>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.mt(32)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#D2D2D2')])}>
              极易推 给你极致服务
            </components_1.Text>
          </components_1.View>
        </components_1.View>
      </index_1.default>);
    }
};
MingPianMa = __decorate([
    redux_1.connect(state => state.login, Object.assign(actions, loginActions))
], MingPianMa);
exports.default = MingPianMa;
//# sourceMappingURL=ming_pian_ma.jsx.map