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
const touchable_button_1 = require("../../compoments/touchable-button");
const delete_notice_1 = require("../sub_pagecomponent/delete-notice");
const global_1 = require("../../const/global");
const httpurl_1 = require("../../api/httpurl");
//录制总时间限制
let totalTime = 60;
//最小录制时间限制
let miniRecordTime = 5;
//录制状态
var RECORD_STATE;
(function (RECORD_STATE) {
    RECORD_STATE[RECORD_STATE["RECORD_NO_START"] = 0] = "RECORD_NO_START";
    RECORD_STATE[RECORD_STATE["RECORD_START"] = 1] = "RECORD_START";
    RECORD_STATE[RECORD_STATE["RECORD_PAUSE"] = 2] = "RECORD_PAUSE";
    RECORD_STATE[RECORD_STATE["RECORD_RESUME"] = 3] = "RECORD_RESUME";
})(RECORD_STATE || (RECORD_STATE = {}));
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
        this.starTime = () => {
            this.timer = setInterval(() => {
                if (this.state.startTimer) {
                    //时间到自动结束录制
                    if (this.state.time === totalTime - 1) {
                        this.recorderManager.pause();
                        this.recorderManager.onPause(() => {
                            this.setState({
                                startTimer: false,
                                recordState: RECORD_STATE.RECORD_PAUSE
                            }, () => {
                                this.stopRecord();
                            });
                        });
                    }
                    this.setState({ time: this.state.time + 1 });
                }
                console.log('倒计时');
            }, 1000);
        };
        this.clearTime = () => {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/2/8
         * @function: 开始录制
         */
        this.startRecord = () => {
            const options = {
                sampleRate: 16000,
                numberOfChannels: 1,
                encodeBitRate: 96000,
                format: 'mp3',
            };
            let that = this;
            taro_1.default.getSetting({
                success(res) {
                    if (res.authSetting['scope.record']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        that.recorderManager.start(options);
                    }
                    else {
                        taro_1.default.openSetting({
                            success(res) {
                                if (res.authSetting['scope.record']) {
                                    that.recorderManager.start(options);
                                }
                            }
                        });
                    }
                }
            });
            this.recorderManager.onStart(() => {
                if (!this.timer) {
                    this.starTime();
                    this.setState({
                        time: 0,
                        startTimer: true,
                        recordDone: false,
                        canRetry: false,
                        canRecordDone: false,
                        recordText: '录制中',
                        recordState: RECORD_STATE.RECORD_START,
                        localVideoUrl: ''
                    });
                }
                else {
                    this.setState({
                        startTimer: true,
                        recordDone: false,
                        canRecordDone: false,
                        canRetry: false,
                        recordText: '录制中',
                        recordState: RECORD_STATE.RECORD_START,
                        localVideoUrl: ''
                    });
                }
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/2/8
         * @function: 结束录制
         */
        this.stopRecord = () => {
            this.recorderManager.stop();
            this.recorderManager.onStop((res) => {
                console.log(res);
                this.setState({
                    localVideoUrl: res.tempFilePath,
                    recordDone: true,
                    recordText: '录制完成',
                    canRetry: true,
                }, () => {
                    console.log('音频文件', this.state.localVideoUrl);
                });
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 将文件通过微信Api上传到服务端
         */
        this.uploadFileTpWx = (path) => {
            console.log('上传路径', path);
            this.viewRef.showLoading();
            let token = datatool_1.get(global_1.Enum.TOKEN), that = this;
            taro_1.default.uploadFile({
                url: httpurl_1.FileController.uploadVoice,
                filePath: path,
                name: 'file',
                header: {
                    'token': token
                },
                success(res) {
                    console.log('上传的音频文件', datatool_1.parseData(res.data).data);
                    that.update(datatool_1.parseData(res.data).data);
                }
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 更新用户信息
         */
        this.update = (path) => {
            this.props.update({ voiceUrl: path, voiceDuration: this.state.time }).then((res) => {
                console.log('更新用户信息', res);
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('录音上传成功');
                    datatool_1.debounce(1000, () => {
                        taro_1.default.navigateBack();
                    });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        this.recorderManager = taro_1.default.getRecorderManager();
        this.innerAudioContext = taro_1.default.createInnerAudioContext();
        this.state = {
            time: 0,
            recordText: '',
            recordDone: false,
            recordState: RECORD_STATE.RECORD_NO_START,
            startTimer: false,
            canRecordDone: false,
            canRetry: false,
            showDeleteNotice: false,
            localVideoUrl: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() {
        this.clearTime();
        this.innerAudioContext && this.innerAudioContext.stop();
    }
    componentDidHide() {
    }
    render() {
        let { time, recordText, recordDone, recordState, canRecordDone, canRetry, showDeleteNotice, localVideoUrl } = this.state;
        let recordIcon, rightIcon;
        switch (recordState) {
            case RECORD_STATE.RECORD_START:
                recordIcon = require('../../assets/ico_record_start.png');
                break;
            case RECORD_STATE.RECORD_PAUSE:
                recordIcon = require('../../assets/ico_record_pause.png');
                break;
            case RECORD_STATE.RECORD_RESUME:
                recordIcon = require('../../assets/ico_record_start.png');
                break;
            default:
                recordIcon = require('../../assets/ico_record.png');
        }
        if (canRetry) {
            rightIcon = require('../../assets/ico_record_retry.png');
        }
        else if (canRecordDone) {
            rightIcon = require('../../assets/ico_record_done_pressed.png');
        }
        else {
            rightIcon = require('../../assets/ico_record_done_normal.png');
        }
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <top_header_1.default title={'语音录制'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10), style_1.h(140), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(48), style_1.color('#979797')])}>00:</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(48), style_1.color('#E2BB7B'), style_1.w(60)])}>{time < 10 ? `0${time}` : time}</components_1.Text>
            </components_1.View>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797')])}>{recordText}</components_1.Text>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434'), style_1.ml(20), style_1.mt(20)])}>录制小贴士：</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.ml(20), style_1.mr(20), style_1.mt(20)])}> 按住录音按钮，贴近手机话筒录制介绍语请在1分钟内，简明扼要地介绍您的公司、职位及个人信息。</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.ml(20), style_1.mr(20), style_1.mt(20)])}>例如：Hi！欢迎来到我的极致名片，我叫…,在…公司担任…一职，希望能与您进一步建立友好的合作关系，请收下我的名片~</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.ml(20), style_1.mr(20), style_1.mt(20)])}>温馨提示：请在安静的环境下录制，效果会更好哦~</components_1.Text>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.udr, style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.pt(53)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(56), style_1.h(56)])} src={recordDone ? require('../../assets/ico_record_delete_pressed.png') :
            require('../../assets/ico_record_delete_normal.png')} onClick={() => {
            if (recordDone) {
                this.setState({ showDeleteNotice: true });
            }
        }}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(78), style_1.ml(25), style_1.mr(25)])} src={recordIcon} onClick={() => {
            switch (recordState) {
                case RECORD_STATE.RECORD_NO_START:
                    console.log('音频录制');
                    this.startRecord();
                    break;
                case RECORD_STATE.RECORD_START:
                    console.log('点击了暂停');
                    if (localVideoUrl.length === 0) {
                        this.recorderManager.pause();
                        this.recorderManager.onPause(() => {
                            this.setState({
                                startTimer: false,
                                recordText: `暂停录制（剩余${totalTime - time}s）`,
                                recordState: RECORD_STATE.RECORD_PAUSE
                            }, () => {
                                if (time >= miniRecordTime) {
                                    this.setState({ canRecordDone: true });
                                }
                            });
                        });
                    }
                    else {
                        this.innerAudioContext.pause();
                    }
                    break;
                case RECORD_STATE.RECORD_PAUSE:
                    if (localVideoUrl.length === 0) {
                        this.recorderManager.resume();
                        this.setState({
                            startTimer: true,
                            recordText: '录制中',
                            recordState: RECORD_STATE.RECORD_RESUME
                        });
                    }
                    else {
                        this.innerAudioContext.src = localVideoUrl;
                        this.innerAudioContext.play();
                        this.innerAudioContext.onEnded(() => {
                            this.setState({
                                recordText: '试听结束',
                                recordState: RECORD_STATE.RECORD_PAUSE
                            });
                        });
                        this.setState({
                            recordText: '试听中',
                            recordState: RECORD_STATE.RECORD_RESUME
                        });
                    }
                    break;
                case RECORD_STATE.RECORD_RESUME:
                    if (localVideoUrl.length === 0) {
                        this.recorderManager.pause();
                        this.recorderManager.onPause(() => {
                            this.setState({
                                startTimer: false,
                                recordText: `暂停录制（剩余${totalTime - time}s）`,
                                recordState: RECORD_STATE.RECORD_PAUSE
                            }, () => {
                                if (time >= miniRecordTime) {
                                    this.setState({ canRecordDone: true });
                                }
                            });
                        });
                    }
                    else {
                        this.innerAudioContext.pause();
                        this.setState({
                            recordText: '播放暂停',
                            recordState: RECORD_STATE.RECORD_PAUSE
                        });
                    }
                    break;
                default:
                    break;
            }
        }}/>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(56), style_1.h(56)])} src={rightIcon} onClick={() => {
            if (canRetry) {
                this.innerAudioContext.stop();
                this.setState({ time: 0 }, () => {
                    this.startRecord();
                });
            }
            else if (canRecordDone) {
                this.stopRecord();
            }
        }}/>
            </components_1.View>

          </components_1.View>
        </components_1.View>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(64), style_1.default.uac, style_1.default.ujc])}>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(335), style_1.h(48), style_1.radiusA(2), style_1.bgColor(recordDone ? style_1.commonStyles.colorTheme : '#E6E6E6'),
            style_1.default.uac, style_1.default.ujc])} onClick={() => {
            if (recordDone) {
                this.uploadFileTpWx(localVideoUrl);
            }
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(recordDone ? style_1.commonStyles.whiteColor : '#343434')])}>保存</components_1.Text>
          </touchable_button_1.default>
        </components_1.View>
        {showDeleteNotice && <delete_notice_1.default cancelCallback={() => {
            this.setState({ showDeleteNotice: false });
        }} confirmCallback={() => {
            datatool_1.toast('删除成功');
            this.innerAudioContext.stop();
            this.setState({
                time: 0,
                recordText: '',
                recordDone: false,
                recordState: RECORD_STATE.RECORD_NO_START,
                startTimer: false,
                canRecordDone: false,
                canRetry: false,
                showDeleteNotice: false,
                localVideoUrl: ''
            });
        }}/>}
      </safe_area_view_1.default>);
    }
};
AudioRecorder = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], AudioRecorder);
exports.default = AudioRecorder;
//# sourceMappingURL=audio_recorder.jsx.map