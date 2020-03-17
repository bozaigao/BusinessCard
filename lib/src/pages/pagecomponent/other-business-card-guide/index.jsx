"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/15
 * @Description: 别人名片指引页
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const index_1 = require("../../../compoments/touchable-button/index");
class OtherBusinessCardGuide extends taro_1.PureComponent {
    render() {
        let { cancle, goToMyCard } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([{
                position: 'fixed',
                zIndex: Infinity
            }, style_1.absT(0), style_1.absR(0), style_1.wRatio(100), style_1.hRatio(100)])}>
        <index_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.blackColor), style_1.op(0.5), style_1.default.upa, style_1.absT(0), style_1.absR(0),])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.upa, style_1.absT(0)])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(97), style_1.h(34), style_1.default.upa, style_1.absT(style_1.iphoneX() ? 46 : 26), style_1.absL(20)])} src={require('../../../assets/guide_person.png')} onClick={goToMyCard}/>
          <components_1.Text style={datatool_1.styleAssign([style_1.w(170), style_1.h(50), style_1.ml(20), style_1.fSize(18), style_1.mt(150), style_1.color(style_1.commonStyles.whiteColor)])}>点击这里可以回到自\n己的名片首页哦！</components_1.Text>
          <components_1.View onClick={cancle} style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.w(120), style_1.h(44), style_1.radiusA(22), style_1.bo(1), style_1.bdColor(style_1.commonStyles.whiteColor), { borderStyle: 'solid' },
            style_1.bgColor('rgb(145,145,145)'), style_1.mt(40)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.whiteColor), style_1.fSize(18)])}>我知道了</components_1.Text>
          </components_1.View>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(92), style_1.h(87), style_1.default.upa, style_1.absL(40), style_1.absT(90)])} src={require('../../../assets/guide_line4.png')}/>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = OtherBusinessCardGuide;
//# sourceMappingURL=index.jsx.map