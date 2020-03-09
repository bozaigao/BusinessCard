/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 个人介绍
 */
import Taro, {InnerAudioContext, PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  absL, absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  fSize,
  h, hRatio,
  ml,
  mr,
  mt,
  pa,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import {cloudBaseUrl} from "../../../api/httpurl";
import {User} from "../../../const/global";


interface Props {
  userInfo: User;
}

interface State {
  micIsPlaying: boolean;
}

export default class PersonalInfo extends PureComponent<Props, State> {
  private innerAudioContext: InnerAudioContext;

  constructor(props) {
    super(props);
    this.innerAudioContext = Taro.createInnerAudioContext();
    this.state = {
      micIsPlaying: false
    }

  }


  componentDidHide() {
    this.setState({micIsPlaying: false});
    this.innerAudioContext && this.innerAudioContext.stop();
  }

  componentWillUnmount() {
    this.innerAudioContext && this.innerAudioContext.stop();
  }

  playMic = () => {
    this.setState({micIsPlaying: true});
    this.innerAudioContext.src = this.props.userInfo.voiceUrl;
    this.innerAudioContext.play();
    this.innerAudioContext.onEnded(() => {
      this.setState({micIsPlaying: false});
    });
  }

  render() {
    let {userInfo} = this.props;
    let {micIsPlaying} = this.state;

    return (
      <View style={styleAssign([wRatio(100), styles.uac])}>
        <View style={styleAssign([wRatio(100)])}>
          <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
            <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
            <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>我的个人简介</Text>
          </View>
        </View>
        <View
          style={styleAssign([wRatio(95), h(355), bgColor(commonStyles.whiteColor), radiusA(4),
            {marginLeft: '2.5%'}, mt(16), pa(16)])}>
          <View style={styleAssign([styles.udr, styles.uac])}>
            <Image style={styleAssign([w(40), h(40), radiusA(20)])}
                   src={userInfo.avatar ? userInfo.avatar : `${cloudBaseUrl}ico_default.png`}/>
            <View style={styleAssign([w(85), h(41), ml(10)])}>
              <Image style={styleAssign([wRatio(100), hRatio(100), styles.upa, absL(0)])}
                     src={require('../../../assets/ico_mic_bg.png')}
                     onClick={(e) => {
                       e.stopPropagation();
                       this.playMic();
                     }
                     }/>
              <Image style={styleAssign([w(18), h(18), styles.upa, absL(15), absT(10)])}
                     src={micIsPlaying ? require('../../../assets/mic_play.gif') : require('../../../assets/ico_mic.png')}
                     onClick={(e) => {
                       e.stopPropagation();
                       this.playMic();
                     }
                     }/>
            </View>
            <View>
              <View style={styleAssign([w(7), h(7), radiusA(3.6), bgColor('red'), ml(5)])}/>
              <Text
                style={styleAssign([fSize(11), color('#979797'), ml(8), mt(5)])}>{`${userInfo.voiceDuration}″`}</Text>
            </View>
          </View>
          <Text
            style={styleAssign([fSize(14), color('#343434'), mt(16)])}>{userInfo.selfDescription}</Text>
          {/*家乡*/}
          <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(24)])}>
            <View style={styleAssign([])}>
              <Text style={styleAssign([fSize(14)])}>家乡</Text>
              <Text style={styleAssign([fSize(12)])}>{`${userInfo.province} ${userInfo.city}`}</Text>
            </View>
            <View style={styleAssign([w(52), h(28), radiusA(4), styles.uac, styles.ujc,
              bo(1), radiusA(4), {borderStyle: 'solid'}, bdColor(commonStyles.colorTheme), mr(16)])}>
              <Text style={styleAssign([fSize(12)])}>同乡</Text>
            </View>
          </View>
          {/*教育*/}
          <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(24)])}>
            <View style={styleAssign([])}>
              <Text style={styleAssign([fSize(14)])}>教育</Text>
              <Text style={styleAssign([fSize(12)])}>{userInfo.school}</Text>
              <Text
                style={styleAssign([fSize(10), color('#979797')])}>{`${userInfo.profession} ${userInfo.schoolTimeStart}-${userInfo.schoolTimeEnd} ${userInfo.educationBackground}`}</Text>
            </View>
            <View style={styleAssign([w(52), h(28), radiusA(4), styles.uac, styles.ujc,
              bo(1), radiusA(4), {borderStyle: 'solid'}, bdColor(commonStyles.colorTheme), mr(16)])}>
              <Text style={styleAssign([fSize(12)])}>校友</Text>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(68), mt(10), styles.udr, styles.uac, styles.uja])}>
            {
              userInfo.labelArray.map((value, index) => {
                return <View key={index}
                             style={styleAssign([w(58), h(28), styles.uac, styles.ujc, radiusA(14), bgColor('#E7E7E7')])}>
                  <Text style={styleAssign([color('#343434'), fSize(12)])}>{value}</Text>
                </View>
              })
            }
          </View>
        </View>
      </View>
    );
  }
}
