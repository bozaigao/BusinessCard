"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/5
 * @Description: 录音文件删除提示
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const touchable_button_1 = require("../../../compoments/touchable-button");
class DeleteNoticeModal extends taro_1.PureComponent {
    render() {
        let { cancelCallback, confirmCallback } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([{
                position: 'fixed',
                zIndex: Infinity
            }, style_1.absT(0), style_1.absR(0), style_1.wRatio(100), style_1.hRatio(100)])}>
        <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.blackColor), style_1.op(0.5), style_1.default.upa, style_1.absT(0), style_1.absR(0),])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(167), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color('#313137'), style_1.mt(20)])}>删除提醒</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#787878'), style_1.mt(20)])}>删除后，语音将无法恢复，确定删除？</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.mt(15), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.udr, style_1.default.uac])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])} onClick={cancelCallback}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color('#343434')])}>取消</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.w(1), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])} onClick={confirmCallback}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color('#E2BB7B')])}>确认</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = DeleteNoticeModal;
//# sourceMappingURL=index.jsx.map