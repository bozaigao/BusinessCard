"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename company_info.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 企业信息
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
const bottom_buton_1 = require("../../compoments/bottom-buton");
const list_item_1 = require("./list-item");
let CompanyInfo = class CompanyInfo extends taro_1.Component {
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
    }
    render() {
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'企业信息'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          {[{ title: '企业名称', subTitle: '必填' },
            { title: '企业官网', subTitle: '选填' },
            { title: '企业LOGO', subTitle: '' }].map((value, index) => {
            return (<list_item_1.default title={value.title} subTitle={value.subTitle} key={index}/>);
        })}
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(230), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mb(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.ml(36), style_1.w(160), style_1.mt(16)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(160), style_1.h(160)])} src={require('../../assets/ico_click_upload.png')} onClick={() => {
            taro_1.default.chooseImage({ count: 1 }).then(() => {
            });
        }}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#B7B7B7'), style_1.mt(14)])}>建议尺寸：350px*350px</components_1.Text>
            </components_1.View>
          </components_1.View>
          
          <list_item_1.default title={'企业视频'}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(193), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mb(10)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(305), style_1.h(160)])} src={require('../../assets/ico_upload_video.png')} onClick={() => {
            taro_1.default.chooseVideo({ compressed: true }).then(() => {
            });
        }}/>
          </components_1.View>
        </components_1.ScrollView>
        
        <bottom_buton_1.default title={'提交'} onClick={() => {
        }}/>
      </safe_area_view_1.default>);
    }
};
CompanyInfo = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], CompanyInfo);
exports.default = CompanyInfo;
//# sourceMappingURL=company_info.jsx.map