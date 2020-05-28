/**
 * @filename tool_box.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 工具箱
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {debounce, styleAssign, toast} from "../../utils/datatool";
import {
  absB, absR,
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
  pl,
  pr,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Switch, Text, Textarea, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import {User} from "../../const/global";
import {NetworkState} from "../../api/httpurl";

interface Props {
  userInfo: User;
  //更新用户信息
  update: any;
}


interface State {
  template: string;
  desc: string;
  radarRemind: number;
}

@connect(state => state.login, {...actions})
class ToolBox extends Component<Props, State> {

  private viewRef;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {

  }

  constructor(props) {
    super(props);
    console.log('工具箱',props.userInfo);
    this.state = {
      template: '您好，我是…公司的…,这是我的电子名片，欢迎进入我的名片主页~',
      desc: props.userInfo.guideLanguage,
      radarRemind: props.userInfo.radarRemind
    }
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 更新用户信息
   */
  update = () => {
    let {desc, radarRemind} = this.state;

    if (desc.length === 0) {
      toast('请先完善引导语');
      return;
    }
    this.viewRef && this.viewRef.showLoading();
    this.props.update({
      guideLanguage: desc,
      radarRemind
    }).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('保存成功');
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
    let {template, desc, radarRemind} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'工具箱'}/>
        {/*输入区*/}
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([wRatio(100), h(360), bgColor(commonStyles.whiteColor), mt(10)])}>
            <Text style={styleAssign([fSize(15), color('#0C0C0C'), ml(20), mt(20)])}>名片引导语</Text>
            <View style={styleAssign([wRatio(100), h(91), mt(20)])}>
            <Textarea value={desc}
                      placeholder={'您好，我是…公司的…,这是我的电子名片，欢迎进入我的名片主页~'}
                      style={styleAssign([w(305), h(91), fSize(16), ml(20),
                        bgColor(commonStyles.pageDefaultBackgroundColor), pa(16)])}
                      onInput={(e) => {
                        this.setState({desc: e.detail.value});
                      }} maxlength={50}/>
              <View style={styleAssign([styles.uac, styles.udr, styles.upa, absR(30), absB(10)])}>
                <Text style={styleAssign([fSize(12), color('#979797')])}>{desc.length}</Text>
                <Text style={styleAssign([fSize(12), color('#CECECE')])}>/50</Text>
              </View>
            </View>
            <Text style={styleAssign([fSize(16), color('#313137'), ml(20), mt(20)])}>参考模板</Text>
            <View style={styleAssign([wRatio(90), {marginLeft: '5%'}, h(100), mt(13),
              {boxShadow: '0px 4px 4px 0px rgba(230,230,230,0.5'}])}>
              <View style={styleAssign([{flex: 2}, styles.uac, styles.ujc, padding([16, 16, 0, 16])])}>
                <Text
                  style={styleAssign([fSize(14), color('#343434')])}>{template}</Text>
              </View>
              <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(5)])}/>
              <View style={styleAssign([h(35), styles.uac, styles.ujc,])}
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
          {/*雷达提醒开关*/}
          <View
            style={styleAssign([wRatio(100), h(56), styles.uac, styles.udr, styles.ujb, pl(20), pr(20), mt(10), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(15), color('#0C0C0C')])}>雷达提醒</Text>
            <Switch color={'#E2BB7B'} checked={radarRemind === 1} onChange={(e) => {
              this.setState({radarRemind: e.detail.value ? 1 : 0});
            }}/>
          </View>
        </View>
        {/*保存*/}
        <BottomButon title={'确定'} onClick={() => {
          this.update();
        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default ToolBox;
