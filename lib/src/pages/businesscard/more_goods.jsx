"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename more_goods.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 更多商品
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
let MoreGoods = class MoreGoods extends taro_1.Component {
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
        <top_header_1.default title={'更多商品'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.wRatio(100), style_1.hRatio(100), style_1.mt(16)])} scrollY>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uWrap, style_1.default.udr, style_1.pl(14), style_1.pr(14)])}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
            console.log(value);
            return (<components_1.View style={datatool_1.styleAssign([style_1.ma(5), style_1.w(163), style_1.h(233), style_1.pa(8), style_1.bgColor(style_1.commonStyles.whiteColor),
                style_1.radiusA(4)])} key={index}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(147), style_1.h(152), style_1.radiusA(4)])} src={require('../../assets/ico_default.png')}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(8), style_1.mt(12)])}>现代简约双人木床</components_1.Text>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color('#FA6B57'), style_1.ml(8), style_1.mt(12), style_1.mt(8)])}>￥688</components_1.Text>
                  </components_1.View>);
        })}
          </components_1.View>
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
MoreGoods = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], MoreGoods);
exports.default = MoreGoods;
//# sourceMappingURL=more_goods.jsx.map