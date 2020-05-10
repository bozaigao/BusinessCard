"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/16
 * @Description: 名片切换item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const touchable_button_1 = require("../touchable-button");
const httpurl_1 = require("../../api/httpurl");
class QieHanItem extends taro_1.PureComponent {
    render() {
        return (<touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.w(335), style_1.h(128), style_1.radiusA(4), style_1.bgColor(style_1.commonStyles.whiteColor),
            style_1.padding([20, 16, 20, 16])])}>
        <components_1.Image style={datatool_1.styleAssign([style_1.w(88), style_1.h(88)])} src={`${httpurl_1.cloudBaseUrl}ico_person.png`}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(70), style_1.ml(12)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#343434')])}>王嘉怡</components_1.Text>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(72), style_1.h(28), style_1.radiusA(2), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.colorTheme)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color(style_1.commonStyles.whiteColor)])}>正在使用</components_1.Text>
            </touchable_button_1.default>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.w(60), style_1.h(22), style_1.default.uac, style_1.default.ujc, style_1.pa(5), style_1.bgColor('#E2E2E2'), style_1.mt(19),
            style_1.radiusA(2)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>销售经理</components_1.Text>
          </components_1.View>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color('#343434'), style_1.mt(10)])}>美克美家家居集团股份有限公司</components_1.Text>
        </components_1.View>
      </touchable_button_1.default>);
    }
}
exports.default = QieHanItem;
//# sourceMappingURL=index.jsx.map