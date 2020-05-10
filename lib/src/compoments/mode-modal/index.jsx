"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 选择筛选模式
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const touchable_button_1 = require("../touchable-button");
const safe_area_view_1 = require("../safe-area-view");
const navigation_bar_1 = require("../navigation_bar");
const global_1 = require("../../const/global");
const sanjiao_1 = require("../sanjiao");
class ModeModal extends taro_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '2020-01-01',
            endTime: datatool_1.getToday(),
            visitTime: '全部'
        };
    }
    render() {
        let { cancelCallback, collectCallback, myVisitorCallback, confirmCallback, shaiXuanCallback, shaiXuanMode, totalPerson } = this.props;
        let visitorSubCurrentIndex = 0, currentIndex = 0;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([{
                position: 'fixed',
                zIndex: Infinity
            }, style_1.absT(0), style_1.absR(0), style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.transparent)])}>
        <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.upa, style_1.absT(0), style_1.absR(0),])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(60), style_1.bgColor(style_1.commonStyles.whiteColor)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.blackColor), style_1.op(0.5)])}/>
        </touchable_button_1.default>
        <navigation_bar_1.default style={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 47 : 44), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={require('../../assets/ico_back.png')} onClick={() => {
            taro_1.default.navigateBack();
        }}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>访客</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(36), style_1.h(2), style_1.bgColor(currentIndex === 0 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10)])}/>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(24)])} onClick={collectCallback}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>收藏</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(36), style_1.h(2), style_1.bgColor(currentIndex === 1 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10)])}/>
                </components_1.View>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.mr(20)])}/>
          </components_1.View>
        </navigation_bar_1.default>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.pt(10), style_1.pb(10), style_1.default.uac, style_1.default.ujc, style_1.default.udr, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.bgColor(visitorSubCurrentIndex === 0 ? '#E2BB7B' : style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(2)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.mt(2), style_1.mb(2), style_1.ml(8), style_1.mr(8), style_1.color(visitorSubCurrentIndex === 0 ? style_1.commonStyles.whiteColor : '#343434')])}>谁访问了我</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.bgColor(visitorSubCurrentIndex === 1 ? '#E2BB7B' : style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(2), style_1.ml(63)])} onClick={myVisitorCallback}>
                <components_1.Text style={datatool_1.styleAssign([style_1.mt(2), style_1.mb(2), style_1.ml(8), style_1.mr(8), style_1.color(visitorSubCurrentIndex === 1 ? style_1.commonStyles.whiteColor : '#343434')])}>我访问了谁</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(36), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac, style_1.default.ujb,
            style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])}>{`共${totalPerson}位访客`}</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#E2BB7B'), style_1.fSize(14)])}>{shaiXuanMode}</components_1.Text>
                <sanjiao_1.default orientation={global_1.Orientation.up} style={datatool_1.styleAssign([style_1.ml(3)])}/>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(24)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])} onClick={shaiXuanCallback}>筛选</components_1.Text>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(14), style_1.h(14), style_1.ml(3)])} src={require('../../assets/ico_shaixuan.png')}/>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(88), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            confirmCallback('最后访问时间');
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(14), style_1.ml(20)])}>最后访问时间</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            confirmCallback('最多访问次数');
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(14), style_1.ml(20)])}>最多访问次数</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])} onClick={() => {
            cancelCallback();
            console.log('点击');
        }}/>
        </components_1.View>
      </safe_area_view_1.default>);
    }
}
exports.default = ModeModal;
//# sourceMappingURL=index.jsx.map