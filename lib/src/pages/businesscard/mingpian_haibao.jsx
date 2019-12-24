"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename mingpian_haibao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 名片海报
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/home");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const touchable_button_1 = require("../../compoments/touchable-button");
let MingpianHaibao = class MingpianHaibao extends taro_1.Component {
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
        <top_header_1.default title={'名片海报'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.default.uac])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(434), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(20), style_1.radiusA(4), style_1.default.uac])}>
            
            <components_1.View style={datatool_1.styleAssign([style_1.mt(20), style_1.wRatio(95), style_1.h(204), style_1.bgColor('rgb(211,199,195)'), style_1.radiusA(10),
            style_1.default.udr, style_1.default.uje])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.radiusA(10), style_1.default.upa, style_1.absL(0), style_1.absT(0)])} src={require('../../assets/ico_default.jpeg')}/>
              <components_1.View style={datatool_1.styleAssign([style_1.ma(20)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18)])}>王嘉怡</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>销售经理</components_1.Text>
                </components_1.View>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.mt(30), style_1.mt(5)])}>15982468866@qq.com</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.mt(5)])}>{`四川省成都市武侯区盛和\n二路18号富森美家居`}</components_1.Text>
              </components_1.View>
            </components_1.View>
            
            <components_1.Text style={datatool_1.styleAssign([style_1.w(294), style_1.mt(23), style_1.fSize(14), style_1.color('#343434')])}>您好， 我是美克美家家居集团股份有限公司成都分部的 销售经理王嘉怡
              这是我的名片，请惠存。
              谢谢！</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.mt(20), style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uae, style_1.default.udr])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(44), style_1.h(44), style_1.ml(16), style_1.mt(40)])} src={require('../../assets/ico_miniprogram.png')}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#E2BB7B'), style_1.ml(11)])}>长按识别二维码 收下名片</components_1.Text>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(56), style_1.default.upa, style_1.absB(0), style_1.default.uac, style_1.default.ujc])}>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc,
            style_1.w(335), style_1.h(56), style_1.radiusA(4), style_1.bgColor(style_1.commonStyles.colorTheme)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color(style_1.commonStyles.whiteColor)])}>保存名片海报后分享</components_1.Text>
            </touchable_button_1.default>
          </components_1.View>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
MingpianHaibao = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], MingpianHaibao);
exports.default = MingpianHaibao;
//# sourceMappingURL=mingpian_haibao.jsx.map