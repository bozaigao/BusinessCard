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
class MyPerson extends taro_1.PureComponent {
    render() {
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(32)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(22), style_1.bgColor('#E2BB7B')])}/>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(8)])}>我的人脉</components_1.Text>
        </components_1.View>
        <components_1.ScrollView style={datatool_1.styleAssign([{ whiteSpace: 'nowrap' }, style_1.wRatio(95), { marginLeft: '5%' }, style_1.h(191), style_1.default.uac, style_1.mt(16)])} scrollX>
          {[1, 2, 3, 4, 5, 6].map((value, index) => {
            console.log(value);
            return (<components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.w(134), style_1.h(191), style_1.ml(index !== 0 ? 10 : 0), style_1.bgColor(style_1.commonStyles.whiteColor),
                { display: 'inline-block' }])} key={index}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(58), style_1.h(58), style_1.radiusA(29), style_1.mt(20)])} src={require('../../../assets/ico_default.png')}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme), style_1.mt(8)])}>卢志刚</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.colorTheme), style_1.mt(4)])}>软件开发</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(28)])}>
                    <components_1.View style={datatool_1.styleAssign([style_1.pa(5), style_1.bgColor('#EFEFEF'), style_1.radiusA(1)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>跑步</components_1.Text>
                    </components_1.View>
                    <components_1.View style={datatool_1.styleAssign([style_1.pa(5), style_1.bgColor('#EFEFEF'), style_1.ml(8), style_1.radiusA(1)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>剪辑</components_1.Text>
                    </components_1.View>
                  </components_1.View>
                </components_1.View>
              </components_1.View>);
        })}
        </components_1.ScrollView>
      </components_1.View>);
    }
}
exports.default = MyPerson;
//# sourceMappingURL=index.jsx.map