"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/5
 * @Description: 渐进色变换组件
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
class LinearGradientView extends taro_1.Component {
    render() {
        let { style } = this.props;
        return (<components_1.View style={style}>
        <components_1.View className='.linear-gradients-view'/>
      </components_1.View>);
    }
}
exports.LinearGradientView = LinearGradientView;
exports.default = LinearGradientView;
//# sourceMappingURL=index.jsx.map