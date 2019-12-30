"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename customer_detail.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/11
 * @Description: 添加新客户
 */
const taro_1 = require("@tarojs/taro");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const touchable_button_1 = require("../../compoments/touchable-button");
let AddCustomer = class AddCustomer extends taro_1.Component {
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
            top1List: [{ title: '姓名', value: '刘思雨' }, { title: '性别', value: '男' }, {
                    title: '手机',
                    value: '18980646458'
                }, { title: '公司', value: '保利房地产集团有限公司' }, { title: '职位', value: '项目经理' }],
            top2List: [{ title: '地区', value: '广东深圳' }, { title: '详细地址', value: '广东深圳' }, {
                    title: '生日',
                    value: '1990-09-18'
                }, { title: '微信号', value: '18980646458' }, { title: '邮箱', value: '80646458@qq.com' }],
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
        let { top1List, top2List } = this.state;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={''}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>

          <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.wRatio(100), style_1.h(86), style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac,
            style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#CECECE')])}>头像</components_1.Text>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(66), style_1.h(66), style_1.radiusA(33)])} src={require('../../assets/ico_default.png')}/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10)])}>
            {top1List.map((value, index) => {
            return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])} key={index}><components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#CECECE')])}>{value.title}</components_1.Text>
                  <components_1.Input type='text' value={value.value} style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14), { textAlign: 'right' }])}/>
                </components_1.View>
                  {index !== 4 &&
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>}
                </components_1.View>);
        })}
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10)])}>
            {top2List.map((value, index) => {
            return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])} key={index}><components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#CECECE')])}>{value.title}</components_1.Text>
                  <components_1.Input type='text' value={value.value} style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14), { textAlign: 'right' }])}/>
                </components_1.View>
                  {index !== 4 &&
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>}
                </components_1.View>);
        })}
          </components_1.View>

          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(83), style_1.mt(10), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#CECECE'), style_1.ml(20), style_1.mt(28)])}>备注</components_1.Text>
            <components_1.Input type='text' value={'合作机会比较大，可以重点关注，积极跟进'} style={datatool_1.styleAssign([style_1.ml(20), style_1.fSize(14), style_1.mt(4)])}/>
          </components_1.View>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(56), style_1.mt(63), style_1.default.uac, style_1.default.ujc, style_1.bgColor('#0F56C5')])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color(style_1.commonStyles.whiteColor)])}>保存</components_1.Text>
          </touchable_button_1.default>
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
AddCustomer = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], AddCustomer);
exports.default = AddCustomer;
//# sourceMappingURL=add_customer.jsx.map
