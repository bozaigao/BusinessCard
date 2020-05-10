"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 极致名片
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const httpurl_1 = require("../../api/httpurl");
const singleline_text_1 = require("../singleline-text");
class CompanyCard extends taro_1.PureComponent {
    render() {
        let { display, companyCard } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), { display: display ? display : 'inline-block' }])}>
        <components_1.View style={datatool_1.styleAssign([{ width: '95%' }, { marginLeft: '2.5%' }, style_1.mt(16), style_1.h(177), style_1.bgColor(style_1.commonStyles.whiteColor)])}>

          <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.ujb, style_1.pl(16), style_1.pt(16), style_1.pr(16)])}>
              <components_1.View style={datatool_1.styleAssign([])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(style_1.commonStyles.colorTheme)])}>{companyCard.name}</components_1.Text>
                <singleline_text_1.default style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme), style_1.mt(4)])} text={`${companyCard.company}·${companyCard.position}`}/>
              </components_1.View>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(66), style_1.h(66), style_1.radiusA(33)])} src={companyCard.avatar}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.ml(16), style_1.default.udr, style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10)])} src={`${httpurl_1.cloudBaseUrl}ico_wechat_gray.png`}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(4)])}>{companyCard.wechat}</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.ml(16), style_1.default.udr, style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10)])} src={`${httpurl_1.cloudBaseUrl}ico_phone_gray.png`}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(4)])}>{companyCard.phone}</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.upa, style_1.absB(0)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.udr, style_1.default.uac])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])} onClick={() => {
            taro_1.default.makePhoneCall({
                phoneNumber: companyCard.phone
            });
        }}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18)])} src={`${httpurl_1.cloudBaseUrl}ico_call.png`}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(11)])}>拨打电话</components_1.Text>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.w(1), style_1.h(19), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])}>
                <components_1.Button openType={'share'} style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18)])} src={`${httpurl_1.cloudBaseUrl}ico_share.png`}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(11)])}>分享名片</components_1.Text>
                </components_1.Button>
              </components_1.View>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = CompanyCard;
//# sourceMappingURL=index.jsx.map