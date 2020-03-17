"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/19
 * @Description: 问候语显示Modal
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const index_1 = require("../../../compoments/touchable-button/index");
const httpurl_1 = require("../../../api/httpurl");
var WenHouType;
(function (WenHouType) {
    WenHouType[WenHouType["HOME"] = 0] = "HOME";
    WenHouType[WenHouType["EDUCATION"] = 1] = "EDUCATION";
})(WenHouType = exports.WenHouType || (exports.WenHouType = {}));
class WenHouModal extends taro_1.PureComponent {
    render() {
        let { cancle, wenHouYu, userInfo, type } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([{
                position: 'fixed',
                zIndex: Infinity
            }, style_1.absT(0), style_1.absR(0), style_1.wRatio(100), style_1.hRatio(100)])}>
        <index_1.default onClick={cancle} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.blackColor), style_1.op(0.5), style_1.default.upa, style_1.absT(0), style_1.absR(0)])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.uac, style_1.default.ujc, style_1.default.upa, style_1.absB(0)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(302), style_1.h(284)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(185)])} src={type === WenHouType.EDUCATION ? require('../../../assets/ico_wenhou_bg.png') : require('../../../assets/ico_wenhou_home_bg.png')}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusBL(8), style_1.radiusBR(8),
            style_1.default.uac, style_1.default.ujc])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40), style_1.radiusA(20)])} src={userInfo.avatar ? userInfo.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
                <components_1.View style={datatool_1.styleAssign([style_1.ml(10)])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(221), style_1.h(59)])} src={require('../../../assets/ico_wenhouyu_bg2.png')}/>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.hRatio(90), { marginLeft: '7%' }, style_1.default.ujc, style_1.default.upa, style_1.absT(0)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>{wenHouYu}</components_1.Text>
                  </components_1.View>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(33), style_1.h(33), style_1.mt(30)])} src={require('../../../assets/ico_close_white.png')} onClick={cancle}/>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = WenHouModal;
//# sourceMappingURL=index.jsx.map