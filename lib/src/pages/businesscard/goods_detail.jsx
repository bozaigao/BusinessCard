"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename goods_detail.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 商品详情
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
const touchable_button_1 = require("../../compoments/touchable-button");
let GoodsDetail = class GoodsDetail extends taro_1.Component {
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
        <top_header_1.default title={'商品详情'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor),
            style_1.pt(5)])}>
          <components_1.ScrollView scrollY style={datatool_1.styleAssign([style_1.default.uf1])}>

            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(366)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(313)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.upa, style_1.absT(0)])} src={require('../../assets/ico_default.png')}/>
                <components_1.View style={datatool_1.styleAssign([style_1.bgColor('rgba(84,84,84,0.6)'), style_1.w(48), style_1.h(22), style_1.radiusA(10),
            style_1.default.uac, style_1.default.ujc, style_1.default.upa, style_1.absR(19), style_1.absB(8)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>1/5</components_1.Text>
                </components_1.View>
              </components_1.View>

              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(54), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.pl(20), style_1.pr(20),
            style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(21), style_1.color('#FA541C')])}>¥600.00</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#242424')])}>现代简约双人木床</components_1.Text>
              </components_1.View>
            </components_1.View>

            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.ml(20), style_1.mt(20)])}>商品详情</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.pa(30), style_1.default.uac, style_1.default.ujc])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床现代简约双人木床</components_1.Text>
              </components_1.View>

              {[1, 2, 3, 4, 5].map((value, index) => {
            console.log(value);
            return (<components_1.Image key={index} style={datatool_1.styleAssign([style_1.w(336), style_1.h(245), style_1.mt(8)])} src={require('../../assets/ico_default.png')}/>);
        })}
            </components_1.View>
          </components_1.ScrollView>

          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(64), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac, style_1.default.ujc])}>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(335), style_1.h(48), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.colorTheme), style_1.radiusA(2)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color(style_1.commonStyles.whiteColor)])}>立即分享</components_1.Text>
            </touchable_button_1.default>
          </components_1.View>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
GoodsDetail = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], GoodsDetail);
exports.default = GoodsDetail;
//# sourceMappingURL=goods_detail.jsx.map
