"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 新建任务
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
const bottom_buton_1 = require("../../compoments/bottom-buton");
const components_1 = require("@tarojs/components");
let AddTask = class AddTask extends taro_1.Component {
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
        this.state = {
            showAllTask: true,
            showOnlyToday: true,
        };
    }
    render() {
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'任务中心'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.default.uac])}>
          <components_1.Textarea style={datatool_1.styleAssign([style_1.wRatio(95), style_1.h(128), style_1.pa(20), style_1.bgColor(style_1.commonStyles.whiteColor),
            style_1.mt(10)])} value={''} placeholder={'例如：电话回访客户'}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.h(51), style_1.pl(20), style_1.pr(20), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>日期及时间</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>选择</components_1.Text>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(13), style_1.ml(5)])} src={require('../../assets/ico_next.png')}/>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#787878'), style_1.fSize(14), style_1.ml(20), style_1.mt(15)])}>关联客户</components_1.Text>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(68), style_1.h(68), style_1.ml(20), style_1.mt(14)])} src={require('../../assets/ico_add_task.png')}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.mt(10)])}/>
          </components_1.View>
          <components_1.Textarea style={datatool_1.styleAssign([style_1.wRatio(95), style_1.h(128), style_1.pa(20), style_1.bgColor(style_1.commonStyles.whiteColor)])} value={''} placeholder={'备注'}/>
        </components_1.View>
        
        <bottom_buton_1.default title={'保存'} onClick={() => {
        }}/>
      </safe_area_view_1.default>);
    }
};
AddTask = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], AddTask);
exports.default = AddTask;
//# sourceMappingURL=add_task.jsx.map