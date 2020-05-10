"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/25
 * @Description: 名片样式2
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
class CardStyle2 extends taro_1.PureComponent {
    render() {
        let { userInfo, hidePhone, hideWechat, hideEmail, hideAddress, width, height } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.w(width ? width : 334), style_1.h(height ? height : 216), style_1.radiusA(10),
            style_1.default.udr, style_1.default.uje])}>
        <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.default.upa, style_1.absT(0)])} src={require('../../assets/ico_business_card_bg2.png')}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.default.upa, style_1.absT(0)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.radiusA(10), style_1.default.upa, style_1.absL(0), style_1.absT(0)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.default.udr, style_1.default.uac, style_1.absL(42), style_1.absT(28)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(60), style_1.h(60), style_1.radiusA(30)])} src={userInfo.avatar}/>
            <components_1.View style={datatool_1.styleAssign([style_1.ml(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.fWeight('bold'), style_1.color('#E2BB7B')])}>{userInfo.name}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color(style_1.commonStyles.whiteColor)])}>{userInfo.position}</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color(style_1.commonStyles.whiteColor), style_1.default.upa, style_1.absT(24), style_1.absR(26)])}>{userInfo.enterpriseName}</components_1.Text>
          <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.absB(30), style_1.absL(42)])}>
            
            {!hidePhone && <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color(style_1.commonStyles.whiteColor)])}>{userInfo.phone}</components_1.Text>
              </components_1.View>}
            
            {!hideWechat && <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(4)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color(style_1.commonStyles.whiteColor)])}>{userInfo.wechat}</components_1.Text>
              </components_1.View>}
            
            {!hideEmail && <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(4)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color(style_1.commonStyles.whiteColor)])}>{userInfo.email}</components_1.Text>
              </components_1.View>}
            
            {!hideAddress && <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.mt(4)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color(style_1.commonStyles.whiteColor)])}>{userInfo.detailAddress}</components_1.Text>
              </components_1.View>}
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.default.udr, style_1.absR(25), style_1.absB(17), style_1.w(75), style_1.h(15), style_1.default.uac])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.op(hidePhone ? 0 : 1), style_1.mr(5)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(11), style_1.h(9)])} src={require('../../assets/ico_card_mobile_white.png')}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.op(hideWechat ? 0 : 1), style_1.mr(5)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10)])} src={require('../../assets/ico_card_wechat_white.png')}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.op(hideEmail ? 0 : 1), style_1.mr(5)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10)])} src={require('../../assets/ico_card_email_white.png')}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.op(hideAddress ? 0 : 1)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(10), style_1.h(11)])} src={require('../../assets/ico_card_location_white.png')}/>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = CardStyle2;
//# sourceMappingURL=index.jsx.map