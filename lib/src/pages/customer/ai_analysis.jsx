"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename ai_analysis.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/4/11
 * @Description: ai数据表格分析
 */
const taro_1 = require("@tarojs/taro");
const index_1 = require("../../compoments/safe-area-view/index");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/radar");
const index_2 = require("../../compoments/top-header/index");
const components_1 = require("@tarojs/components");
const PieChart_1 = require("./PieChart");
const LineChart_1 = require("./LineChart");
require("./index.scss");
let AiAnalysis = class AiAnalysis extends taro_1.Component {
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
        this.state = {
            active: datatool_1.parseData(this.$router.params.active),
            interest: datatool_1.parseData(this.$router.params.interest),
            current: 0
        };
    }
    componentDidMount() {
        let { interest, active } = this.state;
        let totalViews = interest.card + interest.company + interest.goods;
        let shouldSub = false, cardPercent = 0, goodsPercent = 0, companyPercent = 0;
        cardPercent = parseInt(`${(interest.card / totalViews) * 100}`, 10);
        goodsPercent = parseInt(`${(interest.goods / totalViews) * 100}`, 10);
        companyPercent = parseInt(`${(interest.company / totalViews) * 100}`, 10);
        if (cardPercent !== 0 || goodsPercent !== 0 || companyPercent !== 0) {
            shouldSub = true;
        }
        const chartData = [
            {
                value: totalViews === 0 ? 0 : goodsPercent,
                name: totalViews === 0 ? '0%' : goodsPercent + '%'
            },
            {
                value: totalViews === 0 ? 0 : companyPercent,
                name: totalViews === 0 ? '0%' : companyPercent + '%'
            },
            {
                value: totalViews === 0 ? 0 : shouldSub ? (100 - companyPercent - goodsPercent) : cardPercent,
                name: totalViews === 0 ? '0%' : (shouldSub ? (100 - companyPercent - goodsPercent) + '%' : cardPercent + '%')
            },
        ];
        console.log(active);
        this.pieChart.refresh(chartData);
        this.lineChart.refresh(active.title, active.value);
    }
    componentWillUnmount() {
    }
    componentDidHide() {
    }
    render() {
        let { current, interest } = this.state;
        let totalViews = interest.card + interest.company + interest.goods;
        let shouldSub = false, cardPercent = 0, goodsPercent = 0, companyPercent = 0;
        cardPercent = parseInt(`${(interest.card / totalViews) * 100}`, 10);
        goodsPercent = parseInt(`${(interest.goods / totalViews) * 100}`, 10);
        companyPercent = parseInt(`${(interest.company / totalViews) * 100}`, 10);
        if (cardPercent !== 0 || goodsPercent !== 0 || companyPercent !== 0) {
            shouldSub = true;
        }
        return (<index_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <index_2.default title={'AI分析'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(2), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434'), style_1.ml(20), style_1.mt(20)])}>
            兴趣占比
          </components_1.Text>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(40), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
            <components_1.View className="pie-chart">
              <PieChart_1.default ref={(ref) => {
            this.pieChart = ref;
        }}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(230), style_1.mr(20)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434')])}>
                {`访问浏览量：${totalViews}`}
              </components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.mt(17)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(13), style_1.h(13), style_1.radiusA(2), style_1.bgColor('#E2BB7B')])}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(5)])}>
                  {`对我名片信息感兴趣：${totalViews === 0 ? '0%' : cardPercent + '%'}`}
                </components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.mt(17)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(13), style_1.default.uac, style_1.h(13), style_1.radiusA(2), style_1.bgColor('#825D22')])}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(5)])}>
                  {`对我的产品感兴趣：${totalViews === 0 ? '0%' : goodsPercent + '%'}`}
                </components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.mt(17)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(13), style_1.default.uac, style_1.h(13), style_1.radiusA(2), style_1.bgColor('#FFE0AE')])}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(5)])}>
                  {`对我的企业感兴趣：${totalViews === 0 ? '0%' : (shouldSub ? (100 - cardPercent - goodsPercent) + '%' : companyPercent + '%')}`}
                </components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434'), style_1.ml(20), style_1.mt(20)])}>
            客户活跃度
          </components_1.Text>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, { display: 'none' }])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.w(205), style_1.h(30), style_1.radiusA(2), style_1.mt(30)])}>
              <components_1.View onClick={() => {
            this.setState({ current: 0 });
        }} style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.bgColor(current === 0 ? '#825D22' : style_1.commonStyles.whiteColor),
            style_1.bo(1), style_1.br(0.5), style_1.bdColor('#825D22'), { borderStyle: 'solid' },])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(current === 0 ? style_1.commonStyles.whiteColor : '#825D22')])}>
                  近7天
                </components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.bgColor(current === 1 ? '#825D22' : style_1.commonStyles.whiteColor),
            style_1.bo(1), style_1.bl(0.5), style_1.br(0.5), style_1.bdColor('#825D22'), { borderStyle: 'solid' },])} onClick={() => {
            this.setState({ current: 1 });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(current === 1 ? style_1.commonStyles.whiteColor : '#825D22')])}>
                  近1月
                </components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.bgColor(current === 2 ? '#825D22' : style_1.commonStyles.whiteColor),
            style_1.bo(1), style_1.bl(0.5), style_1.br(0.5), style_1.bdColor('#825D22'), { borderStyle: 'solid' },])} onClick={() => {
            this.setState({ current: 2 });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(current === 2 ? style_1.commonStyles.whiteColor : '#825D22')])}>
                  近3月
                </components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.bgColor(current === 3 ? '#825D22' : style_1.commonStyles.whiteColor),
            style_1.bo(1), style_1.bl(0.5), style_1.bdColor('#825D22'), { borderStyle: 'solid' },])} onClick={() => {
            this.setState({ current: 3 });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(current === 3 ? style_1.commonStyles.whiteColor : '#825D22')])}>
                  近6月
                </components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View className="line-chart">
            <LineChart_1.default ref={(ref) => {
            this.lineChart = ref;
        }}/>
          </components_1.View>
        </components_1.View>

      </index_1.default>);
    }
};
AiAnalysis = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], AiAnalysis);
exports.default = AiAnalysis;
//# sourceMappingURL=ai_analysis.jsx.map