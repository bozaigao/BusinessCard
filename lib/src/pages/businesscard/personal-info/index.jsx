"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 个人介绍
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
class PersonalInfo extends taro_1.PureComponent {
    render() {
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(32)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(22), style_1.bgColor('#E2BB7B')])}/>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(8)])}>我的个人简介</components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(95), style_1.h(307), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4),
            { marginLeft: '2.5%' }, style_1.mt(16), style_1.pa(16)])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40), style_1.radiusA(20)])} src={require('../../../assets/ico_default.jpeg')}/>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.mt(16)])}>Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！Hi,欢迎来到王嘉怡的名片！</components_1.Text>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(24)])}>
            <components_1.View style={datatool_1.styleAssign([])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14)])}>家乡</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>四川省 成都市</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(52), style_1.h(28), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc,
            style_1.bo(1), style_1.radiusA(4), { borderStyle: 'solid' }, style_1.bdColor(style_1.commonStyles.colorTheme), style_1.mr(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>同乡</components_1.Text>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(24)])}>
            <components_1.View style={datatool_1.styleAssign([])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14)])}>教育</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>四川美术学院</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10)])}>产品设计 2015-2019 本科</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(52), style_1.h(28), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc,
            style_1.bo(1), style_1.radiusA(4), { borderStyle: 'solid' }, style_1.bdColor(style_1.commonStyles.colorTheme), style_1.mr(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>校友</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = PersonalInfo;
//# sourceMappingURL=index.jsx.map