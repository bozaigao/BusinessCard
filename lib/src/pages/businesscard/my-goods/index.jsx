"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 我的商品
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const touchable_button_1 = require("../../../compoments/touchable-button");
class MyGoods extends taro_1.PureComponent {
    render() {
        let { goToMoreGoods, goToGoodsDetail } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(32)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(22), style_1.bgColor('#E2BB7B')])}/>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(8)])}>我的商品</components_1.Text>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uWrap, style_1.default.udr, style_1.default.uja, style_1.wRatio(100), style_1.mt(16)])}>
          {[1, 2, 3, 4].map((value, index) => {
            console.log(value);
            return (<touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(163), style_1.h(233), style_1.pa(8), style_1.bgColor(style_1.commonStyles.whiteColor)])} key={index} onClick={goToGoodsDetail}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(147), style_1.h(152), style_1.radiusA(4)])} src={require('../../../assets/ico_default.png')}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(8), style_1.mt(12)])}>现代简约双人木床</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color('#FA6B57'), style_1.ml(8), style_1.mt(12), style_1.mt(8)])}>￥688</components_1.Text>
                </touchable_button_1.default>);
        })}
        </components_1.View>
        
        <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.mt(16)])} onClick={goToMoreGoods}>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>查看更多</components_1.Text>
        </touchable_button_1.default>
      </components_1.View>);
    }
}
exports.default = MyGoods;
//# sourceMappingURL=index.jsx.map