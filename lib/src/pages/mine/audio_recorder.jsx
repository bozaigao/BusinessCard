"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename audio_recorder.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 语音录制界面
 */
const taro_1 = require("@tarojs/taro");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const bottom_buton_1 = require("../../compoments/bottom-buton");
let AudioRecorder = class AudioRecorder extends taro_1.Component {
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
            list: [{ title: '学校', value: '四川美术学院' },
                { title: '学历', value: '本科' },
                { title: '专业', value: '产品设计' },
                { title: '在校时间', value: '2015-2019' }],
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() {
    }
    componentDidMount() {
    }
    componentDidHide() {
    }
    render() {
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'语音录制'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10), style_1.h(140), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(48), style_1.color('#979797')])}>00:00</components_1.Text>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434'), style_1.ml(20), style_1.mt(20)])}>录制小贴士：</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.ml(20), style_1.mr(20), style_1.mt(20)])}> 按住录音按钮，贴近手机话筒录制介绍语请在1分钟内，简明扼要地介绍您的公司、职位及个人信息。</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.ml(20), style_1.mr(20), style_1.mt(20)])}>例如：Hi！欢迎来到我的极致名片，我叫…,在…公司担任…一职，希望能与您进一步建立友好的合作关系，请收下我的名片~</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.ml(20), style_1.mr(20), style_1.mt(20)])}>温馨提示：请在安静的环境下录制，效果会更好哦~</components_1.Text>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.udr, style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.pt(53)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(56), style_1.h(56)])} src={require('../../assets/ico_record_delete.png')}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(78), style_1.ml(25), style_1.mr(25)])} src={require('../../assets/ico_record.png')}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(56), style_1.h(56)])} src={require('../../assets/ico_record_done.png')}/>
            </components_1.View>

          </components_1.View>
        </components_1.View>
        
        <bottom_buton_1.default title={'保存'} onClick={() => {
        }}/>
      </safe_area_view_1.default>);
    }
};
AudioRecorder = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], AudioRecorder);
exports.default = AudioRecorder;
//# sourceMappingURL=audio_recorder.jsx.map