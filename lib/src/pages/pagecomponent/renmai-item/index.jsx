"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/23
 * @Description: 人脉item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const httpurl_1 = require("../../../api/httpurl");
class RenMaiItem extends taro_1.PureComponent {
    render() {
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(112), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(66), style_1.h(66), style_1.radiusA(33)])} src={`${httpurl_1.cloudBaseUrl}ico_default.png`}/>
            <components_1.View style={datatool_1.styleAssign([style_1.ml(22)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>
                卢志刚
              </components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#ACADAD')])}>
                融智科技有限公司
              </components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#ACADAD'), style_1.mt(6)])}>
                软件开发·Java工程师
              </components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.w(64), style_1.h(28), style_1.radiusA(2), style_1.bgColor(style_1.commonStyles.colorTheme), style_1.default.uac, style_1.default.ujc, style_1.mr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
              收藏名片
            </components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
      </components_1.View>);
    }
}
exports.default = RenMaiItem;
//# sourceMappingURL=index.jsx.map