"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename radarscan.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 雷达
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const radar_item_1 = require("./radar-item");
const top_header_1 = require("../../compoments/top-header");
class Radarscan extends taro_1.Component {
    constructor(props) {
        super(props);
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
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'雷达'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(85), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18)])}>雷达</components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.mt(5), style_1.w(25), style_1.h(2), style_1.bgColor(style_1.commonStyles.transparent)])}/>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.ml(23)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#0F56C5')])}>访客</components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.mt(5), style_1.w(25), style_1.h(2), style_1.bgColor('#0F56C5')])}/>
              </components_1.View>
            </components_1.View>
            
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujb, style_1.default.udr, style_1.mt(10)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878'), style_1.ml(20)])}>共3位访客</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>新增访客（2）</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878'), style_1.mr(20)])}>筛选</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(541), style_1.default.uac])} scrollY>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
            console.log(value);
            return (<radar_item_1.default key={index}/>);
        })}
          </components_1.ScrollView>
        </components_1.View>
      </safe_area_view_1.default>);
    }
}
exports.default = Radarscan;
//# sourceMappingURL=radarscan.jsx.map