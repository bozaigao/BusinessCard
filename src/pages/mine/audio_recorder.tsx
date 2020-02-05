/**
 * @filename audio_recorder.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 语音录制界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
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
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import TopHeader from "../../compoments/top-header";
import {Image, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";
import DeleteNoticeModal from "./delete-notice";

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
  //获取banner信息
  dispatchBannerInfo?: any;
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
    disableScroll: true
  }
  private timer;

  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      recordText: '',
      recordDone: false,
      recordState: RECORD_STATE.RECORD_NO_START,
      startTimer: false,
      canRecordDone: false,
      canRetry: false,
      showDeleteNotice: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
    this.clearTime();
  }

  componentDidMount() {
  }

  componentDidHide() {
  }

  starTime = () => {
    this.timer = setInterval(() => {
      if (this.state.startTimer) {
        this.setState({time: this.state.time + 1});
      }
    }, 1000);
  }

  clearTime = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }


  render() {
    let {time, recordText, recordDone, recordState, canRecordDone, canRetry, showDeleteNotice} = this.state;
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
    } else {
      if (canRecordDone) {
        rightIcon = require('../../assets/ico_record_done_pressed.png');
      } else {
        rightIcon = require('../../assets/ico_record_done_normal.png');
      }
    }

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
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
                           this.starTime();
                           this.setState({startTimer: true, recordText: '录制中', recordState: RECORD_STATE.RECORD_START});
                           break;
                         case RECORD_STATE.RECORD_START:
                           this.setState({
                             startTimer: false,
                             recordText: `暂停录制（剩余${totalTime - time}s）`,
                             recordState: RECORD_STATE.RECORD_PAUSE
                           }, () => {
                             if (time > miniRecordTime) {
                               this.setState({canRecordDone: true});
                             }
                           });
                           break;
                         case RECORD_STATE.RECORD_PAUSE:
                           this.setState({
                             startTimer: true,
                             recordText: '录制中',
                             recordState: RECORD_STATE.RECORD_RESUME
                           });
                           break;
                         case RECORD_STATE.RECORD_RESUME:
                           this.setState({
                             startTimer: false,
                             recordText: `暂停录制（剩余${totalTime - time}s）`,
                             recordState: RECORD_STATE.RECORD_PAUSE
                           }, () => {
                             if (time > miniRecordTime) {
                               this.setState({canRecordDone: true});
                             }
                           });
                           break;
                         default:
                           break;
                       }
                     }}/>
              <Image style={styleAssign([w(56), h(56)])}
                     src={rightIcon}
                     onClick={() => {
                       if (canRetry) {
                         this.setState({
                           time: 0,
                           startTimer: true,
                           recordState: RECORD_STATE.RECORD_START,
                           recordDone: false,
                           recordText: '正在录制',
                           canRetry: false,
                           canRecordDone: false
                         });
                       } else if (canRecordDone) {
                         this.setState({recordDone: true, recordText: '录制完成', canRetry: true});
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

            }}>
            <Text style={styleAssign([fSize(16), color(recordDone ? commonStyles.whiteColor : '#343434')])}>保存</Text>
          </TouchableButton>
        </View>
        {
          showDeleteNotice && <DeleteNoticeModal cancelCallback={() => {
            this.setState({showDeleteNotice: false});
          }
          } confirmCallback={() => {
            this.setState({
              time: 0,
              recordText: '',
              recordDone: false,
              recordState: RECORD_STATE.RECORD_NO_START,
              startTimer: false,
              canRecordDone: false,
              canRetry: false,
              showDeleteNotice: false
            });
          }
          }/>
        }
      </CustomSafeAreaView>
    )
  }
}


export default AudioRecorder
