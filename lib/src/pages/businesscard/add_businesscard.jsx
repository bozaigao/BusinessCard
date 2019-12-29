"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/15
 * @Description: 添加名片
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const bottom_buton_1 = require("../../compoments/bottom-buton");
let AddBusinesscard = class AddBusinesscard extends taro_1.Component {
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
        this.state = {
            signInPageDetail: { dateIntegrals: [], signInCount: 0 },
            listData: [{ title: '姓名', value: 'JY-W' }, { title: '公司', value: '美克美家家居集团有限公司' }, { title: '行业', value: '家居' },
                { title: '职位', value: '销售经理' }, { title: '地区', value: '成都' }, { title: '微信号', value: '15982468866' }, {
                    title: '邮箱',
                    value: '98248866@168.com'
                }]
        };
    }
    render() {
        console.log(this.viewRef);
        let { signInPageDetail } = this.state;
        if (typeof signInPageDetail.signInCount === 'undefined') {
            signInPageDetail.signInCount = 0;
        }
        let { listData } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor('#2B2A2F')])} notNeedBottomPadding={true}>
        <top_header_1.default title={'名片信息'} textColor={style_1.commonStyles.whiteColor} backgroundColor={'#2B2A2F'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.colorTheme)])} scrollY>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(60)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.upa, style_1.absT(10), style_1.absR(0), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(197), style_1.radiusA(5), style_1.bgColor(style_1.commonStyles.whiteColor), { boxShadow: '0px 2px 4px 0px rgba(230,230,230,0.5' }])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ma(20)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(71), style_1.h(71), style_1.radiusA(4)])} src={require('../../assets/ico_default.png')}/>
                <components_1.View style={datatool_1.styleAssign([style_1.ml(13)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(style_1.commonStyles.colorTheme)])}>JY-W</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.mt(8)])}>公司</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>职位</components_1.Text>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.w(295), style_1.h(0.5), style_1.bgColor('#E5E5E5'), style_1.ml(20)])}/>
              
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(19)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(9), style_1.h(12)])} src={require('../../assets/ico_phone.png')} mode={'aspectFit'}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.ml(15), style_1.fSize(12), style_1.color('#727272')])}>15982468866</components_1.Text>
              </components_1.View>
              
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(10)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(9), style_1.h(12)])} src={require('../../assets/ico_location.png')} mode={'aspectFit'}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.ml(15), style_1.fSize(12), style_1.color('#727272')])}>四川成都</components_1.Text>
              </components_1.View>
            </components_1.View>
            
            {listData.map((item, index) => {
            console.log(item);
            return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])} key={index}>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(50), style_1.default.uac, style_1.default.udr, style_1.pl(21), style_1.pr(21)])}>
                    {(index === 0 || index === 1) ? <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('red')])}>*</components_1.Text>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#727272')])}>{item.title}</components_1.Text>
                        </components_1.View> :
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#727272')])}>{item.title}</components_1.Text>}
                    <components_1.Input type='text' value={item.value} style={datatool_1.styleAssign([style_1.wRatio(70), style_1.ml(32), style_1.fSize(14)])}/>
                  </components_1.View>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(336), style_1.h(0.5), style_1.bgColor('#E5E5E5'), style_1.ml(20), style_1.op(0.3)])}/>
                </components_1.View>);
        })}
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(50), style_1.pl(20), style_1.pr(20), style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>名片展示邮箱号</components_1.Text>
                <components_1.Switch color={'#E2BB7B'}/>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.w(336), style_1.h(0.5), style_1.bgColor('#E5E5E5'), style_1.ml(20), style_1.op(0.3)])}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(50), style_1.pl(20), style_1.pr(20), style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>分享自己的名片给朋友时展示手机号</components_1.Text>
                <components_1.Switch color={'#E2BB7B'}/>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.w(336), style_1.h(0.5), style_1.bgColor('#E5E5E5'), style_1.ml(20), style_1.op(0.3)])}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            
            
            <bottom_buton_1.default title={'创建名片'} onClick={() => {
        }}/>
          </components_1.View>
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
AddBusinesscard = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], AddBusinesscard);
exports.default = AddBusinesscard;
//# sourceMappingURL=add_businesscard.jsx.map