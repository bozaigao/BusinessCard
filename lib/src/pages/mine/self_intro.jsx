"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename self_intro.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 自我描述
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const top_header_1 = require("../../compoments/top-header");
const bottom_buton_1 = require("../../compoments/bottom-buton");
const httpurl_1 = require("../../api/httpurl");
let SelfIntro = class SelfIntro extends taro_1.Component {
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

        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 更新用户信息
         */
        this.update = () => {
            let { desc } = this.state;
            if (desc.length === 0) {
                datatool_1.toast('内容不能为空');
                return;
            }
            this.viewRef && this.viewRef.showLoading();
            this.props.update({ selfDescription: desc }).then((res) => {
                console.log('更新用户信息', res);
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
        console.log(this.viewRef);
        this.state = {
            desc: this.$router.params.content,
            template: 'Hi，您好，我是…公司的…,我在…行业已有…年，主要负责…工作，有着丰富的…经验以及非常专业的相关知识，如果您有意向与我司合作，请直接联系我。'
        };
    }
    render() {
        let { desc, template } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'自我描述'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(160)])}>
         <components_1.Textarea style={datatool_1.styleAssign([style_1.wRatio(80), { marginLeft: '5%' }, style_1.h(160), style_1.pa(20), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor),
            style_1.mt(20), style_1.fSize(14)])} value={desc} placeholder={'简单介绍一下自己，有助于加深他人对你的了解哦~'} maxlength={600} onInput={(e) => {
            this.setState({ desc: e.detail.value });
        }}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.upa, style_1.absR(30), style_1.absB(10)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>{desc.length}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#CECECE')])}>/600</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#313137'), style_1.ml(20), style_1.mt(20)])}>查看模板</components_1.Text>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), { marginLeft: '5%' }, style_1.h(136), style_1.mt(13),
            { boxShadow: '0px 4px 4px 0px rgba(230,230,230,0.5' }])}>
            <components_1.View style={datatool_1.styleAssign([{ flex: 2 }, style_1.default.uac, style_1.default.ujc, style_1.padding([16, 16, 0, 16])])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>{template}</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.mt(5)])}/>
            <components_1.View style={datatool_1.styleAssign([{ flex: 1 }, style_1.default.uac, style_1.default.ujc,])} onLongPress={() => {
            taro_1.default.setClipboardData({
                data: template
            });
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>长按可复制</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>

        <bottom_buton_1.default title={'保存'} onClick={() => {
            this.update();
        }}/>
      </safe_area_view_1.default>);
    }
};
SelfIntro = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], SelfIntro);
exports.default = SelfIntro;
//# sourceMappingURL=self_intro.jsx.map
