/**
 * @filename self_intro.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 自我描述
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Text, Textarea, View} from '@tarojs/components'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {
  absB,
  absR,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mt,
  pa,
  padding,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import BottomButon from "../../compoments/bottom-buton";

interface Props {
}

interface State {
  desc: string;
  template: string;
}

@connect(state => state.login, {...actions})
class SelfIntro extends Component<Props, State> {

  private viewRef;


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
    console.log(this.viewRef);
    this.state = {
      desc: '',
      template: 'Hi，您好，我是…公司的…,我在…行业已有…年，主要负责…工作，有着丰富的…经验以及非常专业的相关知识，如果您有意向与我司合作，请直接联系我。'
    }
  }


  render() {
    let {desc, template} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'自我描述'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([wRatio(100), h(160)])}>
         <Textarea
           style={styleAssign([wRatio(80), {marginLeft: '5%'}, h(160), pa(20), bgColor(commonStyles.pageDefaultBackgroundColor),
             mt(20), fSize(14)])}
           value={''} placeholder={'简单介绍一下自己，有助于加深他人对你的了解哦~'}
           maxlength={600}
           onInput={(e) => {
             this.setState({desc: e.detail.value});
           }}/>
            <View style={styleAssign([styles.uac, styles.udr, styles.upa, absR(30), absB(10)])}>
              <Text style={styleAssign([fSize(12), color('#979797')])}>{desc.length}</Text>
              <Text style={styleAssign([fSize(12), color('#CECECE')])}>/600</Text>
            </View>
          </View>
          <Text style={styleAssign([fSize(16), color('#313137'), ml(20), mt(20)])}>查看模板</Text>
          <View style={styleAssign([wRatio(90), {marginLeft: '5%'}, h(136), mt(13),
            {boxShadow: '0px 4px 4px 0px rgba(230,230,230,0.5'}])}>
            <View style={styleAssign([{flex: 2}, styles.uac, styles.ujc, padding([16, 16, 0, 16])])}>
              <Text
                style={styleAssign([fSize(14), color('#343434')])}>{template}</Text>
            </View>
            <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(5)])}/>
            <View style={styleAssign([{flex: 1}, styles.uac, styles.ujc,])}
                  onLongPress={() => {
                    Taro.setClipboardData({
                      data: template
                    });
                  }}>
              <Text
                style={styleAssign([fSize(12), color('#979797')])}>长按可复制</Text>
            </View>
          </View>
        </View>
        {/*保存*/}
        <BottomButon title={'保存'} onClick={() => {

        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default SelfIntro;
