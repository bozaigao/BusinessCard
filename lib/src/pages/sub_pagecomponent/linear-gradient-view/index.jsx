"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/5
 * @Description: 渐进色变换组件
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
require("./add_task.scss");
class LinearGradientView2 extends taro_1.Component {
    render() {
        let { style } = this.props;
        return (<components_1.View style={style}>
        <components_1.View className='.linear-gradients-view'/>
      </components_1.View>);
    }
}
exports.LinearGradientView2 = LinearGradientView2;
exports.default = LinearGradientView2;
//# sourceMappingURL=index.jsx.map
