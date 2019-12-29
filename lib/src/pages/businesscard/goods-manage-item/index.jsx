"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 商品管理item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const touchable_button_1 = require("../../../compoments/touchable-button");
class GoodsManageItem extends taro_1.PureComponent {
    render() {
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(189), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(16)])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(90), style_1.h(90), style_1.radiusA(4)])} src={require('../../../assets/ico_default.png')}/>
          <components_1.View style={datatool_1.styleAssign([style_1.ml(12)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#343434')])}>现代简约双人木床</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A6A6A6')])}>参考价格：</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#FA541C')])}>￥600</components_1.Text>
            </components_1.View>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A6A6A6'), style_1.mt(4)])}>创建时间：2019-11-20</components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(95), style_1.h(1), { marginLeft: '2.5%' }, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.mt(20)])}/>
        
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac, style_1.default.ujb,
            style_1.pl(20), style_1.pr(20)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
            
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(52), style_1.h(28), style_1.radiusA(4), style_1.bo(1), style_1.bdColor(style_1.commonStyles.colorTheme),
            { borderStyle: 'solid' }, style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>更多</components_1.Text>
            </touchable_button_1.default>
            
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.ml(32), style_1.w(72), style_1.h(28), style_1.radiusA(4), style_1.bo(1), style_1.bdColor(style_1.commonStyles.colorTheme),
            { borderStyle: 'solid' }, style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>下架商品</components_1.Text>
            </touchable_button_1.default>
          </components_1.View>
          
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(72), style_1.h(28), style_1.radiusA(4), style_1.bgColor(style_1.commonStyles.colorTheme), style_1.default.uac, style_1.default.ujc])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>取消展示</components_1.Text>
          </touchable_button_1.default>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = GoodsManageItem;
//# sourceMappingURL=index.jsx.map