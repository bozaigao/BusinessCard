"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/16
 * @Description: 名片切换item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const touchable_button_1 = require("../../../compoments/touchable-button");
class ShareModal extends taro_1.PureComponent {
    render() {
        let { cancle, wechatShare, haibao } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([{
                position: 'fixed',
                zIndex: Infinity
            }, style_1.absT(0), style_1.absR(0), style_1.wRatio(100), style_1.hRatio(100)])}>
        <touchable_button_1.default onClick={cancle} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.blackColor), style_1.op(0.5), style_1.default.upa, style_1.absT(0), style_1.absR(0)])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(194), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.upa, style_1.absB(0)])}>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(148), style_1.default.udr, style_1.default.uac])}>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(187.5), style_1.default.uac])} onClick={wechatShare}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(62), style_1.h(62)])} src={require('../../../assets/ico_wechat.png')}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(13), style_1.color('#0C0C0C'), style_1.mt(5)])}>微信好友</components_1.Text>
            </touchable_button_1.default>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(187.5), style_1.default.uac])} onClick={haibao}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(62), style_1.h(62)])} src={require('../../../assets/ico_haibao.png')}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(13), style_1.color('#0C0C0C'), style_1.mt(5)])}>名片海报</components_1.Text>
            </touchable_button_1.default>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          
          <touchable_button_1.default onClick={cancle} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(40), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>取消</components_1.Text>
          </touchable_button_1.default>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = ShareModal;
//# sourceMappingURL=index.jsx.map