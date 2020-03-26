"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 访问item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const index_1 = require("../../../compoments/touchable-button/index");
const httpurl_1 = require("../../../api/httpurl");
class VisitorItem extends taro_1.PureComponent {
    render() {
        let { item } = this.props;
        return (<index_1.default customStyle={datatool_1.styleAssign([style_1.radiusA(4), { width: '95%' }, { marginLeft: '2.5%' }, style_1.h(156), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(14)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(20)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(46), style_1.h(46), style_1.ml(16)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(46), style_1.h(46), style_1.radiusA(23)])} src={item.visitor.avatar}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(13), style_1.h(13), style_1.default.upa, style_1.absB(0), style_1.absR(0)])} src={item.visitor.sex === 2 ? `${httpurl_1.cloudBaseUrl}ico_nv.png` : `${httpurl_1.cloudBaseUrl}ico_nan.png`}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.ml(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{item.visitor.name}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.mt(5)])}>{`来自${item.visitor.source}`}</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.colorTheme), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc,
            style_1.w(72), style_1.h(28), style_1.radiusA(4), style_1.mr(16)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>置为客户</components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.View>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.mt(3), style_1.ml(16), style_1.color(style_1.commonStyles.colorTheme)])}>{`累计访问次数(${item.visitCount}) · 查看名片(${item.cardCount}) · 查看商品(${item.goodsCount})`}</components_1.Text>
          <components_1.Text style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>
            {`查看企业(${item.companyCount})`}
          </components_1.Text>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.mt(15)])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.ujb, style_1.default.udr])}>
          <components_1.View style={datatool_1.styleAssign([style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#E2BB7B'), style_1.fSize(14), style_1.ml(16)])}>{`最后访问 ${datatool_1.transformTime(item.lastVisitTime)}`}</components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(80), style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(14), style_1.default.utxdu])}>查看名片</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(80), style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(14), style_1.default.utxdu])}>添加微信</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </index_1.default>);
    }
}
exports.default = VisitorItem;
//# sourceMappingURL=index.jsx.map
