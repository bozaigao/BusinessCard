"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 套餐item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
class TaoCanItem extends taro_1.PureComponent {
    render() {
        let { item, onClick, checked } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(80), style_1.mt(14), { marginLeft: '5%' }, style_1.default.uje])} onClick={onClick}>
        <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(72), style_1.bo(1), style_1.bdColor('#E5E5E5'), style_1.radiusA(4),
            { boxShadow: checked ? '0px 2px 5px 2px rgba(226,187,123,0.5)' : '0px 0px 0px 0px' }, style_1.default.uac, style_1.default.ujc,
            style_1.bo(1), style_1.bdColor('#E5E5E5'), { borderStyle: 'solid', }])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(293), style_1.h(46), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
            <components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uae])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color(checked ? '#825D22' : '#343434'), style_1.fSize(18)])}>{item.title}</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.color(checked ? '#825D22' : '#343434'), style_1.fSize(14)])}>{item.subTitle}</components_1.Text>
              </components_1.View>
              <components_1.Text style={datatool_1.styleAssign([style_1.color(checked ? '#825D22' : '#343434'), style_1.fSize(12), style_1.mt(4)])}>{item.left}</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color(checked ? '#825D22' : '#343434'), style_1.fSize(12)])}>￥</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.color(checked ? '#825D22' : '#343434'), style_1.fSize(24)])}>{item.price}</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>
        {item.timeLimit && <components_1.Image style={datatool_1.styleAssign([style_1.w(43), style_1.h(24), style_1.default.upa, style_1.absT(0), style_1.absR(0)])} src={require('../../../assets/ico_xianshi.png')}/>}
      </components_1.View>);
    }
}
exports.default = TaoCanItem;
//# sourceMappingURL=index.jsx.map
