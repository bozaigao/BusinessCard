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
const index_1 = require("../../../compoments/touchable-button/index");
const httpurl_1 = require("../../../api/httpurl");
class Card extends taro_1.PureComponent {
    render() {
        let { holderCount, visitorCount } = this.props;
        let { shareClick, collectCallback, visitorCallback, viewMyCardCallback, gotoCardCallback, userInfo } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.mt(20)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.w(334), style_1.h(249), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(10)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(202), style_1.bgColor('rgb(211,199,195)'), style_1.radiusA(10),
            style_1.default.udr, style_1.default.uje])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.default.upa, style_1.absT(0)])} src={require('../../../assets/ico_business_card_bg.png')}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.default.upa, style_1.absT(0)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.radiusA(10), style_1.default.upa, style_1.absL(0), style_1.absT(0)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.absL(20), style_1.absT(15)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(60), style_1.h(60), style_1.radiusA(30)])} src={userInfo.avatar}/>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uae, style_1.default.udr, style_1.mt(6)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.fWeight('bold')])}>{userInfo.name}</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.ml(8)])}>{userInfo.position}</components_1.Text>
                </components_1.View>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{userInfo.company}</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uae, style_1.default.upa, style_1.absB(26), style_1.absR(24)])}>
                
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{userInfo.showPhone ? userInfo.phone : datatool_1.hidePhone(userInfo.phone)}</components_1.Text>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_card_mobile.png`}/>
                </components_1.View>
                
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(8)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{userInfo.wechat}</components_1.Text>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_card_wechat.png`}/>
                </components_1.View>
                
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(8)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{userInfo.email ? userInfo.email : '邮箱信息未对外公开'}</components_1.Text>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(10), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_card_email.png`}/>
                </components_1.View>
                
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.mt(8)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{userInfo.detailAddress}</components_1.Text>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(9), style_1.h(11), style_1.ml(8), style_1.mt(4)])} src={`${httpurl_1.cloudBaseUrl}ico_card_location.png`}/>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(45), style_1.default.udr, style_1.default.uac, style_1.default.ujb])} onClick={gotoCardCallback}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#29292E'), style_1.ml(16)])}>我的名片</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.mr(16)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18)])} src={require('../../../assets/ico_mingpianma.png')}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(12)])} src={require('../../../assets/ico_next.png')}/>
            </components_1.View>
          </components_1.View>
        </components_1.View>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(144), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac, style_1.mt(20)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(20)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac])} onClick={collectCallback}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#343434'), style_1.fWeight('bold')])}>{holderCount}</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(11), style_1.h(11)])} src={`${httpurl_1.cloudBaseUrl}ico_star_gray.png`}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(5)])}>收藏</components_1.Text>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(1), style_1.h(25), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac])} onClick={visitorCallback}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#343434'), style_1.fWeight('bold')])}>{visitorCount}</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(11), style_1.h(11)])} src={`${httpurl_1.cloudBaseUrl}ico_person_gray.png`}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(5)])}>访客</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujc, style_1.h(44), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(20)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
              <index_1.default customStyle={datatool_1.styleAssign([style_1.w(160), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc, style_1.bo(1), { borderStyle: 'solid' }, style_1.bdColor(style_1.commonStyles.colorTheme),
            style_1.bgColor(style_1.commonStyles.whiteColor), style_1.h(44)])} onClick={viewMyCardCallback}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>查看名片</components_1.Text>
              </index_1.default>
              <index_1.default customStyle={datatool_1.styleAssign([style_1.w(160), style_1.radiusA(4), style_1.ml(15), style_1.default.uac, style_1.default.ujc, style_1.bo(1), style_1.h(44),
            style_1.bdColor(style_1.commonStyles.colorTheme), style_1.bgColor(style_1.commonStyles.colorTheme)])} onClick={shareClick}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.whiteColor)])}>分享名片</components_1.Text>
              </index_1.default>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = Card;
//# sourceMappingURL=index.jsx.map