"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename tool_box.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 工具箱
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
const httpurl_1 = require("../../api/httpurl");
let ToolBox = class ToolBox extends taro_1.Component {
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
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 更新用户信息
         */
        this.update = () => {
            let { desc, radarRemind } = this.state;
            if (desc.length === 0) {
                datatool_1.toast('请先完善引导语');
                return;
            }
            this.viewRef && this.viewRef.showLoading();
            this.props.update({
                guideLanguage: desc,
                radarRemind
            }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('保存成功');
                    datatool_1.debounce(1000, () => {
                        taro_1.default.navigateBack();
                    });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log('工具箱', props.userInfo);
        this.state = {
            template: '您好，我是…公司的…,这是我的电子名片，欢迎进入我的名片主页~',
            desc: props.userInfo.guideLanguage,
            radarRemind: props.userInfo.radarRemind
        };
    }
    render() {
        let { template, desc, radarRemind } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'工具箱'}/>
        
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(360), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#0C0C0C'), style_1.ml(20), style_1.mt(20)])}>名片引导语</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(91), style_1.mt(20)])}>
            <components_1.Textarea value={desc} placeholder={'您好，我是…公司的…,这是我的电子名片，欢迎进入我的名片主页~'} style={datatool_1.styleAssign([style_1.w(305), style_1.h(91), style_1.fSize(16), style_1.ml(20),
            style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.pa(16)])} onInput={(e) => {
            this.setState({ desc: e.detail.value });
        }} maxlength={50}/>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.upa, style_1.absR(30), style_1.absB(10)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>{desc.length}</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#CECECE')])}>/50</components_1.Text>
              </components_1.View>
            </components_1.View>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#313137'), style_1.ml(20), style_1.mt(20)])}>参考模板</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), { marginLeft: '5%' }, style_1.h(100), style_1.mt(13),
            { boxShadow: '0px 4px 4px 0px rgba(230,230,230,0.5' }])}>
              <components_1.View style={datatool_1.styleAssign([{ flex: 2 }, style_1.default.uac, style_1.default.ujc, style_1.padding([16, 16, 0, 16])])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>{template}</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.mt(5)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.h(35), style_1.default.uac, style_1.default.ujc,])} onLongPress={() => {
            taro_1.default.setClipboardData({
                data: template
            });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>长按可复制</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(56), style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.pl(20), style_1.pr(20), style_1.mt(10), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#0C0C0C')])}>雷达提醒</components_1.Text>
            <components_1.Switch color={'#E2BB7B'} checked={radarRemind === 1} onChange={(e) => {
            this.setState({ radarRemind: e.detail.value ? 1 : 0 });
        }}/>
          </components_1.View>
        </components_1.View>
        
        <bottom_buton_1.default title={'确定'} onClick={() => {
            this.update();
        }}/>
      </safe_area_view_1.default>);
    }
};
ToolBox = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], ToolBox);
exports.default = ToolBox;
//# sourceMappingURL=tool_box.jsx.map