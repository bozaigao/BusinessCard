"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename mine.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 我的
*/
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
class Mine extends taro_1.Component {
    constructor() {
        super(...arguments);
        /**
         * 指定config的类型声明为: Taro.Config
         *
         * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
         * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
         * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
         */
        this.config = {
            navigationBarTitleText: '首页',
            disableScroll: true
        };
        this.state = {
            centerBarList: [],
            dataList: []
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() {
    }
    componentDidShow() {
    }
    componentDidHide() {
    }
    render() {
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 600 : 500), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
}
exports.default = Mine;
//# sourceMappingURL=mine.jsx.map