"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/18
 * @Description: 导航条
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
class NavigationBar extends taro_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { style, children } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), { height: `${global.menuButton.height + (global.menuButton.top - global.statusBarHeight) * 2 + global.statusBarHeight}px` },
            style_1.default.uje, style_1.default.udr, style_1.default.uae, style])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), { height: `${global.menuButton.height}px` }, style_1.mb(global.menuButton.top - global.statusBarHeight),
            style_1.default.ujc])}>
          {children}
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = NavigationBar;
//# sourceMappingURL=index.jsx.map
