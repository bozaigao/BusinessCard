"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename fenxiao_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/15
 * @Description: 分销中心
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/distribution");
const global_1 = require("../../const/global");
const httpurl_1 = require("../../api/httpurl");
const navigation_bar_1 = require("../../compoments/navigation_bar");
let FenxiaoCenter = class FenxiaoCenter extends taro_1.Component {
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
         * @date 2020/2/16
         * @function: 分销中心主页-我的收益
         */
        this.userIncome = () => {
            this.props.userIncome().then((res) => {
                console.log('分销中心主页-我的收益', res);
                if (res) {
                    this.setState({
                        level: res.level,
                        noSettlement: res.noSettlement,
                        totalIncome: res.totalIncome,
                        withdrawIncome: res.withdrawIncome,
                        withdrawIncomeStat: res.withdrawIncomeStat
                    });
                }
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/15
         * @function: 我的新增客户数量
         */
        this.myCustomerCount = () => {
            this.props.myCustomerCount().then((res) => {
                console.log('我的新增客户数量', res);
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({
                        newAddCustomerNum: res,
                    });
                }
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        this.state = {
            level: 'gold',
            noSettlement: 0,
            totalIncome: 0,
            withdrawIncome: 0,
            withdrawIncomeStat: 0,
            newAddCustomerNum: 0
        };
    }
    componentWillMount() {
        this.userIncome();
        this.myCustomerCount();
    }
    render() {
        let { userInfo } = this.props;
        let { level, noSettlement, totalIncome, withdrawIncome, withdrawIncomeStat, newAddCustomerNum } = this.state;
        let levelIcon = require('../../assets/ico_gold.png');
        switch (level) {
            case 'gold':
                levelIcon = require('../../assets/ico_gold.png');
                break;
            case 'platinum':
                levelIcon = require('../../assets/ico_gold.png');
                break;
            case 'diamond':
                levelIcon = require('../../assets/ico_gold.png');
                break;
            case 'partner':
                levelIcon = require('../../assets/ico_partner.png');
                break;
            default:
                break;
        }
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} notNeedBottomPadding={true}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 292 : 252)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 262 : 222)])} src={require('../../assets/ico_mine_bg.png')}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(112), style_1.default.upa, style_1.absB(0), style_1.default.uac, style_1.default.ujc])}>
              <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(112), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4),
            style_1.pa(16)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                  我的收益
                </components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(15)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>
                      已结算收入(税前)
                    </components_1.Text>
                    <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uae, style_1.mt(4)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#FA6B57'), style_1.mb(5)])}>
                        ¥
                      </components_1.Text>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(24), style_1.color('#FA6B57')])}>
                        {(totalIncome / global_1.BaseCoin).toFixed(2)}
                      </components_1.Text>
                    </components_1.View>
                  </components_1.View>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(2), style_1.h(40), style_1.bgColor('#E5E5E5')])}/>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.pl(16)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>
                      未结算收入(税前)
                    </components_1.Text>
                    <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uae, style_1.mt(4)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#FA6B57'), style_1.mb(5)])}>
                        ¥
                      </components_1.Text>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(24), style_1.color('#FA6B57')])}>
                        {(noSettlement / global_1.BaseCoin).toFixed(2)}
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
                分销中心
              </components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.mr(22)])}/>
            </components_1.View>
          </navigation_bar_1.default>
          
          <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.absT(style_1.iphoneX() ? 105 : 75), style_1.wRatio(100)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.wRatio(100), style_1.default.ujb])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40), style_1.ml(20), style_1.radiusA(33)])} src={userInfo.avatar ? userInfo.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
                <components_1.View style={datatool_1.styleAssign([style_1.ml(18)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(style_1.commonStyles.whiteColor)])}>{userInfo.name ? userInfo.name : '无名氏'}</components_1.Text>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor), style_1.ml(10)])}>{`ID：${userInfo.id}`}</components_1.Text>
                  </components_1.View>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(82), style_1.h(23), style_1.mt(5)])} src={levelIcon}/>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(112), style_1.mt(10), style_1.default.uac, style_1.default.ujc])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(112), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4),
            style_1.pa(16)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujb, style_1.default.udr])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                  收益提现
                </components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>
                  {`已提现 ￥${(withdrawIncomeStat / global_1.BaseCoin).toFixed(2)}`}
                </components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(15)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>
                    可提现收入(税前)
                  </components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uae, style_1.mt(4)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#FA6B57'), style_1.mb(5)])}>
                      ¥
                    </components_1.Text>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(24), style_1.color('#FA6B57')])}>
                      {(withdrawIncome / global_1.BaseCoin).toFixed(2)}
                    </components_1.Text>
                  </components_1.View>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.udr, style_1.default.uje])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(77), style_1.h(30), style_1.radiusA(15), style_1.bgColor(parseInt((withdrawIncome / global_1.BaseCoin).toFixed(2), 10) === 0 ? '#CCCCCC' : '#E2BB7B'),
            style_1.default.uac, style_1.default.ujc])} onClick={() => {
            if (parseInt((withdrawIncome / global_1.BaseCoin).toFixed(2), 10) !== 0) {
                taro_1.default.navigateTo({
                    url: `/pages/mine/tixian?withdrawIncome=${(withdrawIncome / global_1.BaseCoin).toFixed(2)}&withdrawIncomeStat=${(withdrawIncomeStat / global_1.BaseCoin).toFixed(2)}`
                });
            }
        }}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.whiteColor)])}>
                      提现
                    </components_1.Text>
                  </components_1.View>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/data_center`
            });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(51), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.pl(20), style_1.pr(20),
            style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(20)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(20), style_1.h(20)])} src={require('../../assets/ico_data_center.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.ml(14)])}>
                  数据中心
                </components_1.Text>
              </components_1.View>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12)])} src={require('../../assets/ico_next.png')}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([{ width: '95%' }, style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(51), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.pl(20), style_1.pr(20),
            style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/my_customer`
            });
        }}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(20), style_1.h(20)])} src={require('../../assets/ico_my_client.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.ml(14)])}>
                  我的客户
                </components_1.Text>
                {newAddCustomerNum !== 0 &&
            <components_1.View style={datatool_1.styleAssign([style_1.w(54), style_1.h(21), style_1.ml(25), style_1.radiusA(4), style_1.bgColor('#FA6B57'),
                style_1.default.uac, style_1.default.ujc])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                      {`新增${newAddCustomerNum}人`}
                    </components_1.Text>
                  </components_1.View>}
              </components_1.View>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12)])} src={require('../../assets/ico_next.png')}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([{ width: '95%' }, style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          </components_1.View>

        </components_1.View>
      </safe_area_view_1.default>);
    }
};
FenxiaoCenter = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], FenxiaoCenter);
exports.default = FenxiaoCenter;
//# sourceMappingURL=fenxiao_center.jsx.map