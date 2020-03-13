"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename data_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 数据中心
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/distribution");
const global_1 = require("../../const/global");
const data_center_item_1 = require("../sub_pagecomponent/data-center-item");
const navigation_bar_1 = require("../../compoments/navigation_bar");
let DataCenter = class DataCenter extends taro_1.Component {
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
         * @date 2020/2/16
         * @function: 数据中心
         */
        this.settlementRecord = () => {
            let { year } = this.state;
            this.viewRef.showLoading();
            this.props.settlementRecord({ year }).then((res) => {
                console.log('数据中心', res);
                console.log('属性', this.props.userInfo);
                this.viewRef.hideLoading();
                if (res) {
                    this.setState({
                        settlementStatsList: res.settlementStats,
                        totalIncome: res.totalIncome,
                        totalSale: res.totalSale
                    });
                }
            }).catch(e => {
                this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        this.state = {
            year: `${new Date().getFullYear()}`,
            settlementStatsList: [],
            totalIncome: 0,
            totalSale: 0
        };
    }
    componentDidShow() {
        this.settlementRecord();
    }
    componentDidHide() {
    }
    render() {
        let { year, settlementStatsList, totalIncome, totalSale } = this.state;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} notNeedBottomPadding={true} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 262 : 242)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 242 : 222)])} src={require('../../assets/ico_mine_bg.png')}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(156), style_1.default.upa, style_1.absB(0), style_1.default.uac, style_1.default.ujc])}>
              <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(156), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4),])}>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(60), style_1.default.uac, style_1.default.ujc, style_1.bgColor('#FAF1E5'),
            style_1.radiusTL(4), style_1.radiusTR(4)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>
                    累计数据
                  </components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(15)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>
                      销售额(税前)
                    </components_1.Text>
                    <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uae, style_1.mt(4)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#FA6B57'), style_1.mb(5)])}>
                        ¥
                      </components_1.Text>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(24), style_1.color('#FA6B57')])}>
                        {(totalSale / global_1.BaseCoin).toFixed(2)}
                      </components_1.Text>
                    </components_1.View>
                  </components_1.View>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(1), style_1.h(40), style_1.bgColor('#E5E5E5')])}/>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac])}>
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
                数据中心
              </components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.mr(20)])}/>
            </components_1.View>
          </navigation_bar_1.default>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.pl(20), style_1.pr(20), style_1.mt(20)])}>
            <components_1.Picker mode='date' onChange={(e) => {
            this.setState({ year: e.detail.value }, () => {
                this.settlementRecord();
            });
        }} value={year} fields={'year'}>
              <components_1.View style={datatool_1.styleAssign([style_1.w(63), style_1.h(22), style_1.bgColor(style_1.commonStyles.colorTheme), style_1.radiusA(2),
            style_1.default.udr, style_1.default.uac, style_1.default.ujc])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                  {year}
                </components_1.Text>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(8), style_1.h(8), style_1.ml(5)])} src={require('../../assets/ico_xiasanjiao_white.png')}/>
              </components_1.View>
            </components_1.Picker>
            <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
              {settlementStatsList.map((value, index) => {
            return <data_center_item_1.default item={value} key={index}/>;
        })}
            </components_1.ScrollView>
          </components_1.View>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
DataCenter = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], DataCenter);
exports.default = DataCenter;
//# sourceMappingURL=data_center.jsx.map