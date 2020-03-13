"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename feedback.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/19
 * @Description: 用户反馈界面
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
let Feedback = class Feedback extends taro_1.Component {
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
         * @date 2020/3/1
         * @function: 投诉与建议
         */
        this.suggestionAdd = () => {
            let { content } = this.state;
            if (content.length === 0) {
                datatool_1.toast('请输入内容');
                return;
            }
            this.viewRef && this.viewRef.showLoading();
            this.props.suggestionAdd({ content: this.state.content }).then((res) => {
                console.log('获取用户信息', res);
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('感谢您的反馈');
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
            content: ''
        };
    }
    render() {
        let { content } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'投诉与建议'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(160)])}>
            <components_1.Textarea maxlength={600} style={datatool_1.styleAssign([style_1.wRatio(80), { marginLeft: '5%' }, style_1.h(160), style_1.pa(20), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor),
            style_1.mt(20)])} value={''} placeholder={'请输入您的意见或建议，提交以后我们的工作人员会及时查看的~'} onInput={(e) => {
            this.setState({ content: e.detail.value });
        }}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.upa, style_1.absR(30), style_1.absB(10)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>{content.length}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#CECECE')])}>/600</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>
        
        <bottom_buton_1.default title={'提交'} onClick={() => {
            this.suggestionAdd();
        }}/>
      </safe_area_view_1.default>);
    }
};
Feedback = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], Feedback);
exports.default = Feedback;
//# sourceMappingURL=feedback.jsx.map