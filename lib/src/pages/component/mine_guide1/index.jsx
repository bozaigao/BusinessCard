"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/15
 * @Description: 我的模块指引页
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const index_1 = require("../../../compoments/touchable-button/index");
class MyGuide1 extends taro_1.PureComponent {
    render() {
        let { cancle, viewFenXiao } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([{
                position: 'fixed',
                zIndex: Infinity
            }, style_1.absT(0), style_1.absR(0), style_1.wRatio(100), style_1.hRatio(100)])}>
        <index_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.blackColor), style_1.op(0.5), style_1.default.upa, style_1.absT(0), style_1.absR(0),])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.upa, { top: style_1.iphoneX() ? taro_1.pxTransform(412) : taro_1.pxTransform(362) }])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(345), style_1.h(102)])} src={require('../../../assets/my_guide1_icon.png')} onClick={viewFenXiao}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(92), style_1.h(87), style_1.default.upa, style_1.absR(10), style_1.absT(10)])} src={require('../../../assets/guide_line_6.png')}/>
            <components_1.Text style={datatool_1.styleAssign([style_1.w(237), style_1.h(50), style_1.fSize(18), style_1.color(style_1.commonStyles.whiteColor), style_1.mt(65)])}>点击这里进入分销中心，随时查看自己的客户和收益哦！</components_1.Text>
            <components_1.View onClick={cancle} style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.w(120), style_1.h(44), style_1.radiusA(22), style_1.bo(1), style_1.bdColor(style_1.commonStyles.whiteColor), { borderStyle: 'solid' },
            style_1.bgColor('rgb(145,145,145)'), style_1.mt(40)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.whiteColor), style_1.fSize(18)])}>我知道了</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = MyGuide1;
//# sourceMappingURL=index.jsx.map