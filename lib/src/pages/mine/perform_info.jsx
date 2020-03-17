"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename perform_info.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 完善名片
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
const touchable_button_1 = require("../../compoments/touchable-button");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const httpurl_1 = require("../../api/httpurl");
const linear_gradient_view_1 = require("../sub_pagecomponent/linear-gradient-view");
const navigation_bar_1 = require("../../compoments/navigation_bar");
let PerformInfo = class PerformInfo extends taro_1.Component {
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
                if (res) {
                    this.props.updateUserInfo(res);
                    console.log('获取用户信息1', res);
                    this.setState({ photoUrl: datatool_1.parseData(res.photoUrl), videoUrl: res.videoUrl }, () => {
                        console.log('获取用户信息', this.state.photoUrl);
                    });
                }
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        this.playMic = () => {
            this.setState({ micIsPlaying: true });
            this.innerAudioContext.src = this.props.userInfo.voiceUrl;
            this.innerAudioContext.play();
            this.innerAudioContext.onEnded(() => {
                this.setState({ micIsPlaying: false });
            });
        };
        this.innerAudioContext = taro_1.default.createInnerAudioContext();
        this.state = {
            photoUrl: [],
            videoUrl: '',
            showPersonalInfo: true,
            scrollTop: 0,
            micIsPlaying: false
        };
    }
    componentDidShow() {
        this.getUserInfo();
    }
    componentDidHide() {
        this.setState({ micIsPlaying: false });
        this.innerAudioContext && this.innerAudioContext.stop();
    }
    componentWillUnmount() {
        this.innerAudioContext && this.innerAudioContext.stop();
    }
    render() {
        let { showPersonalInfo, photoUrl, videoUrl, scrollTop, micIsPlaying } = this.state;
        let { userInfo } = this.props;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true}>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor)])} scrollY onScroll={(e) => {
            this.setState({ scrollTop: e.detail.scrollTop });
            console.log(e.detail);
        }}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
              <linear_gradient_view_1.default style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(182)])}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(190), style_1.bgColor(style_1.commonStyles.whiteColor)])}/>
            
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.upa, style_1.absT(125)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.w(120), style_1.h(120)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(120), style_1.h(120), style_1.radiusA(60)])} src={userInfo.avatar ? userInfo.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(23), style_1.h(23), style_1.radiusA(11.5), style_1.default.upa, style_1.absB(2), style_1.absR(2)])} src={userInfo.sex === 1 ? `${httpurl_1.cloudBaseUrl}ico_nan.png` : `${httpurl_1.cloudBaseUrl}ico_nv.png`}/>
              </components_1.View>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color('#343434'), style_1.mt(15)])}>{userInfo.name ? userInfo.name : '无名氏'}</components_1.Text>
              {userInfo.company && <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#727272'), style_1.mt(4)])}>{`${userInfo.company}-${userInfo.position}`}</components_1.Text>}
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.mt(4)])}>{`${userInfo.school}•${userInfo.profession}`}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.mt(4)])}>{userInfo.province ? userInfo.province + userInfo.city : ''}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.mt(4)])}>{datatool_1.wrapSafe(userInfo.selfDescription)}</components_1.Text>
            </components_1.View>
            
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.upa, style_1.absR(10), style_1.absB(150)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(21), style_1.h(19), style_1.mt(70)])} src={`${httpurl_1.cloudBaseUrl}ico_edit.png`} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/personal_info`
            });
        }}/>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(101), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10),])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.ujb, style_1.default.udr, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.h(20), style_1.ml(20), style_1.mt(17)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>名片竞争力：</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>中级</components_1.Text>
              </components_1.View>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(5), style_1.mr(20), style_1.mt(20)])} src={`${httpurl_1.cloudBaseUrl}ico_down2.png`}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(50), style_1.default.ujc])}>
              <linear_gradient_view_1.default style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(20), { marginLeft: '5%' }])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.wRatio(94), style_1.h(50), style_1.absT(0), { left: '3%' },
            style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40)])} src={`${httpurl_1.cloudBaseUrl}progress_1.png`}/>
                {[1, 2, 3].map((value, index) => {
            console.log(value);
            return <components_1.View key={index} style={datatool_1.styleAssign([style_1.w(2), style_1.h(10), style_1.bgColor(style_1.commonStyles.whiteColor)])}/>;
        })}
                <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40)])} src={`${httpurl_1.cloudBaseUrl}progress_2.png`}/>
                <components_1.View style={datatool_1.styleAssign([style_1.w(2), style_1.h(10), style_1.bgColor(style_1.commonStyles.whiteColor)])}/>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40)])} src={`${httpurl_1.cloudBaseUrl}progress_3.png`}/>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(40), style_1.mt(10), style_1.default.ujb, style_1.default.uac, style_1.default.udr, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            this.setState({ showPersonalInfo: !this.state.showPersonalInfo });
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434'), style_1.ml(20)])}>个人简介</components_1.Text>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(5), style_1.mr(20)])} src={showPersonalInfo ? `${httpurl_1.cloudBaseUrl}ico_down2.png` : require('../../assets/ico_up2.png')}/>
            </touchable_button_1.default>
            {showPersonalInfo &&
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
                
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])} onClick={() => {
                taro_1.default.navigateTo({
                    url: `/pages/mine/audio_recorder`
                });
            }}>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(38), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#0C0C0C'), style_1.ml(20)])}>我的语音</components_1.Text>
                    <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mr(20)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9')])}>{userInfo.voiceUrl && userInfo.voiceUrl.length !== 0 ? '编辑' : '添加'}</components_1.Text>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(6)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
                    </touchable_button_1.default>
                  </components_1.View>
                  {userInfo.voiceUrl && userInfo.voiceUrl.length !== 0 ?
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.wRatio(100), style_1.mb(10)])}>
                        <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40), style_1.radiusA(20), style_1.ml(19)])} src={userInfo.avatar ? userInfo.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
                        <components_1.View style={datatool_1.styleAssign([style_1.w(186), style_1.h(41), style_1.ml(10)])}>
                          <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.upa, style_1.absL(0)])} src={require('../../assets/ico_wenhouyu_bg2.png')} onClick={(e) => {
                    e.stopPropagation();
                    this.playMic();
                }}/>
                          <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.default.upa, style_1.absL(15), style_1.absT(10)])} src={micIsPlaying ? require('../../assets/mic_play.gif') : require('../../assets/ico_mic.png')} onClick={(e) => {
                    e.stopPropagation();
                    this.playMic();
                }}/>
                        </components_1.View>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color('#979797'), style_1.default.upa, style_1.absL(110)])}>{`${userInfo.voiceDuration ? userInfo.voiceDuration : '0'}″`}</components_1.Text>
                      </components_1.View> :
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.ujc])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9'), style_1.ml(20)])}>留下语音介绍，让客户更快认识你</components_1.Text>
                      </components_1.View>}
                  <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
                </components_1.View>
                
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])} onClick={() => {
                taro_1.default.navigateTo({
                    url: `/pages/mine/self_intro?content=${userInfo.selfDescription ? userInfo.selfDescription : ''}`
                });
            }}>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(38), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#0C0C0C'), style_1.ml(20)])}>自我描述</components_1.Text>
                    <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mr(20)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9')])}>{userInfo.selfDescription && userInfo.selfDescription.length !== 0 ? '编辑' : '添加'}</components_1.Text>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(6)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
                    </touchable_button_1.default>
                  </components_1.View>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mb(10)])}>
                    {userInfo.selfDescription && userInfo.selfDescription.length !== 0 ?
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#0C0C0C'), style_1.ml(20), style_1.mr(20)])}>{userInfo.selfDescription}</components_1.Text> :
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9'), style_1.ml(20), style_1.mr(20)])}>让客户进一步深入了解你</components_1.Text>}
                  </components_1.View>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
                </components_1.View>
                
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])} onClick={() => {
                taro_1.default.navigateTo({
                    url: `/pages/mine/my_home?villagerGreeting=${userInfo.villagerGreeting}&province=${userInfo.province}&city=${userInfo.city}`
                });
            }}>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(38), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#0C0C0C'), style_1.ml(20)])}>我的家乡</components_1.Text>
                    <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mr(20)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9')])}>{userInfo.province || userInfo.city ? '编辑' : '添加'}</components_1.Text>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(6)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
                    </touchable_button_1.default>
                  </components_1.View>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mb(10)])}>
                    {userInfo.province || userInfo.city ?
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#0C0C0C'), style_1.ml(20), style_1.mr(20)])}>{`${userInfo.province} ${userInfo.city}`}</components_1.Text> :
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9'), style_1.ml(20), style_1.mr(20)])}>完善家乡信息，增加更多人脉</components_1.Text>}
                  </components_1.View>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
                </components_1.View>
                
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])} onClick={() => {
                taro_1.default.navigateTo({
                    url: `/pages/mine/my_edu?school=${userInfo.school}&educationBackground=${userInfo.educationBackground}&profession=${userInfo.profession}&schoolfellowGreeting=${userInfo.schoolfellowGreeting}&schoolTimeStart=${userInfo.schoolTimeStart}&schoolTimeEnd=${userInfo.schoolTimeEnd}`
                });
            }}>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(38), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#0C0C0C'), style_1.ml(20)])}>教育经历</components_1.Text>
                    <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mr(20)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9')])}>{userInfo.school && userInfo.school.length !== 0 ? '编辑' : '添加'}</components_1.Text>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(6)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
                    </touchable_button_1.default>
                  </components_1.View>
                  {userInfo.school && userInfo.school.length !== 0 ?
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mb(10)])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#0C0C0C'), style_1.ml(20), style_1.mr(20)])}>{userInfo.school}</components_1.Text>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20), style_1.mr(20)])}>{`${userInfo.profession} ${userInfo.schoolTimeStart}-${userInfo.schoolTimeEnd} ${userInfo.educationBackground}`}</components_1.Text>
                      </components_1.View> :
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mb(10)])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20), style_1.mr(20)])}>让同窗校友轻松找到你</components_1.Text>
                      </components_1.View>}
                  <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
                </components_1.View>
                
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])} onClick={() => {
                taro_1.default.navigateTo({
                    url: `/pages/mine/my_tags`
                });
            }}>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(38), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#0C0C0C'), style_1.ml(20)])}>我的标签</components_1.Text>
                    <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mr(20)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9')])}>{userInfo.labelArray && userInfo.labelArray.length !== 0 ? '编辑' : '添加'}</components_1.Text>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(6)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
                    </touchable_button_1.default>
                  </components_1.View>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mb(10), style_1.default.udr, style_1.default.uWrap, style_1.default.uac])}>
                    {userInfo.labelArray.map((value, index) => {
                return <components_1.View key={index} style={datatool_1.styleAssign([style_1.padding([5, 15, 5, 15]), style_1.ml(24), style_1.mt(10), style_1.radiusA(14), style_1.bgColor('#E7E7E7'), style_1.default.uac, style_1.default.ujc])}>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{value}</components_1.Text>
                        </components_1.View>;
            })}
                    {userInfo.labelArray.length === 0 &&
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20), style_1.mr(20)])}>让志同道合的朋友轻松找到你</components_1.Text>}
                  </components_1.View>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
                </components_1.View>
              </components_1.View>}
          </components_1.View>

          
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/my_photo?myPhotoUrl=${JSON.stringify(photoUrl)}`
            });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(17)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#0C0C0C'), style_1.ml(20)])}>我的照片</components_1.Text>
              {photoUrl && photoUrl.length !== 0 ?
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mr(20)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9')])}>编辑</components_1.Text>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(6)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
                  </touchable_button_1.default> :
            <components_1.View />}
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.mt(12), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            {photoUrl && photoUrl.length !== 0 ?
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uWrap])}>
                  {photoUrl.map((value, index) => {
                return <components_1.Image key={index} style={datatool_1.styleAssign([style_1.w(105), style_1.h(105), style_1.radiusA(2), style_1.ml(15), style_1.mb(10)])} src={value}/>;
            })}
                </components_1.View> :
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(176), style_1.mt(16), style_1.mb(10), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(40), style_1.h(40), style_1.radiusA(20), style_1.bgColor(style_1.commonStyles.whiteColor),
                style_1.default.uac, style_1.default.ujc])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(21), style_1.h(19)])} src={`${httpurl_1.cloudBaseUrl}ico_camera.png`}/>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#ACADAD'), style_1.mt(10)])}>添加照片</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#ACADAD'), style_1.mt(4)])}>让客户更全面了解你</components_1.Text>
                </components_1.View>}
          </touchable_button_1.default>
          
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(264), style_1.mt(10), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/my_video?videoUrl=${videoUrl}`
            });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(17)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#0C0C0C'), style_1.ml(20)])}>我的视频</components_1.Text>
              {videoUrl && videoUrl.length !== 0 ?
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mr(20)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#A9A9A9')])}>编辑</components_1.Text>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(6)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
                  </touchable_button_1.default> :
            <components_1.View />}
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.mt(12), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            {videoUrl && videoUrl.length !== 0 ?
            <components_1.Video style={datatool_1.styleAssign([style_1.w(335), style_1.h(203), style_1.bgColor(style_1.commonStyles.whiteColor)])} src={videoUrl} controls={true} autoplay={false} objectFit={'fill'} initialTime={1} id='video' loop={false} muted={false} onClick={(e) => {
                e.stopPropagation();
            }}/> :
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(176), style_1.mt(16), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(40), style_1.h(40), style_1.radiusA(20), style_1.bgColor(style_1.commonStyles.whiteColor),
                style_1.default.uac, style_1.default.ujc])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(16), style_1.h(18)])} src={`${httpurl_1.cloudBaseUrl}ico_play.png`}/>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#ACADAD'), style_1.mt(10)])}>添加视频</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#ACADAD'), style_1.mt(4)])}>让客户更全面了解你</components_1.Text>
                </components_1.View>}
          </touchable_button_1.default>
          
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
                <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(6)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
              </touchable_button_1.default>
            </components_1.View>
          </touchable_button_1.default>
        </components_1.ScrollView>
        <navigation_bar_1.default style={datatool_1.styleAssign([style_1.default.upa, style_1.absT(0), style_1.op((300 - scrollTop) / 300)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.ujb, style_1.default.udr, style_1.default.uac])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={require('../../assets/ico_back_white.png')} onClick={() => {
            taro_1.default.navigateBack();
        }}/>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(19), style_1.color(style_1.commonStyles.whiteColor)])}>完善名片</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.bgColor(style_1.commonStyles.transparent), style_1.mr(20)])}/>
          </components_1.View>
        </navigation_bar_1.default>
      </safe_area_view_1.default>);
    }
};
PerformInfo = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], PerformInfo);
exports.default = PerformInfo;
//# sourceMappingURL=perform_info.jsx.map