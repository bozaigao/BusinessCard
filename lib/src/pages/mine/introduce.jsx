"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename introduce.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @Description: 小程序介绍
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
let Introduce = class Introduce extends taro_1.Component {
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
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
      <index_2.default />
        <components_1.Text style={datatool_1.styleAssign([style_1.ml(20), style_1.mr(20), style_1.mt(15), style_1.color('#727272'), style_1.fSize(14)])}>“极致推”作为一款智能名片小程序，不满足于作为简单的名片管理工具，更立志于提升每一位用户的商业价值，在集创建、收发、管理名片为一体的基础上，开发了线上商城以及分销模式，让用户不仅能销售自己的产品和服务，还能代理“极致推”小程序，为自己创造商机。\n
          在管理名片中，“极致推”雷达通过实时抓取访客浏览行为轨迹，即访客来源、浏览名片具体内容、次数、停留时长等关键信息，进行精准的数据分析，为用户提供详细记录，从而协助用户更好地判断访客或客户意向，有利于用户更好地跟进每一位客户，促进交易，成功解决了销售行业交易难的问题。\n
          在人脉机遇中，“极致推”不仅可以根据用户所完善的名片信息为每一位用户推送匹配人脉，而且可以通过让用户自己选择期望人脉类型，从而为用户推送更精准的人脉，成功解决了销售行业获客难得问题。</components_1.Text>
      </index_1.default>);
    }
};
Introduce = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], Introduce);
exports.default = Introduce;
//# sourceMappingURL=introduce.jsx.map