"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 底部按钮
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
const touchable_button_1 = require("../touchable-button");
class BottomButon extends taro_1.Component {
    render() {
        let { title, onClick } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor('rgb(184,186,190)'), style_1.op(0.5)])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(68), style_1.default.uac, style_1.default.ujc])}>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(335), style_1.h(44), style_1.radiusA(2), style_1.bgColor(style_1.commonStyles.colorTheme),
            style_1.default.uac, style_1.default.ujc])} onClick={onClick}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.whiteColor)])}>{title}</components_1.Text>
          </touchable_button_1.default>
        </components_1.View>
      </components_1.View>);
    }
}
exports.BottomButon = BottomButon;
exports.default = BottomButon;
//# sourceMappingURL=index.jsx.map