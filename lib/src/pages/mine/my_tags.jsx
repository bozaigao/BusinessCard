"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename my_tags.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/19
 * @Description: 我的标签
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
const bottom_buton_1 = require("../../compoments/bottom-buton");
const touchable_button_1 = require("../../compoments/touchable-button");
let MyTags = class MyTags extends taro_1.Component {
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
        <top_header_1.default title={'我的标签'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(153), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>我的标签</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20)])}>长按拖动可以排序(最多添加4个标签)</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(8)])}>
              {['90后', '夜跑', '旅行', '摄影'].map((value, index) => {
            return (<components_1.View key={index} style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.padding([6, 15, 6, 15]), style_1.radiusA(14)])}>
                    <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.radiusA(14),
                style_1.padding([6, 15, 6, 15]), style_1.bgColor('#E7E7E7')])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{value}</components_1.Text>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(15), style_1.h(15), style_1.default.upa, style_1.absT(-5), style_1.absR(-5)])} src={require('../../assets/ico_close.png')}/>
                    </touchable_button_1.default>
                  </components_1.View>);
        })}
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.mt(16), style_1.default.uae])}>
              <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.bgColor(style_1.commonStyles.colorTheme),
            style_1.w(95), style_1.h(28), style_1.radiusA(14), style_1.default.uac, style_1.default.ujc])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(12)])} src={require('../../assets/ico_black_add.png')}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>自定义标签</components_1.Text>
                </components_1.View>
              </touchable_button_1.default>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(14)])}>（仅限于兴趣爱好）</components_1.Text>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(154), style_1.mt(8), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(20), style_1.mt(16)])}>常用标签</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(8),
            style_1.default.uWrap])}>
              {['90后', '看电影', '电竞游戏', '运动', '健身', '看书', '旅行'].map((value, index) => {
            return (<touchable_button_1.default key={index} customStyle={datatool_1.styleAssign([style_1.ml(24), style_1.mt(12), style_1.radiusA(14), style_1.padding([6, 16, 6, 16]), style_1.bo(1), style_1.bdColor(style_1.commonStyles.colorTheme), {
                    borderStyle: 'solid'
                }])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.colorTheme)])}>{value}</components_1.Text>
                  </touchable_button_1.default>);
        })}
            </components_1.View>
          </components_1.View>
        </components_1.View>
        
        <bottom_buton_1.default title={'保存'} onClick={() => {
        }}/>
      </safe_area_view_1.default>);
    }
};
MyTags = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], MyTags);
exports.default = MyTags;
//# sourceMappingURL=my_tags.jsx.map