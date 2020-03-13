"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename qiehuan_businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/16
 * @Description: 切换名片
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
const qiehuan_item_1 = require("../sub_pagecomponent/qiehuan-item");
const httpurl_1 = require("../../api/httpurl");
let QiehuanBusinesscard = class QiehuanBusinesscard extends taro_1.Component {
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
        this.state = {
            signInPageDetail: { dateIntegrals: [], signInCount: 0 },
        };
    }
    render() {
        console.log(this.viewRef);
        let { signInPageDetail } = this.state;
        if (typeof signInPageDetail.signInCount === 'undefined') {
            signInPageDetail.signInCount = 0;
        }
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true}>
        <top_header_1.default title={'切换名片'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <qiehuan_item_1.default />
          
          <components_1.View style={datatool_1.styleAssign([style_1.mt(16), style_1.default.uac, style_1.default.ujc, style_1.default.udr, style_1.w(335), style_1.h(128), style_1.radiusA(4), style_1.bgColor(style_1.commonStyles.whiteColor),
            style_1.padding([20, 16, 20, 16])])}>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(25)])} src={`${httpurl_1.cloudBaseUrl}ico_add.png`}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#CECECE'), style_1.ml(10)])}>添加新名片</components_1.Text>
            </touchable_button_1.default>
          </components_1.View>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
QiehuanBusinesscard = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], QiehuanBusinesscard);
exports.default = QiehuanBusinesscard;
//# sourceMappingURL=qiehuan_businesscard.jsx.map