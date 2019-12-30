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
const actions = require("../../actions/login");
const custom_item_1 = require("./custom-item");
const touchable_button_1 = require("../../compoments/touchable-button");
let Customer = class Customer extends taro_1.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(99), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.ujb])}>
            <components_1.View style={datatool_1.styleAssign([{ width: '68%' }, { marginLeft: '2.5%' }, style_1.h(31), style_1.op(0.7), style_1.bgColor('#F5F5F5'),
            style_1.radiusA(26), style_1.default.uac, style_1.default.udr, style_1.mt(10)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(21), style_1.h(21), style_1.ml(16)])} src={require('../../assets/ico_search.png')}/>
              <components_1.Input type='text' placeholder='搜索客户姓名' style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14)])}/>
            </components_1.View>

            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujb, style_1.default.udr, style_1.mb(10)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878'), style_1.ml(20)])}>共2位客户</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>最后跟进时间</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878'), style_1.mr(20)])}>筛选</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac])} scrollY>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
            console.log(value);
            return (<custom_item_1.default key={index} onClick={() => {
                taro_1.default.navigateTo({
                    url: `/pages/customer/customer_detail`
                });
            }}/>);
        })}
          </components_1.ScrollView>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(80), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(335), style_1.h(44), style_1.radiusA(4), style_1.bgColor('#0F56C5'),
            style_1.default.uac, style_1.default.ujc])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/customer/add_customer`
            });
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color(style_1.commonStyles.whiteColor)])}>新增客户</components_1.Text>
            </touchable_button_1.default>
          </components_1.View>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
Customer = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], Customer);
exports.default = Customer;
//# sourceMappingURL=customer.jsx.map
