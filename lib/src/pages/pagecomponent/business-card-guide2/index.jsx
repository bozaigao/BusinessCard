"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/15
 * @Description: 名片指引页
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const index_1 = require("../../../compoments/touchable-button/index");
class BusinessCardGuide2 extends taro_1.PureComponent {
    render() {
        let { cancle, viewCard } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([{
                position: 'fixed',
                zIndex: Infinity
            }, style_1.absT(0), style_1.absR(0), style_1.wRatio(100), style_1.hRatio(100)])}>
        <index_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.blackColor), style_1.op(0.5), style_1.default.upa, style_1.absT(0), style_1.absR(0),])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(224), style_1.default.uac, style_1.default.upa, { top: style_1.iphoneX() ? taro_1.pxTransform(563) : taro_1.pxTransform(516) }])}>
          <components_1.Text style={datatool_1.styleAssign([style_1.w(216), style_1.h(50), style_1.fSize(18), style_1.color(style_1.commonStyles.whiteColor)])}>点击这里可以以浏览者身份查看自己的名片哦！</components_1.Text>
          <components_1.View onClick={cancle} style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.w(120), style_1.h(44), style_1.radiusA(22), style_1.bo(1), style_1.bdColor(style_1.commonStyles.whiteColor), { borderStyle: 'solid' },
            style_1.bgColor('rgb(145,145,145)'), style_1.mt(40)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.whiteColor), style_1.fSize(18)])}>我知道了</components_1.Text>
          </components_1.View>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(162), style_1.h(46), style_1.mt(30), style_1.mr(175)])} src={require('../../../assets/view_card.png')} onClick={viewCard}/>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(69), style_1.h(85), style_1.default.upa, style_1.absL(40), style_1.absT(60)])} src={require('../../../assets/guide_line1.png')}/>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = BusinessCardGuide2;
//# sourceMappingURL=index.jsx.map