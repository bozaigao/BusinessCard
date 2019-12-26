/**
 * @filename audio_recorder.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 语音录制界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {bgColor, color, commonStyles, default as styles, fSize, h, ml, mr, mt, pt, w, wRatio} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import TopHeader from "../../compoments/top-header";
import {Image, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
}

@connect(state => state.home, {...actions})
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

  constructor(props) {
    super(props);
    this.state = {
      list: [{title: '学校', value: '四川美术学院'},
        {title: '学历', value: '本科'},
        {title: '专业', value: '产品设计'},
        {title: '在校时间', value: '2015-2019'}],
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentDidHide() {
  }


  render() {

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'语音录制'}/>
        <View
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          {/*时间计数*/}
          <View
            style={styleAssign([wRatio(100), mt(10), h(140), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(48), color('#979797')])}>00:00</Text>
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
              <Image style={styleAssign([w(56), h(56)])} src={require('../../assets/ico_record_delete.png')}/>
              <Image style={styleAssign([w(78), h(78), ml(25), mr(25)])} src={require('../../assets/ico_record.png')}/>
              <Image style={styleAssign([w(56), h(56)])} src={require('../../assets/ico_record_done.png')}/>
            </View>

          </View>
        </View>
        {/*保存*/}
        <BottomButon title={'保存'} onClick={() => {

        }}/>
      </CustomSafeAreaView>
    )
  }
}


export default AudioRecorder
