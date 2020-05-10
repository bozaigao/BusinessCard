"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 我的人脉
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const httpurl_1 = require("../../../api/httpurl");
const index_1 = require("../renmai-item/index");
class MyPerson extends taro_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { chooseCallback, hasSelected, recommendList, indexChangeCallback, performCard, currentIndex, collectCard, userInfo } = this.props;
        let noticeText = '';
        if (currentIndex === 1) {
            noticeText = '完善你的名片信息，发现更多志趣相投的朋友';
        }
        else if (currentIndex === 2) {
            noticeText = '完善你的名片信息，发现更多同乡，促进交流';
        }
        else if (currentIndex === 3) {
            noticeText = '完善你的名片信息，发现更多校友，促进交流';
        }
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.ml(20), style_1.mr(20), style_1.mt(32)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(22), style_1.bgColor('#E2BB7B')])}/>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(8)])}>人脉机遇</components_1.Text>
          </components_1.View>
          {hasSelected && <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/choose_renmai_tag`
            });
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>重新选择</components_1.Text>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(12)])} src={require('../../../assets/ico_next.png')}/>
            </components_1.View>}
        </components_1.View>
        {!hasSelected &&
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.mt(20)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(360), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(335), style_1.h(204)])} src={`${httpurl_1.cloudBaseUrl}ico_renmai_bg.png`}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.mt(27)])}>您可以选择您期望的人脉，我们将为您引荐</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.mt(13)])}>名片完善度越高，获得人脉数据越丰富，精准</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(303), style_1.h(44), style_1.radiusA(4), style_1.bgColor(style_1.commonStyles.colorTheme), style_1.default.uac, style_1.default.ujc, style_1.mt(20)])} onClick={() => {
                chooseCallback();
            }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.whiteColor)])}>立即选择</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>}
        {hasSelected && <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(50), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor),
            style_1.pl(20), style_1.pr(20), style_1.mt(16)])}>
            {['推荐', '兴趣', '同乡', '校友'].map((value, index) => {
            return <components_1.View key={index} style={datatool_1.styleAssign([style_1.default.uac, style_1.ml(index !== 0 ? 62 : 0)])} onClick={() => {
                indexChangeCallback(index);
            }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color(currentIndex === index ? '#E2BB7B' : '#0C0C0C')])}>{value}</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(30), style_1.h(1), style_1.bgColor(currentIndex === index ? '#E2BB7B' : style_1.commonStyles.transparent), style_1.mt(8)])}/>
                </components_1.View>;
        })}
          </components_1.View>}
        {hasSelected && recommendList.map((value, index) => {
            console.log(value);
            return <index_1.default key={index} item={value} collectCard={collectCard}/>;
        })}
        {hasSelected && currentIndex === 0 &&
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(226), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac, style_1.default.ujc])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.udr, style_1.w(160)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(46), style_1.h(46)])} src={`${httpurl_1.cloudBaseUrl}ico_person_mohu_1.png`}/>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(46), style_1.h(46), style_1.ml(40)])} src={`${httpurl_1.cloudBaseUrl}ico_person_mohu_3.png`}/>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(64), style_1.h(64), style_1.default.upa, style_1.absL(50)])} src={`${httpurl_1.cloudBaseUrl}ico_person_mohu_2.png`}/>
              </components_1.View>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797'), style_1.mt(13)])}>
                未开通拓展人脉功能\n暂不能解锁更多人脉
              </components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(202), style_1.h(44), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.colorTheme),
                style_1.mt(19)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.whiteColor)])}>
                  1元立即试用
                </components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>}
        {hasSelected && userInfo.cardPercent === 0 &&
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(69), style_1.mt(47)])} src={require('../../../assets/ico_no_data.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.mt(31)])}>{noticeText}</components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.w(303), style_1.h(44), style_1.bgColor(style_1.commonStyles.colorTheme), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc, style_1.mt(24), style_1.mb(29)])} onClick={performCard}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.whiteColor)])}>立即完善名片</components_1.Text>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>}

      </components_1.View>);
    }
}
exports.default = MyPerson;
//# sourceMappingURL=index.jsx.map