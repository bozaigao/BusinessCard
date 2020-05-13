"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename update_card_style.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @Description: 修改名片样式
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
const index_2 = require("../pagecomponent/help-navigation-item/index");
const httpurl_1 = require("../../api/httpurl");
let UpdateCardStyle = class UpdateCardStyle extends taro_1.Component {
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
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_2.default />
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])} scrollY>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14), style_1.mt(13)])}>打开极易推，进入“我的”页面，点击“立即选择”，进入“完善名片”，进入“名片完善”页面，点击“编辑”图标，进入“个人信息编辑”页面，再点击“名片样式”一栏，进入“名片样式”页面，选择好样式之后，点击“完成”，即可成功修改名片样式。</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(17)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(155), style_1.h(276)])} src={`${httpurl_1.cloudBaseUrl}ico_update_card_style_1.png`}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(155), style_1.h(276)])} src={`${httpurl_1.cloudBaseUrl}ico_update_card_style_2.png`}/>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.pl(20), style_1.pr(20), style_1.mt(20)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(17)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(155), style_1.h(276)])} src={`${httpurl_1.cloudBaseUrl}ico_update_card_style_3.png`}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(155), style_1.h(276)])} src={`${httpurl_1.cloudBaseUrl}ico_update_card_style_4.png`}/>
            </components_1.View>
          </components_1.View>
        </components_1.ScrollView>
      </index_1.default>);
    }
};
UpdateCardStyle = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], UpdateCardStyle);
exports.default = UpdateCardStyle;
//# sourceMappingURL=update_card_style.jsx.map
