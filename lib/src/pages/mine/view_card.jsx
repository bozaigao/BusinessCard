"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename view_card.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @Description: 查看名片
*/
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const index_1 = require("../../compoments/safe-area-view/index");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const components_1 = require("@tarojs/components");
const index_2 = require("./component/help-navigation-item/index");
const httpurl_1 = require("../../api/httpurl");
let ViewCard = class ViewCard extends taro_1.Component {
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
        console.log(this.viewRef);
    }
    render() {
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_2.default />
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])} scrollY>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(16), style_1.mt(20)])}>方法一：</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14), style_1.mt(13)])}>通过微信扫一扫或长按小程序码进入名片。</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(17)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(155), style_1.h(276)])} src={`${httpurl_1.cloudBaseUrl}view_card_1.png`}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(155), style_1.h(276)])} src={`${httpurl_1.cloudBaseUrl}view_card_2.png`}/>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(16), style_1.mt(20)])}>方法二：</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14), style_1.mt(13)])}>客户从用户分享的小程序卡片进入名片。</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(17)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(155), style_1.h(276)])} src={`${httpurl_1.cloudBaseUrl}view_card_3.png`}/>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(16), style_1.mt(20)])}>方法三：</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14), style_1.mt(13)])}>客户从微信消息列表的服务通知进入名片。</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(17)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(155), style_1.h(276)])} src={`${httpurl_1.cloudBaseUrl}view_card_4.png`}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(155), style_1.h(276)])} src={`${httpurl_1.cloudBaseUrl}view_card_5.png`}/>
            </components_1.View>
          </components_1.View>
        </components_1.ScrollView>
      </index_1.default>);
    }
};
ViewCard = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], ViewCard);
exports.default = ViewCard;
//# sourceMappingURL=view_card.jsx.map