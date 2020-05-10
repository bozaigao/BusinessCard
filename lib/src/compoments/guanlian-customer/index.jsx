"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/25
 * @Description: 关联客户
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
const httpurl_1 = require("../../api/httpurl");
class GuanLianCustomer extends taro_1.Component {
    render() {
        let { backgroundColor, marginTop, customer, hascheck, isChecked, onChoose } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.bgColor(backgroundColor ? backgroundColor : style_1.commonStyles.whiteColor),
            style_1.mt(marginTop ? marginTop : 0)])} onClick={() => {
            onChoose && onChoose(customer.id);
        }}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(96), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(64), style_1.h(64), style_1.radiusA(32), style_1.ml(20)])} src={customer.avatar ? customer.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
            <components_1.View style={datatool_1.styleAssign([style_1.ml(18)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(18)])}>{customer.name}</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#A9A9A9'), style_1.fSize(14), style_1.ml(8)])}>{customer.position}</components_1.Text>
              </components_1.View>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#A9A9A9'), style_1.fSize(12), style_1.mt(8)])}>{customer.company}</components_1.Text>
            </components_1.View>
          </components_1.View>
          {hascheck &&
            <components_1.Image style={datatool_1.styleAssign([style_1.w(25), style_1.h(25), style_1.mr(14)])} src={isChecked ? require('../../assets/ico_checked.png') : require('../../assets/ico_nocheck.png')}/>}
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = GuanLianCustomer;
//# sourceMappingURL=index.jsx.map