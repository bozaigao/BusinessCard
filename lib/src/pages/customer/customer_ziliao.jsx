"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename customer_ziliao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/11
 * @Description: 客户资料界面
 */
const taro_1 = require("@tarojs/taro");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/customer");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const touchable_button_1 = require("../../compoments/touchable-button");
const httpurl_1 = require("../../api/httpurl");
let CustomerZiLiao = class CustomerZiLiao extends taro_1.Component {
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
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/14
         * @function: 获取客户详细资料
         */
        this.getCustomerDetail = () => {
            this.viewRef && this.viewRef.showLoading();
            this.props.getCustomerDetail({ id: this.id }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                if (res) {
                    this.setState({ customer: res });
                }
                console.log('获取客户详细资料', res);
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        this.id = this.$router.params.id;
        this.state = {
            customer: {
                aboutUrl: '',
                avatar: '',
                birthday: '',
                city: '',
                company: '',
                createTime: '',
                customerUserId: 0,
                detailAddress: '',
                email: '',
                id: 0,
                industry: '',
                intentionGrade: '',
                label: '',
                name: '',
                phone: '',
                position: '',
                province: '',
                remark: '',
                sex: 0,
                type: 0,
                updateTime: '',
                userId: 0,
                wechat: '',
            },
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() {
    }
    componentDidShow() {
        this.getCustomerDetail();
    }
    componentDidHide() {
    }
    render() {
        let { customer } = this.state;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <top_header_1.default title={'客户详细资料'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(86), style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(66), style_1.h(66), style_1.ml(21)])} src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
            <components_1.View style={datatool_1.styleAssign([style_1.w(240), style_1.hRatio(100), style_1.default.ujb,
            style_1.ml(15)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.mt(17), style_1.color('#343434')])}>
                {customer.name}
              </components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(240), style_1.mb(23), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#353535')])}>
                  {customer.position}
                </components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/customer/customer_remark?id=${this.id}&name=${customer.name}&phone=${customer.phone}&remark=${customer.remark}&aboutUrl=${customer.aboutUrl}`
            });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                    添加备注
                  </components_1.Text>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(12), style_1.ml(10)])} src={`${httpurl_1.cloudBaseUrl}ico_edit_mark.png`}/>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          {[{ title: '来源', value: customer.type === 1 ? '平台' : '手动录入' },
            { title: '手机', value: datatool_1.wrapSafe(customer.phone) },
            { title: '性别', value: customer.sex === 1 ? '男' : '女' },
            { title: '公司', value: datatool_1.wrapSafe(customer.company) },
            { title: '行业', value: datatool_1.wrapSafe(customer.industry) },
            { title: '职位', value: datatool_1.wrapSafe(customer.position) },].map((value, inedx) => {
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
          {[{ title: '地区', value: datatool_1.wrapSafe(customer.province + customer.city) },
            { title: '详细地址', value: datatool_1.wrapSafe(customer.detailAddress) },
            { title: '生日', value: customer.birthday ? datatool_1.transformTime(customer.birthday) : '' },
            { title: '微信号', value: datatool_1.wrapSafe(customer.wechat) },
            { title: '邮箱', value: datatool_1.wrapSafe(customer.email) }].map((value, inedx) => {
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
          
          {customer.label && datatool_1.parseData(customer.label).length !== 0 &&
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(154), style_1.mt(8), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.ml(20), style_1.mt(16)])}>Ta的标签</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(8),
                style_1.default.uWrap])}>
                {datatool_1.parseData(customer.label).map((value, index) => {
                return (<touchable_button_1.default key={index} customStyle={datatool_1.styleAssign([style_1.ml(24), style_1.mt(12), style_1.radiusA(14), style_1.padding([6, 16, 6, 16]),
                    style_1.bgColor('#EFEFEF')])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.colorTheme)])}>{value}</components_1.Text>
                    </touchable_button_1.default>);
            })}
              </components_1.View>
            </components_1.View>}
          {customer.aboutUrl.length !== 0 &&
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(154), style_1.mt(8), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.ml(20), style_1.mt(16)])}>描述</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(8),])}>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), { marginLeft: '5%' }, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor),
                style_1.padding([13, 16, 13, 16])])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                    {customer.remark}
                  </components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(176), style_1.mt(20), style_1.mb(20)])} src={customer.aboutUrl} mode={'aspectFit'}/>
                </components_1.View>
              </components_1.View>
            </components_1.View>}
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
CustomerZiLiao = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], CustomerZiLiao);
exports.default = CustomerZiLiao;
//# sourceMappingURL=customer_ziliao.jsx.map