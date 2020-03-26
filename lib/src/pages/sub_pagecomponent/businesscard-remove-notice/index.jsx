"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 名片移除提示
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const touchable_button_1 = require("../../../compoments/touchable-button");
class BusinessCardRemoveNoticeModal extends taro_1.PureComponent {
    render() {
        let { cancelCallback, confirmCallback } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([{
                position: 'fixed',
                zIndex: Infinity
            }, style_1.absT(0), style_1.absR(0), style_1.wRatio(100), style_1.hRatio(100)])}>
        <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.blackColor), style_1.op(0.5), style_1.default.upa, style_1.absT(0), style_1.absR(0),])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(271), style_1.h(106), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.mt(20)])}>确认将名片移除？</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.mt(15), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.udr, style_1.default.uac])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])} onClick={cancelCallback}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(17), style_1.color('#343434')])}>我再想想</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.w(1), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])} onClick={confirmCallback}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(17), style_1.color('#E2BB7B')])}>确认</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = BusinessCardRemoveNoticeModal;
//# sourceMappingURL=index.jsx.map
