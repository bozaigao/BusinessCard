"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename task_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务中心
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
const list_item_1 = require("../../compoments/list-item");
let PersonalInfo = class PersonalInfo extends taro_1.Component {
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
        <top_header_1.default title={'个人信息'}/>
        
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(86), style_1.default.uac, style_1.default.udr, style_1.default.ujb,
            style_1.bgColor(style_1.commonStyles.whiteColor), style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>头像</components_1.Text>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(60), style_1.h(60), style_1.radiusA(30)])} src={require('../../assets/ico_default.jpeg')}/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10)])}>
            {[{ title: '姓名', subtitle: '必填', hasEdit: true },
            { title: '联系方式', subtitle: '15982468866' },
            { title: '行业', subtitle: '选择' },
            { title: '职位', subtitle: '必填' }].map((value, index) => {
            return (<list_item_1.default title={value.title} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit} onCLick={(title) => {
                if (title === '联系方式') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/contact_way`
                    });
                }
            }}/>);
        })}
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10)])}>
            {[{ title: '我的标签', subtitle: '添加' },
            { title: '微信&微信二维码', subtitle: '15982468866' },
            { title: '邮箱', subtitle: '选填', haEdit: true },
            { title: '生日', subtitle: '必填' },
            { title: '地区', subtitle: '选择' },
            { title: '地址', subtitle: '选填' }].map((value, index) => {
            return (<list_item_1.default title={value.title} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit} onCLick={(title) => {
                if (title === '我的标签') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/my_tags`
                    });
                }
            }}/>);
        })}
          </components_1.View>
        </components_1.ScrollView>
        
        <bottom_buton_1.default title={'保存'} onClick={() => {
        }}/>
      </safe_area_view_1.default>);
    }
};
PersonalInfo = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], PersonalInfo);
exports.default = PersonalInfo;
//# sourceMappingURL=personal_info.jsx.map