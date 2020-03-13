"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
class CustomSafeAreaView extends taro_1.Component {
    constructor(props) {
        super(props);
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/9/25
         * @function: 显示进度条
         */
        this.showLoading = (title) => {
            taro_1.default.showLoading({
                title: title ? title : '加载中',
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/9/25
         * @function: 隐藏进度条
         */
        this.hideLoading = () => {
            taro_1.default.hideLoading();
        };
    }
    render() {
        let { customStyle, children, notNeedBottomPadding } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), { marginBottom: notNeedBottomPadding ? '0px' : `${global.screenHeight - global.safeArea.bottom}px` }, customStyle])}>
        {children}
      </components_1.View>);
    }
}
exports.default = CustomSafeAreaView;
//# sourceMappingURL=index.jsx.map