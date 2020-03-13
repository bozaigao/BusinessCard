"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 我的客户item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const style_1 = require("../../../utils/style");
const datatool_1 = require("../../../utils/datatool");
const httpurl_1 = require("../../../api/httpurl");
class MyCustomerItem extends taro_1.Component {
    render() {
        let { item } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(84), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac, style_1.default.ujb,
            style_1.pl(20), style_1.pr(20), style_1.pt(15), style_1.pb(15)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(52), style_1.h(52), style_1.radiusA(26)])} src={item.avatar ? item.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
            <components_1.View style={datatool_1.styleAssign([style_1.ml(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                {item.name}
              </components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#ACADAD'), style_1.mt(10)])}>
                {`ID：${item.customerUserId}`}
              </components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uae])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#E2BB7B')])}>
              {item.type === 'share' ? '分享绑定' : '购买绑定'}
            </components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#ACADAD'), style_1.mt(10)])}>
              {`绑定时间：${datatool_1.transformTime(item.bindTime)}`}
            </components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
      </components_1.View>);
    }
}
exports.default = MyCustomerItem;
//# sourceMappingURL=index.jsx.map