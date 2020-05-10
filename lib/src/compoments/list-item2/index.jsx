"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 我的模块ListItem
*/
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
class ListItem extends taro_1.Component {
    render() {
        let { title, subTitle } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
          <components_1.View style={datatool_1.styleAssign([style_1.ml(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#242424')])}>{title}</components_1.Text>
          </components_1.View>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.mr(20), style_1.color('#B7B7B7')])}>{subTitle ? subTitle : ''}</components_1.Text>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
      </components_1.View>);
    }
}
exports.default = ListItem;
//# sourceMappingURL=index.jsx.map