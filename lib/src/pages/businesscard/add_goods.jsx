"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_goods.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 添加商品
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/home");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const touchable_button_1 = require("../../compoments/touchable-button");
let AddGoods = class AddGoods extends taro_1.Component {
    constructor(props) {
        super(props);
        /**
         * 指定config的类型声明为: Taro.Config
         *
         * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
         * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
         * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
         */
        this.config = {
            disableScroll: true
        };
        console.log(this.viewRef);
        this.state = {};
    }
    render() {
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'添加商品'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.pb(5), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(295), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])}>
              {[{ title: '商品名称', placeHolder: '15个字以内' }, { title: '参考价格', placeHolder: '必填' }].map((value, index) => {
            return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])} key={index}>
                    <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>{value.title}</components_1.Text>
                      <components_1.Input type='text' value={''} style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14), { textAlign: 'right' }])} placeholder={value.placeHolder}/>
                    </components_1.View>
                    <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
                  </components_1.View>);
        })}
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>轮播图(最多5张)</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10), style_1.mb(20)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.ml(20), style_1.w(105), style_1.h(105), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40)])} src={require('../../assets/ico_add.png')}/>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(259), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>商品简介</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.Textarea value={''} placeholder={'请输入公司简介'} style={datatool_1.styleAssign([style_1.w(300), style_1.h(140), style_1.fSize(16), style_1.mt(10), style_1.ml(20),
            style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.pa(16)])}/>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>详情图</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10), style_1.mb(20)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.ml(20), style_1.w(105), style_1.h(105), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40)])} src={require('../../assets/ico_add.png')}/>
              </components_1.View>
            </components_1.View>
          </components_1.View>
        </components_1.ScrollView>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(63), style_1.bgColor(style_1.commonStyles.whiteColor),
            style_1.default.uac, style_1.default.ujc])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(162), style_1.h(47), style_1.bo(1), style_1.bdColor(style_1.commonStyles.colorTheme),
            { borderStyle: 'solid' }, style_1.radiusA(2), style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color('#343434')])}>保存商品</components_1.Text>
            </touchable_button_1.default>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.ml(10), style_1.w(162), style_1.h(47), style_1.bgColor(style_1.commonStyles.colorTheme),
            style_1.radiusA(2), style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color(style_1.commonStyles.whiteColor)])}>立即上架</components_1.Text>
            </touchable_button_1.default>
          </components_1.View>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
AddGoods = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], AddGoods);
exports.default = AddGoods;
//# sourceMappingURL=add_goods.jsx.map