"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const react_native_1 = require("react-native");
const react_1 = require("react");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const components_1 = require("@tarojs/components");
const loading_1 = require("../loading");
class CustomSafeAreaView extends react_1.Component {
    constructor(props) {
        super(props);
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/9/25
         * @function: 显示进度条
         */
        this.showLoading = () => {
            this.setState({ showLoading: true });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/9/25
         * @function: 隐藏进度条
         */
        this.hideLoading = () => {
            this.setState({ showLoading: false });
        };
        this.state = {
            showLoading: false,
        };
    }
    render() {
        let { style, children, notNeedSafe } = this.props;
        let { showLoading } = this.state;
        if (notNeedSafe) {
            return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style])}>
          {children}
        </components_1.View>);
        }
        return (<react_native_1.SafeAreaView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style])}>
        {children}
        {showLoading && <loading_1.default />}
      </react_native_1.SafeAreaView>);
    }
}
exports.default = CustomSafeAreaView;
//# sourceMappingURL=index.rn.jsx.map