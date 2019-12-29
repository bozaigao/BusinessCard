"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename mine.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 我的
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
const touchable_button_1 = require("../../compoments/touchable-button");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
let Mine = class Mine extends taro_1.Component {
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
         * @date 2019/12/29
         * @function: 获取用户信息
         */
        this.getUserInfo = () => {
            this.props.getUserInfo().then((res) => {
                console.log('获取用户信息', res);
                console.log('属性', this.props.userInfo);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        this.state = {
            marginTop: 0,
            showPersonalInfo: true
        };
    }
    componentWillMount() {
        //这里只要是针对微信小程序设置自定义tabBar后的iphoneX高度适配
        if (style_1.iphoneX()) {
            this.setState({ marginTop: 43 });
        }
        else {
            this.setState({ marginTop: 15 });
        }
        this.getUserInfo();
    }
    componentWillUnmount() {
    }
    componentDidShow() {
    }
    componentDidHide() {
    }
    render() {
        let { marginTop, showPersonalInfo } = this.state;
        let { userInfo } = this.props;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} notNeedBottomPadding={true} notNeedTopPadding={true}>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100)])} scrollY>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(182), style_1.bgColor(style_1.commonStyles.colorTheme)])}>
              
              <components_1.View style={datatool_1.styleAssign([style_1.mt(marginTop), style_1.wRatio(100), style_1.h(44), style_1.default.ujb, style_1.default.udr, style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(14), style_1.ml(20)])} src={require('../../assets/ico_switch_white.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(19), style_1.color(style_1.commonStyles.whiteColor)])}>我的</components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.bgColor(style_1.commonStyles.transparent), style_1.mr(20)])}/>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(210), style_1.bgColor(style_1.commonStyles.whiteColor)])}/>
            
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.upa, style_1.absB(10)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.w(120), style_1.h(120)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(120), style_1.h(120), style_1.radiusA(60)])} src={userInfo.avatar}/>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(23), style_1.h(23), style_1.radiusA(11.5), style_1.default.upa, style_1.absB(2), style_1.absR(2)])} src={userInfo.sex === 1 ? require('../../assets/ico_nan.png') : require('../../assets/ico_nv.png')}/>
              </components_1.View>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color('#343434'), style_1.mt(15)])}>{userInfo.name}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#727272'), style_1.mt(4)])}>{userInfo.company ? userInfo.company : ''}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.mt(4)])}>四川美术学院</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.mt(4)])}>四川 成都</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.mt(4)])}>耐用消耗品</components_1.Text>
            </components_1.View>
            
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.upa, style_1.absR(10), style_1.absB(180)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(19), style_1.h(19)])} src={require('../../assets/ico_setting.png')} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/setting_page`
            });
        }}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(21), style_1.h(19), style_1.mt(70)])} src={require('../../assets/ico_edit.png')} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/personal_info`
            });
        }}/>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(101), style_1.mt(10), style_1.default.ujb, style_1.default.udr, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.h(20), style_1.ml(20), style_1.mt(17)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>名片竞争力：</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>中级</components_1.Text>
            </components_1.View>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(5), style_1.mr(20), style_1.mt(20)])} src={require('../../assets/ico_down2.png')}/>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(80), style_1.mt(10), style_1.default.ujb, style_1.default.udr, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            this.setState({ showPersonalInfo: !this.state.showPersonalInfo });
        }}>
              <components_1.View style={datatool_1.styleAssign([style_1.ml(20), style_1.mt(17)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>个人简介</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797')])}>完善个人简介，拥有精美名片</components_1.Text>
              </components_1.View>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(5), style_1.mr(20), style_1.mt(40)])} src={require('../../assets/ico_down2.png')}/>
            </touchable_button_1.default>
            {showPersonalInfo && [{
                title: '我的家乡',
                subTitle: '完善家乡信息，增加更多人脉',
                chooseTitle: '选择'
            },
            {
                title: '教育经历',
                subTitle: '完善教育经历，寻找校友',
                chooseTitle: '添加'
            },
            {
                title: '我的语音',
                subTitle: '留下语音介绍，让客户更快认识你',
                chooseTitle: '添加'
            },
            {
                title: '自我描述',
                subTitle: '让客户进一步深入了解你',
                chooseTitle: '添加'
            }].map((value, index) => {
            return (<touchable_button_1.default key={index} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])} onClick={() => {
                if (value.title === '教育经历') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/my_edu`
                    });
                }
                else if (value.title === '自我描述') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/self_intro`
                    });
                }
                else if (value.title === '我的语音') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/audio_recorder`
                    });
                }
            }}>
                    <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(68), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
                      <components_1.View style={datatool_1.styleAssign([style_1.ml(20)])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>{value.title}</components_1.Text>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797')])}>{value.subTitle}</components_1.Text>
                      </components_1.View>
                      <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mr(20)])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9')])}>{value.chooseTitle}</components_1.Text>
                        <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(6)])} src={require('../../assets/ico_next.png')}/>
                      </touchable_button_1.default>
                    </components_1.View>
                    <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
                  </touchable_button_1.default>);
        })}
          </components_1.View>
          
          {[{
                title: '我的照片',
                subtitle1: '添加照片',
                subtitle2: '让客户更全面了解你',
                ico: require('../../assets/ico_camera.png')
            },
            {
                title: '我的视频',
                subtitle1: '添加视频',
                subtitle2: '让客户更全面了解你',
                ico: require('../../assets/ico_play.png')
            }].map((value, index) => {
            return (<touchable_button_1.default key={index} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(264), style_1.mt(10), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
                if (index === 0) {
                    taro_1.default.chooseImage({ count: 9 }).then(() => {
                    });
                }
                else {
                    taro_1.default.chooseVideo({ compressed: true }).then(() => {
                    });
                }
            }}>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#0C0C0C'), style_1.ml(20), style_1.mt(17)])}>{value.title}</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.mt(12), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
                <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(176), style_1.mt(16), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(40), style_1.h(40), style_1.radiusA(20), style_1.bgColor(style_1.commonStyles.whiteColor),
                style_1.default.uac, style_1.default.ujc])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(21), style_1.h(19)])} src={require('../../assets/ico_camera.png')}/>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#ACADAD'), style_1.mt(10)])}>{value.subtitle1}</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#ACADAD'), style_1.mt(4)])}>{value.subtitle2}</components_1.Text>
                </components_1.View>
              </touchable_button_1.default>);
        })}
          
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(80), style_1.mt(10), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac, style_1.default.ujc,
            style_1.pl(20), style_1.pr(20)])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/company_info`
            });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujb, style_1.default.udr])}>
              <components_1.View>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#0C0C0C'), style_1.mt(4)])}>企业信息</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797'), style_1.mt(4)])}>完善企业信息，提升你的信赖度</components_1.Text>
              </components_1.View>
              <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9')])}>编辑</components_1.Text>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(6)])} src={require('../../assets/ico_next.png')}/>
              </touchable_button_1.default>
            </components_1.View>
          </touchable_button_1.default>
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
Mine = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], Mine);
exports.default = Mine;
//# sourceMappingURL=mine.jsx.map