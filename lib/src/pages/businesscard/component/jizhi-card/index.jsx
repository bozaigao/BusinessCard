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
const datatool_1 = require("../../../../utils/datatool");
const style_1 = require("../../../../utils/style");
const company_card_1 = require("../../../../compoments/company_card");
class JiZhiCard extends taro_1.PureComponent {
    render() {
        let { companyCardList } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(32)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(22), style_1.bgColor('#E2BB7B')])}/>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(8)])}>极致名片</components_1.Text>
        </components_1.View>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, { whiteSpace: 'nowrap' }])} scrollX>
          {companyCardList.map((value, index) => {
            console.log(value);
            return (<company_card_1.default key={index} companyCard={value}/>);
        })}
        </components_1.ScrollView>
      </components_1.View>);
    }
}
exports.default = JiZhiCard;
//# sourceMappingURL=index.jsx.map