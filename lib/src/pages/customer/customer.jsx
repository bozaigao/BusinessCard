"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename customer.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 客户
*/
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/home");
let Customer = class Customer extends taro_1.Component {
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
            navigationBarTitleText: '首页',
            disableScroll: true
        };
        this.state = {
            bannerList: []
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() {
    }
    componentDidMount() {
    }
    componentDidHide() {
    }
    render() {
        return (<safe_area_view_1.default>
        
        
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 600 : 500), style_1.bgColor('blue')])} scrollY>
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
Customer = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], Customer);
exports.default = Customer;
//# sourceMappingURL=customer.jsx.map