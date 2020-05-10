"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/4/11
 * @Description: 文本多行显示
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
require("./index.scss");
class MultiLineText extends taro_1.Component {
    render() {
        let { text, style } = this.props;
        return (<components_1.Text style={style} className={'.textStyle '}>{text}</components_1.Text>);
    }
}
exports.default = MultiLineText;
//# sourceMappingURL=index.jsx.map