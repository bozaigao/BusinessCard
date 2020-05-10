"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 客户item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const index_1 = require("../../../compoments/touchable-button/index");
const httpurl_1 = require("../../../api/httpurl");
const singleline_text_1 = require("../../../compoments/singleline-text");
class CustomItem extends taro_1.PureComponent {
    render() {
        let { onClick, customer, genJinCallback, mode, viewCardCallback } = this.props;
        let time;
        if (mode === '最后访问') {
            time = datatool_1.transformTime(customer.recentDate);
        }
        else if (mode === '最后跟进') {
            time = datatool_1.transformTime(customer.followUpDate);
        }
        else if (mode === '最后转入') {
            time = datatool_1.transformTime(customer.createTime);
        }
        return (<index_1.default onClick={onClick} customStyle={datatool_1.styleAssign([style_1.radiusA(4), { width: '95%' }, { marginLeft: '2.5%' }, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(14)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(20)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(60), style_1.h(60), style_1.ml(16)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(60), style_1.h(60), style_1.radiusA(30)])} src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(16), style_1.h(16), style_1.default.upa, style_1.absB(0), style_1.absR(0)])} src={customer.sex === 1 ? `${httpurl_1.cloudBaseUrl}ico_nan.png` : `${httpurl_1.cloudBaseUrl}ico_nv.png`}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.ml(16)])}>
              <singleline_text_1.default text={customer.name} style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.mt(4)])}>{customer.position}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.mt(3)])}>{`来自${customer.source}`}</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.colorTheme), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc,
            style_1.w(72), style_1.h(28), style_1.radiusA(4), style_1.mr(16)])} onClick={(e) => {
            e.stopPropagation();
            genJinCallback(customer);
            console.log('添加跟进');
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>添加跟进</components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.mt(8), style_1.default.uWrap])}>
          {customer.label && datatool_1.parseData(customer.label).map((value, index) => {
            return (<components_1.View key={index} style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.padding([6, 6, 6, 6]), style_1.radiusA(14)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.radiusA(14),
                style_1.padding([6, 6, 6, 6]), style_1.bgColor('#E7E7E7')])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{value}</components_1.Text>
                </components_1.View>
              </components_1.View>);
        })}
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.mt(15)])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.ujb, style_1.default.udr, style_1.h(40)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12), style_1.ml(16)])}>{`${mode} ${time}`}</components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(80), style_1.hRatio(100), style_1.default.uac, style_1.default.ujc, style_1.default.utxdu])} onClick={(e) => {
            e.stopPropagation();
            viewCardCallback();
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(14)])}>查看名片</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(80), style_1.hRatio(100), style_1.default.uac, style_1.default.ujc])} onClick={(e) => {
            e.stopPropagation();
            taro_1.default.makePhoneCall({
                phoneNumber: customer.phone
            });
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(14), style_1.default.utxdu])}>拨打电话</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>
      </index_1.default>);
    }
}
exports.default = CustomItem;
//# sourceMappingURL=index.jsx.map