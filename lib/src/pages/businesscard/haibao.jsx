"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename haibao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 海报
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
let Haibao = class Haibao extends taro_1.Component {
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
            
        };
        console.log(this.viewRef);
    }
    render() {
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'海报'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.default.uac])}>
          
          <components_1.ScrollView style={datatool_1.styleAssign([{ whiteSpace: 'nowrap' }, style_1.wRatio(100), style_1.h(41), { paddingLeft: '5%' },
            style_1.bgColor(style_1.commonStyles.whiteColor)])} scrollX>
            {['热点话题', '早晚问候', '业绩催单', '人才招聘', '节日海报', '热点话题', '早晚问候', '业绩催单', '人才招聘', '节日海报'].map((value, index) => {
            console.log(value);
            return (<components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.mt(5), style_1.ml(20), { display: 'inline-block' }])} key={index}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(index === 0 ? '#E2BB7B' : style_1.commonStyles.colorTheme)])}>{value}</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(25), style_1.h(2), style_1.radiusA(1), style_1.bgColor(index === 0 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(5),
                style_1.ml(15)])}/>
                </components_1.View>);
        })}
          </components_1.ScrollView>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(4), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          <components_1.ScrollView style={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.wRatio(100), style_1.hRatio(100), style_1.mt(16)])} scrollY>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uWrap, style_1.default.udr, style_1.pl(14), style_1.pr(14)])}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
            console.log(value);
            return (<components_1.View style={datatool_1.styleAssign([style_1.ma(5), style_1.w(105), style_1.h(267), style_1.pa(8), style_1.bgColor(style_1.commonStyles.whiteColor),
                style_1.radiusA(4)])} key={index}>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(97), style_1.h(186), style_1.radiusA(4)])} src={require('../../assets/ico_default.png')}/>
                      <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])}>
                        <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(72), style_1.h(28), style_1.bo(1), style_1.bdColor(style_1.commonStyles.colorTheme), { borderStyle: 'solid' },
                style_1.default.uac, style_1.default.ujc, style_1.radiusA(4)])}>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>立即使用</components_1.Text>
                        </touchable_button_1.default>
                      </components_1.View>
                    </components_1.View>);
        })}
            </components_1.View>
          </components_1.ScrollView>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
Haibao = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], Haibao);
exports.default = Haibao;
//# sourceMappingURL=haibao.jsx.map
