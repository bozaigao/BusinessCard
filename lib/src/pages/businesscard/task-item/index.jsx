"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const touchable_button_1 = require("../../../compoments/touchable-button");
class TaskItem extends taro_1.PureComponent {
    render() {
        let { itemData } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(153), style_1.default.uac, style_1.default.ujc, style_1.mt(10), style_1.mb(10)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(153), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujb,
            style_1.pl(16), style_1.pr(16), style_1.pt(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>{itemData.theme}</components_1.Text>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(72), style_1.h(28), style_1.radiusA(4), style_1.bgColor(style_1.commonStyles.colorTheme), style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>移至完成</components_1.Text>
            </touchable_button_1.default>
          </components_1.View>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color('#A6A6A6'), style_1.mt(4), style_1.ml(20)])}>{datatool_1.transformTime(itemData.createTime)}</components_1.Text>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434'), style_1.mt(10), style_1.ml(20)])}>{itemData.remark}</components_1.Text>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.mt(16), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.udr, style_1.default.uje])}>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.mr(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#313137'), style_1.fSize(12)])}>查看关联客户</components_1.Text>
            </touchable_button_1.default>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = TaskItem;
//# sourceMappingURL=index.jsx.map