"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 界面头部组件
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const navigation_bar_1 = require("../navigation_bar");
class TopHeader extends taro_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { title, textColor, backgroundColor, customCallback, style } = this.props;
        return (<navigation_bar_1.default style={style}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.ujb, style_1.default.udr, style_1.default.uac, style_1.bgColor(backgroundColor ? backgroundColor : style_1.commonStyles.whiteColor)])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={textColor ? require('../../assets/ico_back_white.png') : require('../../assets/ico_back.png')} onClick={() => {
            if (customCallback) {
                customCallback();
            }
            else if (taro_1.default.getCurrentPages().length === 1) {
                taro_1.default.reLaunch({
                    url: `/pages/businesscard`
                });
            }
            else {
                taro_1.default.navigateBack();
            }
        }}/>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(textColor ? textColor : style_1.commonStyles.colorTheme)])}>{title}</components_1.Text>
          <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.bgColor(style_1.commonStyles.transparent), style_1.mr(20)])}/>
        </components_1.View>
      </navigation_bar_1.default>);
    }
}
exports.default = TopHeader;
//# sourceMappingURL=index.jsx.map