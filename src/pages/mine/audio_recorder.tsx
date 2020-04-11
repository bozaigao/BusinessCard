/**
 * @filename audio_recorder.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 语音录制界面
 */
import Taro, {Component, Config, InnerAudioContext, RecorderManager} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mr,
  mt,
  pt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {debounce, get, parseData, styleAssign, toast} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import TopHeader from "../../compoments/top-header";
import {Image, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";
import DeleteNoticeModal from "../../compoments/delete-notice";
import {Enum} from "../../const/global";
import {FileController, NetworkState} from "../../api/httpurl";

//录制总时间限制
let totalTime = 60;
//最小录制时间限制
let miniRecordTime = 5;

//录制状态
enum RECORD_STATE {
  RECORD_NO_START,
  RECORD_START,
  RECORD_PAUSE,
  RECORD_RESUME
}

interface Props {
  //更新用户信息
  update?: any;
}

interface State {
  time: number;
  recordText: string;
  recordDone: boolean;
  recordState: RECORD_STATE;
  startTimer: boolean;
  canRecordDone: boolean;
  canRetry: boolean;
  showDeleteNotice: boolean;
  localVideoUrl: string;
}

@connect(state => state.login, {...actions})
class AudioRecorder extends Component<Props, State> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {

  }
  private timer;
  private viewRef;
  private recorderManager: RecorderManager;
  private innerAudioContext: InnerAudioContext;


  constructor(props) {
    super(props);
    this.recorderManager = Taro.getRecorderManager();
    this.innerAudioContext = Taro.createInnerAudioContext();
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
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
    this.clearTime();
    this.innerAudioContext && this.innerAudioContext.stop();
  }


  componentDidHide() {
  }

  starTime = () => {
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
        this.setState({time: this.state.time + 1});
      }
      console.log('倒计时');
    }, 1000);
  }

  clearTime = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/8
   * @function: 开始录制
   */
  startRecord = () => {
    const options = {
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
    };
    let that = this;

    Taro.getSetting({
      success(res) {
        if (res.authSetting['scope.record']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          that.recorderManager.start(options);
        } else {
          Taro.openSetting({
            success(res) {
              if (res.authSetting['scope.record']) {
                that.recorderManager.start(options);
              }
            }
          });
        }
      }
    })
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
      } else {
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
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/8
   * @function: 结束录制
   */
  stopRecord = () => {
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
    })
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 将文件通过微信Api上传到服务端
   */
  uploadFileTpWx = (path) => {
    console.log('上传路径', path);
    this.viewRef.showLoading();
    let token = get(Enum.TOKEN), that = this;

    Taro.uploadFile({
      url: FileController.uploadVoice,
      filePath: path,
      name: 'file',
      header: {
        'token': token
      },
      success(res) {
        console.log('上传的音频文件', parseData(res.data).data);
        that.update(parseData(res.data).data);
      }
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 更新用户信息
   */
  update = (path) => {
    this.props.update({voiceUrl: path, voiceDuration: this.state.time}).then((res) => {
      console.log('更新用户信息', res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('录音上传成功');
        debounce(1000, () => {
          Taro.navigateBack();
        })
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {time, recordText, recordDone, recordState, canRecordDone, canRetry, showDeleteNotice, localVideoUrl} = this.state;
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
    } else if (canRecordDone) {
      rightIcon = require('../../assets/ico_record_done_pressed.png');
    } else {
      rightIcon = require('../../assets/ico_record_done_normal.png');
    }


    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'语音录制'}/>
        <View
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          {/*时间计数*/}
          <View
            style={styleAssign([wRatio(100), mt(10), h(140), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <Text style={styleAssign([fSize(48), color('#979797')])}>00:</Text>
              <Text style={styleAssign([fSize(48), color('#E2BB7B'), w(60)])}>{time < 10 ? `0${time}` : time}</Text>
            </View>
            <Text style={styleAssign([fSize(14), color('#979797')])}>{recordText}</Text>
          </View>
          {/*录制小贴士*/}
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), mt(10)])}>
            <Text style={styleAssign([fSize(16), color('#343434'), ml(20), mt(20)])}>录制小贴士：</Text>
            <Text
              style={styleAssign([fSize(14), color('#0C0C0C'), ml(20), mr(20), mt(20)])}> 按住录音按钮，贴近手机话筒录制介绍语请在1分钟内，简明扼要地介绍您的公司、职位及个人信息。</Text>
            <Text
              style={styleAssign([fSize(14), color('#727272'), ml(20), mr(20), mt(20)])}>例如：Hi！欢迎来到我的极致名片，我叫…,在…公司担任…一职，希望能与您进一步建立友好的合作关系，请收下我的名片~</Text>
            <Text
              style={styleAssign([fSize(14), color('#727272'), ml(20), mr(20), mt(20)])}>温馨提示：请在安静的环境下录制，效果会更好哦~</Text>
          </View>
          {/*录制按钮*/}
          <View
            style={styleAssign([styles.uf1, styles.udr, styles.uac, styles.ujc, bgColor(commonStyles.whiteColor), pt(53)])}>
            <View style={styleAssign([styles.udr, styles.uac])}>
              <Image style={styleAssign([w(56), h(56)])}
                     src={recordDone ? require('../../assets/ico_record_delete_pressed.png') :
                       require('../../assets/ico_record_delete_normal.png')}
                     onClick={() => {
                       if (recordDone) {
                         this.setState({showDeleteNotice: true});
                       }
                     }}/>
              <Image style={styleAssign([w(78), h(78), ml(25), mr(25)])} src={recordIcon}
                     onClick={() => {
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
                                   this.setState({canRecordDone: true});
                                 }
                               });
                             });
                           } else {
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
                           } else {
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
                                   this.setState({canRecordDone: true});
                                 }
                               });
                             });
                           } else {
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
              <Image style={styleAssign([w(56), h(56)])}
                     src={rightIcon}
                     onClick={() => {
                       if (canRetry) {
                         this.innerAudioContext.stop();
                         this.setState({time: 0}, () => {
                           this.startRecord();
                         });
                       } else if (canRecordDone) {
                         this.stopRecord();
                       }
                     }}/>
            </View>

          </View>
        </View>
        {/*保存*/}
        <View style={styleAssign([wRatio(100), h(64), styles.uac, styles.ujc])}>
          <TouchableButton
            customStyle={styleAssign([w(335), h(48), radiusA(2), bgColor(recordDone ? commonStyles.colorTheme : '#E6E6E6'),
              styles.uac, styles.ujc])}
            onClick={() => {
              if (recordDone) {
                this.uploadFileTpWx(localVideoUrl);
              }
            }}>
            <Text style={styleAssign([fSize(16), color(recordDone ? commonStyles.whiteColor : '#343434')])}>保存</Text>
          </TouchableButton>
        </View>
        {
          showDeleteNotice && <DeleteNoticeModal
            title={'删除提醒'}
            subTitle={'删除后，语音数据将无法恢复，确定删除？'}
            cancelCallback={() => {
            this.setState({showDeleteNotice: false});
          }
          } confirmCallback={() => {
            toast('删除成功');
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
          }
          }/>
        }
      </CustomSafeAreaView>
    )
  }
}


export default AudioRecorder
