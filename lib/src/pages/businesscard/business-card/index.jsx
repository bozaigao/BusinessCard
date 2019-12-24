"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 个人名片
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const touchable_button_1 = require("../../../compoments/touchable-button");
class Card extends taro_1.PureComponent {
    render() {
        let { shareClick } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(95), style_1.h(204), style_1.bgColor('rgb(211,199,195)'), style_1.radiusA(10),
            style_1.default.udr, style_1.default.uje])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.radiusA(10), style_1.default.upa, style_1.absL(0), style_1.absT(0)])} src={require('../../../assets/ico_default.jpeg')}/>
          <components_1.View style={datatool_1.styleAssign([style_1.ma(20)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18)])}>王嘉怡</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>销售经理</components_1.Text>
            </components_1.View>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.mt(30), style_1.mt(5)])}>15982468866@qq.com</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.mt(5)])}>{`四川省成都市武侯区盛和\n二路18号富森美家居`}</components_1.Text>
          </components_1.View>
        </components_1.View>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac, style_1.mt(20)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.h(60), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>访客</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(1), style_1.h(25), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>收藏</components_1.Text>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(95), style_1.default.uac, style_1.default.udr, style_1.h(44), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac])}>
              <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(160), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc, style_1.bo(1), { borderStyle: 'solid' }, style_1.bdColor(style_1.commonStyles.colorTheme),
            style_1.bgColor(style_1.commonStyles.whiteColor), style_1.h(44)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>完善名片</components_1.Text>
              </touchable_button_1.default>
              <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(160), style_1.radiusA(4), style_1.ml(15), style_1.default.uac, style_1.default.ujc, style_1.bo(1), style_1.h(44),
            style_1.bdColor(style_1.commonStyles.colorTheme), style_1.bgColor(style_1.commonStyles.colorTheme)])} onClick={shareClick}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.whiteColor)])}>分享名片</components_1.Text>
              </touchable_button_1.default>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(95), style_1.default.uac, style_1.default.udr, style_1.h(100), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>拨打电话</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12)])}>15982468866</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4), style_1.ml(15)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>加微信</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12)])}>点击添加微信</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4), style_1.ml(15)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>联系地址</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12)])}>点击立即定位</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = Card;
//# sourceMappingURL=index.jsx.map