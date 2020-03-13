"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename about_us.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 关于我们
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
let AboutUs = class AboutUs extends taro_1.Component {
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
        console.log(this.viewRef);
    }
    render() {
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'关于极致名片'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(186), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(61), style_1.h(61)])} src={require('../../assets/ico_logo.png')}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#0C0C0C'), style_1.mt(3)])}>极致推</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797'), style_1.mt(6)])}>V1.0.0</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(80), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(120), style_1.default.uac, style_1.default.ujc, style_1.mt(46), style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.mt(3)])}>极致推，一款基于社交做成交，针对个体使用的智能名片小程序，致力于提升每一位用户的商业价值。 \n\n极致推是集创建、收发、管理名片为一体的高效率工具，极致推的存在让你的名片不仅为你代言，更为你的产品和服务代言，真正做到一键分享，轻松获客。</components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#D2D2D2'), style_1.mt(147)])}>©2020四川极致信息技术有限公司</components_1.Text>
          </components_1.View>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
AboutUs = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], AboutUs);
exports.default = AboutUs;
//# sourceMappingURL=about_us.jsx.map