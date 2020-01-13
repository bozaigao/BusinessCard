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
 * @Description: 客户详情界面
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
let CustomerDetail = class CustomerDetail extends taro_1.Component {
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
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'客户详细资料'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(86), style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(66), style_1.h(66), style_1.ml(21)])} src={require('../../assets/ico_default.png')}/>
            <components_1.View style={datatool_1.styleAssign([style_1.w(240), style_1.hRatio(100), style_1.default.ujb,
            style_1.ml(15)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.mt(17), style_1.color('#343434')])}>
                TW+2
              </components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(240), style_1.mb(23), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#353535')])}>
                  刘思雨
                </components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                    添加备注
                  </components_1.Text>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(12), style_1.ml(10)])} src={require('../../assets/ico_edit_mark.png')}/>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          {[{ title: '来源', value: '名片海报' },
            { title: '手机', value: '18980646458' },
            { title: '性别', value: '女' },
            { title: '公司', value: '保利房地产集团有限公司' },
            { title: '行业', value: '房地产业' },
            { title: '职位', value: '项目经理' },].map((value, inedx) => {
            return <components_1.View key={inedx} style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(50), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor),
                style_1.pl(20), style_1.pr(20)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>
                    {value.title}
                  </components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                    {value.value}
                  </components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              </components_1.View>;
        })}
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          {[{ title: '地区', value: '广东深圳' },
            { title: '详细地址', value: '广东深圳' },
            { title: '生日', value: '1990-09-18' },
            { title: '微信号', value: '18980646458' },
            { title: '邮箱', value: '80646458@qq.com' }].map((value, inedx) => {
            return <components_1.View key={inedx} style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(50), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor),
                style_1.pl(20), style_1.pr(20)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>
                    {value.title}
                  </components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                    {value.value}
                  </components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              </components_1.View>;
        })}
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(154), style_1.mt(8), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.ml(20), style_1.mt(16)])}>Ta的标签</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(8),
            style_1.default.uWrap])}>
              {['90后', '看电影', '电竞游戏', '运动', '健身', '看书', '旅行'].map((value, index) => {
            return (<touchable_button_1.default key={index} customStyle={datatool_1.styleAssign([style_1.ml(24), style_1.mt(12), style_1.radiusA(14), style_1.padding([6, 16, 6, 16]),
                style_1.bgColor('#EFEFEF')])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.colorTheme)])}>{value}</components_1.Text>
                  </touchable_button_1.default>);
        })}
            </components_1.View>
          </components_1.View>
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
CustomerDetail = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], CustomerDetail);
exports.default = CustomerDetail;
//# sourceMappingURL=customer_detail.jsx.map