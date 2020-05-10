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
const index_2 = require("../../../compoments/card-style5/index");
const index_3 = require("../../../compoments/card-style1/index");
const index_4 = require("../../../compoments/card-style2/index");
const index_5 = require("../../../compoments/card-style4/index");
const index_6 = require("../../../compoments/card-style3/index");
class Card extends taro_1.PureComponent {
    render() {
        let { holderCount, visitorCount, cardStyle, hidePhone, hideWechat, hideEmail, hideAddress } = this.props;
        let { shareClick, collectCallback, visitorCallback, viewMyCardCallback, gotoCardCallback, userInfo } = this.props;
        //@ts-ignore
        let cardChild = null;
        if (cardStyle === '0') {
            //@ts-ignore
            cardChild = <index_3.default userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0} hideAddress={hideAddress === 0} hideEmail={hideEmail === 0} hideWechat={hideWechat === 0}/>;
        }
        else if (cardStyle === '1') {
            //@ts-ignore
            cardChild = <index_4.default userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0} hideAddress={hideAddress === 0} hideEmail={hideEmail === 0} hideWechat={hideWechat === 0}/>;
        }
        else if (cardStyle === '2') {
            //@ts-ignore
            cardChild = <index_6.default userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0} hideAddress={hideAddress === 0} hideEmail={hideEmail === 0} hideWechat={hideWechat === 0}/>;
        }
        else if (cardStyle === '3') {
            //@ts-ignore
            cardChild = <index_5.default userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0} hideAddress={hideAddress === 0} hideEmail={hideEmail === 0} hideWechat={hideWechat === 0}/>;
        }
        else if (cardStyle === '4') {
            //@ts-ignore
            cardChild = <index_2.default userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0} hideAddress={hideAddress === 0} hideEmail={hideEmail === 0} hideWechat={hideWechat === 0}/>;
        }
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.mt(20)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.w(334), style_1.h(249), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(10)])}>
          {cardChild}
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