"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 个人介绍
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const httpurl_1 = require("../../../api/httpurl");
class PersonalInfo extends taro_1.PureComponent {
    constructor(props) {
        super(props);
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
            micIsPlaying: false
        };
    }
    componentDidHide() {
        this.setState({ micIsPlaying: false });
        this.innerAudioContext && this.innerAudioContext.stop();
    }
    componentWillUnmount() {
        this.innerAudioContext && this.innerAudioContext.stop();
    }
    render() {
        let { userInfo } = this.props;
        let { micIsPlaying } = this.state;
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(32)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(22), style_1.bgColor('#E2BB7B')])}/>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(8)])}>我的个人简介</components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(95), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4),
            { marginLeft: '2.5%' }, style_1.mt(16), style_1.pa(16)])}>
          {userInfo.voiceUrl && userInfo.voiceUrl.length !== 0 &&
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40), style_1.radiusA(20)])} src={userInfo.avatar ? userInfo.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
              <components_1.View style={datatool_1.styleAssign([style_1.w(85), style_1.h(41), style_1.ml(10)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.upa, style_1.absL(0)])} src={require('../../../assets/ico_mic_bg.png')} onClick={(e) => {
                e.stopPropagation();
                this.playMic();
            }}/>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.default.upa, style_1.absL(15), style_1.absT(10)])} src={micIsPlaying ? require('../../../assets/mic_play.gif') : require('../../../assets/ico_mic.png')} onClick={(e) => {
                e.stopPropagation();
                this.playMic();
            }}/>
              </components_1.View>
              <components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.w(7), style_1.h(7), style_1.radiusA(3.6), style_1.bgColor('red'), style_1.ml(5)])}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(11), style_1.color('#979797'), style_1.ml(8), style_1.mt(5)])}>{`${userInfo.voiceDuration}″`}</components_1.Text>
              </components_1.View>
            </components_1.View>}
          {userInfo.selfDescription.length !== 0 && <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.mt(16)])}>{userInfo.selfDescription}</components_1.Text>}
          
          {(userInfo.province.length !== 0 || userInfo.city.length !== 0) &&
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(24)])}>
              <components_1.View style={datatool_1.styleAssign([])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14)])}>家乡</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>{`${userInfo.province} ${userInfo.city}`}</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.w(52), style_1.h(28), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc,
                style_1.bo(1), style_1.radiusA(4), { borderStyle: 'solid' }, style_1.bdColor(style_1.commonStyles.colorTheme), style_1.mr(16)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>同乡</components_1.Text>
              </components_1.View>
            </components_1.View>}
          
          {userInfo.school.length !== 0 &&
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(24)])}>
              <components_1.View style={datatool_1.styleAssign([])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14)])}>教育</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>{userInfo.school}</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color('#979797')])}>{`${userInfo.profession} ${userInfo.schoolTimeStart}-${userInfo.schoolTimeEnd} ${userInfo.educationBackground}`}</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.w(52), style_1.h(28), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc,
                style_1.bo(1), style_1.radiusA(4), { borderStyle: 'solid' }, style_1.bdColor(style_1.commonStyles.colorTheme), style_1.mr(16)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12)])}>校友</components_1.Text>
              </components_1.View>
            </components_1.View>}
          {userInfo.labelArray.length !== 0 &&
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10), style_1.default.udr, style_1.default.uac])}>
              {userInfo.labelArray.map((value, index) => {
                return <components_1.View key={index} style={datatool_1.styleAssign([style_1.w(58), style_1.h(28), style_1.ml(index !== 0 ? 10 : 0), style_1.default.uac, style_1.default.ujc, style_1.radiusA(14), style_1.bgColor('#E7E7E7')])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.color('#343434'), style_1.fSize(12)])}>{value}</components_1.Text>
                  </components_1.View>;
            })}
            </components_1.View>}
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = PersonalInfo;
//# sourceMappingURL=index.jsx.map