"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/25
 * @Description: 名片样式5
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
class CardStyle5 extends taro_1.PureComponent {
    render() {
        let { userInfo, hidePhone, hideWechat, hideEmail, hideAddress, width, height } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.w(width ? width : 334), style_1.h(height ? height : 216), style_1.radiusA(10),
            style_1.default.udr, style_1.default.uje])}>
        <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.default.upa, style_1.absT(0)])} src={require('../../assets/ico_business_card_bg5.png')}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.default.upa, style_1.absT(0)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.radiusA(10), style_1.default.upa, style_1.absL(0), style_1.absT(0)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.absL(30), style_1.absT(39)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.mt(6), style_1.default.uae])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.fWeight('bold'), style_1.color(style_1.commonStyles.whiteColor)])}>{userInfo.name}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.ml(8), style_1.color(style_1.commonStyles.whiteColor)])}>{userInfo.position}</components_1.Text>
            </components_1.View>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color(style_1.commonStyles.whiteColor), style_1.mt(2)])}>{userInfo.enterpriseName}</components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.absB(26), style_1.absL(30)])}>
            
            {!hidePhone && <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(11), style_1.h(9)])} src={require('../../assets/ico_card_mobile_white.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color(style_1.commonStyles.whiteColor), style_1.ml(5)])}>{userInfo.phone}</components_1.Text>
              </components_1.View>}
            
            {!hideWechat && <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(8)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10)])} src={require('../../assets/ico_card_wechat_white.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color(style_1.commonStyles.whiteColor), style_1.ml(5)])}>{userInfo.wechat}</components_1.Text>
              </components_1.View>}
            
            {!hideEmail && <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(8)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10)])} src={require('../../assets/ico_card_email_white.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color(style_1.commonStyles.whiteColor), style_1.ml(5)])}>{userInfo.email}</components_1.Text>
              </components_1.View>}
            
            {!hideAddress && <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.mt(8)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(9), style_1.h(11)])} src={require('../../assets/ico_card_location_white.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color(style_1.commonStyles.whiteColor), style_1.ml(5)])}>{userInfo.detailAddress}</components_1.Text>
              </components_1.View>}
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = CardStyle5;
//# sourceMappingURL=index.jsx.map