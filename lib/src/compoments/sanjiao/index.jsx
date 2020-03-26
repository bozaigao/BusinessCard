"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/19
 * @Description: 各个方向的三角标
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const global_1 = require("../../const/global");
class SanJiao extends taro_1.Component {
    render() {
        let { orientation, style, size } = this.props;
        size = size ? size : 6;
        if (orientation === global_1.Orientation.up) {
            return (<components_1.View style={datatool_1.styleAssign([{
                    width: 0,
                    height: 0,
                    borderTopWidth: 0,
                    borderTopColor: 'transparent',
                    borderRightWidth: datatool_1.scaleSize(size),
                    borderRightColor: 'transparent',
                    borderLeftWidth: datatool_1.scaleSize(size),
                    borderLeftColor: 'transparent',
                    borderBottomWidth: datatool_1.scaleSize(size),
                    borderBottomColor: '#787878',
                    borderStyle: 'solid',
                }, style])}/>);
        }
        else if (orientation === global_1.Orientation.down) {
            return (<components_1.View style={datatool_1.styleAssign([{
                    width: 0,
                    height: 0,
                    borderTopWidth: datatool_1.scaleSize(size),
                    borderTopColor: '#787878',
                    borderRightWidth: datatool_1.scaleSize(size),
                    borderRightColor: 'transparent',
                    borderLeftWidth: datatool_1.scaleSize(size),
                    borderLeftColor: 'transparent',
                    borderBottomWidth: 0,
                    borderBottomColor: 'transparent',
                    borderStyle: 'solid',
                }, style])}/>);
        }
        else if (orientation === global_1.Orientation.left) {
            return (<components_1.View style={datatool_1.styleAssign([{
                    width: 0,
                    height: 0,
                    borderTopWidth: datatool_1.scaleSize(size),
                    borderTopColor: 'transparent',
                    borderRightWidth: datatool_1.scaleSize(size),
                    borderRightColor: '#787878',
                    borderLeftWidth: 0,
                    borderLeftColor: 'transparent',
                    borderBottomWidth: datatool_1.scaleSize(size),
                    borderBottomColor: 'transparent',
                    borderStyle: 'solid',
                }, style])}/>);
        }
        return (<components_1.View style={datatool_1.styleAssign([{
                width: 0,
                height: 0,
                borderTopWidth: datatool_1.scaleSize(size),
                borderTopColor: 'transparent',
                borderRightWidth: 0,
                borderRightColor: 'transparent',
                borderLeftWidth: datatool_1.scaleSize(size),
                borderLeftColor: '#787878',
                borderBottomWidth: datatool_1.scaleSize(size),
                borderBottomColor: 'transparent',
                borderStyle: 'solid',
            }, style])}/>);
    }
}
exports.default = SanJiao;
//# sourceMappingURL=index.jsx.map
