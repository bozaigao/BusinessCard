"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 商品筛选modal
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const index_1 = require("../../../compoments/touchable-button/index");
const global_1 = require("../../../const/global");
const index_2 = require("../../../compoments/navigation_bar/index");
const index_3 = require("../../../compoments/sanjiao/index");
const safe_area_view_1 = require("../../../compoments/safe-area-view");
class GoodsShaiXuan extends taro_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }
    render() {
        let { cancel, totalGoods, onClickMode, onClickShop, mode } = this.props;
        let { currentIndex } = this.state;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([{
                position: 'fixed',
                zIndex: Infinity
            }, style_1.absT(0), style_1.absR(0), style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.transparent)])}>
        <index_2.default>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={require('../../../assets/ico_back.png')} onClick={() => {
            taro_1.default.navigateBack();
        }}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
            this.setState({ currentIndex: 0 }, () => {
                // this.refresh();
            });
        }}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>商品管理</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(72), style_1.h(2), style_1.bgColor(currentIndex === 0 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10)])}/>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(24)])} onClick={onClickShop}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>我的商铺</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(72), style_1.h(2), style_1.bgColor(currentIndex === 1 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10)])}/>
                </components_1.View>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.mr(20)])}/>
          </components_1.View>
        </index_2.default>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(36), style_1.default.uac, style_1.default.udr, style_1.default.ujb,
            style_1.pl(20), style_1.pr(20), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0D0D0D')])}>管理</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>{`(共${totalGoods}件商品)`}</components_1.Text>
          </components_1.View>
          <index_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={cancel}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0D0D0D')])}>{mode}</components_1.Text>
            <index_3.default orientation={global_1.Orientation.up} style={datatool_1.styleAssign([style_1.ml(8)])}/>
          </index_1.default>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
          {['全部', '已上架', '已下架'].map((value, index) => {
            return (<index_1.default key={index} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
                onClickMode(value);
            }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(14), style_1.ml(20)])}>{value}</components_1.Text>
              </index_1.default>);
        })}
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.op(0.3), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.bgColor(style_1.commonStyles.colorTheme)])} onClick={cancel}/>
      </safe_area_view_1.default>);
    }
}
exports.default = GoodsShaiXuan;
//# sourceMappingURL=index.jsx.map