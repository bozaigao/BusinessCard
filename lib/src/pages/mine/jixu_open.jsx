"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename jixu_open.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/2
 * @Description: 继续开通
*/
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const index_1 = require("../../compoments/safe-area-view/index");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const shopActions = require("../../actions/shop");
const loginActions = require("../../actions/login");
const index_2 = require("../../compoments/top-header/index");
const components_1 = require("@tarojs/components");
const index_3 = require("../../compoments/company_card/index");
let JixuOpen = class JixuOpen extends taro_1.Component {
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
    }
    render() {
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_2.default title={'继续开通'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.wRatio(100), style_1.mt(84)])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(80), style_1.h(72)])} src={require('../../assets/ico_my_shop.png')}/>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.mt(33)])}>
            您的店铺即将到期，继续开通需联系客服
          </components_1.Text>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), { paddingLeft: '5%' }, style_1.mt(20)])}>
            <index_3.default />
          </components_1.View>
        </components_1.View>
      </index_1.default>);
    }
};
JixuOpen = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, shopActions, loginActions))
], JixuOpen);
exports.default = JixuOpen;
//# sourceMappingURL=jixu_open.jsx.map