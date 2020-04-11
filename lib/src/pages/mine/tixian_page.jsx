"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename tixian_page.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 微信提现界面
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/distribution");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const global_1 = require("../../const/global");
const httpurl_1 = require("../../api/httpurl");
let TixianPage = class TixianPage extends taro_1.Component {
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
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/2/16
         * @function: 申请提现
         */
        this.withdraw = () => {
            this.viewRef.showLoading();
            let { money } = this.state;
            this.props.withdraw({ money: parseInt(money, 10) * global_1.BaseCoin }).then((res) => {
                console.log('申请提现', res);
                this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('提现成功');
                }
            }).catch(e => {
                this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log(this.viewRef);
        this.state = {
            money: '',
            withdrawIncome: this.$router.params.withdrawIncome
        };
    }
    render() {
        let { withdrawIncome } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={''}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(16), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.ml(20), style_1.mt(20)])}>
              提现金额
            </components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(60), style_1.default.uac, style_1.default.udr, style_1.mt(20)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(28), style_1.color('#343434'), style_1.ml(20)])}>
                ￥
              </components_1.Text>
              <components_1.Input type='number' autoFocus={true} style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(28)])} onInput={(e) => {
            this.setState({ money: e.detail.value });
        }}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), { marginLeft: '5%' }, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(10), style_1.ml(20)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>
                当前余额：
              </components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#FA6B57')])}>
                {`￥${withdrawIncome}`}
              </components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#576A94')])}>
                ，攒够100元可以提现，手续费2%
              </components_1.Text>
            </components_1.View>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.ml(20), style_1.mt(20)])}>
              提现方式
            </components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.mt(16), { marginLeft: '5%' }, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(62), style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.pl(20), style_1.pr(20)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(26), style_1.h(26)])} src={require('../../assets/ico_wechat_tixian.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.ml(10)])}>
                  微信
                </components_1.Text>
              </components_1.View>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18)])} src={require('../../assets/ico_wechat_done.png')}/>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.mt(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color('#979797')])}>
              申请的提现会直接打款到您的微信钱包，请注意查看通知
            </components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color('#979797'), style_1.mt(10)])}>
              提现到账时间为1-3个工作日之内
            </components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.mt(36)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(44), style_1.radiusA(2), style_1.default.uac, style_1.default.ujc,
            style_1.bgColor('#E2BB7B')])} onClick={() => {
            this.withdraw();
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.whiteColor)])}>
                提现
              </components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
TixianPage = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], TixianPage);
exports.default = TixianPage;
//# sourceMappingURL=tixian_page.jsx.map
