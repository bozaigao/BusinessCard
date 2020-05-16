"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 商品管理item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const httpurl_1 = require("../../api/httpurl");
class GoodsManageItem extends taro_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { itemData, moreCallback, xiajiaCallback, notTopGoodsCallback, showAllOperate, onChooseCallback, checked } = this.props;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(189), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])} onClick={(e) => {
            e.stopPropagation();
            if (!showAllOperate) {
                taro_1.default.navigateTo({
                    url: `/pages/mine/goods_detail?id=${itemData.id}`
                });
            }
            else {
                onChooseCallback(itemData.id);
            }
        }}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(16)])}>
          {showAllOperate &&
            <components_1.Image style={datatool_1.styleAssign([style_1.w(19), style_1.h(19)])} src={checked ? require('../../assets/ico_choosed.png') : require('../../assets/ico_choose_normal.png')}/>}
          <components_1.View style={datatool_1.styleAssign([style_1.w(90), style_1.h(90), style_1.ml(15)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(90), style_1.h(90), style_1.radiusA(4)])} src={datatool_1.parseData(itemData.carouselUrl)[0]}/>
            {itemData.showHomepage === 1 && <components_1.Image style={datatool_1.styleAssign([style_1.w(36), style_1.h(36), style_1.default.upa, style_1.absL(0), style_1.absT(0)])} src={`${httpurl_1.cloudBaseUrl}ico_top.png`}/>}
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.ml(12)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#343434')])}>{itemData.name.length > 10 ? itemData.name.substring(0, 11) + '...' : itemData.name}</components_1.Text>
            {itemData.price !== 0 && <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(16)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A6A6A6')])}>参考价格：</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#FA541C')])}>{`¥${itemData.price}`}</components_1.Text>
              </components_1.View>}
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A6A6A6'), style_1.mt(4)])}>{`创建时间：${datatool_1.transformTime(itemData.createTime)}`}</components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(95), style_1.h(1), { marginLeft: '2.5%' }, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.mt(20)])}/>
        
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac, style_1.default.ujb,
            style_1.pl(20), style_1.pr(20)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
            
            <components_1.View style={datatool_1.styleAssign([style_1.w(52), style_1.h(28), style_1.radiusA(4), style_1.bo(1), style_1.bdColor(style_1.commonStyles.colorTheme),
            { borderStyle: 'solid' }, style_1.default.uac, style_1.default.ujc])} onClick={(e) => {
            e.stopPropagation();
            moreCallback(itemData);
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>更多</components_1.Text>
            </components_1.View>
            
            <components_1.View onClick={(e) => {
            e.stopPropagation();
            xiajiaCallback(itemData);
        }} style={datatool_1.styleAssign([style_1.ml(32), style_1.w(72), style_1.h(28), style_1.radiusA(4), style_1.bo(1), style_1.bdColor(style_1.commonStyles.colorTheme),
            { borderStyle: 'solid' }, style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{`${itemData.status === 0 ? '上架商品' : '下架商品'}`}</components_1.Text>
            </components_1.View>
          </components_1.View>
          
          <components_1.View onClick={(e) => {
            e.stopPropagation();
            notTopGoodsCallback(itemData);
        }} style={datatool_1.styleAssign([style_1.w(72), style_1.h(28), style_1.radiusA(4), style_1.bgColor(style_1.commonStyles.colorTheme), style_1.default.uac, style_1.default.ujc])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>{`${itemData.showHomepage ? '取消展示' : '首页展示'}`}</components_1.Text>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = GoodsManageItem;
//# sourceMappingURL=index.jsx.map