"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 等级item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
const httpurl_1 = require("../../api/httpurl");
class LevelItem extends taro_1.Component {
    render() {
        let { item } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(182), style_1.ml(20)])}>
        <components_1.Image style={datatool_1.styleAssign([style_1.w(335), style_1.h(182), style_1.default.upa, style_1.absT(0)])} src={`${httpurl_1.cloudBaseUrl}${item.bg}`}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(295), style_1.ml(20), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(20)])}>
            <components_1.View>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#825D22')])}>{item.title}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#825D22')])}>{item.subTitle}</components_1.Text>
            </components_1.View>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(48), style_1.h(42)])} src={`${httpurl_1.cloudBaseUrl}${item.logo}`}/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.w(295), style_1.ml(20), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(50)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(108), style_1.h(28), style_1.bgColor('#825D22'), style_1.radiusA(14),
            style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>{item.buttonTitle}</components_1.Text>
            </components_1.View>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#825D22')])}>{item.right}</components_1.Text>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = LevelItem;
//# sourceMappingURL=index.jsx.map