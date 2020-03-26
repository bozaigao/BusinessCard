"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 名片夹item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const touchable_button_1 = require("../../../compoments/touchable-button");
const httpurl_1 = require("../../../api/httpurl");
class MingPianJiaItem extends taro_1.PureComponent {
    render() {
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(106), style_1.default.uac, style_1.mt(10)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(106), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4),
            style_1.default.uac, style_1.default.udr])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(66), style_1.h(66), style_1.radiusA(33), style_1.ml(16)])} src={`${httpurl_1.cloudBaseUrl}ico_default.png`}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
            <components_1.View style={datatool_1.styleAssign([style_1.ml(12)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(16)])}>卢志刚</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12), style_1.mt(10)])}>技术顾问</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12)])}>南方科技有限公司</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.mr(16)])}>
              <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.uje])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(6), style_1.h(6), style_1.radiusA(3), style_1.bgColor(style_1.commonStyles.colorTheme)])}/>
                <components_1.View style={datatool_1.styleAssign([style_1.ml(5), style_1.w(6), style_1.h(6), style_1.radiusA(3), style_1.bgColor(style_1.commonStyles.colorTheme)])}/>
                <components_1.View style={datatool_1.styleAssign([style_1.ml(5), style_1.w(6), style_1.h(6), style_1.radiusA(3), style_1.bgColor(style_1.commonStyles.colorTheme)])}/>
              </touchable_button_1.default>
              <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.mt(34), style_1.default.uac, style_1.default.ujc, style_1.radiusA(2), style_1.bgColor(style_1.commonStyles.colorTheme),
            style_1.w(72), style_1.h(28)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.whiteColor), style_1.fSize(10)])}>置为客户</components_1.Text>
              </touchable_button_1.default>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = MingPianJiaItem;
//# sourceMappingURL=index.jsx.map
