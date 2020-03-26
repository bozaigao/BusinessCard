"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 收藏item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const touchable_button_1 = require("../../../compoments/touchable-button");
const httpurl_1 = require("../../../api/httpurl");
class CollectItem extends taro_1.PureComponent {
    render() {
        let { operate, item, setCustomer } = this.props;
        return (<touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.radiusA(4), { width: '95%' }, { marginLeft: '2.5%' }, style_1.h(156), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(14)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(20)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(66), style_1.h(66), style_1.ml(16)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(66), style_1.h(66), style_1.radiusA(33)])} src={item.avatar}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(13), style_1.h(13), style_1.default.upa, style_1.absB(0), style_1.absR(0)])} src={`${httpurl_1.cloudBaseUrl}ico_nan.png`}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.ml(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>{item.name}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797'), style_1.mt(16)])}>{item.position}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797'), style_1.mt(2)])}>{item.company}</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.colorTheme), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc,
            style_1.w(72), style_1.h(28), style_1.radiusA(4), style_1.mr(16)])} onClick={() => {
            setCustomer(item.userId);
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>置为客户</components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.mt(15)])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.ujb, style_1.default.udr])}>
          <components_1.View style={datatool_1.styleAssign([style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12), style_1.ml(16)])}>{`收藏时间 ${datatool_1.transformTime(item.collectTime)}`}</components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.udr, style_1.w(40), style_1.mr(16)])} onClick={() => {
            operate(item);
        }}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(19), style_1.h(4)])} src={`${httpurl_1.cloudBaseUrl}ico_three_dot.png`}/>
          </components_1.View>
        </components_1.View>
      </touchable_button_1.default>);
    }
}
exports.default = CollectItem;
//# sourceMappingURL=index.jsx.map
