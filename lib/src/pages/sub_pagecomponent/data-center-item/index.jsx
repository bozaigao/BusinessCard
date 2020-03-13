"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 数据中心item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const global_1 = require("../../../const/global");
class DataCenterItem extends taro_1.PureComponent {
    render() {
        let { item } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(136), style_1.default.uac, style_1.default.ujc, style_1.mt(14)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(156), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4),])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(50), style_1.default.uac, style_1.default.ujc,
            style_1.radiusTL(4), style_1.radiusTR(4)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
              {item.date}
            </components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(15)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>
                销售额(税前)
              </components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uae, style_1.mt(4)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.mb(5)])}>
                  ¥
                </components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(24), style_1.color('#343434')])}>
                  {(item.totalSale / global_1.BaseCoin).toFixed(2)}
                </components_1.Text>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(1), style_1.h(30), style_1.bgColor('#E5E5E5')])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>
                已结算收入(税前)
              </components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uae, style_1.mt(4)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.mb(5)])}>
                  ¥
                </components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(24), style_1.color('#343434')])}>
                  {(item.totalIncome / global_1.BaseCoin).toFixed(2)}
                </components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = DataCenterItem;
//# sourceMappingURL=index.jsx.map