"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 便捷功能
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const touchable_button_1 = require("../../../compoments/touchable-button");
class BianJieTool extends taro_1.PureComponent {
    render() {
        let { itemClick } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(32)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(22), style_1.bgColor('#E2BB7B')])}/>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(8)])}>便捷功能</components_1.Text>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.mt(13)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(88), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4),
            style_1.default.udr, style_1.default.uac, style_1.default.uja])}>
            {['商城', '海报', '工具箱', '名片夹', '任务中心'].map((value, index) => {
            console.log(value);
            return (<touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac])} key={index} onClick={() => {
                itemClick(value);
            }}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(24), style_1.h(24), style_1.bgColor('#4EAFFF')])}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.mt(10), style_1.color('#343434'), style_1.fSize(10)])}>{value}</components_1.Text>
                </touchable_button_1.default>);
        })}
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = BianJieTool;
//# sourceMappingURL=index.jsx.map