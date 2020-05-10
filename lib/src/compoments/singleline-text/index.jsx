"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/4/11
 * @Description: 文本单行显示
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
class SingleLineText extends taro_1.Component {
    render() {
        let { text, style } = this.props;
        return (<components_1.Text style={Object.assign({}, style, { display: '-webkit-box', overflow: 'hidden', '-webkit-line-clamp': 1, '-webkit-box-orient': 'vertical' })}>{text}</components_1.Text>);
    }
}
exports.default = SingleLineText;
//# sourceMappingURL=index.jsx.map