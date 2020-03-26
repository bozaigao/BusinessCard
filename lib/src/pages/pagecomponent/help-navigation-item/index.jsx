"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @Description: 帮助头部组件
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const style_1 = require("../../../utils/style");
const datatool_1 = require("../../../utils/datatool");
const index_1 = require("../../../compoments/navigation_bar/index");
class HelpNavigationItem extends taro_1.Component {
    render() {
        return (<index_1.default>
        <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(100), style_1.h(32), style_1.default.udr, style_1.default.uac, style_1.bo(1), { borderStyle: 'solid' }, style_1.bdColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(16), style_1.ml(20)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(9), style_1.h(15), style_1.ml(20)])} src={require('../../../assets/ico_help_back.png')} onClick={() => {
            taro_1.default.navigateBack();
        }}/>
            <components_1.View style={datatool_1.styleAssign([style_1.w(1), style_1.h(19), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.ml(15), style_1.mr(15)])}/>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(19), style_1.h(18)])} src={require('../../../assets/ico_home.png')} onClick={() => {
            taro_1.default.reLaunch({
                url: `/pages/businesscard`
            });
        }}/>
          </components_1.View>
        </components_1.View>
      </index_1.default>);
    }
}
exports.default = HelpNavigationItem;
//# sourceMappingURL=index.jsx.map
