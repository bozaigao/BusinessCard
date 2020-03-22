"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_genjin.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/15
 * @Description: 添加跟进
 */
const taro_1 = require("@tarojs/taro");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/customer");
const top_header_1 = require("../../compoments/top-header");
const bottom_buton_1 = require("../../compoments/bottom-buton");
const components_1 = require("@tarojs/components");
const httpurl_1 = require("../../api/httpurl");
let AddGenJin = class AddGenJin extends taro_1.Component {
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
         * @date 2020/1/15
         * @function:添加客户跟进
         */
        this.addFollowUp = () => {
            if (this.state.desc.length === 0) {
                datatool_1.toast('跟进内容不能为空');
                return;
            }
            this.viewRef && this.viewRef.showLoading();
            this.props.addFollowUp({
                id: this.state.customer.id,
                followUpContent: this.state.desc,
            }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('添加成功');
                    datatool_1.debounce(1000, () => {
                        taro_1.default.navigateBack();
                    });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        this.state = {
            desc: '',
            customer: datatool_1.parseData(this.$router.params.itemData),
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() {
    }
    componentDidHide() {
    }
    render() {
        let { desc, customer } = this.state;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <top_header_1.default title={'添加跟进'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(140), style_1.bgColor(style_1.commonStyles.whiteColor),
            style_1.pl(20), style_1.pr(20), style_1.pt(16), style_1.pb(16)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>
              跟进客户
            </components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.mt(16)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(66), style_1.h(66)])} src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
              <components_1.View style={datatool_1.styleAssign([style_1.ml(16)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#343434')])}>
                    {customer.name}
                  </components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9'), style_1.ml(8)])}>
                    {customer.position}
                  </components_1.Text>
                </components_1.View>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9'), style_1.mt(8)])}>
                  {customer.company}
                </components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(201), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434'), style_1.ml(20), style_1.mt(18)])}>跟进记录</components_1.Text>
            <components_1.Textarea value={desc} maxlength={200} style={datatool_1.styleAssign([style_1.ml(20), style_1.w(330), style_1.pt(20), style_1.pb(20), style_1.mr(20), style_1.fSize(14), style_1.radiusA(4), style_1.mt(4), style_1.h(81),
            style_1.bgColor(style_1.commonStyles.whiteColor)])} onInput={(e) => {
            this.setState({ desc: e.detail.value });
        }} placeholder={'在此填写您的跟进记录~'}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.udr, style_1.default.uac, style_1.default.uje])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.mr(30)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#979797')])}>{desc.length}</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#CECECE')])}>/200</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
        </components_1.View>
        
        <bottom_buton_1.default title={'保存'} onClick={() => {
            this.addFollowUp();
        }}/>
      </safe_area_view_1.default>);
    }
};
AddGenJin = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], AddGenJin);
exports.default = AddGenJin;
//# sourceMappingURL=add_genjin.jsx.map