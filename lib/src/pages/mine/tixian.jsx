"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename tixian.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 提现
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const navigation_bar_1 = require("../../compoments/navigation_bar");
let TiXian = class TiXian extends taro_1.Component {
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
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/29
         * @function: 获取用户信息
         */
        this.getUserInfo = () => {
            this.props.getUserInfo().then((res) => {
                this.props.updateUserInfo(res);
                console.log('获取用户信息', res);
                console.log('属性', this.props.userInfo);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        this.state = {
            year: `${new Date().getFullYear()}`,
            withdrawIncome: this.$router.params.withdrawIncome,
            withdrawIncomeStat: this.$router.params.withdrawIncomeStat
        };
    }
    componentWillMount() {
        this.getUserInfo();
    }
    componentDidShow() {
    }
    componentDidHide() {
    }
    render() {
        let { withdrawIncome, withdrawIncomeStat } = this.state;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} notNeedBottomPadding={true}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 322 : 322)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 242 : 222)])} src={require('../../assets/ico_mine_bg.png')}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(213), style_1.default.upa, style_1.absB(0), style_1.default.uac, style_1.default.ujc])}>
              <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(213), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4),])}>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(60), style_1.default.uac, style_1.default.ujc, style_1.bgColor('#FAF1E5'),
            style_1.radiusTL(4), style_1.radiusTR(4)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uae, style_1.mt(4)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>
                      可提现金额
                    </components_1.Text>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>
                      (税前)
                    </components_1.Text>
                  </components_1.View>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uae, style_1.mt(4)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#FA6B57'), style_1.mb(5)])}>
                      ¥
                    </components_1.Text>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(28), style_1.color('#FA6B57')])}>
                      {withdrawIncome}
                    </components_1.Text>
                  </components_1.View>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.mt(28)])}>
                    <components_1.View style={datatool_1.styleAssign([style_1.w(201), style_1.h(41), style_1.radiusA(21), style_1.bgColor(parseInt(withdrawIncome, 10) === 0 ? '#CCCCCC' : '#E2BB7B'),
            style_1.default.uac, style_1.default.ujc])} onClick={() => {
            if (parseInt(withdrawIncome, 10) !== 0) {
                taro_1.default.navigateTo({
                    url: `/pages/mine/tixian_page?withdrawIncome=${withdrawIncome}`
                });
            }
        }}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.whiteColor)])}>
                        提现
                      </components_1.Text>
                    </components_1.View>
                  </components_1.View>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <navigation_bar_1.default style={datatool_1.styleAssign([style_1.default.upa, style_1.absT(0)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={require('../../assets/ico_back_white.png')} onClick={() => {
            taro_1.default.navigateBack();
        }}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(style_1.commonStyles.whiteColor)])}>
                提现
              </components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.mr(20)])}/>
            </components_1.View>
          </navigation_bar_1.default>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])} onClick={() => {
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(51), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.pl(20), style_1.pr(20),
            style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(20)])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/tixian_recorder`
            });
        }}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(20), style_1.h(20)])} src={require('../../assets/ico_tixian.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.ml(14)])}>
                  我的提现记录
                </components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.mr(9)])}>
                  {`${withdrawIncomeStat} 元`}
                </components_1.Text>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12)])} src={require('../../assets/ico_next.png')}/>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([{ width: '95%' }, style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.default.upa, style_1.absB(0)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.mb(32)])}>
              发起提现后，收入会在1-3个工作日内到账
            </components_1.Text>
          </components_1.View>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
TiXian = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], TiXian);
exports.default = TiXian;
//# sourceMappingURL=tixian.jsx.map