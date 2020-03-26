"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/19
 * @Description: 长列表item组件
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
const touchable_button_1 = require("../touchable-button");
class ListItem extends taro_1.Component {
    render() {
        let { title, subTitle, value, hasEdit, onCLick, notHasUnderline, onTextChange, textColor, must } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
        <touchable_button_1.default onClick={() => {
            if (onCLick) {
                onCLick(title);
            }
        }} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac,
            style_1.default.ujb, style_1.pl(20), style_1.pr(20)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            {must && <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.redColor)])}>*</components_1.Text>}
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(textColor ? textColor : '#0C0C0C')])}>{title}</components_1.Text>
          </components_1.View>
          {hasEdit ? <components_1.Input type='text' value={value} maxLength={subTitle && subTitle.includes('手机') ? 11 : -1} placeholder={subTitle} style={datatool_1.styleAssign([style_1.fSize(14), { textAlign: 'right' }])} onInput={onTextChange}/> :
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(value && value.length !== 0 ? '#0C0C0C' : '#979797')])}>{value ? value : subTitle}</components_1.Text>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(8), style_1.h(14), style_1.ml(9)])} src={require('../../assets/ico_next.png')}/>
              </components_1.View>}
        </touchable_button_1.default>
        {!notHasUnderline && <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), { marginLeft: '5%' }])}/>}
      </components_1.View>);
    }
}
exports.default = ListItem;
//# sourceMappingURL=index.jsx.map
