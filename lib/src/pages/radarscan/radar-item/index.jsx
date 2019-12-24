"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 雷达item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const touchable_button_1 = require("../../../compoments/touchable-button");
class RadarItem extends taro_1.PureComponent {
    render() {
        return (<touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.radiusA(4), { width: '95%' }, { marginLeft: '2.5%' }, style_1.h(154), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(8)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(20)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(43), style_1.h(43), style_1.radiusA(21.5), style_1.ml(16)])} src={require('../../../assets/ico_default.jpeg')}/>
            <components_1.View style={datatool_1.styleAssign([style_1.ml(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme)])}>刘思雨</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color('#979797')])}>来自名片扫码2019-11-20</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.bgColor('#0F56C5'), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc,
            style_1.w(72), style_1.h(28), style_1.radiusA(4), style_1.mr(16)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>置为客户</components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.mt(3), style_1.ml(16), style_1.color(style_1.commonStyles.colorTheme)])}>她于2019-11-20访问过您的名片以及商品</components_1.Text>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.mt(15)])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.ujb, style_1.default.udr])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(80), style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#0F56C5'), style_1.fSize(12)])}>添加标签</components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(80), style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#0F56C5'), style_1.fSize(12)])}>拨打电话</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(80), style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#0F56C5'), style_1.fSize(12)])}>加微信</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </touchable_button_1.default>);
    }
}
exports.default = RadarItem;
//# sourceMappingURL=index.jsx.map